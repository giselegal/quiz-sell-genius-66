import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ColorPicker } from '@/components/result-editor/ColorPicker';
import { Eye, EyeOff, Save, Settings, Image, Type, Layout, Palette } from 'lucide-react';
import QuizOfferPage from './QuizOfferPage';

interface VisualEditorData {
  // Textos editáveis - Hero
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  
  // Seção Problema
  problemTitle: string;
  problemDescription: string;
  problemParagraph1: string;
  problemParagraph2: string;
  problemParagraph3: string;
  problemConclusion: string;
  
  // Seção Solução (Quiz)
  solutionTitle: string;
  solutionDescription: string;
  solutionParagraph1: string;
  solutionParagraph2: string;
  solutionParagraph3: string;
  solutionParagraph4: string;
  solutionCtaText: string;
  
  // Seção Benefícios dos Guias
  benefitsTitle: string;
  benefitsDescription: string;
  benefitsMainDescription: string;
  benefitsSubtitle: string;
  benefitsConclusion: string;
  
  // Bônus 1 - Peças-Chave
  bonus1Title: string;
  bonus1Subtitle: string;
  bonus1Description: string;
  bonus1MainDescription: string;
  bonus1Conclusion: string;
  
  // Bônus 2 - Visagismo
  bonus2Title: string;
  bonus2Subtitle: string;
  bonus2Description: string;
  bonus2MainDescription: string;
  bonus2Conclusion: string;
  
  // Mentora
  mentorTitle: string;
  mentorName: string;
  mentorRole: string;
  mentorDescription1: string;
  mentorDescription2: string;
  mentorDescription3: string;
  
  // Depoimentos
  testimonialsTitle: string;
  testimonialsDescription: string;
  testimonialsQuote: string;
  testimonialsConclusion: string;
  testimonialsCtaText: string;
  
  // Garantia
  guaranteeTitle: string;
  guaranteeDescription: string;
  guaranteePrice: string;
  guaranteeConclusion: string;
  guaranteeCtaText: string;
  
  // FAQ
  faqTitle: string;
  faqCtaText: string;
  
  // URLs e links
  ctaUrl: string;
  
  // Imagens
  heroImage: string;
  heroComplementaryImage: string;
  problemImage: string;
  solutionImage: string;
  benefitsImage: string;
  benefitsComplementaryImage: string;
  bonus1Image: string;
  bonus1ComplementaryImage: string;
  bonus2Image: string;
  bonus2ComplementaryImage: string;
  mentorImage: string;
  testimonialsImage: string;
  testimonialsComplementaryImage: string;
  guaranteeImage: string;
  guaranteeComplementaryImage: string;
  faqImage: string;
  
  // Estilos
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontSize: number;
  spacing: number;
  borderRadius: number;
  shadowIntensity: number;
  
  // Layout
  containerMaxWidth: string;
  sectionPadding: string;
  imageSize: string;
  cardPadding: string;
  
  // Configurações
  showActiveUsers: boolean;
  showCountdown: boolean;
  showLimitedSpots: boolean;
  showTestimonials: boolean;
  showGuarantee: boolean;
  showFaq: boolean;
  showBeforeAfter: boolean;
  showBonuses: boolean;
  showMentor: boolean;
  
  // Customizações avançadas
  headerFixed: boolean;
  animationsEnabled: boolean;
  gradientBackground: boolean;
}

const defaultData: VisualEditorData = {
  // Hero
  heroTitle: 'Descubra Seu Estilo Autêntico e Transforme Seu Guarda-Roupa em um Aliado da Sua Imagem Pessoal',
  heroSubtitle: 'Chega de um guarda-roupa lotado e da sensação de que nada combina com você. Descubra seu estilo predominante e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.',
  heroCtaText: 'Quero Descobrir Meu Estilo Agora!',
  
  // Problema
  problemTitle: 'Você se identifica com isso?',
  problemDescription: 'Você já se sentiu frustrada ao abrir seu guarda-roupa cheio de roupas e mesmo assim não ter o que vestir?',
  problemParagraph1: 'Você já se sentiu frustrada ao abrir seu guarda-roupa cheio de roupas e mesmo assim não ter o que vestir? Ou já comprou peças que pareciam perfeitas na loja, mas que nunca combinaram com nada que você tem?',
  problemParagraph2: 'A verdade é que ter um armário lotado não significa ter um guarda-roupa funcional. Pelo contrário, muitas vezes isso só aumenta a ansiedade na hora de se vestir e o sentimento de que "nada fica bom em mim".',
  problemParagraph3: 'Quantas vezes você já perdeu tempo precioso tentando montar um look que te fizesse sentir confiante? Ou gastou dinheiro em peças que raramente (ou nunca) usou?',
  problemConclusion: 'Isso acontece porque você ainda não descobriu seu estilo predominante - aquele que está alinhado com sua personalidade, valores e essência.',
  
  // Solução
  solutionTitle: 'A Solução Para Sua Transformação de Estilo Começa Aqui!',
  solutionDescription: 'E se eu te dissesse que em apenas alguns minutos você pode descobrir seu estilo predominante e começar a transformar sua relação com a moda e sua imagem pessoal?',
  solutionParagraph1: 'E se eu te dissesse que em apenas alguns minutos você pode descobrir seu estilo predominante e começar a transformar sua relação com a moda e sua imagem pessoal?',
  solutionParagraph2: 'Apresento a você o Quiz de Estilo Gisele Galvão - uma ferramenta desenvolvida com base em anos de experiência em consultoria de imagem e estilo pessoal.',
  solutionParagraph3: 'Este não é apenas mais um teste genérico da internet. É um método preciso que analisa suas preferências reais e identifica seu estilo predominante entre os 7 estilos universais.',
  solutionParagraph4: 'Ao descobrir seu estilo predominante, você dá o primeiro passo para criar um guarda-roupa que realmente funciona para você.',
  solutionCtaText: 'Fazer o Quiz e Descobrir Meu Estilo',
  
  // Benefícios
  benefitsTitle: 'Muito Mais Que um Simples Quiz: Uma Jornada Completa de Autoconhecimento',
  benefitsDescription: 'Mas descobrir seu estilo é apenas o começo. Para realmente transformar sua imagem, você precisa de orientação prática e estratégica.',
  benefitsMainDescription: 'Por isso, ao fazer o quiz, você terá acesso ao Guia de Imagem e Estilo específico para o seu estilo predominante!',
  benefitsSubtitle: 'Cada guia foi cuidadosamente desenvolvido para oferecer:',
  benefitsConclusion: 'Com o Guia de Imagem e Estilo, você terá todas as ferramentas para construir uma imagem que realmente reflete quem você é.',
  
  // Bônus 1
  bonus1Title: 'BÔNUS ESPECIAL #1',
  bonus1Subtitle: 'Guia das Peças-Chave do Guarda-Roupa de Sucesso',
  bonus1Description: 'Como bônus especial, você também receberá o Guia das Peças-Chave do Guarda-Roupa de Sucesso - um manual completo para construir um armário funcional, versátil e alinhado com sua identidade.',
  bonus1MainDescription: 'Neste guia exclusivo, você vai descobrir:',
  bonus1Conclusion: 'Imagine ter um guarda-roupa onde todas as peças combinam entre si, onde você consegue montar looks incríveis em minutos!',
  
  // Bônus 2
  bonus2Title: 'BÔNUS ESPECIAL #2',
  bonus2Subtitle: 'Guia de Visagismo Facial',
  bonus2Description: 'E tem mais! Você também receberá o Guia de Visagismo Facial - uma ferramenta poderosa para valorizar seus traços naturais e potencializar sua beleza única.',
  bonus2MainDescription: 'O visagismo é a arte de harmonizar sua imagem considerando a estrutura do seu rosto. Neste guia exclusivo, você vai aprender:',
  bonus2Conclusion: 'Imagine saber exatamente quais acessórios escolher para valorizar seu rosto e complementar seu estilo!',
  
  // Mentora
  mentorTitle: 'Conheça Sua Mentora',
  mentorName: 'Gisele Galvão',
  mentorRole: 'Consultora de Imagem e Estilo, Personal Branding, Estrategista de Marca pessoal e Especialista em coloração pessoal com Certificação internacional.',
  mentorDescription1: 'Advogada de formação. Mãe da Victória, esposa do Fabrício. Apaixonada pela vida, pelos detalhes, viagens e tudo que me proporcione crescer como ser humano.',
  mentorDescription2: 'Colérica, virginiana, paciente, pacificadora e muito empata. Amo receber, atos de serviços e tempo de qualidade são minha linguagem de amor.',
  mentorDescription3: 'Há anos venho ajudando mulheres a descobrirem seu estilo autêntico e transformarem sua relação com a moda e a imagem pessoal.',
  
  // Depoimentos
  testimonialsTitle: 'Resultados Reais de Mulheres Reais',
  testimonialsDescription: 'Veja o que dizem as mulheres que já descobriram seu estilo e transformaram sua imagem com os guias:',
  testimonialsQuote: 'Os guias da Gisele me deram a clareza que eu precisava para parar de me sentir perdida na frente do guarda-roupa. Agora sei o que me valoriza e me sinto muito mais confiante! - Maria S.',
  testimonialsConclusion: 'Estas são apenas algumas das centenas de mulheres que já transformaram sua relação com a moda e sua imagem pessoal.',
  testimonialsCtaText: 'Sim, Quero Essa Transformação!',
  
  // Garantia
  guaranteeTitle: 'Sua Satisfação Garantida ou Seu Dinheiro de Volta!',
  guaranteeDescription: 'Estou tão confiante de que estes materiais vão transformar sua relação com a moda e sua imagem pessoal que ofereço uma garantia incondicional de 7 dias.',
  guaranteePrice: '[VALOR]',
  guaranteeConclusion: 'Este investimento em autoconhecimento e imagem pessoal vai muito além de roupas - é um investimento em você mesma.',
  guaranteeCtaText: 'Quero Descobrir Meu Estilo Agora!',
  
  // FAQ
  faqTitle: 'Perguntas Frequentes',
  faqCtaText: 'Quero Transformar Minha Imagem Agora!',
  
  // URLs
  ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
  
  // Imagens
  heroImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
  heroComplementaryImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp',
  problemImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp',
  solutionImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746650306/oie_1_gcozz9.webp',
  benefitsImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
  benefitsComplementaryImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp',
  bonus1Image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp',
  bonus1ComplementaryImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745515075/Espanhol_Portugu%C3%AAs_1_uru4r3.webp',
  bonus2Image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp',
  bonus2ComplementaryImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp',
  mentorImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp',
  testimonialsImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/Mockups_p%C3%A1gina_de_venda_Guia_de_Estilo_1_vostj4.webp',
  testimonialsComplementaryImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745521117/Captura_de_tela_2025-03-31_034324_qxvdho.webp',
  guaranteeImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp',
  guaranteeComplementaryImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp',
  faqImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745515862/Sem_nome_1000_x_1000_px_1280_x_720_px_vmqk3j.webp',
  
  // Estilos
  backgroundColor: '#fffaf7',
  textColor: '#432818',
  primaryColor: '#B89B7A',
  secondaryColor: '#aa6b5d',
  accentColor: '#6B4F43',
  fontSize: 16,
  spacing: 16,
  borderRadius: 16,
  shadowIntensity: 20,
  
  // Layout
  containerMaxWidth: 'max-w-5xl',
  sectionPadding: 'py-10 md:py-12',
  imageSize: 'max-w-xl',
  cardPadding: 'p-8',
  
  // Configurações
  showActiveUsers: true,
  showCountdown: true,
  showLimitedSpots: true,
  showTestimonials: true,
  showGuarantee: true,
  showFaq: true,
  showBeforeAfter: true,
  showBonuses: true,
  showMentor: true,
  
  // Customizações avançadas
  headerFixed: true,
  animationsEnabled: true,
  gradientBackground: true,
};

const QuizOfferPageVisualEditor: React.FC = () => {
  const [editorData, setEditorData] = useState<VisualEditorData>(defaultData);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

  useEffect(() => {
    // Carregar dados salvos do localStorage
    const savedData = localStorage.getItem('quizOfferPageEditor');
    if (savedData) {
      try {
        setEditorData({ ...defaultData, ...JSON.parse(savedData) });
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
      }
    }
  }, []);

  const updateData = (key: keyof VisualEditorData, value: any) => {
    setEditorData(prev => ({ ...prev, [key]: value }));
  };

  const saveData = () => {
    localStorage.setItem('quizOfferPageEditor', JSON.stringify(editorData));
    alert('Dados salvos com sucesso!');
  };

  const resetData = () => {
    if (confirm('Tem certeza que deseja resetar todos os dados?')) {
      setEditorData(defaultData);
      localStorage.removeItem('quizOfferPageEditor');
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* Toolbar */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-800">Editor Visual - Quiz Offer Page</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            {isPreviewMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {isPreviewMode ? 'Editar' : 'Visualizar'}
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={resetData}>
            Reset
          </Button>
          <Button size="sm" onClick={saveData}>
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        {!isPreviewMode && (
          <div className="w-80 bg-white border-r overflow-y-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="w-full">
                <TabsTrigger value="content" className="flex-1">
                  <Type className="w-4 h-4 mr-1" />
                  Conteúdo
                </TabsTrigger>
                <TabsTrigger value="design" className="flex-1">
                  <Palette className="w-4 h-4 mr-1" />
                  Design
                </TabsTrigger>
                <TabsTrigger value="layout" className="flex-1">
                  <Layout className="w-4 h-4 mr-1" />
                  Layout
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="p-4 space-y-6">
                <Card className="p-4">
                  <h3 className="font-medium mb-4">Seção Hero</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="heroTitle">Título Principal</Label>
                      <Input
                        id="heroTitle"
                        value={editorData.heroTitle}
                        onChange={(e) => updateData('heroTitle', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="heroSubtitle">Subtítulo</Label>
                      <Textarea
                        id="heroSubtitle"
                        value={editorData.heroSubtitle}
                        onChange={(e) => updateData('heroSubtitle', e.target.value)}
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="heroImage">URL da Imagem</Label>
                      <Input
                        id="heroImage"
                        value={editorData.heroImage}
                        onChange={(e) => updateData('heroImage', e.target.value)}
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-medium mb-4">Seção Problema</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="problemTitle">Título do Problema</Label>
                      <Input
                        id="problemTitle"
                        value={editorData.problemTitle}
                        onChange={(e) => updateData('problemTitle', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="problemDescription">Descrição</Label>
                      <Textarea
                        id="problemDescription"
                        value={editorData.problemDescription}
                        onChange={(e) => updateData('problemDescription', e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="problemImage">URL da Imagem</Label>
                      <Input
                        id="problemImage"
                        value={editorData.problemImage}
                        onChange={(e) => updateData('problemImage', e.target.value)}
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-medium mb-4">Call to Action</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ctaText">Texto do Botão</Label>
                      <Input
                        id="ctaText"
                        value={editorData.ctaText}
                        onChange={(e) => updateData('ctaText', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ctaUrl">URL do Link</Label>
                      <Input
                        id="ctaUrl"
                        value={editorData.ctaUrl}
                        onChange={(e) => updateData('ctaUrl', e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="design" className="p-4 space-y-6">
                <Card className="p-4">
                  <h3 className="font-medium mb-4">Cores</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Cor de Fundo</Label>
                      <div className="mt-2">
                        <ColorPicker
                          color={editorData.backgroundColor}
                          onChange={(color) => updateData('backgroundColor', color)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Cor do Texto</Label>
                      <div className="mt-2">
                        <ColorPicker
                          color={editorData.textColor}
                          onChange={(color) => updateData('textColor', color)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Cor Primária</Label>
                      <div className="mt-2">
                        <ColorPicker
                          color={editorData.primaryColor}
                          onChange={(color) => updateData('primaryColor', color)}
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-medium mb-4">Tipografia</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Tamanho da Fonte: {editorData.fontSize}px</Label>
                      <Slider
                        value={[editorData.fontSize]}
                        onValueChange={(value) => updateData('fontSize', value[0])}
                        min={12}
                        max={24}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Raio da Borda: {editorData.borderRadius}px</Label>
                      <Slider
                        value={[editorData.borderRadius]}
                        onValueChange={(value) => updateData('borderRadius', value[0])}
                        min={0}
                        max={20}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="layout" className="p-4 space-y-6">
                <Card className="p-4">
                  <h3 className="font-medium mb-4">Espaçamento</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Espaçamento: {editorData.spacing}px</Label>
                      <Slider
                        value={[editorData.spacing]}
                        onValueChange={(value) => updateData('spacing', value[0])}
                        min={8}
                        max={32}
                        step={2}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-medium mb-4">Seções Visíveis</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showTestimonials">Mostrar Depoimentos</Label>
                      <Switch
                        id="showTestimonials"
                        checked={editorData.showTestimonials}
                        onCheckedChange={(checked) => updateData('showTestimonials', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showGuarantee">Mostrar Garantia</Label>
                      <Switch
                        id="showGuarantee"
                        checked={editorData.showGuarantee}
                        onCheckedChange={(checked) => updateData('showGuarantee', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showFaq">Mostrar FAQ</Label>
                      <Switch
                        id="showFaq"
                        checked={editorData.showFaq}
                        onCheckedChange={(checked) => updateData('showFaq', checked)}
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Preview Panel */}
        <div className="flex-1 overflow-auto">
          <div 
            className="min-h-full"
            style={{
              backgroundColor: editorData.backgroundColor,
              color: editorData.textColor,
              fontSize: `${editorData.fontSize}px`,
              '--primary-color': editorData.primaryColor,
              '--secondary-color': editorData.secondaryColor,
              '--border-radius': `${editorData.borderRadius}px`,
              '--spacing': `${editorData.spacing}px`,
            } as React.CSSProperties}
          >
            <QuizOfferPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizOfferPageVisualEditor;
