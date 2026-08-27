# Site Ramiro Meves

Site institucional da campanha de Ramiro Meves para Deputado Estadual por São Paulo, número 27777.

## Situação atual

- A versão publicada permanece preservada na `main`.
- A nova home one-page está construída na branch de aprovação, com HTML, CSS e JavaScript leves.
- A primeira entrega não possui backend de leads nem WhatsApp Cloud API.
- As páginas restantes serão produzidas depois da aprovação visual; as integrações serão encaminhadas ao responsável técnico.
- A preparação acontece na branch `codex/preparacao-nova-versao`.

## Estrutura

```text
.
├── .github/            modelos e apoio ao fluxo no GitHub
├── assets/             arquivos finais, leves e usados pelo site
├── docs/               escopo, inventário e documentação técnica
├── materiais/          fontes originais locais, ignoradas pelo Git
├── index.html           estrutura da nova one-page
├── script.js            menu, navegação e microinterações
└── style.css            identidade visual e responsividade
```

Os 2,5 GB de PSDs, fotos brutas, PDFs e demais fontes ficam em `materiais/originais/`. Somente os arquivos escolhidos e otimizados para produção devem ser copiados para `assets/`.

## Executar localmente

```bash
python3 -m http.server 8080
```

Depois, acesse `http://localhost:8080`.

## Fluxo de trabalho

1. Criar ou utilizar uma branch de trabalho.
2. Validar a versão local em desktop e celular.
3. Abrir um pull request para revisão.
4. Integrar na `main` somente após aprovação, pois ela é a referência da versão publicada.

Veja o índice da documentação em [`docs/README.md`](docs/README.md).
