# Integração do formulário com Google Sheets

O formulário envia o primeiro passo imediatamente e atualiza a mesma linha quando a pessoa conclui ou pula o segundo passo.

## Como publicar o endpoint

1. Crie uma planilha vazia no Google Sheets.
2. Na planilha, abra **Extensões → Apps Script**.
3. Substitua o conteúdo de `Code.gs` pelo arquivo desta pasta.
4. Em **Configurações do projeto**, use o fuso `America/Sao_Paulo`.
5. Clique em **Implantar → Nova implantação → Aplicativo da Web**.
6. Execute como a conta proprietária da planilha e permita o acesso a **qualquer pessoa**.
7. Autorize o script e copie a URL final terminada em `/exec`.
8. Cole essa URL no atributo `data-endpoint` do formulário em `index.html`.

O script cria automaticamente a aba `Leads`, o cabeçalho e uma linha por cadastro.

## Dados gravados

- ID do cadastro;
- data de criação e atualização;
- status parcial ou completo;
- nome e WhatsApp;
- bairro, cidade e e-mail opcionais;
- consentimento e versão do texto aceito;
- origem, URL da página, horário do navegador e dispositivo.

## Limitação desta solução

Um Web App do Google Apps Script não fornece o IP real do visitante. Para cumprir o requisito de registro de IP do briefing, o formulário precisará passar por um endpoint próprio no VPS, Cloudflare Worker ou serviço equivalente antes de chegar ao Sheets.

O endereço do Web App não é uma senha, mas somente pessoas autorizadas devem ter acesso de edição à planilha.
