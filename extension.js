const { LanguageClient } = require('vscode-languageclient')
const  vscode  = require('vscode')

let client

module.exports = {
  activate(context) {
    const config = vscode.workspace.getConfiguration('bhlspc');
    const serverPath = config.inspect('serverPath').globalValue
    const folders = config.inspect('folders').globalValue

    const executable = {
      command: 'mono',
      args: [
        serverPath,
        '-stdio'
      ]
    }

    folders.forEach(function(item, index, array) {
      executable.args.push("--root="+item)
    })
    
    const serverOptions = {
      run: executable,
      debug: executable,
    }

    const clientOptions = {
      documentSelector: [{ pattern: '**/*.{bhl,meta}' }]
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