import * as QRCode from 'qrcode';
import * as fs from 'fs';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para gerar QR Code e salvar em um arquivo PNG
async function gerarQRCode(texto: string, nomeArquivo: string): Promise<void> {
    try {
        // Gerar o QR Code e salvá-lo em um arquivo PNG
        await QRCode.toFile(nomeArquivo, texto);
        
        console.log(`QR Code gerado com sucesso!`);
        console.log(`O arquivo "${nomeArquivo}" foi criado.`);
    } catch (error) {
        console.error('Erro ao gerar o QR Code:', error);
    }
}

// Função para solicitar e validar o texto do usuário
function obterTextoDoUsuario(): Promise<string> {
    return new Promise((resolve, reject) => {
        rl.question('😎Digite o texto para gerar o QR Code: \n>>>', (texto: string) => {
            if (texto.trim() === '') {
                console.error('😡Erro: O texto não pode estar vazio!');
                reject();
            } else {
                resolve(texto);
            }
            rl.close();
        });
    });
}

// Função principal assíncrona para gerar o QR Code
async function main() {
    try {
        const textoParaQRCode = await obterTextoDoUsuario();
        const nomeArquivo = 'qr_code.png';
        await gerarQRCode(textoParaQRCode, nomeArquivo);
    } catch (error) {
        console.error('Erro ao gerar o QR Code:', error);
    }
}

// Iniciar o processo principal
main();
