# Design QA — home one-page

Data: 27/08/2026
Estado validado: primeira entrega estática, sem formulário ou integrações de backend.

## Fontes visuais

- `/home/floriano/.codex/state/plugins/product-design/assets/ramiro-campaign-blue-pattern-reference.png` — referência de azul, padronagem, fotografia recortada, assinatura e número.
- `/home/floriano/.codex/state/plugins/product-design/assets/ramiro-campaign-cream-dark-editorial-reference.png` — referência de alternância creme/ardósia, hierarquia editorial e laranja de destaque.

## Evidências da implementação

Desktop, viewport CSS 1440 × 900, device scale factor 1, captura útil 1425 × 890:

- `docs/qa-desktop-hero.jpg`
- `docs/qa-desktop-sobre.jpg`
- `docs/qa-desktop-propostas.jpg`
- `docs/qa-desktop-manifesto.jpg`
- `docs/qa-desktop-contato.jpg`
- `docs/qa-desktop-full.jpg`

Mobile, viewport CSS 390 × 844, device scale factor 1, captura útil 376 × 813 quando a barra de rolagem está visível:

- `docs/qa-mobile-hero.jpg`
- `docs/qa-mobile-hero-candidato.jpg`
- `docs/qa-mobile-menu.jpg`
- `docs/qa-mobile-sobre.jpg`
- `docs/qa-mobile-propostas.jpg`
- `docs/qa-mobile-contato.jpg`

Comparações lado a lado usadas na inspeção final:

- `docs/qa-comparison-blue.jpg`
- `docs/qa-comparison-editorial.jpg`

## Superfícies de fidelidade

- Paleta oficial preservada: azul `#0788AF`, ardósia `#1E3038`, laranja `#EC671C` e creme `#FFFDF1`.
- Padronagem oficial aplicada como textura de fundo, com contraste suficiente sem competir com o texto.
- Logotipos, número 27777 e fotografia oficial usados sem reconstruções ou placeholders.
- Hero mantém o candidato, o lema, a assinatura eleitoral e a linguagem visual do material impresso.
- Seções editoriais alternam creme e ardósia, com títulos condensados, hierarquia forte e chamadas em laranja.
- Tipografia local e licenciada: Archivo para títulos e Poppins para leitura.
- Cards, botões, recortes, cantos e espaçamentos permanecem consistentes entre desktop e mobile.

## Comportamento e acessibilidade

- Sem rolagem horizontal nos viewports testados.
- Menu mobile abre, bloqueia o fundo, atualiza `aria-expanded` e fecha após a navegação.
- Links internos levam às seções corretas.
- Política de privacidade abre e fecha por controle nativo.
- Foco visível, link para pular ao conteúdo e suporte a redução de movimento presentes.
- Console validado sem erros ou avisos.

## Histórico de correções

1. P1 resolvido: a altura declarada nos arquivos de imagem estava prevalecendo sobre o layout responsivo e alongava biografia, assinatura e rodapé. Foi normalizada e o retrato passou a usar uma caixa 4:5 controlada.
2. P1 resolvido: a assinatura vertical do hero cobria o rosto do candidato depois da correção de proporções. Ela foi reposicionada sobre o torso, mantendo o rosto livre.
3. P2 resolvido: a padronagem azul estava discreta demais em relação à referência. Contraste e opacidade foram ajustados.
4. P2 resolvido: o botão flutuante de WhatsApp cobria conteúdo em telas estreitas. Ele foi removido no mobile; os CTAs de contato permanecem no hero e no menu.
5. P2 resolvido: a prévia social recebeu composição 1200 × 630 baseada no hero aprovado.

Nenhum problema P0, P1 ou P2 permanece aberto na primeira entrega.

final result: passed
