## Compile package

1. Make sure you have [Node.js](https://nodejs.org/) installed. Then run: `npm install -g @vscode/vsce`
2. Run `npm install -g typescript` to install typescript
3. Run `npm i @types/node -D`
4. Run `npm install` to install your own dependencies
5. Run `vsce package` to compile vsix package file

## Package setup
1. Go To `Preferences > Extensions > Views and More Actions > Install from VSIX`
2. Open the extension settings and specify the command to run the lsp server