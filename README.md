# Site Ramiro Meves

Site institucional da campanha de Ramiro Meves para Deputado Estadual por São Paulo, número 27777.

## Situação atual

- A versão publicada é um site estático em HTML e CSS.
- A identidade visual e o conteúdo da nova versão já foram recebidos.
- O escopo final ainda está em confirmação: one-page institucional ou estrutura ampliada descrita no briefing.
- Enquanto essa definição não chega, a preparação acontece na branch `codex/preparacao-nova-versao`.

## Estrutura

```text
.
├── .github/            modelos e apoio ao fluxo no GitHub
├── assets/             arquivos finais, leves e usados pelo site
├── docs/               escopo, inventário e documentação técnica
├── materiais/          fontes originais locais, ignoradas pelo Git
├── index.html           site atualmente publicado
└── style.css            estilos do site atualmente publicado
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
