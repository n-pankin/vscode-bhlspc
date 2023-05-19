import * as path from 'path';
import { workspace, ExtensionContext, WorkspaceConfiguration } from 'vscode';
import { Executable, LanguageClient, LanguageClientOptions, ServerOptions, State as ClientState } from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	const config: WorkspaceConfiguration = workspace.getConfiguration('bhlspc');
	const commands: string[] = config.get('command');
	if(commands.length == 0){
		return;
	}

	const executable: Executable = {
		command: commands[0],
		args: []
	};

	if(commands.length > 1) {
		for(var i = 1; i < commands.length; i++) {
			executable.args.push(commands[i]);
		}
	}

	const serverOptions: ServerOptions = {
		run: executable,
		debug: executable
	};

	const selector: string = config.get('selector');
	let language: string = "plaintext";
	if(selector.includes("source.")) {
		const selectorSplit: string[] = selector.split(".");
		if(selectorSplit.length > 1) {
			language = selectorSplit[1];
		}
	}

	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: language }],
	};

	client = new LanguageClient(
		'LSP',
		'LSP',
		serverOptions,
		clientOptions
	);
	
	client.onDidChangeState(evt => {
		if(evt.newState == ClientState.Starting) {
			console.log("Starting BHL LSP client...");
			//client.sendNotification("workspace/didChangeConfiguration", {});
		}

		if(evt.newState == ClientState.Running) {
			console.log("BHL LSP client is running!");
			//client.sendNotification("workspace/didChangeConfiguration", {});
		}
	});

	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	
	return client.stop();
}