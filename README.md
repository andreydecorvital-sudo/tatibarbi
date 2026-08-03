# Tati Barbi — Site institucional e comercial

Protótipo responsivo de uma vitrine digital para a Tati Barbi, conectado ao Cardápio Web para pedidos e ao WhatsApp para orçamentos de presentes, eventos e corporativo.

## Versão atual

A V2 adota uma direção mais editorial e cinematográfica:

- hero preparado para vídeo com fallback visual;
- vídeos carregados apenas quando o usuário interage;
- pausa automática quando a mídia sai da tela;
- cards editoriais para produtos e presentes;
- trilho horizontal de vídeos no celular;
- barra fixa de pedido e WhatsApp no mobile;
- suporte a `prefers-reduced-motion`;
- imagens de segurança enquanto vídeos carregam ou falham.

## Trocar os vídeos

No `index.html`, procure por `source data-src`. Substitua as URLs temporárias pelos arquivos oficiais, preferencialmente:

- WebM: VP9, sem áudio para autoplay;
- MP4: H.264 como fallback;
- hero: 1920 × 1080 ou 1440 × 1080, entre 6 e 12 segundos;
- vídeos verticais: 1080 × 1350 ou 1080 × 1920;
- manter cada arquivo abaixo de 4 MB sempre que possível.

O JavaScript injeta a URL no vídeo somente quando necessário. Não troque `data-src` por `src` nos vídeos secundários, para preservar o carregamento sob demanda.

## Executar localmente

Não há dependências:

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

- inserir logo oficial em SVG ou PNG transparente;
- substituir fotos e vídeos temporários por materiais da Tati Barbi;
- confirmar telefone do WhatsApp em `script.js`;
- confirmar endereço, horários, políticas de entrega e retirada;
- substituir depoimentos ilustrativos por avaliações autorizadas;
- configurar Meta Pixel, Google Analytics e Google Tag Manager;
- criar política de privacidade e aviso de cookies.

## Mídia temporária

A demonstração usa referências visuais temporárias do Pexels. Elas servem somente para validar direção de arte e comportamento dos módulos de vídeo. Devem ser substituídas pelos materiais oficiais antes do lançamento.
