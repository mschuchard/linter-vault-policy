'use babel';

export default {
  config: {
    vaultExecutablePath: {
      title: 'Vault Executable Path',
      type: 'string',
      description: 'Path to Vault executable (e.g. /usr/bin/vault) if not in shell env path.',
      default: 'vault',
      order: 1,
    },
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
        if (!(/path ".*"/.exec(textEditor.getText())))
          return [];

        // initialize return
        let toReturn = [];

        return helpers.exec(atom.config.get('linter-vault-policy.vaultExecutablePath'), ['policy', 'fmt', file], { stream: 'stderr', env: [['VAULT_CLI_NO_COLOR', 'true']], allowEmptyStderr: true }).then(output => {
          // capture the error
          const matchesError = /failed to parse policy: At (\d+):(\d+): (.*)/.exec(output);

          // check for error
          if (matchesError != null) {
            toReturn.push({
              severity: 'error',
              excerpt: matchesError[3],
              location: {
                file,
                position: [[Number.parseInt(matchesError[1]) - 1, Number.parseInt(matchesError[2]) - 1], [Number.parseInt(matchesError[1]) - 1, Number.parseInt(matchesError[2])]],
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
              { detail: error.message }
            );
          }
          return toReturn;
        });
      }
    };
  }
};
