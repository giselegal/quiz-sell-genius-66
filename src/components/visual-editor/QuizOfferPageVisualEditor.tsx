"use client";
import { safeLocalStorage } from "@/utils/safeLocalStorage";
import React, { useState, useEffect, useRef } from 'react';
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
import QuizOfferPageEditable from './QuizOfferPageEditable';

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
  // Padding/Margem por seção
  heroPadding?: string;
  problemPadding?: string;
  solutionPadding?: string;
  benefitsPadding?: string;
  bonus1Padding?: string;
  bonus2Padding?: string;
  mentorPadding?: string;
  testimonialsPadding?: string;
  guaranteePadding?: string;
  faqPadding?: string;
}
const defaultData: VisualEditorData = {
  heroTitle: 'Transforme Seu Estilo com Nosso Quiz Exclusivo!',
  heroSubtitle: 'Descubra como realçar sua beleza única e potencializar sua imagem pessoal.',
  heroCtaText: 'Comece o Quiz Agora',
  problemTitle: 'O Desafio de Se Vestir Bem',
  problemDescription: 'Muitas mulheres enfrentam dificuldades na hora de escolher o que vestir, sentindo-se inseguras e insatisfeitas com a própria imagem.',
  problemParagraph1: 'A verdade é que ter um armário lotado não significa ter um guarda-roupa funcional. Pelo contrário, muitas vezes isso só aumenta a ansiedade na hora de se vestir e o sentimento de que "nada fica bom em mim".',
  problemParagraph2: 'Quantas vezes você já perdeu tempo precioso tentando montar um look que te fizesse sentir confiante? Ou gastou dinheiro em peças que raramente (ou nunca) usou?',
  problemParagraph3: 'Isso acontece porque você ainda não descobriu seu estilo predominante - aquele que está alinhado com sua personalidade, valores e essência.',
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
  mentorTitle: 'Conheça Sua Mentora',
  mentorName: 'Gisele Galvão',
  mentorRole: 'Consultora de Imagem e Estilo, Personal Branding, Estrategista de Marca pessoal e Especialista em coloração pessoal com Certificação internacional.',
  mentorDescription1: 'Advogada de formação. Mãe da Victória, esposa do Fabrício. Apaixonada pela vida, pelos detalhes, viagens e tudo que me proporcione crescer como ser humano.',
  mentorDescription2: 'Colérica, virginiana, paciente, pacificadora e muito empata. Amo receber, atos de serviços e tempo de qualidade são minha linguagem de amor.',
  mentorDescription3: 'Há anos venho ajudando mulheres a descobrirem seu estilo autêntico e transformarem sua relação com a moda e a imagem pessoal.',
  testimonialsTitle: 'Resultados Reais de Mulheres Reais',
  testimonialsDescription: 'Veja o que dizem as mulheres que já descobriram seu estilo e transformaram sua imagem com os guias:',
  testimonialsQuote: 'Os guias da Gisele me deram a clareza que eu precisava para parar de me sentir perdida na frente do guarda-roupa. Agora sei o que me valoriza e me sinto muito mais confiante! - Maria S.',
  testimonialsConclusion: 'Estas são apenas algumas das centenas de mulheres que já transformaram sua relação com a moda e sua imagem pessoal.',
  testimonialsCtaText: 'Sim, Quero Essa Transformação!',
  guaranteeTitle: 'Sua Satisfação Garantida ou Seu Dinheiro de Volta!',
  guaranteeDescription: 'Estou tão confiante de que estes materiais vão transformar sua relação com a moda e sua imagem pessoal que ofereço uma garantia incondicional de 7 dias.',
  guaranteePrice: '[VALOR]',
  guaranteeConclusion: 'Este investimento em autoconhecimento e imagem pessoal vai muito além de roupas - é um investimento em você mesma.',
  guaranteeCtaText: 'Quero Descobrir Meu Estilo Agora!',
  faqTitle: 'Perguntas Frequentes',
  faqCtaText: 'Quero Transformar Minha Imagem Agora!',
  // URLs
  ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
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
  backgroundColor: '#fffaf7',
  textColor: '#432818',
  primaryColor: '#B89B7A',
  secondaryColor: '#aa6b5d',
  accentColor: '#6B4F43',
  fontSize: 16,
  spacing: 16,
  borderRadius: 16,
  shadowIntensity: 20,
  containerMaxWidth: 'max-w-5xl',
  sectionPadding: 'py-10 md:py-12',
  imageSize: 'max-w-xl',
  cardPadding: 'p-8',
  showActiveUsers: true,
  showCountdown: true,
  showLimitedSpots: true,
  showTestimonials: true,
  showGuarantee: true,
  showFaq: true,
  showBeforeAfter: true,
  showBonuses: true,
  showMentor: true,
  headerFixed: true,
  animationsEnabled: true,
  gradientBackground: true,
};
const JsonEditor: React.FC<{
  value: string;
  onChange: (jsonString: string, isValid: boolean, parsed?: any) => void;
}> = ({ value, onChange }) => {
  const [text, setText] = useState(value);
  useEffect(() => {
    setText(value);
  }, [value]);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    try {
      const parsed = JSON.parse(val);
      onChange(val, true, parsed);
    } catch {
      onChange(val, false);
    }
  };
  return (
    <textarea
      className="w-full font-mono text-xs border rounded p-2 min-h-[400px] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
      value={text}
      onChange={handleChange}
      spellCheck={false}
      style={{ fontFamily: 'monospace', minHeight: 400 }}
    />
  );
const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
const QuizOfferPageVisualEditor: React.FC = () => {
  const [editorData, setEditorData] = useState<VisualEditorData>(defaultData);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const debouncedSetEditorData = useRef(debounce((parsed: any) => setEditorData(parsed), 250)).current;
    // Carregar dados salvos do localStorage
    const savedData = safeLocalStorage.getItem('quizOfferPageEditor');
    if (savedData) {
      try {
        setEditorData({ ...defaultData, ...JSON.parse(savedData) });
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
      }
  }, []);
  const updateData = (key: keyof VisualEditorData, value: any) => {
    setEditorData(prev => ({ ...prev, [key]: value }));
  const saveData = () => {
    safeLocalStorage.setItem('quizOfferPageEditor', JSON.stringify(editorData));
    alert('Dados salvos com sucesso!');
  const resetData = () => {
    if (confirm('Tem certeza que deseja resetar todos os dados?')) {
      setEditorData(defaultData);
      safeLocalStorage.removeItem('quizOfferPageEditor');
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
          <Button size="sm" onClick={saveData}>
            <Save className="w-4 h-4 mr-2" />
            Salvar
      </div>
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        {!isPreviewMode && (
          <div className="w-96 bg-white border-r overflow-y-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="w-full grid grid-cols-5">
                <TabsTrigger value="content" className="flex-1">
                  <Type className="w-4 h-4 mr-1" />
                  Conteúdo
                </TabsTrigger>
                <TabsTrigger value="images" className="flex-1">
                  <Image className="w-4 h-4 mr-1" />
                  Imagens
                <TabsTrigger value="design" className="flex-1">
                  <Palette className="w-4 h-4 mr-1" />
                  Design
                <TabsTrigger value="layout" className="flex-1">
                  <Layout className="w-4 h-4 mr-1" />
                  Layout
                <TabsTrigger value="json" className="flex-1">
                  <span className="w-4 h-4 mr-1 font-mono">{'{}'}</span>
                  JSON
              </TabsList>
              <TabsContent value="content" className="p-4 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
                <Card className="p-4">
                  <h3 className="font-medium mb-4">Seção Hero</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="heroTitle">Título Principal</Label>
                      <Textarea
                        id="heroTitle"
                        value={editorData.heroTitle}
                        onChange={(e) => updateData('heroTitle', e.target.value)}
                        rows={2}
                        className="text-sm"
                      />
                    </div>
                      <Label htmlFor="heroSubtitle">Subtítulo</Label>
                        id="heroSubtitle"
                        value={editorData.heroSubtitle}
                        onChange={(e) => updateData('heroSubtitle', e.target.value)}
                        rows={3}
                      <Label htmlFor="heroCtaText">Texto do Botão</Label>
                      <Input
                        id="heroCtaText"
                        value={editorData.heroCtaText}
                        onChange={(e) => updateData('heroCtaText', e.target.value)}
                  </div>
                </Card>
                  <h3 className="font-medium mb-4">Seção Problema</h3>
                      <Label htmlFor="problemTitle">Título</Label>
                        id="problemTitle"
                        value={editorData.problemTitle}
                        onChange={(e) => updateData('problemTitle', e.target.value)}
                      <Label htmlFor="problemParagraph1">Parágrafo 1</Label>
                        id="problemParagraph1"
                        value={editorData.problemParagraph1}
                        onChange={(e) => updateData('problemParagraph1', e.target.value)}
                      <Label htmlFor="problemConclusion">Conclusão</Label>
                        id="problemConclusion"
                        value={editorData.problemConclusion}
                        onChange={(e) => updateData('problemConclusion', e.target.value)}
                  <h3 className="font-medium mb-4">Seção Solução</h3>
                      <Label htmlFor="solutionTitle">Título</Label>
                        id="solutionTitle"
                        value={editorData.solutionTitle}
                        onChange={(e) => updateData('solutionTitle', e.target.value)}
                      <Label htmlFor="solutionParagraph2">Descrição Principal</Label>
                        id="solutionParagraph2"
                        value={editorData.solutionParagraph2}
                        onChange={(e) => updateData('solutionParagraph2', e.target.value)}
                      <Label htmlFor="solutionCtaText">Texto do Botão</Label>
                        id="solutionCtaText"
                        value={editorData.solutionCtaText}
                        onChange={(e) => updateData('solutionCtaText', e.target.value)}
                  <h3 className="font-medium mb-4">Seção Benefícios</h3>
                      <Label htmlFor="benefitsTitle">Título</Label>
                        id="benefitsTitle"
                        value={editorData.benefitsTitle}
                        onChange={(e) => updateData('benefitsTitle', e.target.value)}
                      <Label htmlFor="benefitsMainDescription">Descrição Principal</Label>
                        id="benefitsMainDescription"
                        value={editorData.benefitsMainDescription}
                        onChange={(e) => updateData('benefitsMainDescription', e.target.value)}
                  <h3 className="font-medium mb-4">Bônus 1 - Peças-Chave</h3>
                      <Label htmlFor="bonus1Title">Título</Label>
                        id="bonus1Title"
                        value={editorData.bonus1Title}
                        onChange={(e) => updateData('bonus1Title', e.target.value)}
                      <Label htmlFor="bonus1Subtitle">Subtítulo</Label>
                        id="bonus1Subtitle"
                        value={editorData.bonus1Subtitle}
                        onChange={(e) => updateData('bonus1Subtitle', e.target.value)}
                      <Label htmlFor="bonus1Description">Descrição</Label>
                        id="bonus1Description"
                        value={editorData.bonus1Description}
                        onChange={(e) => updateData('bonus1Description', e.target.value)}
                  <h3 className="font-medium mb-4">Bônus 2 - Visagismo</h3>
                      <Label htmlFor="bonus2Title">Título</Label>
                        id="bonus2Title"
                        value={editorData.bonus2Title}
                        onChange={(e) => updateData('bonus2Title', e.target.value)}
                      <Label htmlFor="bonus2Subtitle">Subtítulo</Label>
                        id="bonus2Subtitle"
                        value={editorData.bonus2Subtitle}
                        onChange={(e) => updateData('bonus2Subtitle', e.target.value)}
                      <Label htmlFor="bonus2Description">Descrição</Label>
                        id="bonus2Description"
                        value={editorData.bonus2Description}
                        onChange={(e) => updateData('bonus2Description', e.target.value)}
                  <h3 className="font-medium mb-4">Mentora</h3>
                      <Label htmlFor="mentorTitle">Título da Seção</Label>
                        id="mentorTitle"
                        value={editorData.mentorTitle}
                        onChange={(e) => updateData('mentorTitle', e.target.value)}
                      <Label htmlFor="mentorName">Nome</Label>
                        id="mentorName"
                        value={editorData.mentorName}
                        onChange={(e) => updateData('mentorName', e.target.value)}
                      <Label htmlFor="mentorRole">Função/Cargo</Label>
                        id="mentorRole"
                        value={editorData.mentorRole}
                        onChange={(e) => updateData('mentorRole', e.target.value)}
                      <Label htmlFor="mentorDescription3">Descrição Principal</Label>
                        id="mentorDescription3"
                        value={editorData.mentorDescription3}
                        onChange={(e) => updateData('mentorDescription3', e.target.value)}
                  <h3 className="font-medium mb-4">Depoimentos</h3>
                      <Label htmlFor="testimonialsTitle">Título</Label>
                        id="testimonialsTitle"
                        value={editorData.testimonialsTitle}
                        onChange={(e) => updateData('testimonialsTitle', e.target.value)}
                      <Label htmlFor="testimonialsQuote">Depoimento Principal</Label>
                        id="testimonialsQuote"
                        value={editorData.testimonialsQuote}
                        onChange={(e) => updateData('testimonialsQuote', e.target.value)}
                      <Label htmlFor="testimonialsCtaText">Texto do Botão</Label>
                        id="testimonialsCtaText"
                        value={editorData.testimonialsCtaText}
                        onChange={(e) => updateData('testimonialsCtaText', e.target.value)}
                  <h3 className="font-medium mb-4">Garantia</h3>
                      <Label htmlFor="guaranteeTitle">Título</Label>
                        id="guaranteeTitle"
                        value={editorData.guaranteeTitle}
                        onChange={(e) => updateData('guaranteeTitle', e.target.value)}
                      <Label htmlFor="guaranteePrice">Preço</Label>
                        id="guaranteePrice"
                        value={editorData.guaranteePrice}
                        onChange={(e) => updateData('guaranteePrice', e.target.value)}
                      <Label htmlFor="guaranteeCtaText">Texto do Botão</Label>
                        id="guaranteeCtaText"
                        value={editorData.guaranteeCtaText}
                        onChange={(e) => updateData('guaranteeCtaText', e.target.value)}
                  <h3 className="font-medium mb-4">FAQ</h3>
                      <Label htmlFor="faqTitle">Título</Label>
                        id="faqTitle"
                        value={editorData.faqTitle}
                        onChange={(e) => updateData('faqTitle', e.target.value)}
                      <Label htmlFor="faqCtaText">Texto do Botão</Label>
                        id="faqCtaText"
                        value={editorData.faqCtaText}
                        onChange={(e) => updateData('faqCtaText', e.target.value)}
                  <h3 className="font-medium mb-4">URLs e Links</h3>
                      <Label htmlFor="ctaUrl">URL do Checkout</Label>
                        id="ctaUrl"
                        value={editorData.ctaUrl}
                        onChange={(e) => updateData('ctaUrl', e.target.value)}
              </TabsContent>
              <TabsContent value="images" className="p-4 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
                  <h3 className="font-medium mb-4">Imagens Hero</h3>
                      <Label htmlFor="heroImage">Logo Principal</Label>
                        id="heroImage"
                        value={editorData.heroImage}
                        onChange={(e) => updateData('heroImage', e.target.value)}
                      <Label htmlFor="heroComplementaryImage">Imagem Complementar</Label>
                        id="heroComplementaryImage"
                        value={editorData.heroComplementaryImage}
                        onChange={(e) => updateData('heroComplementaryImage', e.target.value)}
                  <h3 className="font-medium mb-4">Imagens das Seções</h3>
                      <Label htmlFor="problemImage">Problema</Label>
                        id="problemImage"
                        value={editorData.problemImage}
                        onChange={(e) => updateData('problemImage', e.target.value)}
                      <Label htmlFor="solutionImage">Solução (Quiz)</Label>
                        id="solutionImage"
                        value={editorData.solutionImage}
                        onChange={(e) => updateData('solutionImage', e.target.value)}
                      <Label htmlFor="benefitsImage">Benefícios</Label>
                        id="benefitsImage"
                        value={editorData.benefitsImage}
                        onChange={(e) => updateData('benefitsImage', e.target.value)}
                      <Label htmlFor="benefitsComplementaryImage">Benefícios Complementar</Label>
                        id="benefitsComplementaryImage"
                        value={editorData.benefitsComplementaryImage}
                        onChange={(e) => updateData('benefitsComplementaryImage', e.target.value)}
                  <h3 className="font-medium mb-4">Imagens Bônus</h3>
                      <Label htmlFor="bonus1Image">Bônus 1 Principal</Label>
                        id="bonus1Image"
                        value={editorData.bonus1Image}
                        onChange={(e) => updateData('bonus1Image', e.target.value)}
                      <Label htmlFor="bonus1ComplementaryImage">Bônus 1 Complementar</Label>
                        id="bonus1ComplementaryImage"
                        value={editorData.bonus1ComplementaryImage}
                        onChange={(e) => updateData('bonus1ComplementaryImage', e.target.value)}
                      <Label htmlFor="bonus2Image">Bônus 2 Principal</Label>
                        id="bonus2Image"
                        value={editorData.bonus2Image}
                        onChange={(e) => updateData('bonus2Image', e.target.value)}
                      <Label htmlFor="bonus2ComplementaryImage">Bônus 2 Complementar</Label>
                        id="bonus2ComplementaryImage"
                        value={editorData.bonus2ComplementaryImage}
                        onChange={(e) => updateData('bonus2ComplementaryImage', e.target.value)}
                  <h3 className="font-medium mb-4">Outras Imagens</h3>
                      <Label htmlFor="mentorImage">Mentora</Label>
                        id="mentorImage"
                        value={editorData.mentorImage}
                        onChange={(e) => updateData('mentorImage', e.target.value)}
                      <Label htmlFor="testimonialsImage">Depoimentos</Label>
                        id="testimonialsImage"
                        value={editorData.testimonialsImage}
                        onChange={(e) => updateData('testimonialsImage', e.target.value)}
                      <Label htmlFor="guaranteeImage">Garantia</Label>
                        id="guaranteeImage"
                        value={editorData.guaranteeImage}
                        onChange={(e) => updateData('guaranteeImage', e.target.value)}
                      <Label htmlFor="faqImage">FAQ</Label>
                        id="faqImage"
                        value={editorData.faqImage}
                        onChange={(e) => updateData('faqImage', e.target.value)}
              <TabsContent value="design" className="p-4 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
                  <h3 className="font-medium mb-4">Cores</h3>
                  <div className="space-y-4">
                      <Label>Cor de Fundo Principal</Label>
                      <div className="mt-2">
                        <ColorPicker
                          color={editorData.backgroundColor}
                          onChange={(color) => updateData('backgroundColor', color)}
                        />
                      </div>
                      <Label>Cor do Texto</Label>
                          color={editorData.textColor}
                          onChange={(color) => updateData('textColor', color)}
                      <Label>Cor Primária (Botões)</Label>
                          color={editorData.primaryColor}
                          onChange={(color) => updateData('primaryColor', color)}
                      <Label>Cor Secundária</Label>
                          color={editorData.secondaryColor}
                          onChange={(color) => updateData('secondaryColor', color)}
                      <Label>Cor de Destaque</Label>
                          color={editorData.accentColor}
                          onChange={(color) => updateData('accentColor', color)}
                  <h3 className="font-medium mb-4">Tipografia</h3>
                      <Label>Tamanho da Fonte Base: {editorData.fontSize}px</Label>
                      <Slider
                        value={[editorData.fontSize]}
                        onValueChange={(value) => updateData('fontSize', value[0])}
                        min={12}
                        max={24}
                        step={1}
                        className="mt-2"
                  <h3 className="font-medium mb-4">Bordas e Sombras</h3>
                      <Label>Raio da Borda: {editorData.borderRadius}px</Label>
                        value={[editorData.borderRadius]}
                        onValueChange={(value) => updateData('borderRadius', value[0])}
                        min={0}
                        max={32}
                        step={2}
                      <Label>Intensidade da Sombra: {editorData.shadowIntensity}px</Label>
                        value={[editorData.shadowIntensity]}
                        onValueChange={(value) => updateData('shadowIntensity', value[0])}
                        max={40}
                  <h3 className="font-medium mb-4">Efeitos Visuais</h3>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="gradientBackground">Fundo Gradiente</Label>
                      <Switch
                        id="gradientBackground"
                        checked={editorData.gradientBackground}
                        onCheckedChange={(checked) => updateData('gradientBackground', checked)}
                      <Label htmlFor="animationsEnabled">Animações</Label>
                        id="animationsEnabled"
                        checked={editorData.animationsEnabled}
                        onCheckedChange={(checked) => updateData('animationsEnabled', checked)}
              <TabsContent value="layout" className="p-4 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
                {/* Controles globais já existentes */}
                  <h3 className="font-medium mb-4">Espaçamento</h3>
                      <Label>Espaçamento Base: {editorData.spacing}px</Label>
                        value={[editorData.spacing]}
                        onValueChange={(value) => updateData('spacing', value[0])}
                        min={8}
                        max={48}
                      <Label htmlFor="sectionPadding">Padding das Seções</Label>
                      <select
                        id="sectionPadding"
                        value={editorData.sectionPadding}
                        onChange={(e) => updateData('sectionPadding', e.target.value)}
                        className="w-full mt-2 p-2 border rounded-md text-sm"
                      >
                        <option value="py-6 md:py-8">Pequeno (6/8)</option>
                        <option value="py-8 md:py-10">Médio (8/10)</option>
                        <option value="py-10 md:py-12">Grande (10/12)</option>
                        <option value="py-12 md:py-16">Extra Grande (12/16)</option>
                      </select>
                      <Label htmlFor="cardPadding">Padding dos Cards</Label>
                        id="cardPadding"
                        value={editorData.cardPadding}
                        onChange={(e) => updateData('cardPadding', e.target.value)}
                        <option value="p-4">Pequeno (p-4)</option>
                        <option value="p-6">Médio (p-6)</option>
                        <option value="p-8">Grande (p-8)</option>
                        <option value="p-10">Extra Grande (p-10)</option>
                  <h3 className="font-medium mb-4">Container</h3>
                      <Label htmlFor="containerMaxWidth">Largura Máxima</Label>
                        id="containerMaxWidth"
                        value={editorData.containerMaxWidth}
                        onChange={(e) => updateData('containerMaxWidth', e.target.value)}
                        <option value="max-w-4xl">Pequeno (max-w-4xl)</option>
                        <option value="max-w-5xl">Médio (max-w-5xl)</option>
                        <option value="max-w-6xl">Grande (max-w-6xl)</option>
                        <option value="max-w-7xl">Extra Grande (max-w-7xl)</option>
                      <Label htmlFor="imageSize">Tamanho das Imagens</Label>
                        id="imageSize"
                        value={editorData.imageSize}
                        onChange={(e) => updateData('imageSize', e.target.value)}
                        <option value="max-w-sm">Pequeno (max-w-sm)</option>
                        <option value="max-w-md">Médio (max-w-md)</option>
                        <option value="max-w-lg">Grande (max-w-lg)</option>
                        <option value="max-w-xl">Extra Grande (max-w-xl)</option>
                  <h3 className="font-medium mb-4">Padding/Margem por Seção</h3>
                      <Label htmlFor="heroPadding">Hero</Label>
                        id="heroPadding"
                        value={editorData.heroPadding || ''}
                        onChange={e => updateData('heroPadding', e.target.value)}
                        placeholder="Ex: py-8 md:py-12"
                      <Label htmlFor="problemPadding">Problema</Label>
                        id="problemPadding"
                        value={editorData.problemPadding || ''}
                        onChange={e => updateData('problemPadding', e.target.value)}
                      <Label htmlFor="solutionPadding">Solução</Label>
                        id="solutionPadding"
                        value={editorData.solutionPadding || ''}
                        onChange={e => updateData('solutionPadding', e.target.value)}
                      <Label htmlFor="benefitsPadding">Benefícios</Label>
                        id="benefitsPadding"
                        value={editorData.benefitsPadding || ''}
                        onChange={e => updateData('benefitsPadding', e.target.value)}
                      <Label htmlFor="bonus1Padding">Bônus 1</Label>
                        id="bonus1Padding"
                        value={editorData.bonus1Padding || ''}
                        onChange={e => updateData('bonus1Padding', e.target.value)}
                      <Label htmlFor="bonus2Padding">Bônus 2</Label>
                        id="bonus2Padding"
                        value={editorData.bonus2Padding || ''}
                        onChange={e => updateData('bonus2Padding', e.target.value)}
                      <Label htmlFor="mentorPadding">Mentora</Label>
                        id="mentorPadding"
                        value={editorData.mentorPadding || ''}
                        onChange={e => updateData('mentorPadding', e.target.value)}
                      <Label htmlFor="testimonialsPadding">Depoimentos</Label>
                        id="testimonialsPadding"
                        value={editorData.testimonialsPadding || ''}
                        onChange={e => updateData('testimonialsPadding', e.target.value)}
                      <Label htmlFor="guaranteePadding">Garantia</Label>
                        id="guaranteePadding"
                        value={editorData.guaranteePadding || ''}
                        onChange={e => updateData('guaranteePadding', e.target.value)}
                      <Label htmlFor="faqPadding">FAQ</Label>
                        id="faqPadding"
                        value={editorData.faqPadding || ''}
                        onChange={e => updateData('faqPadding', e.target.value)}
              <TabsContent value="json" className="p-4 max-h-[calc(100vh-120px)] overflow-y-auto">
                  <h3 className="font-medium mb-4">Edição Avançada via JSON</h3>
                  <JsonEditor
                    value={JSON.stringify(editorData, null, 2)}
                    onChange={(jsonString, isValid, parsed) => {
                      if (isValid && parsed) {
                        debouncedSetEditorData(parsed);
                        setJsonError(null);
                      } else {
                        setJsonError('JSON inválido');
                      }
                    }}
                  />
                  {jsonError && (
                    <div className="mt-2 text-red-600 text-sm">{jsonError}</div>
                  )}
                  <div className="mt-2 text-xs text-gray-500">Edite o JSON para alterar rapidamente qualquer campo. Alterações válidas são aplicadas imediatamente no preview.</div>
            </Tabs>
          </div>
        )}
        {/* Preview Panel */}
        {isPreviewMode && (
          <div className="flex-1 p-4 overflow-y-auto">
            <QuizOfferPageEditable data={editorData} />
    </div>
export default QuizOfferPageVisualEditor;
