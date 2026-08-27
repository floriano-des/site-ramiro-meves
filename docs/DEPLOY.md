# Repositório e publicação

## Estado atual

- Repositório: `floriano-des/site-ramiro-meves`.
- Visibilidade: pública.
- Branch padrão: `main`.
- A `main` local estava sincronizada com `origin/main` no início desta organização.
- A versão atual é estática e os arquivos de produção ficam na raiz.
- A publicação utiliza a infraestrutura já existente do cliente, vinculada à `main`.

## Estratégia segura

- Preparação e desenvolvimento na branch `codex/preparacao-nova-versao`.
- Nenhuma alteração direta na `main` enquanto o escopo estiver em confirmação.
- Revisão local e pull request antes da integração.
- Backup ou registro do commit publicado antes de cada atualização.
- Materiais brutos e segredos ficam fora do GitHub.

## Observação

A branch `main` não possuía proteção no GitHub em 27/08/2026. Ativar proteção é recomendável, mas deve ser combinado com a equipe para não interromper o processo atual de publicação.

## Prévia em redes sociais

- A página usa Open Graph para Facebook, WhatsApp, LinkedIn e outros serviços compatíveis.
- O X recebe uma `summary_large_image` pelas Twitter Cards.
- A capa oficial fica em `assets/images/og-ramiro-27777.jpg`, no formato JPEG 1200 × 630.
- O arquivo `assets/social/og-card.html` é a fonte visual usada para regenerar a capa; ele está marcado como `noindex`.
- As URLs das tags apontam para `https://www.ramiromeves.com.br/`. Após a publicação, confirmar que a página e a imagem abrem publicamente por HTTPS.
- Facebook e WhatsApp mantêm cache da prévia. Depois de publicar uma nova capa ou texto, solicitar uma nova leitura no Sharing Debugger do Facebook antes de testar novamente no WhatsApp.
