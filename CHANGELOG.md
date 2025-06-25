# CHANGELOG

All notable changes to the "snippetizer" extension will be documented in this file.


## [1.1.0] - 2025-06-25

### Added
- Fixed the bug which would automatically open the <snippet>.json file after saving the snippet.
- `description` field in the Snippet saving process is now optional and users won't be forced to enter details for that.
- Added feature to `create` and save snippets in custom snippet file (if it doesn't exists). 


## [1.0.0] - 2024-08-16

### Added
- Utility to add code snippets directly from workspace (without manually writing `JSON`)
- Choose where you want to save the extension (either  `global` or `extension specific` )
- Extensions are saved in the `snippets` dir:

   - Windows `%APPDATA%\Code\User\`
   - macOS `$HOME/Library/Application\ Support/Code/User/`
   - Linux `$HOME/.config/Code/User/`
