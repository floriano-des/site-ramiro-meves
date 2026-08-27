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
