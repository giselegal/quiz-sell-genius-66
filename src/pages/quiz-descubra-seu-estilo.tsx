<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Descubra Seu Estilo Único em 5 Minutos | Gisele Galvão</title>
  <meta name="description" content="Mais de 3.000 mulheres já descobriram seu estilo com o método Gisele Galvão. Descubra o seu em minutos! Quiz + Guia personalizado por apenas R$ 39,99.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <style>
    :root {
      --color-primary: #B89B7A;
      --color-primary-dark: #A1835D;
      --color-primary-light: #D4B79F;
      --color-background: #fffaf7;
      --color-background-alt: #f9f4ef;
      --color-card: #ffffff;
      --color-text: #2C1810;
      --color-text-secondary: #5D4A3A;
      --color-text-muted: #8F7A6A;
      --color-success: #4CAF50;
      --color-success-dark: #45a049;
      --color-warning: #FF6B35;
      --color-border: rgba(184, 155, 122, 0.15);
      --color-border-light: rgba(184, 155, 122, 0.08);
      --color-overlay: rgba(44, 24, 16, 0.02);
      --shadow-xs: 0 1px 2px rgba(184, 155, 122, 0.05);
      --shadow-sm: 0 2px 4px rgba(184, 155, 122, 0.08);
      --shadow-md: 0 4px 12px rgba(184, 155, 122, 0.12);
      --shadow-lg: 0 8px 24px rgba(184, 155, 122, 0.15);
      --shadow-xl: 0 16px 40px rgba(184, 155, 122, 0.18);
      --shadow-cta: 0 8px 32px rgba(76, 175, 80, 0.25);
      --radius-xs: 4px;
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-xl: 20px;
      --radius-2xl: 24px;
      --radius-full: 9999px;
      --font-heading: 'Playfair Display', serif;
      --font-body: 'Inter', sans-serif;
      --spacing-xs: 4px;
      --spacing-sm: 8px;
      --spacing-md: 12px;
      --spacing-lg: 20px;
      --spacing-xl: 32px;
      --spacing-2xl: 48px;
      --spacing-3xl: 64px;
      --spacing-4xl: 96px;
      --spacing-5xl: 128px;
    }
    html, body {
      background: var(--color-background);
      color: var(--color-text);
      font-family: var(--font-body);
      font-size: 17px;
      line-height: 1.7;
      margin: 0;
      padding: 0;
      scroll-behavior: smooth;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }
    h1, h2, h3, h4 {
      font-family: var(--font-heading);
      color: var(--color-text);
      margin-bottom: var(--spacing-md);
    }
    h1 {
      font-size: clamp(2.5rem, 6vw, 3.8rem);
      font-weight: 700;
      line-height: 1.08;
    }
    h2 {
      font-size: clamp(1.7rem, 4vw, 2.5rem);
      font-weight: 600;
      line-height: 1.18;
    }
    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-primary-dark);
    }
    .lead {
      font-size: 1.25rem;
      color: var(--color-text-secondary);
      margin-bottom: var(--spacing-xl);
    }
    .section {
      padding: var(--spacing-3xl) 0;
    }
    .section-hero {
      background: linear-gradient(135deg, var(--color-background) 0%, var(--color-background-alt) 100%);
      padding: var(--spacing-4xl) 0 var(--spacing-3xl) 0;
      text-align: center;
      position: relative;
    }
    .section-hero .logo {
      max-width: 180px;
      margin-bottom: var(--spacing-xl);
    }
    .section-hero h1 {
      background: linear-gradient(90deg, var(--color-primary-dark), var(--color-primary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      margin-bottom: var(--spacing-xl);
    }
    .section-hero .hero-image {
      margin: var(--spacing-2xl) auto;
      max-width: 480px;
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xl);
      overflow: hidden;
    }
    .section-hero .social-proof {
      background: linear-gradient(90deg, var(--color-primary-dark), var(--color-primary));
      color: #fff;
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg) var(--spacing-2xl);
      margin: var(--spacing-2xl) auto var(--spacing-xl) auto;
      display: inline-block;
      font-size: 1.3rem;
      box-shadow: var(--shadow-md);
    }
    .section-hero .social-proof strong {
      font-size: 2.4rem;
      font-weight: 800;
      letter-spacing: 1px;
      margin-right: 8px;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(90deg, var(--color-primary-dark), var(--color-primary));
      color: #fff;
      font-family: var(--font-body);
      font-weight: 700;
      font-size: 1.15rem;
      padding: 20px 48px;
      border-radius: var(--radius-full);
      text-decoration: none;
      text-align: center;
      border: none;
      cursor: pointer;
      box-shadow: var(--shadow-lg);
      transition: all 0.2s;
      margin: 0 auto var(--spacing-xl) auto;
      position: relative;
      overflow: hidden;
      outline: none;
      display: block;
      max-width: 400px;
    }
    .btn:hover, .btn:focus {
      background: linear-gradient(90deg, var(--color-primary), var(--color-primary-dark));
      transform: scale(1.04) translateY(-2px);
      box-shadow: 0 8px 32px rgba(184, 155, 122, 0.25);
    }
    .btn-success {
      background: linear-gradient(90deg, var(--color-success), var(--color-success-dark));
      color: #fff;
      box-shadow: var(--shadow-cta);
    }
    .btn-success:hover, .btn-success:focus {
      background: linear-gradient(90deg, var(--color-success-dark), var(--color-success));
    }
    .divider {
      width: 100px;
      height: 5px;
      background: linear-gradient(90deg, var(--color-primary-dark), var(--color-primary));
      border-radius: var(--radius-full);
      margin: 48px auto;
      opacity: 0.22;
    }
    .grid {
      display: grid;
      gap: var(--spacing-2xl);
    }
    .grid-2 {
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    }
    .grid-3 {
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    }
    .card {
      background: var(--color-card);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-md);
      padding: var(--spacing-2xl);
      border: 1px solid var(--color-border);
      transition: box-shadow 0.2s, transform 0.2s;
      position: relative;
      min-height: 220px;
    }
    .card:hover {
      box-shadow: var(--shadow-xl);
      transform: translateY(-4px) scale(1.02);
    }
    .card .icon {
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-full);
      background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary-dark));
      color: #fff;
      font-size: 2.2rem;
      margin-bottom: var(--spacing-lg);
      box-shadow: var(--shadow-sm);
    }
    .problem-list, .benefits-list {
      list-style: none;
      padding: 0;
      margin: 0 0 var(--spacing-xl) 0;
    }
    .problem-list li, .benefits-list li {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: var(--spacing-lg);
      font-size: 1.08rem;
      background: var(--color-background-alt);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg) var(--spacing-xl);
      border-left: 5px solid var(--color-primary);
    }
    .problem-list li i {
      color: var(--color-warning);
      font-size: 1.3rem;
      margin-top: 2px;
    }
    .benefits-list li i {
      color: var(--color-success);
      font-size: 1.3rem;
      margin-top: 2px;
    }
    .badge {
      display: inline-block;
      background: linear-gradient(90deg, var(--color-primary-dark), var(--color-primary));
      color: #fff;
      border-radius: var(--radius-full);
      padding: 8px 28px;
      font-size: 1.05rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin-bottom: var(--spacing-xl);
      box-shadow: var(--shadow-xs);
    }
    .guarantee-badge {
      width: 180px;
      height: 180px;
      background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
      border-radius: 50%;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin: 0 auto;
      box-shadow: var(--shadow-lg);
      font-family: var(--font-heading);
      font-size: 1.2rem;
      font-weight: 600;
      position: relative;
    }
    .guarantee-badge .days {
      font-size: 3.2rem;
      font-weight: 800;
      margin: 0;
    }
    .price-box {
      background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
      color: #fff;
      padding: var(--spacing-2xl) var(--spacing-xl);
      border-radius: var(--radius-xl);
      text-align: center;
      box-shadow: var(--shadow-xl);
      margin: 0 auto var(--spacing-2xl) auto;
      max-width: 440px;
      position: relative;
    }
    .price-box .price-original {
      text-decoration: line-through;
      opacity: 0.7;
      font-size: 1.15rem;
    }
    .price-box .price-current {
      font-size: 2.5rem;
      font-weight: 800;
      margin: 16px 0;
      letter-spacing: 1px;
    }
    .price-box .economy {
      color: var(--color-success);
      font-weight: 700;
      font-size: 1.15rem;
    }
    .footer {
      background: var(--color-primary-dark);
      color: #fff;
      padding: var(--spacing-2xl) 0 var(--spacing-lg) 0;
      text-align: center;
      font-size: 1.05rem;
      margin-top: var(--spacing-3xl);
    }
    .footer a {
      color: var(--color-primary-light);
      text-decoration: none;
      margin: 0 8px;
      font-weight: 500;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    /* Responsivo */
    @media (max-width: 1100px) {
      .container { padding: 0 8px; }
      .section { padding: var(--spacing-xl) 0; }
      .section-hero { padding: var(--spacing-2xl) 0 var(--spacing-xl) 0; }
      .card { padding: var(--spacing-xl); }
      .grid-2 { grid-template-columns: 1fr; }
    }
    @media (max-width: 700px) {
      h1 { font-size: 2rem; }
      h2 { font-size: 1.2rem; }
      .section { padding: var(--spacing-lg) 0; }
      .section-hero { padding: var(--spacing-lg) 0 var(--spacing-lg) 0; }
      .card { padding: var(--spacing-lg); }
      .guarantee-badge { width: 120px; height: 120px; font-size: 0.95rem; }
      .price-box { padding: var(--spacing-lg); }
      .grid-3 { grid-template-columns: 1fr; }
    }
    /* Barra de CTA fixa mobile */
    .cta-bar {
      display: none;
    }
    @media (max-width: 700px) {
      .cta-bar {
        display: flex;
        position: fixed;
        left: 0; right: 0; bottom: 0;
        background: #fff;
        box-shadow: 0 -2px 16px rgba(184, 155, 122, 0.12);
        z-index: 1000;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        border-top: 2px solid var(--color-border);
      }
      .cta-bar .btn {
        margin: 0 auto;
        font-size: 1rem;
        padding: 12px 24px;
        display: block;
        max-width: 220px;
      }
      .cta-bar .price {
        font-weight: 700;
        color: var(--color-success);
        font-size: 1.1rem;
      }
    }
  </style>
</head>
<body>
  <!-- Hero Section -->
  <section class="section-hero">
    <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp" alt="Gisele Galvão" class="logo">
    <h1>Descubra Seu Estilo Único em 5 Minutos</h1>
    <div class="lead">Mais de <strong>3.000 mulheres</strong> já descobriram seu estilo com o método Gisele Galvão</div>
    <div class="hero-image">
      <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1746740263/oie_768_x_1366_px_1_lu1ivo.png" alt="Quiz de Estilo" style="width:100%; display:block;">
    </div>
    <div class="social-proof"><strong>3.000+</strong> mulheres transformadas</div>
    <a href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912" class="btn btn-success pulse">
      DESCOBRIR MEU ESTILO POR R$ 39,99
    </a>
    <div style="font-size: 1rem; color: var(--color-text-muted); margin-top: 12px;">
      <i class="fas fa-shield-alt"></i> Pagamento 100% seguro &nbsp;|&nbsp; <i class="fas fa-check-circle"></i> Garantia 7 dias &nbsp;|&nbsp; <i class="fas fa-bolt"></i> Acesso imediato
    </div>
  </section>

  <div class="divider"></div>

  <!-- Problemas -->
  <section class="section container">
    <h2 class="badge">Você se reconhece nesses problemas?</h2>
    <ul class="problem-list">
      <li><i class="fas fa-times-circle"></i> Guarda-roupa lotado, mas "nada para vestir"</li>
      <li><i class="fas fa-times-circle"></i> Compras por impulso que viram arrependimento</li>
      <li><i class="fas fa-times-circle"></i> Perda de tempo todas as manhãs montando looks</li>
      <li><i class="fas fa-times-circle"></i> Falta de confiança na sua imagem</li>
      <li><i class="fas fa-times-circle"></i> Dinheiro jogado fora em peças que não combinam</li>
    </ul>
    <div class="lead" style="text-align:center;">Se você se identificou com pelo menos 2 desses problemas, continue lendo…</div>
  </section>

  <div class="divider"></div>

  <!-- Solução e Benefícios -->
  <section class="section container">
    <h2 class="badge">A Solução Que Vai Mudar Sua Relação com a Moda</h2>
    <div class="grid grid-3">
      <div class="card">
        <div class="icon"><i class="fas fa-clipboard-list"></i></div>
        <h3>Quiz Científico</h3>
        <p>Método baseado em psicologia comportamental que identifica seu estilo predominante entre 7 perfis universais.</p>
      </div>
      <div class="card">
        <div class="icon"><i class="fas fa-book-open"></i></div>
        <h3>Guia Personalizado</h3>
        <p>Orientações específicas para SEU resultado, com dicas práticas de cores, modelagens e combinações.</p>
      </div>
      <div class="card">
        <div class="icon"><i class="fas fa-gift"></i></div>
        <h3>Bônus Exclusivos</h3>
        <p>Guia de Peças-Chave + Visagismo Facial para uma transformação completa da sua imagem.</p>
      </div>
    </div>
    <ul class="benefits-list">
      <li><i class="fas fa-check-circle"></i> Economizar 20+ minutos todas as manhãs sabendo o que vestir</li>
      <li><i class="fas fa-check-circle"></i> Parar de desperdiçar dinheiro com peças que não combinam</li>
      <li><i class="fas fa-check-circle"></i> Sentir confiança genuína em qualquer ambiente</li>
      <li><i class="fas fa-check-circle"></i> Criar looks versáteis com o que já tem</li>
      <li><i class="fas fa-check-circle"></i> Expressar sua personalidade de forma autêntica</li>
    </ul>
    <div style="text-align:center;">
      <a href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912" class="btn btn-success pulse">
        QUERO TRANSFORMAR MEU ESTILO AGORA!
      </a>
    </div>
  </section>

  <div class="divider"></div>

  <!-- O que você recebe -->
  <section class="section container">
    <h2 class="badge">O Que Você Recebe Hoje</h2>
    <div class="grid grid-2">
      <div>
        <div class="card">
          <h3><i class="fas fa-clipboard-list"></i> Quiz de Estilo Exclusivo</h3>
          <p><strong>Valor: R$ 97</strong></p>
          <p>Descubra seu estilo predominante entre 7 perfis universais através de um método científico que analisa sua personalidade, preferências e estilo de vida.</p>
          <h3 style="margin-top: 32px;"><i class="fas fa-book-open"></i> Guia Personalizado Completo</h3>
          <p><strong>Valor: R$ 197</strong></p>
          <p>Orientações específicas para SEU resultado, incluindo paleta de cores, modelagens ideais, tecidos recomendados e dicas de styling.</p>
          <h3 style="margin-top: 32px;"><i class="fas fa-gift"></i> Bônus #1: Guia de Peças-Chave</h3>
          <p><strong>Valor: R$ 67</strong></p>
          <p>As 15 peças essenciais para um guarda-roupa funcional e versátil.</p>
          <h3 style="margin-top: 32px;"><i class="fas fa-user"></i> Bônus #2: Guia de Visagismo</h3>
          <p><strong>Valor: R$ 87</strong></p>
          <p>Descubra qual formato de rosto você tem e quais cortes, acessórios e maquiagem valorizam seus traços naturais.</p>
        </div>
      </div>
      <div>
        <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp" alt="Guias de Estilo" style="width:100%; border-radius: 24px; box-shadow: var(--shadow-xl);">
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Transformações Reais -->
  <section class="section container">
    <h2 class="badge">Transformações Reais</h2>
    <div class="grid grid-2">
      <div class="card">
        <h3>Antes e Depois: Adriana</h3>
        <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745519979/Captura_de_tela_2025-03-31_034324_pmdn8y.webp" alt="Antes e Depois Adriana" style="width:100%; border-radius: 16px; box-shadow: var(--shadow-md);">
      </div>
      <div class="card">
        <h3>Antes e Depois: Mariangela</h3>
        <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745522326/Captura_de_tela_2025-03-31_034324_cpugfj.webp" alt="Antes e Depois Mariangela" style="width:100%; border-radius: 16px; box-shadow: var(--shadow-md);">
      </div>
    </div>
    <div class="grid grid-3" style="margin-top:40px;">
      <div class="card">
        <p style="font-style: italic; color: var(--color-text-muted);">“Antes, a roupa me vestia. Hoje, eu me visto de propósito. A consultoria me fez dar vida à mulher que sempre existiu em mim.”</p>
        <div style="margin-top: 16px; font-weight: 600; color: var(--color-primary-dark);">— Mariangela, Engenheira</div>
      </div>
      <div class="card">
        <p style="font-style: italic; color: var(--color-text-muted);">“Aprendi a me valorizar e a dar valor para a imagem que transmito. As pessoas começaram a me olhar diferente — porque eu estava diferente.”</p>
        <div style="margin-top: 16px; font-weight: 600; color: var(--color-primary-dark);">— Patrícia Paranhos, Advogada</div>
      </div>
      <div class="card">
        <p style="font-style: italic; color: var(--color-text-muted);">“A Gisele me ensinou a entender o que comunico com as roupas. Hoje compro com consciência, estilo e propósito.”</p>
        <div style="margin-top: 16px; font-weight: 600; color: var(--color-primary-dark);">— Sônia Spier, Terapeuta</div>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Sobre a Mentora -->
  <section class="section container">
    <h2 class="badge">Quem é Gisele Galvão?</h2>
    <div class="grid grid-2" style="align-items: center;">
      <div>
        <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp" alt="Gisele Galvão" style="width:100%; border-radius: 24px; box-shadow: var(--shadow-xl);">
      </div>
      <div>
        <h3>Consultora de Imagem e Estilo</h3>
        <p>Certificada internacionalmente, especialista em Coloração Pessoal e Personal Branding. Advogada de formação, mãe da Victória e apaixonada por ajudar mulheres a descobrirem sua essência através da imagem pessoal.</p>
        <p><strong>Já transformou a vida de mais de 3.000 mulheres</strong> que buscavam uma forma autêntica de se expressar através do seu estilo.</p>
        <div style="margin-top: 32px; padding: 20px; background: var(--color-background-alt); border-radius: 12px;">
          <strong>"Acredito que toda mulher merece se sentir confiante e autêntica. Este material é meu presente para você descobrir sua essência única."</strong>
        </div>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Garantia -->
  <section class="section container">
    <h2 class="badge">Garantia Incondicional de 7 Dias</h2>
    <div class="grid grid-2" style="align-items: center;">
      <div style="text-align:center;">
        <div class="guarantee-badge">
          <div>GARANTIA</div>
          <div class="days">7</div>
          <div>DIAS</div>
        </div>
      </div>
      <div>
        <h3>Sem risco para você!</h3>
        <p>Se por qualquer motivo você não ficar satisfeita, basta solicitar o reembolso em até 7 dias e devolvemos 100% do seu investimento, sem perguntas.</p>
        <p>Você não tem nada a perder e uma nova versão de si mesma para ganhar!</p>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Oferta e CTA Final -->
  <section class="section container">
    <h2 class="badge">Oferta Especial Por Tempo Limitado</h2>
    <div class="price-box">
      <div class="price-original">De R$ 448 por</div>
      <div class="price-current">R$ 39,99</div>
      <div class="economy">Economia de 91%!</div>
      <div style="margin: 24px 0 0 0;">
        <i class="fas fa-check-circle"></i> Quiz de Estilo Personalizado<br>
        <i class="fas fa-check-circle"></i> Guia Completo do Seu Estilo<br>
        <i class="fas fa-check-circle"></i> Guia de Peças-Chave<br>
        <i class="fas fa-check-circle"></i> Guia de Visagismo Facial<br>
        <i class="fas fa-check-circle"></i> Acesso Imediato<br>
        <i class="fas fa-check-circle"></i> Garantia de 7 Dias
      </div>
      <a href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912" class="btn btn-success pulse" style="margin-top: 36px;">
        GARANTIR MINHA TRANSFORMAÇÃO AGORA
      </a>
    </div>
  </section>

  <!-- Barra de CTA fixa mobile -->
  <div class="cta-bar">
    <span class="price">R$ 39,99</span>
    <a href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912" class="btn btn-success pulse">QUERO MEU ESTILO</a>
  </div>

  <!-- Rodapé -->
  <footer class="footer">
    <div style="margin-bottom: 8px;">
      <a href="#">Política de Privacidade</a> |
      <a href="#">Termos de Uso</a> |
      <a href="mailto:contato@giselegalvao.com.br">Contato</a>
    </div>
    <div>
      &copy; 2025 Gisele Galvão. Todos os direitos reservados.
    </div>
  </footer>
</body>
</html>
