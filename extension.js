const { LanguageClient } = require('vscode-languageclient')
const  vscode  = require('vscode')

let client

module.exports = {
  activate(context) {
    const config = vscode.workspace.getConfiguration('bhlspc');
    const command = config.get('command');
    const args = config.get('args');

    const executable = {
      command: command,
      args: []
    }

    args?.forEach(function(item, index, array) {
      executable.args.push(item)
    })
    
    const serverOptions = {
      run: executable,
      debug: executable,
    }

    const clientOptions = {
      documentSelector: [{ pattern: '**/*.{bhl,meta,conf.js}' }]
    }

    client = new LanguageClient(
      'bhlsp',
      'behaviour language server protocol',
      serverOptions,
      clientOptions
    )

    context.subscriptions.push(client.start())
  },

  deactivate(){
    if(!client) {
      return undefined
    }
    return client.stop()
  }
}