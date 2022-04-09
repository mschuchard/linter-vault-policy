'use babel';

import * as path from 'path';

describe('The Vault provider for Linter', () => {
  const lint = require(path.join(__dirname, '../lib/main.js')).provideLinter().lint;

  beforeEach(() => {
    atom.workspace.destroyActivePaneItem();
    waitsForPromise(() => {
      atom.packages.activatePackage('linter-vault-policy');
      return atom.packages.activatePackage('language-hcl').then(() =>
        atom.workspace.open(path.join(__dirname, 'fixtures', 'clean.hcl'))
      );
    });
  });

  describe('checks a file with a syntax issue', () => {
    let editor = null;
    const badFile = path.join(__dirname, 'fixtures', 'error.hcl');
    beforeEach(() => {
      waitsForPromise(() =>
        atom.workspace.open(badFile).then(openEditor => {
          editor = openEditor;
        })
      );
    });

    it('finds the message', () => {
      waitsForPromise(() =>
        lint(editor).then(messages => {
          expect(messages.length).toEqual(1);
        })
      );
    });

    it('verifies the first message', () => {
      waitsForPromise(() => {
        return lint(editor).then(messages => {
          expect(messages[0].severity).toBeDefined();
          expect(messages[0].severity).toEqual('error');
          expect(messages[0].excerpt).toBeDefined();
          expect(messages[0].excerpt).toEqual('literal not terminated');
          expect(messages[0].location.file).toBeDefined();
          expect(messages[0].location.file).toMatch(/.+error\.hcl$/);
          expect(messages[0].location.position).toBeDefined();
          expect(messages[0].location.position).toEqual([[1, 70], [1, 71]]);
        });
      });
    });
  });

  it('finds nothing wrong with a valid file', () => {
    waitsForPromise(() => {
      const goodFile = path.join(__dirname, 'fixtures', 'clean.hcl');
      return atom.workspace.open(goodFile).then(editor =>
        lint(editor).then(messages => {
          expect(messages.length).toEqual(0);
        })
      );
    });
  });

  it('checks a valid non-vault policy hcl file and does nothing', (done) => {
    const goodFile = path.join(__dirname, 'fixtures/', 'not_vault.hcl');
    return atom.workspace.open(goodFile).then(editor =>
      lint(editor).then(messages => {
      }, () => {
        done();
      })
    );
  });
});
