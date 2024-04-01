// const vscode = require('vscode');
// const path = require('path');

// vscode.commands.registerCommand('markdown.help', function() {
//     console.log(path.join(__dirname, 'example.md'));
//     vscode.workspace.openTextDocument(path.join(__dirname, 'example.md')).then(doc => {
//         vscode.window.showTextDocument(doc);
//     });
// });

const vscode = require('vscode');
const path = require('path');
const marked = require('marked');
const fs = require('fs');

vscode.commands.registerCommand('markdown.help', function() {
    const panel = vscode.window.createWebviewPanel(
        'markdownPreview',
        'Markdown Preview',
        vscode.ViewColumn.Two,
        {}
    );

    const markdownFilePath = path.join(__dirname, 'example.md');

    fs.readFile(markdownFilePath, 'utf-8', (err, data) => {
        if (err) {
            vscode.window.showErrorMessage(`Error reading file: ${err.message}`);
            return;
        }

        panel.webview.html = getWebviewContent(marked(data));
    });
});

function getWebviewContent(htmlContent) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Markdown Preview</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
            }
        </style>
    </head>
    <body>
        ${htmlContent}
    </body>
    </html>`;
}
