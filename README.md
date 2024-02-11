![Preview](https://raw.githubusercontent.com/mschuchard/linter-vault-policy/master/linter_vault_policy.png)

### Linter-Vault-Policy
Linter-Vault-Policy aims to provide functional and robust `vault fmt` linting and formatting functionality within Pulsar.

This package is now in maintenance mode. All feature requests and bug reports in the Github repository issue tracker will receive a response, and possibly also be implemented (especially bug fixes). However, active development on this package has ceased.

### Installation
Vault is required to be installed before using this. The Atom-IDE-UI and Language-HCL packages are also required.

All testing is performed with the latest stable version of Pulsar. Any version of Atom or any pre-release version of Pulsar is not supported.

### Usage
- All HCL files with a proper syntax `path` block will be linted with this linter. Be aware of this in case you have a non-Vault HCL file with this characteristic. Also be aware of this in case you have a typo for the `path` block, since this linter will then not trigger.
