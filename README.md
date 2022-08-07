![Preview](https://raw.githubusercontent.com/mschuchard/linter-vault-policy/master/linter_vault_policy.png)

### Linter-Vault-Policy
[![Build Status](https://travis-ci.com/mschuchard/linter-vault-policy.svg?branch=master)](https://travis-ci.com/mschuchard/linter-vault-policy)
[![CircleCI](https://circleci.com/gh/mschuchard/linter-vault-policy.svg?style=svg)](https://circleci.com/gh/mschuchard/linter-vault-policy)

Linter-Vault-Policy aims to provide functional and robust `vault fmt` linting and formatting functionality within Atom.

### Atom Editor Sunset Updates

`apm` was discontinued prior to the sunset by the Atom Editor team. Therefore, the installation instructions are now as follows:

- Locate the Atom packages directory on your filesystem (normally at `<home>/.atom/packages`)
- Retrieve the code from this repository either via `git` or the Code-->Download ZIP option in Github.
- Place the directory containing the repository's code in the Atom packages directory.
- Execute `npm install` in the package directory.

Additionally, this package is now in maintenance mode. All feature requests and bug reports in the Github repository issue tracker will receive a response, and possibly also be implemented. However, active development on this package has ceased.

### Installation
Vault is required to be installed before using this. The Linter and Language-HCL Atom packages are also required.

### Usage
- All HCL files with a proper syntax `path` block will be linted with this linter. Be aware of this in case you have a non-Vault HCL file with this characteristic. Also be aware of this in case you have a typo for the `path` block, since this linter will then not trigger.
