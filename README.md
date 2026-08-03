# Tati Barbi — Site institucional e comercial

Protótipo responsivo de uma nova vitrine digital para a Tati Barbi, conectado ao Cardápio Web para pedidos e ao WhatsApp para orçamentos de presentes, eventos e corporativo.

## Executar localmente

Não há dependências. Abra `index.html` diretamente ou use um servidor local:

```bash
python3 -m http.server 8080
```

Acesse `http://localhost:8080`.

## Publicar na Vercel

1. Importe este repositório na Vercel.
2. Selecione **Other** como framework.
3. Não defina comando de build.
4. Use a raiz do repositório como diretório de saída.

## Antes da publicação oficial

- Substituir as imagens de demonstração por fotografias oficiais da Tati Barbi.
- Inserir a logo oficial em SVG ou PNG transparente.
- Confirmar telefone do WhatsApp em `script.js`.
- Confirmar endereço, horários, políticas de entrega e retirada.
- Substituir depoimentos ilustrativos por avaliações autorizadas.
- Configurar Meta Pixel, Google Analytics e Google Tag Manager.
- Revisar textos com a cliente.
- Criar política de privacidade e aviso de cookies quando os rastreadores forem instalados.

## Estrutura

- `index.html`: conteúdo e SEO da página.
- `styles.css`: design responsivo e animações.
- `script.js`: menu, animações e formulário para WhatsApp.
- `vercel.json`: configuração básica de deploy e cabeçalhos de segurança.
