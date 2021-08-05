'use babel';

export default {
  config: {
    vaultExecutablePath: {
      title: 'Vault Executable Path',
      type: 'string',
      description: 'Path to Vault executable (e.g. /usr/bin/vault) if not in shell env path.',
      default: 'vault',
      order: 1,
    }
  },

  deactivate() {
    this.idleCallbacks.forEach((callbackID) => window.cancelIdleCallback(callbackID));
    this.idleCallbacks.clear();
    this.subscriptions.dispose();
  },

  provideLinter() {
    return {
      name: 'Vault',
      grammarScopes: ['source.hcl'],
      scope: 'file',
      lintsOnChange: false,
      lint: async (textEditor) => {
        // establish const vars
        const helpers = require('atom-linter');
        const file = textEditor.getPath();

        // bail out if not vault policy
        if (!(/path \".*\"/.exec(textEditor.getText())))
          return [];

        // setup arguments
        var args = ['policy', 'fmt', file];

        // setup reg exp for output parsing
        const regex_error = /failed to parse policy: At (\d+):(\d+): (.*)/;

        return helpers.exec(atom.config.get('linter-vault-policy.vaultExecutablePath'), args, {stream: 'stderr', allowEmptyStderr: true}).then(output => {
          var toReturn = [];

          // capture the error
          const matches_error = regex_error.exec(output);

          // check for error
          if (matches_error != null) {
            toReturn.push({
              severity: 'error',
              excerpt: matches_error[3],
              location: {
                file: file,
                position: [[Number.parseInt(matches_error[1]) - 1, Number.parseInt(matches_error[2]) - 1], [Number.parseInt(matches_error[1]) - 1, Number.parseInt(matches_error[2])]],
              },
            });
          }
          return toReturn;
        })
        .catch(error => {
          // check for stdin lint attempt
          if (/\.dirname/.exec(error.message) != null) {
            toReturn.push({
              severity: 'info',
              excerpt: 'Vault cannot reliably lint on stdin. Please save this policy to your filesystem.',
              location: {
                file: 'Save this policy.',
                position: [[0, 0], [0, 1]],
              },
            });
          }
          // notify on other errors
          else {
            atom.notifications.addError(
              'An error occurred with linter-vault-policy.',
              {
                detail: error.message
              }
            );
          };
          return [];
        });
      }
    };
  }
};
