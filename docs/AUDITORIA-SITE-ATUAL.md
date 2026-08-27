# Auditoria rápida do site atual

O site atual continuará intacto até a aprovação da nova versão. Pontos encontrados para tratar durante a reconstrução:

- identidade visual antiga em verde e amarelo, diferente do material oficial recebido;
- fontes carregadas externamente pelo Google, apesar da disponibilidade de fontes oficiais;
- ícones sociais dependentes de CDN externa;
- telefone e links de WhatsApp/YouTube ainda são placeholders;
- referência a `favicon.svg`, mas o arquivo não existe no repositório;
- JavaScript tenta atualizar um elemento `#ano` inexistente;
- não há página de privacidade;
- conteúdo e número ainda misturam linguagem de pré-campanha com campanha;
- a página não possui testes ou validação automatizada.

Esses itens foram apenas registrados. Nenhuma correção foi aplicada na versão publicada durante esta etapa de organização.
