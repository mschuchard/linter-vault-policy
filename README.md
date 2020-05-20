![Preview](https://raw.githubusercontent.com/mschuchard/linter-vault-policy/master/linter_vault_policy.png)

### Linter-Vault-Policy
[![Build Status](https://travis-ci.org/mschuchard/linter-vault-policy.svg?branch=master)](https://travis-ci.org/mschuchard/linter-vault-policy)

Linter-Vault-Policy aims to provide functional and robust `vault fmt` linting and formatting functionality within Atom.

### Installation
Vault is required to be installed before using this. The Linter and Language-HCL Atom packages are also required.

### Usage
- All HCL files with a proper syntax `path` block will be linted with this linter. Be aware of this in case you have a non-Vault HCL file with this characteristic. Also be aware of this in case you have a typo for the `path` block, since this linter will then not trigger.
