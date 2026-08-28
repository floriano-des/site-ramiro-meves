# Planejamento do site

Atualizado em 28/08/2026.

## O que será construído até o final

### Frontend sob responsabilidade deste projeto

1. **Home one-page** — primeira entrega para aprovação da linguagem visual e do conteúdo.
2. **Quatro páginas de propostas** — Segurança, Saúde, Mulheres e Idosos.
3. **Biografia** — trajetória completa e realizações verificadas.
4. **Plataforma** — resumo navegável e acesso ao PDF aprovado.
5. **Política de privacidade** — texto legal ajustado às ferramentas realmente utilizadas.
6. **Descadastrar** — interface conectada ao endpoint fornecido pelo responsável técnico.
7. **Onde votar** — orientação e redirecionamento ao serviço eleitoral oficial.

Isso corresponde à landing page e às nove subpáginas previstas no briefing.

O formulário de apoio/captação em duas etapas já faz parte da home. A solução provisória aprovada envia os dados a uma planilha do Google Sheets por meio de um Web App do Apps Script. O site não será um CRM.

O frontend inclui identidade oficial, conteúdo público, responsividade, acessibilidade, SEO, performance, navegação, microinterações, informações legais, validação e publicação após aprovação. Agente de IA não faz parte deste escopo.

### Integrações externas

- Google Sheets e Web App do Apps Script para a captação inicial;
- endpoint de descadastramento, caso o fluxo deixe de ser manual;
- CRM ou ferramenta de operação da base;
- WhatsApp Cloud API, conta, número, templates e credenciais;
- e-mail transacional, caso permaneça no escopo.

O frontend poderá consumir as integrações futuras quando forem entregues endpoints, regras e credenciais por ambiente.

## Fases

### Fase 1 — aprovação da home

- arquitetura e conteúdo da one-page;
- aplicação da identidade oficial;
- navegação, WhatsApp direto e redes sociais;
- versões desktop e mobile;
- revisão visual e de conteúdo pela equipe.

### Fase 2 — páginas restantes

- reaproveitamento do sistema visual aprovado;
- construção das nove rotas do briefing;
- revisão de conteúdo e conformidade de cada página.

### Fase 3 — integração e publicação

- conexão com os serviços entregues pelo Caio;
- testes integrados;
- revisão final de desempenho, acessibilidade e requisitos legais;
- publicação na infraestrutura existente.

## Limites atuais

A one-page possui formulário conectado ao Google Sheets, mas não possui CRM, agente de IA nem WhatsApp Cloud API. O contato direto continua utilizando um link para o WhatsApp.

No projeto final, banco, CRM e automações de WhatsApp continuam fora deste repositório e serão apenas consumidos pelo site quando o Caio disponibilizar as integrações.
