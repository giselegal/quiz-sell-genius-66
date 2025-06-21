import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  QUIZ_TEMPLATES as REAL_QUIZ_TEMPLATES,
  generateRealQuestionTemplates,
  generateStrategicQuestionTemplates,
} from "@/data/realQuizTemplates";
import {
  Save,
  Trash2,
  Copy,
  Monitor,
  Smartphone,
  Tablet,
  ChevronUp,
  ChevronDown,
  Type,
  Image as ImageIcon,
  MousePointer,
  Layout,
  GripVertical,
  Eye,
  Plus,
  ArrowLeft,
  ArrowRight,
  Play,
  Download,
  Video,
  Star,
  DollarSign,
  Clock,
  Shield,
  Gift,
  HelpCircle,
  Users,
  Settings,
  Globe,
  BarChart3,
  Target,
  Link,
} from "lucide-react";

// Interfaces
interface QuizConfig {
  domain: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  pixel: {
    facebookPixelId: string;
    googleAnalyticsId: string;
  };
  utm: {
    source: string;
    medium: string;
    campaign: string;
    content: string;
    term: string;
  };
  scoring: {
    normalQuestionPoints: number;
    strategicQuestionPoints: number;
    autoAdvanceNormal: boolean;
    autoAdvanceStrategic: boolean;
    normalSelectionLimit: number;
    strategicSelectionLimit: number;
  };
  results: {
    showUserName: boolean;
    showPrimaryStyle: boolean;
    showSecondaryStyles: boolean;
    showPercentages: boolean;
    showStyleImages: boolean;
    showStyleGuides: boolean;
  };
}

// CSS simplificado
const SIMPLE_CSS = `
  .simple-editor {
    font-family: 'Inter', sans-serif;
  }
  
  .component-item {
    cursor: grab;
    transition: all 0.2s ease;
    border: 2px dashed transparent;
  }
  
  .component-item:hover {
    background: #e2e8f0;
    border-color: #3b82f6;
    transform: translateY(-1px);
  }
  
  .drop-zone {
    min-height: 40px;
    border: 2px dashed #cbd5e1;
    border-radius: 8px;
    margin: 8px 0;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    font-size: 0.875rem;
  }
  
  .drop-zone.drag-over {
    border-color: #3b82f6;
    background: rgba(59, 130, 246, 0.05);
  }
  
  .component-wrapper {
    position: relative;
    margin: 8px 0;
    border: 2px solid transparent;
    border-radius: 8px;
    padding: 8px;
    transition: all 0.2s ease;
  }
  
  .component-wrapper:hover {
    border-color: #e2e8f0;
  }
  
  .component-wrapper.selected {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .quiz-preview {
    background: linear-gradient(135deg, #FFFBF7 0%, #FDF8F3 100%);
    min-height: 100vh;
    padding: 1rem;
  }
`;

// Interfaces completas do funil
interface SimpleComponent {
  id: string;
  type:
    | "title"
    | "subtitle"
    | "text"
    | "image"
    | "button"
    | "spacer"
    | "input"
    | "options"
    | "progress"
    | "logo"
    | "video"
    | "testimonial"
    | "price"
    | "countdown"
    | "guarantee"
    | "bonus"
    | "faq"
    | "social-proof";
  data: {
    text?: string;
    src?: string;
    alt?: string;
    height?: number;
    label?: string;
    placeholder?: string;
    required?: boolean;
    options?: QuizOption[];
    multiSelect?: boolean;
    hasImages?: boolean;
    progressValue?: number;
    videoUrl?: string;
    price?: string;
    originalPrice?: string;
    installments?: string;
    currency?: string;
    endDate?: string;
    title?: string;
    name?: string;
    role?: string;
    avatar?: string;
    testimonialAuthor?: string;
    testimonialRole?: string;
    testimonialImage?: string;
    guaranteeDays?: number;
    bonuses?: BonusItem[];
    bonusItems?: BonusItem[];
    faqs?: FaqItem[];
    faqItems?: FaqItem[];
    customerCount?: string;
    rating?: string;
    reviewCount?: string;
    socialProofCount?: number;
    socialProofText?: string;
  };
  style: {
    fontSize?: string;
    fontWeight?: string;
    textAlign?: "left" | "center" | "right";
    color?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
  };
}

interface QuizOption {
  id: string;
  text: string;
  image?: string;
  value: string;
  category?: string;
}

interface BonusItem {
  id: string;
  title: string;
  value: string;
  description?: string;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface SimplePage {
  id: string;
  title: string;
  type:
    | "intro"
    | "question"
    | "loading"
    | "result"
    | "offer"
    | "sales"
    | "checkout"
    | "upsell"
    | "thankyou"
    | "webinar"
    | "launch";
  progress: number;
  showHeader: boolean;
  showProgress: boolean;
  components: SimpleComponent[];
}

interface QuizFunnel {
  id: string;
  name: string;
  pages: SimplePage[];
}

import { LucideIcon } from "lucide-react";

interface ComponentType {
  type: SimpleComponent["type"];
  name: string;
  icon: LucideIcon;
  description: string;
}

// Componentes disponíveis - TODOS do funil + PÁGINAS DE VENDA
const COMPONENTS: ComponentType[] = [
  // Componentes básicos
  {
    type: "logo",
    name: "Logo",
    icon: ImageIcon,
    description: "Logo da marca",
  },
  {
    type: "progress",
    name: "Progresso",
    icon: Layout,
    description: "Barra de progresso",
  },
  {
    type: "title",
    name: "Título",
    icon: Type,
    description: "Título principal",
  },
  {
    type: "subtitle",
    name: "Subtítulo",
    icon: Type,
    description: "Texto secundário",
  },
  {
    type: "text",
    name: "Texto",
    icon: Type,
    description: "Parágrafo normal",
  },
  {
    type: "image",
    name: "Imagem",
    icon: ImageIcon,
    description: "Imagem responsiva",
  },
  {
    type: "input",
    name: "Campo",
    icon: Type,
    description: "Campo de entrada",
  },
  {
    type: "options",
    name: "Opções",
    icon: Layout,
    description: "Lista de opções",
  },
  {
    type: "button",
    name: "Botão",
    icon: MousePointer,
    description: "Botão de ação",
  },
  {
    type: "spacer",
    name: "Espaço",
    icon: Layout,
    description: "Espaçamento vertical",
  },
  // Componentes de venda
  {
    type: "video",
    name: "Vídeo",
    icon: Video,
    description: "Player de vídeo",
  },
  {
    type: "testimonial",
    name: "Depoimento",
    icon: Star,
    description: "Depoimento de cliente",
  },
  {
    type: "price",
    name: "Preço",
    icon: DollarSign,
    description: "Exibição de preço",
  },
  {
    type: "countdown",
    name: "Countdown",
    icon: Clock,
    description: "Timer de urgência",
  },
  {
    type: "guarantee",
    name: "Garantia",
    icon: Shield,
    description: "Selo de garantia",
  },
  {
    type: "bonus",
    name: "Bônus",
    icon: Gift,
    description: "Lista de bônus",
  },
  {
    type: "faq",
    name: "FAQ",
    icon: HelpCircle,
    description: "Perguntas frequentes",
  },
  {
    type: "social-proof",
    name: "Prova Social",
    icon: Users,
    description: "Contador de vendas",
  },
];

// Templates de páginas do funil completo - TODAS AS ETAPAS REAIS DO QUIZ
const QUIZ_TEMPLATES = {
  // 1. PÁGINA DE INTRODUÇÃO
  intro: {
    id: "intro-1",
    title: "Página de Introdução",
    type: "intro" as const,
    progress: 0,
    showHeader: true,
    showProgress: false,
    components: [
      {
        id: "logo-1",
        type: "logo" as const,
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
          alt: "Logo Gisele Galvão",
        },
        style: {},
      },
      {
        id: "title-1",
        type: "title" as const,
        data: { text: "Teste de Estilo Pessoal" },
        style: {
          fontSize: "2.5rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "image-1",
        type: "image" as const,
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp",
          alt: "Imagem de introdução",
        },
        style: {},
      },
      {
        id: "subtitle-1",
        type: "subtitle" as const,
        data: {
          text: "Chega de um guarda-roupa lotado e da sensação de que nada combina com Você.",
        },
        style: {
          fontSize: "1.25rem",
          textAlign: "center" as const,
          color: "#6B4F43",
        },
      },
      {
        id: "input-1",
        type: "input" as const,
        data: {
          label: "NOME",
          placeholder: "Digite seu nome aqui...",
          required: true,
        },
        style: {},
      },
      {
        id: "button-1",
        type: "button" as const,
        data: { text: "COMEÇAR AGORA" },
        style: {},
      },
    ],
  },

  // 2. QUESTÃO 1: TIPO DE ROUPA FAVORITA (COMPLETA - 8 OPÇÕES)
  question1: {
    id: "question-1",
    title: "Questão 1: Tipo de Roupa Favorita",
    type: "question" as const,
    progress: 10,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-1",
        type: "progress" as const,
        data: { progressValue: 10 },
        style: {},
      },
      {
        id: "title-2",
        type: "title" as const,
        data: { text: "QUAL O SEU TIPO DE ROUPA FAVORITA?" },
        style: {
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "subtitle-q1",
        type: "subtitle" as const,
        data: { text: "Escolha até 3 opções que mais combinam com você" },
        style: {
          fontSize: "1rem",
          textAlign: "center" as const,
          color: "#6B4F43",
        },
      },
      {
        id: "options-1",
        type: "options" as const,
        data: {
          hasImages: true,
          multiSelect: true,
          options: [
            {
              id: "opt-1",
              text: "Conforto, leveza e praticidade no vestir",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/11_hqmr8l.webp",
              value: "Natural",
              category: "Natural",
            },
            {
              id: "opt-2",
              text: "Discrição, caimento clássico e sobriedade",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp",
              value: "Clássico",
              category: "Clássico",
            },
            {
              id: "opt-3",
              text: "Praticidade com um toque de estilo atual",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/4_snhaym.webp",
              value: "Contemporâneo",
              category: "Contemporâneo",
            },
            {
              id: "opt-4",
              text: "Elegância refinada, moderna e sem exageros",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp",
              value: "Elegante",
              category: "Elegante",
            },
            {
              id: "opt-5",
              text: "Delicadeza em tecidos suaves e fluidos",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/15_xezvcy.webp",
              value: "Romântico",
              category: "Romântico",
            },
            {
              id: "opt-6",
              text: "Sensualidade com destaque para o corpo",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735316/16_mpqpew.webp",
              value: "Sexy",
              category: "Sexy",
            },
            {
              id: "opt-7",
              text: "Impacto visual com peças estruturadas e assimétricas",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735319/17_m5ogub.webp",
              value: "Dramático",
              category: "Dramático",
            },
            {
              id: "opt-8",
              text: "Mix criativo com formas ousadas e originais",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/18_j8ipfb.webp",
              value: "Criativo",
              category: "Criativo",
            },
          ],
        },
        style: {},
      },
    ],
  },

  // 3. QUESTÃO 2: PERSONALIDADE (COMPLETA - 8 OPÇÕES)
  question2: {
    id: "question-2",
    title: "Questão 2: Personalidade",
    type: "question" as const,
    progress: 20,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-2",
        type: "progress" as const,
        data: { progressValue: 20 },
        style: {},
      },
      {
        id: "title-3",
        type: "title" as const,
        data: { text: "RESUMA A SUA PERSONALIDADE:" },
        style: {
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "subtitle-q2",
        type: "subtitle" as const,
        data: { text: "Escolha até 3 opções que mais combinam com você" },
        style: {
          fontSize: "1rem",
          textAlign: "center" as const,
          color: "#6B4F43",
        },
      },
      {
        id: "options-2",
        type: "options" as const,
        data: {
          hasImages: false,
          multiSelect: true,
          options: [
            {
              id: "pers-1",
              text: "Informal, espontânea, alegre, essencialista",
              value: "Natural",
              category: "Natural",
            },
            {
              id: "pers-2",
              text: "Conservadora, séria, organizada",
              value: "Clássico",
              category: "Clássico",
            },
            {
              id: "pers-3",
              text: "Informada, ativa, prática",
              value: "Contemporâneo",
              category: "Contemporâneo",
            },
            {
              id: "pers-4",
              text: "Exigente, sofisticada, seletiva",
              value: "Elegante",
              category: "Elegante",
            },
            {
              id: "pers-5",
              text: "Feminina, meiga, delicada, sensível",
              value: "Romântico",
              category: "Romântico",
            },
            {
              id: "pers-6",
              text: "Glamorosa, vaidosa, sensual",
              value: "Sexy",
              category: "Sexy",
            },
            {
              id: "pers-7",
              text: "Cosmopolita, moderna e audaciosa",
              value: "Dramático",
              category: "Dramático",
            },
            {
              id: "pers-8",
              text: "Exótica, aventureira, livre",
              value: "Criativo",
              category: "Criativo",
            },
          ],
        },
        style: {},
      },
    ],
  },

  // 3. QUESTÃO 3: VISUAL DE IDENTIFICAÇÃO (COMPLETA - 8 OPÇÕES)
  question3: {
    id: "question-3",
    title: "Questão 3: Visual de Identificação",
    type: "question" as const,
    progress: 30,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-3",
        type: "progress" as const,
        data: { progressValue: 30 },
        style: {},
      },
      {
        id: "title-q3",
        type: "title" as const,
        data: { text: "QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?" },
        style: {
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "subtitle-q3",
        type: "subtitle" as const,
        data: { text: "Escolha até 3 opções que mais combinam com você" },
        style: {
          fontSize: "1rem",
          textAlign: "center" as const,
          color: "#6B4F43",
        },
      },
      {
        id: "options-3",
        type: "options" as const,
        data: {
          hasImages: true,
          multiSelect: true,
          options: [
            {
              id: "visual-1",
              text: "Visual leve, despojado e natural",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp",
              value: "Natural",
              category: "Natural",
            },
            {
              id: "visual-2",
              text: "Visual clássico e tradicional",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/3_asaunw.webp",
              value: "Clássico",
              category: "Clássico",
            },
            {
              id: "visual-3",
              text: "Visual casual com toque atual",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp",
              value: "Contemporâneo",
              category: "Contemporâneo",
            },
            {
              id: "visual-4",
              text: "Visual refinado e imponente",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/5_dhrgpf.webp",
              value: "Elegante",
              category: "Elegante",
            },
            {
              id: "visual-5",
              text: "Visual romântico, feminino e delicado",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/6_gnoxfg.webp",
              value: "Romântico",
              category: "Romântico",
            },
            {
              id: "visual-6",
              text: "Visual sensual, com saia justa e decote",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735327/7_ynez1z.webp",
              value: "Sexy",
              category: "Sexy",
            },
            {
              id: "visual-7",
              text: "Visual marcante e urbano (jeans + jaqueta)",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/8_yqu3hw.webp",
              value: "Dramático",
              category: "Dramático",
            },
            {
              id: "visual-8",
              text: "Visual criativo, colorido e ousado",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/9_x6so6a.webp",
              value: "Criativo",
              category: "Criativo",
            },
          ],
        },
        style: {},
      },
    ],
  },

  // 4. QUESTÃO 4: OBJETIVOS E PRIORIDADES (COMPLETA - 8 OPÇÕES)
  question4: {
    id: "question-4",
    title: "Questão 4: Objetivos e Prioridades",
    type: "question" as const,
    progress: 35,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-4",
        type: "progress" as const,
        data: { progressValue: 35 },
        style: {},
      },
      {
        id: "title-q4",
        type: "title" as const,
        data: { text: "QUANDO VOCÊ SE VESTE, VOCÊ PRIORIZA:" },
        style: {
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "subtitle-q4",
        type: "subtitle" as const,
        data: { text: "Escolha até 3 opções que mais combinam com você" },
        style: {
          fontSize: "1rem",
          textAlign: "center" as const,
          color: "#6B4F43",
        },
      },
      {
        id: "options-4",
        type: "options" as const,
        data: {
          hasImages: false,
          multiSelect: true,
          options: [
            {
              id: "obj-1",
              text: "Conforto e praticidade acima de tudo",
              value: "Natural",
              category: "Natural",
            },
            {
              id: "obj-2",
              text: "Elegância discreta e sofisticação",
              value: "Clássico",
              category: "Clássico",
            },
            {
              id: "obj-3",
              text: "Estar na moda sem perder a funcionalidade",
              value: "Contemporâneo",
              category: "Contemporâneo",
            },
            {
              id: "obj-4",
              text: "Impeccabilidade e refinamento",
              value: "Elegante",
              category: "Elegante",
            },
            {
              id: "obj-5",
              text: "Feminilidade e delicadeza",
              value: "Romântico",
              category: "Romântico",
            },
            {
              id: "obj-6",
              text: "Sedução e poder de atração",
              value: "Sexy",
              category: "Sexy",
            },
            {
              id: "obj-7",
              text: "Impacto visual e presença marcante",
              value: "Dramático",
              category: "Dramático",
            },
            {
              id: "obj-8",
              text: "Originalidade e expressão pessoal",
              value: "Criativo",
              category: "Criativo",
            },
          ],
        },
        style: {},
      },
    ],
  },

  // 5. QUESTÃO 5: PEÇAS FAVORITAS (COMPLETA - 8 OPÇÕES)
  question5: {
    id: "question-5",
    title: "Questão 5: Peças Favoritas",
    type: "question" as const,
    progress: 40,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-5",
        type: "progress" as const,
        data: { progressValue: 40 },
        style: {},
      },
      {
        id: "title-q5",
        type: "title" as const,
        data: { text: "QUAL É SUA PEÇA FAVORITA NO GUARDA-ROUPA?" },
        style: {
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "subtitle-q5",
        type: "subtitle" as const,
        data: { text: "Escolha até 3 opções que mais combinam com você" },
        style: {
          fontSize: "1rem",
          textAlign: "center" as const,
          color: "#6B4F43",
        },
      },
      {
        id: "options-5",
        type: "options" as const,
        data: {
          hasImages: false,
          multiSelect: true,
          options: [
            {
              id: "peca-1",
              text: "Jeans confortável e camiseta básica",
              value: "Natural",
              category: "Natural",
            },
            {
              id: "peca-2",
              text: "Blazer bem cortado e calça social",
              value: "Clássico",
              category: "Clássico",
            },
            {
              id: "peca-3",
              text: "Peças versáteis que funcionam dia e noite",
              value: "Contemporâneo",
              category: "Contemporâneo",
            },
            {
              id: "peca-4",
              text: "Vestido elegante de corte impecável",
              value: "Elegante",
              category: "Elegante",
            },
            {
              id: "peca-5",
              text: "Vestido fluido com detalhes delicados",
              value: "Romântico",
              category: "Romântico",
            },
            {
              id: "peca-6",
              text: "Vestido justo que valoriza as curvas",
              value: "Sexy",
              category: "Sexy",
            },
            {
              id: "peca-7",
              text: "Peças estruturadas com linhas marcantes",
              value: "Dramático",
              category: "Dramático",
            },
            {
              id: "peca-8",
              text: "Peças únicas e cheias de personalidade",
              value: "Criativo",
              category: "Criativo",
            },
          ],
        },
        style: {},
      },
    ],
  },

  // 6. QUESTÃO 6: CORES PREFERIDAS (COMPLETA - 8 OPÇÕES)
  question6: {
    id: "question-6",
    title: "Questão 6: Cores Preferidas",
    type: "question" as const,
    progress: 45,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-6",
        type: "progress" as const,
        data: { progressValue: 45 },
        style: {},
      },
      {
        id: "title-q6",
        type: "title" as const,
        data: { text: "QUAL PALETA DE CORES VOCÊ MAIS GOSTA?" },
        style: {
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "subtitle-q6",
        type: "subtitle" as const,
        data: { text: "Escolha até 3 opções que mais combinam com você" },
        style: {
          fontSize: "1rem",
          textAlign: "center" as const,
          color: "#6B4F43",
        },
      },
      {
        id: "options-6",
        type: "options" as const,
        data: {
          hasImages: false,
          multiSelect: true,
          options: [
            {
              id: "cor-1",
              text: "Tons terrosos e neutros",
              value: "Natural",
              category: "Natural",
            },
            {
              id: "cor-2",
              text: "Azul marinho, preto e tons sóbrios",
              value: "Clássico",
              category: "Clássico",
            },
            {
              id: "cor-3",
              text: "Cores neutras com um toque de cor",
              value: "Contemporâneo",
              category: "Contemporâneo",
            },
            {
              id: "cor-4",
              text: "Tons monocromáticos elegantes",
              value: "Elegante",
              category: "Elegante",
            },
            {
              id: "cor-5",
              text: "Rosa, lavanda e tons suaves",
              value: "Romântico",
              category: "Romântico",
            },
            {
              id: "cor-6",
              text: "Vermelho, vinho e tons sensuais",
              value: "Sexy",
              category: "Sexy",
            },
            {
              id: "cor-7",
              text: "Preto e branco com contrastes marcantes",
              value: "Dramático",
              category: "Dramático",
            },
            {
              id: "cor-8",
              text: "Mistura ousada de cores vibrantes",
              value: "Criativo",
              category: "Criativo",
            },
          ],
        },
        style: {},
      },
    ],
  },

  // 7. QUESTÃO 7: ESTAMPAS (COMPLETA - 8 OPÇÕES)
  question7: {
    id: "question-7",
    title: "Questão 7: Estampas",
    type: "question" as const,
    progress: 50,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-7",
        type: "progress" as const,
        data: { progressValue: 50 },
        style: {},
      },
      {
        id: "title-q7",
        type: "title" as const,
        data: { text: "QUAL TIPO DE ESTAMPA VOCÊ PREFERE?" },
        style: {
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "subtitle-q7",
        type: "subtitle" as const,
        data: { text: "Escolha até 3 opções que mais combinam com você" },
        style: {
          fontSize: "1rem",
          textAlign: "center" as const,
          color: "#6B4F43",
        },
      },
      {
        id: "options-7",
        type: "options" as const,
        data: {
          hasImages: false,
          multiSelect: true,
          options: [
            {
              id: "est-1",
              text: "Prefiro peças lisas e sem estampas",
              value: "Natural",
              category: "Natural",
            },
            {
              id: "est-2",
              text: "Listras discretas e padrões geométricos",
              value: "Clássico",
              category: "Clássico",
            },
            {
              id: "est-3",
              text: "Estampas modernas e minimalistas",
              value: "Contemporâneo",
              category: "Contemporâneo",
            },
            {
              id: "est-4",
              text: "Estampas sofisticadas e elegantes",
              value: "Elegante",
              category: "Elegante",
            },
            {
              id: "est-5",
              text: "Estampas florais e delicadas",
              value: "Romântico",
              category: "Romântico",
            },
            {
              id: "est-6",
              text: "Animal print e estampas sensuais",
              value: "Sexy",
              category: "Sexy",
            },
            {
              id: "est-7",
              text: "Padrões gráficos e geométricos bold",
              value: "Dramático",
              category: "Dramático",
            },
            {
              id: "est-8",
              text: "Estampas étnicas e mistura de padrões",
              value: "Criativo",
              category: "Criativo",
            },
          ],
        },
        style: {},
      },
    ],
  },

  // 8. QUESTÃO 8: OCASIÕES (COMPLETA - 8 OPÇÕES)
  question8: {
    id: "question-8",
    title: "Questão 8: Ocasiões",
    type: "question" as const,
    progress: 55,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-8",
        type: "progress" as const,
        data: { progressValue: 55 },
        style: {},
      },
      {
        id: "title-q8",
        type: "title" as const,
        data: { text: "PARA QUE OCASIÃO VOCÊ MAIS COMPRA ROUPAS?" },
        style: {
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "subtitle-q8",
        type: "subtitle" as const,
        data: { text: "Escolha até 3 opções que mais combinam com você" },
        style: {
          fontSize: "1rem",
          textAlign: "center" as const,
          color: "#6B4F43",
        },
      },
      {
        id: "options-8",
        type: "options" as const,
        data: {
          hasImages: false,
          multiSelect: true,
          options: [
            {
              id: "oca-1",
              text: "Dia a dia e momentos casuais",
              value: "Natural",
              category: "Natural",
            },
            {
              id: "oca-2",
              text: "Trabalho e reuniões importantes",
              value: "Clássico",
              category: "Clássico",
            },
            {
              id: "oca-3",
              text: "Eventos sociais e encontros",
              value: "Contemporâneo",
              category: "Contemporâneo",
            },
            {
              id: "oca-4",
              text: "Jantares elegantes e eventos formais",
              value: "Elegante",
              category: "Elegante",
            },
            {
              id: "oca-5",
              text: "Encontros românticos e datas especiais",
              value: "Romântico",
              category: "Romântico",
            },
            {
              id: "oca-6",
              text: "Festas e baladas",
              value: "Sexy",
              category: "Sexy",
            },
            {
              id: "oca-7",
              text: "Eventos de networking e apresentações",
              value: "Dramático",
              category: "Dramático",
            },
            {
              id: "oca-8",
              text: "Eventos artísticos e culturais",
              value: "Criativo",
              category: "Criativo",
            },
          ],
        },
        style: {},
      },
    ],
  },

  // 9. QUESTÃO 9: INSPIRAÇÕES (COMPLETA - 8 OPÇÕES)
  question9: {
    id: "question-9",
    title: "Questão 9: Inspirações",
    type: "question" as const,
    progress: 60,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-9",
        type: "progress" as const,
        data: { progressValue: 60 },
        style: {},
      },
      {
        id: "title-q9",
        type: "title" as const,
        data: { text: "QUAL CELEBRIDADE INSPIRA SEU ESTILO?" },
        style: {
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "subtitle-q9",
        type: "subtitle" as const,
        data: { text: "Escolha até 3 opções que mais combinam com você" },
        style: {
          fontSize: "1rem",
          textAlign: "center" as const,
          color: "#6B4F43",
        },
      },
      {
        id: "options-9",
        type: "options" as const,
        data: {
          hasImages: false,
          multiSelect: true,
          options: [
            {
              id: "celeb-1",
              text: "Jennifer Aniston (estilo natural e despojado)",
              value: "Natural",
              category: "Natural",
            },
            {
              id: "celeb-2",
              text: "Kate Middleton (elegância clássica)",
              value: "Clássico",
              category: "Clássico",
            },
            {
              id: "celeb-3",
              text: "Olivia Palermo (contemporâneo e versátil)",
              value: "Contemporâneo",
              category: "Contemporâneo",
            },
            {
              id: "celeb-4",
              text: "Cate Blanchett (sofisticação refinada)",
              value: "Elegante",
              category: "Elegante",
            },
            {
              id: "celeb-5",
              text: "Anne Hathaway (feminina e delicada)",
              value: "Romântico",
              category: "Romântico",
            },
            {
              id: "celeb-6",
              text: "Scarlett Johansson (sensual e marcante)",
              value: "Sexy",
              category: "Sexy",
            },
            {
              id: "celeb-7",
              text: "Tilda Swinton (dramática e impactante)",
              value: "Dramático",
              category: "Dramático",
            },
            {
              id: "celeb-8",
              text: "Helena Bonham Carter (criativa e única)",
              value: "Criativo",
              category: "Criativo",
            },
          ],
        },
        style: {},
      },
    ],
  },

  // 10. QUESTÃO 10: ATITUDE (COMPLETA - 8 OPÇÕES)
  question10: {
    id: "question-10",
    title: "Questão 10: Atitude",
    type: "question" as const,
    progress: 65,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-10",
        type: "progress" as const,
        data: { progressValue: 65 },
        style: {},
      },
      {
        id: "title-q10",
        type: "title" as const,
        data: { text: "COMO VOCÊ QUER QUE AS PESSOAS TE VEJAM?" },
        style: {
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "subtitle-q10",
        type: "subtitle" as const,
        data: { text: "Escolha até 3 opções que mais combinam com você" },
        style: {
          fontSize: "1rem",
          textAlign: "center" as const,
          color: "#6B4F43",
        },
      },
      {
        id: "options-10",
        type: "options" as const,
        data: {
          hasImages: false,
          multiSelect: true,
          options: [
            {
              id: "att-1",
              text: "Autêntica e confiável",
              value: "Natural",
              category: "Natural",
            },
            {
              id: "att-2",
              text: "Respeitável e profissional",
              value: "Clássico",
              category: "Clássico",
            },
            {
              id: "att-3",
              text: "Moderna e bem-informada",
              value: "Contemporâneo",
              category: "Contemporâneo",
            },
            {
              id: "att-4",
              text: "Sofisticada e bem-sucedida",
              value: "Elegante",
              category: "Elegante",
            },
            {
              id: "att-5",
              text: "Doce e encantadora",
              value: "Romântico",
              category: "Romântico",
            },
            {
              id: "att-6",
              text: "Confiante e sedutora",
              value: "Sexy",
              category: "Sexy",
            },
            {
              id: "att-7",
              text: "Poderosa e influente",
              value: "Dramático",
              category: "Dramático",
            },
            {
              id: "att-8",
              text: "Única e inovadora",
              value: "Criativo",
              category: "Criativo",
            },
          ],
        },
        style: {},
      },
    ],
  },

  // 11. QUESTÃO INTERMEDIÁRIA - TRANSIÇÃO
  transition: {
    id: "transition-1",
    title: "Transição - Perguntas Estratégicas",
    type: "loading" as const,
    progress: 70,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-trans",
        type: "progress" as const,
        data: { progressValue: 70 },
        style: {},
      },
      {
        id: "title-trans",
        type: "title" as const,
        data: { text: "Enquanto calculamos o seu resultado..." },
        style: {
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "subtitle-trans",
        type: "subtitle" as const,
        data: {
          text: "Queremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa.",
        },
        style: {
          fontSize: "1.25rem",
          textAlign: "center" as const,
          color: "#6B4F43",
        },
      },
      {
        id: "text-trans",
        type: "text" as const,
        data: {
          text: "Responda com sinceridade. Isso é só entre você e a sua nova versão.",
        },
        style: {
          fontSize: "1rem",
          textAlign: "center" as const,
          color: "#374151",
          fontStyle: "italic",
        },
      },
    ],
  },

  // 12. QUESTÃO ESTRATÉGICA 1: AUTOPERCEPÇÃO
  strategic1: {
    id: "strategic-1",
    title: "Estratégica 1: Autopercepção do Estilo",
    type: "question" as const,
    progress: 75,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-s1",
        type: "progress" as const,
        data: { progressValue: 75 },
        style: {},
      },
      {
        id: "image-s1",
        type: "image" as const,
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp",
          alt: "Autopercepção do estilo",
        },
        style: {},
      },
      {
        id: "title-s1",
        type: "title" as const,
        data: { text: "Como você se vê quando está bem vestida?" },
        style: {
          fontSize: "1.75rem",
          fontWeight: "600",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "options-s1",
        type: "options" as const,
        data: {
          hasImages: false,
          multiSelect: false,
          options: [
            { id: "auto-1", text: "Confiante e poderosa", value: "confiante" },
            { id: "auto-2", text: "Elegante e sofisticada", value: "elegante" },
            { id: "auto-3", text: "Autêntica e natural", value: "autentica" },
            { id: "auto-4", text: "Feminina e delicada", value: "feminina" },
          ],
        },
        style: {},
      },
    ],
  },

  // 13. QUESTÃO ESTRATÉGICA 2: MAIOR DESAFIO
  strategic2: {
    id: "strategic-2",
    title: "Estratégica 2: Maior Desafio",
    type: "question" as const,
    progress: 80,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-s2",
        type: "progress" as const,
        data: { progressValue: 80 },
        style: {},
      },
      {
        id: "image-s2",
        type: "image" as const,
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334761/ChatGPT_Image_4_de_mai._de_2025_00_30_44_f8azn6.webp",
          alt: "Maior desafio",
        },
        style: {},
      },
      {
        id: "title-s2",
        type: "title" as const,
        data: { text: "Qual é o seu MAIOR desafio com a moda?" },
        style: {
          fontSize: "1.75rem",
          fontWeight: "600",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "options-s2",
        type: "options" as const,
        data: {
          hasImages: false,
          multiSelect: false,
          options: [
            {
              id: "des-1",
              text: "Não sei o que fica bem no meu corpo",
              value: "corpo",
            },
            {
              id: "des-2",
              text: "Tenho dificuldade em combinar peças",
              value: "combinar",
            },
            {
              id: "des-3",
              text: "Não sei qual é o meu estilo",
              value: "estilo",
            },
            {
              id: "des-4",
              text: "Tenho muita roupa mas nada para usar",
              value: "organizar",
            },
          ],
        },
        style: {},
      },
    ],
  },

  // 14. QUESTÃO ESTRATÉGICA 3: ORÇAMENTO E PRIORIDADES
  strategic3: {
    id: "strategic-3",
    title: "Estratégica 3: Orçamento e Prioridades",
    type: "question" as const,
    progress: 85,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-s3",
        type: "progress" as const,
        data: { progressValue: 85 },
        style: {},
      },
      {
        id: "image-s3",
        type: "image" as const,
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334762/ChatGPT_Image_4_de_mai._de_2025_00_30_44_twzfuq.webp",
          alt: "Orçamento e investimento",
        },
        style: {},
      },
      {
        id: "title-s3",
        type: "title" as const,
        data: { text: "Quanto você investe mensalmente em roupas?" },
        style: {
          fontSize: "1.75rem",
          fontWeight: "600",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "options-s3",
        type: "options" as const,
        data: {
          hasImages: false,
          multiSelect: false,
          options: [
            { id: "orc-1", text: "Até R$ 200", value: "baixo" },
            { id: "orc-2", text: "R$ 200 a R$ 500", value: "medio" },
            { id: "orc-3", text: "R$ 500 a R$ 1.000", value: "alto" },
            { id: "orc-4", text: "Mais de R$ 1.000", value: "premium" },
          ],
        },
        style: {},
      },
    ],
  },

  // 15. QUESTÃO ESTRATÉGICA 4: TEMPO E PRATICIDADE
  strategic4: {
    id: "strategic-4",
    title: "Estratégica 4: Tempo e Praticidade",
    type: "question" as const,
    progress: 87,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-s4",
        type: "progress" as const,
        data: { progressValue: 87 },
        style: {},
      },
      {
        id: "image-s4",
        type: "image" as const,
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334762/ChatGPT_Image_4_de_mai._de_2025_00_30_44_rbgkrc.webp",
          alt: "Tempo para se arrumar",
        },
        style: {},
      },
      {
        id: "title-s4",
        type: "title" as const,
        data: { text: "Quanto tempo você tem para se arrumar pela manhã?" },
        style: {
          fontSize: "1.75rem",
          fontWeight: "600",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "options-s4",
        type: "options" as const,
        data: {
          hasImages: false,
          multiSelect: false,
          options: [
            { id: "temp-1", text: "Menos de 15 minutos", value: "rapido" },
            { id: "temp-2", text: "15 a 30 minutos", value: "normal" },
            { id: "temp-3", text: "30 a 45 minutos", value: "detalhado" },
            { id: "temp-4", text: "Mais de 45 minutos", value: "elaborado" },
          ],
        },
        style: {},
      },
    ],
  },

  // 16. QUESTÃO ESTRATÉGICA 5: OBJETIVOS DE TRANSFORMAÇÃO
  strategic5: {
    id: "strategic-5",
    title: "Estratégica 5: Objetivos de Transformação",
    type: "question" as const,
    progress: 90,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-s5",
        type: "progress" as const,
        data: { progressValue: 90 },
        style: {},
      },
      {
        id: "image-s5",
        type: "image" as const,
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334762/ChatGPT_Image_4_de_mai._de_2025_00_30_44_gozwn8.webp",
          alt: "Transformação pessoal",
        },
        style: {},
      },
      {
        id: "title-s5",
        type: "title" as const,
        data: { text: "O que você mais deseja alcançar com seu estilo?" },
        style: {
          fontSize: "1.75rem",
          fontWeight: "600",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "options-s5",
        type: "options" as const,
        data: {
          hasImages: false,
          multiSelect: false,
          options: [
            {
              id: "obj-1",
              text: "Mais confiança e autoestima",
              value: "confianca",
            },
            {
              id: "obj-2",
              text: "Aparência mais profissional",
              value: "profissional",
            },
            {
              id: "obj-3",
              text: "Looks mais interessantes e únicos",
              value: "criatividade",
            },
            {
              id: "obj-4",
              text: "Praticidade sem abrir mão do estilo",
              value: "praticidade",
            },
          ],
        },
        style: {},
      },
    ],
  },

  // 17. QUESTÃO ESTRATÉGICA 6: ESTILO DE VIDA
  strategic6: {
    id: "strategic-6",
    title: "Estratégica 6: Estilo de Vida",
    type: "question" as const,
    progress: 92,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-s6",
        type: "progress" as const,
        data: { progressValue: 92 },
        style: {},
      },
      {
        id: "image-s6",
        type: "image" as const,
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334762/ChatGPT_Image_4_de_mai._de_2025_00_30_44_wmhcsj.webp",
          alt: "Estilo de vida",
        },
        style: {},
      },
      {
        id: "title-s6",
        type: "title" as const,
        data: { text: "Como é a sua rotina?" },
        style: {
          fontSize: "1.75rem",
          fontWeight: "600",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "options-s6",
        type: "options" as const,
        data: {
          hasImages: false,
          multiSelect: false,
          options: [
            {
              id: "rot-1",
              text: "Muito corrida, preciso de praticidade",
              value: "corrida",
            },
            {
              id: "rot-2",
              text: "Equilibrada entre trabalho e lazer",
              value: "equilibrada",
            },
            {
              id: "rot-3",
              text: "Flexível, posso me dedicar ao visual",
              value: "flexivel",
            },
            {
              id: "rot-4",
              text: "Muito social, sempre em eventos",
              value: "social",
            },
          ],
        },
        style: {},
      },
    ],
  },

  // 18. QUESTÃO ESTRATÉGICA 7: MOTIVAÇÃO FINAL
  strategic7: {
    id: "strategic-7",
    title: "Estratégica 7: Motivação Final",
    type: "question" as const,
    progress: 95,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-s7",
        type: "progress" as const,
        data: { progressValue: 95 },
        style: {},
      },
      {
        id: "image-s7",
        type: "image" as const,
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334762/ChatGPT_Image_4_de_mai._de_2025_00_30_44_wmhcsj.webp",
          alt: "Motivação para mudança",
        },
        style: {},
      },
      {
        id: "title-s7",
        type: "title" as const,
        data: { text: "O que te motivou a fazer este teste?" },
        style: {
          fontSize: "1.75rem",
          fontWeight: "600",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "options-s7",
        type: "options" as const,
        data: {
          hasImages: false,
          multiSelect: false,
          options: [
            {
              id: "mot-1",
              text: "Quero descobrir meu estilo pessoal",
              value: "descobrir",
            },
            {
              id: "mot-2",
              text: "Preciso renovar meu guarda-roupa",
              value: "renovar",
            },
            {
              id: "mot-3",
              text: "Quero me sentir mais confiante",
              value: "confianca",
            },
            {
              id: "mot-4",
              text: "Busco orientação profissional",
              value: "orientacao",
            },
          ],
        },
        style: {},
      },
    ],
  },

  loading: {
    id: "loading-1",
    title: "Processando Resultado",
    type: "loading" as const,
    progress: 75,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-loading",
        type: "progress" as const,
        data: { progressValue: 75 },
        style: {},
      },
      {
        id: "title-loading",
        type: "title" as const,
        data: { text: "Analisando suas respostas..." },
        style: {
          fontSize: "2rem",
          fontWeight: "600",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "subtitle-loading",
        type: "subtitle" as const,
        data: { text: "Estamos descobrindo seu estilo predominante" },
        style: {
          fontSize: "1.25rem",
          textAlign: "center" as const,
          color: "#6B4F43",
        },
      },
    ],
  },

  result: {
    id: "result-1",
    title: "Resultado do Quiz",
    type: "result" as const,
    progress: 100,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-result",
        type: "progress" as const,
        data: { progressValue: 100 },
        style: {},
      },
      {
        id: "title-result",
        type: "title" as const,
        data: { text: "Seu Estilo Predominante é:" },
        style: {
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "title-style",
        type: "title" as const,
        data: { text: "NATURAL" },
        style: {
          fontSize: "3rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#B89B7A",
        },
      },
      {
        id: "subtitle-result",
        type: "subtitle" as const,
        data: {
          text: "Seu estilo reflete autenticidade e simplicidade elegante",
        },
        style: {
          fontSize: "1.25rem",
          textAlign: "center" as const,
          color: "#6B4F43",
        },
      },
      {
        id: "button-result",
        type: "button" as const,
        data: { text: "VER GUIA COMPLETO" },
        style: {},
      },
    ],
  },

  offer: {
    id: "offer-1",
    title: "Oferta Especial",
    type: "offer" as const,
    progress: 100,
    showHeader: true,
    showProgress: false,
    components: [
      {
        id: "title-offer",
        type: "title" as const,
        data: { text: "OFERTA ESPECIAL PARA VOCÊ!" },
        style: {
          fontSize: "2.5rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "subtitle-offer",
        type: "subtitle" as const,
        data: {
          text: "Transforme seu guarda-roupa com o Guia Completo de Estilo",
        },
        style: {
          fontSize: "1.25rem",
          textAlign: "center" as const,
          color: "#6B4F43",
        },
      },
      {
        id: "image-offer",
        type: "image" as const,
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp",
          alt: "Guia de estilo",
        },
        style: {},
      },
      {
        id: "text-offer",
        type: "text" as const,
        data: {
          text: "✨ Análise completa do seu estilo pessoal\n✨ Dicas personalizadas de combinações\n✨ Guia de cores que favorecem você\n✨ Lista de compras inteligente",
        },
        style: {
          fontSize: "1.1rem",
          textAlign: "left" as const,
          color: "#374151",
        },
      },
      {
        id: "button-offer",
        type: "button" as const,
        data: { text: "QUERO MEU GUIA AGORA" },
        style: {},
      },
    ],
  },

  // TEMPLATES DE PÁGINAS DE VENDA - Layout idêntico ao quiz
  salesPage: {
    id: "sales-1",
    title: "Página de Vendas",
    type: "sales" as const,
    progress: 100,
    showHeader: true,
    showProgress: false,
    components: [
      {
        id: "logo-sales",
        type: "logo" as const,
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
          alt: "Logo Gisele Galvão",
        },
        style: {},
      },
      {
        id: "title-sales",
        type: "title" as const,
        data: { text: "Transforme Seu Estilo Pessoal Hoje!" },
        style: {
          fontSize: "2.5rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "video-sales",
        type: "video" as const,
        data: {
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        style: {},
      },
      {
        id: "testimonial-sales",
        type: "testimonial" as const,
        data: {
          text: "Este curso mudou completamente minha relação com a moda. Agora sei exatamente o que usar em cada ocasião!",
          name: "Maria Silva",
          role: "Executiva de Marketing",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b762?w=60&h=60&fit=crop&crop=face",
        },
        style: {},
      },
      {
        id: "price-sales",
        type: "price" as const,
        data: {
          price: "197",
          originalPrice: "497",
          installments: "19,70",
        },
        style: {},
      },
      {
        id: "countdown-sales",
        type: "countdown" as const,
        data: {
          title: "⚡ PROMOÇÃO RELÂMPAGO - TERMINA EM:",
        },
        style: {},
      },
      {
        id: "bonus-sales",
        type: "bonus" as const,
        data: {
          bonuses: [
            {
              id: "bonus1",
              title: "Bônus #1: Análise de Coloração Pessoal",
              value: "R$ 297",
              description: "Descubra as cores que realçam sua beleza natural",
            },
            {
              id: "bonus2",
              title: "Bônus #2: Guia de Compras Inteligente",
              value: "R$ 197",
              description:
                "Lista personalizada do que comprar para renovar seu guarda-roupa",
            },
            {
              id: "bonus3",
              title: "Bônus #3: Acesso ao Grupo VIP",
              value: "R$ 397",
              description: "Comunidade exclusiva com dicas diárias e suporte",
            },
          ],
        },
        style: {},
      },
      {
        id: "guarantee-sales",
        type: "guarantee" as const,
        data: {
          title: "Garantia Incondicional de 30 Dias",
          text: "Se você não ficar 100% satisfeita com os resultados, devolvemos todo seu dinheiro. Sem perguntas, sem burocracia!",
        },
        style: {},
      },
      {
        id: "social-proof-sales",
        type: "social-proof" as const,
        data: {
          customerCount: "8.347",
          rating: "4.9",
          reviewCount: "2.156",
        },
        style: {},
      },
      {
        id: "faq-sales",
        type: "faq" as const,
        data: {
          faqs: [
            {
              id: "faq1",
              question: "Como funciona o acesso ao curso?",
              answer:
                "Assim que o pagamento for aprovado, você recebe o acesso imediato por email. O conteúdo fica disponível 24h por dia.",
            },
            {
              id: "faq2",
              question: "Posso acessar pelo celular?",
              answer:
                "Sim! A plataforma é totalmente responsiva e funciona perfeitamente em celulares, tablets e computadores.",
            },
            {
              id: "faq3",
              question: "E se eu não gostar do curso?",
              answer:
                "Oferecemos 30 dias de garantia total. Se não ficar satisfeita, devolvemos 100% do valor investido.",
            },
          ],
        },
        style: {},
      },
      {
        id: "button-sales",
        type: "button" as const,
        data: { text: "🔥 QUERO TRANSFORMAR MEU ESTILO AGORA!" },
        style: {},
      },
    ],
  },

  checkout: {
    id: "checkout-1",
    title: "Finalizar Pedido",
    type: "checkout" as const,
    progress: 100,
    showHeader: true,
    showProgress: false,
    components: [
      {
        id: "title-checkout",
        type: "title" as const,
        data: { text: "Finalize Seu Pedido" },
        style: {
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "price-checkout",
        type: "price" as const,
        data: {
          price: "197",
          installments: "19,70",
        },
        style: {},
      },
      {
        id: "input-name",
        type: "input" as const,
        data: {
          label: "NOME COMPLETO",
          placeholder: "Digite seu nome completo",
          required: true,
        },
        style: {},
      },
      {
        id: "input-email",
        type: "input" as const,
        data: {
          label: "EMAIL",
          placeholder: "seu@email.com",
          required: true,
        },
        style: {},
      },
      {
        id: "button-checkout",
        type: "button" as const,
        data: { text: "FINALIZAR COMPRA SEGURA" },
        style: {},
      },
    ],
  },

  upsell: {
    id: "upsell-1",
    title: "Oferta Especial",
    type: "upsell" as const,
    progress: 100,
    showHeader: true,
    showProgress: false,
    components: [
      {
        id: "title-upsell",
        type: "title" as const,
        data: { text: "🎉 PARABÉNS! Uma Oferta Exclusiva Para Você!" },
        style: {
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        },
      },
      {
        id: "subtitle-upsell",
        type: "subtitle" as const,
        data: {
          text: "Já que você decidiu transformar seu estilo, que tal acelerar ainda mais seus resultados?",
        },
        style: {
          fontSize: "1.25rem",
          textAlign: "center" as const,
          color: "#6B4F43",
        },
      },
      {
        id: "image-upsell",
        type: "image" as const,
        data: {
          src: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=400&fit=crop",
          alt: "Consultoria Personal Stylist",
        },
        style: {},
      },
      {
        id: "price-upsell",
        type: "price" as const,
        data: {
          price: "297",
          originalPrice: "897",
          installments: "29,70",
        },
        style: {},
      },
      {
        id: "countdown-upsell",
        type: "countdown" as const,
        data: {
          title: "⏰ OFERTA VÁLIDA APENAS NESTA PÁGINA!",
        },
        style: {},
      },
      {
        id: "button-upsell-yes",
        type: "button" as const,
        data: { text: "✅ SIM! QUERO ACELERAR MEUS RESULTADOS" },
        style: {},
      },
      {
        id: "button-upsell-no",
        type: "button" as const,
        data: { text: "❌ Não, quero continuar apenas com o curso" },
        style: {},
      },
    ],
  },
};

const SimpleDragDropEditor: React.FC = () => {
  // Estado da aba ativa
  const [activeTab, setActiveTab] = useState<string>("editor");

  // Estado da seção ativa de configuração
  const [activeConfigSection, setActiveConfigSection] =
    useState<string>("domain");

  // Estado das configurações do quiz
  const [quizConfig, setQuizConfig] = useState<QuizConfig>({
    domain: "https://giselegalvao.com.br",
    seo: {
      title: "Quiz: Descubra Seu Estilo Pessoal Único",
      description:
        "Descubra seu estilo pessoal único com nosso quiz personalizado. Transforme seu visual e ganhe confiança com dicas exclusivas de moda.",
      keywords:
        "quiz estilo, moda feminina, consultoria de imagem, estilo pessoal, transformação visual",
    },
    pixel: {
      facebookPixelId: "1311550759901086",
      googleAnalyticsId: "G-XXXXXXXXXX",
    },
    utm: {
      source: "facebook",
      medium: "cpc",
      campaign: "quiz_style_2025",
      content: "criativo-1",
      term: "estilo_elegante",
    },
    scoring: {
      normalQuestionPoints: 1,
      strategicQuestionPoints: 0,
      autoAdvanceNormal: true,
      autoAdvanceStrategic: false,
      normalSelectionLimit: 3,
      strategicSelectionLimit: 2,
    },
    results: {
      showUserName: true,
      showPrimaryStyle: true,
      showSecondaryStyles: true,
      showPercentages: true,
      showStyleImages: true,
      showStyleGuides: true,
    },
  });

  // Estado do funil completo - usando questões reais
  const [currentFunnel, setCurrentFunnel] = useState<QuizFunnel>(() => {
    // Primeiro tentar carregar dados salvos
    try {
      const savedFunnel = localStorage.getItem("quiz_funnel_config");
      if (savedFunnel) {
        const parsed = JSON.parse(savedFunnel);
        console.log("📥 Funil carregado do localStorage:", parsed);
        return parsed;
      }
    } catch (error) {
      console.warn("Erro ao carregar funil salvo:", error);
    }

    // Se não houver dados salvos, criar com questões reais
    const realQuestions = generateRealQuestionTemplates(); // Questões normais (1-10)
    const strategicQuestions = generateStrategicQuestionTemplates(); // Questões estratégicas (testes A/B)
    console.log("🔄 Criando funil com questões reais:", realQuestions.length, "normais +", strategicQuestions.length, "estratégicas");

    return {
      id: "quiz-funnel-real",
      name: "Quiz de Estilo Pessoal - Funil Completo",
      pages: [
        // 1. Página inicial (QuizIntro)
        REAL_QUIZ_TEMPLATES.intro,
        
        // 2. Questões normais 1-10 (com pontuação para estilos)
        ...realQuestions,
        
        // 3. Página de transição (QuizTransition) 
        REAL_QUIZ_TEMPLATES.transition,
        
        // 4. Questões estratégicas (testes A/B)
        ...strategicQuestions,
        
        // 5. Página de loading/calculando
        REAL_QUIZ_TEMPLATES.loading,
        
        // 6. Página de resultado (Teste A)
        REAL_QUIZ_TEMPLATES.result,
        
        // 7. Página de oferta (Teste B)
        REAL_QUIZ_TEMPLATES.offer,
      ],
    };
  });

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentPage = currentFunnel.pages[currentPageIndex];

  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [deviceView, setDeviceView] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [draggedType, setDraggedType] = useState<ComponentType | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{
    [questionId: string]: string[];
  }>({});

  // Função para salvar alterações
  const saveChanges = () => {
    console.log("💾 Salvando alterações do funil...");
    localStorage.setItem("quiz_funnel_config", JSON.stringify(currentFunnel));
    localStorage.setItem("quiz_config", JSON.stringify(quizConfig));

    // Salvar também em formato compatível com o quiz original
    localStorage.setItem(
      "quiz_editor_data",
      JSON.stringify({
        funnel: currentFunnel,
        config: quizConfig,
        timestamp: new Date().toISOString(),
      })
    );

    console.log("✅ Alterações salvas automaticamente!");
  };

  // Auto-salvar sempre que currentFunnel ou quizConfig mudarem
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("💾 Auto-salvando alterações...");
      localStorage.setItem("quiz_funnel_config", JSON.stringify(currentFunnel));
      localStorage.setItem("quiz_config", JSON.stringify(quizConfig));

      // Salvar também em formato compatível com o quiz original
      localStorage.setItem(
        "quiz_editor_data",
        JSON.stringify({
          funnel: currentFunnel,
          config: quizConfig,
          timestamp: new Date().toISOString(),
        })
      );

      console.log("✅ Alterações auto-salvas!");
    }, 1000); // Salvar após 1 segundo sem mudanças

    return () => clearTimeout(timeoutId);
  }, [currentFunnel, quizConfig]);

  // Carregar configurações salvas ao inicializar
  useEffect(() => {
    try {
      const savedFunnel = localStorage.getItem("quiz_funnel_config");
      const savedConfig = localStorage.getItem("quiz_config");

      if (savedFunnel) {
        const parsedFunnel = JSON.parse(savedFunnel);
        setCurrentFunnel(parsedFunnel);
        console.log("📥 Funil carregado do localStorage");
      }

      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        setQuizConfig(parsedConfig);
        console.log("📥 Configurações carregadas do localStorage");
      }
    } catch (error) {
      console.error("❌ Erro ao carregar dados salvos:", error);
    }
  }, []);

  // Função para atualizar configurações
  const updateQuizConfig = (updates: Partial<QuizConfig>) => {
    setQuizConfig((prev) => ({ ...prev, ...updates }));
  };

  // Função para atualizar seções específicas da configuração
  const updateConfig = (
    section: keyof QuizConfig,
    updates: Record<string, unknown>
  ) => {
    setQuizConfig((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as Record<string, unknown>), ...updates },
    }));
  };

  // Função para abrir preview
  const openPreview = () => {
    const previewUrl = `/quiz-preview?funnel=${encodeURIComponent(
      JSON.stringify(currentFunnel)
    )}&config=${encodeURIComponent(JSON.stringify(quizConfig))}`;
    window.open(previewUrl, "_blank");
  };

  // Aplicar CSS
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = SIMPLE_CSS;
    document.head.appendChild(styleElement);

    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  // Funções de navegação entre páginas
  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
      setSelectedComponent(null);
    }
  };

  const goToNextPage = () => {
    if (currentPageIndex < currentFunnel.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      setSelectedComponent(null);
    }
  };

  const addNewPage = () => {
    const newPage: SimplePage = {
      id: `page-${Date.now()}`,
      title: "Nova Página",
      type: "question",
      progress: 50,
      showHeader: true,
      showProgress: true,
      components: [],
    };

    setCurrentFunnel((prev) => ({
      ...prev,
      pages: [...prev.pages, newPage],
    }));
    setCurrentPageIndex(currentFunnel.pages.length);
  };

  const duplicatePage = () => {
    const newPage: SimplePage = {
      ...currentPage,
      id: `page-${Date.now()}`,
      title: `${currentPage.title} (Cópia)`,
      components: currentPage.components.map((comp) => ({
        ...comp,
        id: `${comp.type}-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      })),
    };

    setCurrentFunnel((prev) => ({
      ...prev,
      pages: [
        ...prev.pages.slice(0, currentPageIndex + 1),
        newPage,
        ...prev.pages.slice(currentPageIndex + 1),
      ],
    }));
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const deletePage = () => {
    if (currentFunnel.pages.length > 1) {
      setCurrentFunnel((prev) => ({
        ...prev,
        pages: prev.pages.filter((_, index) => index !== currentPageIndex),
      }));

      if (currentPageIndex >= currentFunnel.pages.length - 1) {
        setCurrentPageIndex(Math.max(0, currentPageIndex - 1));
      }
      setSelectedComponent(null);
    }
  };

  const exportFunnel = () => {
    const dataStr = JSON.stringify(currentFunnel, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `quiz-funnel-${currentFunnel.name
      .toLowerCase()
      .replace(/\s+/g, "-")}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // Funções de drag & drop
  const handleDragStart = (
    e: React.DragEvent,
    componentType: ComponentType
  ) => {
    setDraggedType(componentType);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(null);

    if (draggedType) {
      addComponentToPage(draggedType, index);
      setDraggedType(null);
    }
  };

  const getDefaultData = (type: string) => {
    switch (type) {
      case "logo":
        return {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
          alt: "Logo",
        };
      case "progress":
        return { progressValue: 50 };
      case "title":
        return { text: "Novo Título" };
      case "subtitle":
        return { text: "Novo Subtítulo" };
      case "text":
        return { text: "Digite seu texto aqui..." };
      case "image":
        return {
          src: "https://via.placeholder.com/400x300/B89B7A/FFFFFF?text=Nova+Imagem",
          alt: "Nova imagem",
        };
      case "input":
        return {
          label: "CAMPO",
          placeholder: "Digite aqui...",
          required: false,
        };
      case "options":
        return {
          hasImages: false,
          multiSelect: false,
          options: [
            { id: "opt-1", text: "Opção 1", value: "option1" },
            { id: "opt-2", text: "Opção 2", value: "option2" },
          ],
        };
      case "button":
        return { text: "CLIQUE AQUI" };
      case "spacer":
        return { height: 32 };
      case "video":
        return {
          videoUrl: "",
        };
      case "testimonial":
        return {
          text: "Este produto mudou minha vida completamente! Recomendo para todos que querem resultados reais.",
          name: "Cliente Satisfeito",
          role: "Cliente verificado",
          avatar: "https://via.placeholder.com/60x60/B89B7A/FFFFFF?text=👤",
        };
      case "price":
        return {
          price: "97",
          originalPrice: "197",
          installments: "9,90",
        };
      case "countdown":
        return {
          title: "⏰ OFERTA LIMITADA!",
        };
      case "guarantee":
        return {
          title: "Garantia de 30 Dias",
          text: "Se não ficar satisfeito, devolvemos 100% do seu dinheiro!",
        };
      case "bonus":
        return {
          bonuses: [
            {
              id: "bonus1",
              title: "Bônus #1: Guia Completo",
              value: "R$ 197",
              description: "Material exclusivo para acelerar seus resultados",
            },
            {
              id: "bonus2",
              title: "Bônus #2: Acesso VIP",
              value: "R$ 297",
              description: "Grupo exclusivo para networking",
            },
          ],
        };
      case "faq":
        return {
          faqs: [
            {
              id: "faq1",
              question: "Como funciona a garantia?",
              answer:
                "Oferecemos 30 dias de garantia incondicional. Se não ficar satisfeito, devolvemos seu dinheiro.",
            },
            {
              id: "faq2",
              question: "Quanto tempo tenho acesso?",
              answer:
                "O acesso é vitalício! Você pode acessar quando quiser, quantas vezes quiser.",
            },
          ],
        };
      case "social-proof":
        return {
          customerCount: "5.000",
          rating: "4.9",
          reviewCount: "1.247",
        };
      default:
        return {};
    }
  };

  const getDefaultStyle = (type: string) => {
    switch (type) {
      case "title":
        return {
          fontSize: "2.5rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
        };
      case "subtitle":
        return {
          fontSize: "1.25rem",
          textAlign: "center" as const,
          color: "#6B4F43",
        };
      case "text":
        return {
          fontSize: "1rem",
          textAlign: "left" as const,
          color: "#374151",
        };
      default:
        return {};
    }
  };

  // Funções de edição
  const updateComponent = (
    componentId: string,
    newData: Partial<SimpleComponent["data"]>
  ) => {
    setCurrentFunnel((prev) => ({
      ...prev,
      pages: prev.pages.map((page, index) =>
        index === currentPageIndex
          ? {
              ...page,
              components: page.components.map((comp) =>
                comp.id === componentId
                  ? { ...comp, data: { ...comp.data, ...newData } }
                  : comp
              ),
            }
          : page
      ),
    }));
  };

  const updateCurrentPage = (updates: Partial<SimplePage>) => {
    setCurrentFunnel((prev) => ({
      ...prev,
      pages: prev.pages.map((page, index) =>
        index === currentPageIndex ? { ...page, ...updates } : page
      ),
    }));
  };

  const deleteComponent = (componentId: string) => {
    setCurrentFunnel((prev) => ({
      ...prev,
      pages: prev.pages.map((page, index) =>
        index === currentPageIndex
          ? {
              ...page,
              components: page.components.filter(
                (comp) => comp.id !== componentId
              ),
            }
          : page
      ),
    }));
    setSelectedComponent(null);
  };

  const duplicateComponent = (componentId: string) => {
    const component = currentPage.components.find((c) => c.id === componentId);
    if (component) {
      const newComponent: SimpleComponent = {
        ...component,
        id: `${component.type}-${Date.now()}`,
        data: { ...component.data },
      };

      const index = currentPage.components.findIndex(
        (c) => c.id === componentId
      );
      setCurrentFunnel((prev) => ({
        ...prev,
        pages: prev.pages.map((page, pageIndex) =>
          pageIndex === currentPageIndex
            ? {
                ...page,
                components: [
                  ...page.components.slice(0, index + 1),
                  newComponent,
                  ...page.components.slice(index + 1),
                ],
              }
            : page
        ),
      }));
    }
  };

  const addComponentToPage = (componentType: ComponentType, index: number) => {
    const newComponent: SimpleComponent = {
      id: `${componentType.type}-${Date.now()}`,
      type: componentType.type,
      data: getDefaultData(componentType.type),
      style: getDefaultStyle(componentType.type),
    };

    setCurrentFunnel((prev) => ({
      ...prev,
      pages: prev.pages.map((page, pageIndex) =>
        pageIndex === currentPageIndex
          ? {
              ...page,
              components: [
                ...page.components.slice(0, index),
                newComponent,
                ...page.components.slice(index),
              ],
            }
          : page
      ),
    }));

    setSelectedComponent(newComponent.id);
  };

  // Renderização de componentes
  const renderComponent = (component: SimpleComponent, index: number) => {
    const isSelected = selectedComponent === component.id;

    return (
      <div key={component.id} className="relative">
        {/* Drop Zone */}
        <div
          className={`drop-zone ${dragOverIndex === index ? "drag-over" : ""}`}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
        >
          {dragOverIndex === index ? "Solte aqui" : "Arraste componentes aqui"}
        </div>

        {/* Component Wrapper */}
        <div
          className={`component-wrapper ${isSelected ? "selected" : ""}`}
          onClick={() => setSelectedComponent(component.id)}
        >
          {/* Toolbar */}
          {isSelected && (
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  duplicateComponent(component.id);
                }}
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteComponent(component.id);
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}

          {/* Content */}
          {renderComponentContent(component)}
        </div>
      </div>
    );
  };

  const renderComponentContent = (component: SimpleComponent) => {
    const { type, data, style } = component;

    switch (type) {
      case "logo":
        return (
          <div className="text-center" style={{ padding: "16px 0" }}>
            <img
              src={data.src || "https://via.placeholder.com/200x100"}
              alt={data.alt || "Logo"}
              style={{
                maxWidth: "200px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        );

      case "progress":
        return (
          <div style={{ padding: "16px 0" }}>
            <div
              style={{
                width: "100%",
                height: "8px",
                backgroundColor: "#E5E7EB",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${data.progressValue || 0}%`,
                  background:
                    "linear-gradient(90deg, #B89B7A 0%, #aa6b5d 100%)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        );

      case "input":
        return (
          <div style={{ margin: "16px 0" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#432818",
                fontSize: "0.875rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {data.label || "CAMPO"}
              {data.required && <span style={{ color: "red" }}> *</span>}
            </label>
            <input
              type="text"
              placeholder={data.placeholder || "Digite aqui..."}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "1rem",
              }}
            />
          </div>
        );

      case "options": {
        const currentQuestionId = component.id.replace("options-", "");
        const currentSelections = selectedOptions[currentQuestionId] || [];

        return (
          <div style={{ margin: "16px 0" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: data.hasImages
                  ? "repeat(2, 1fr)"
                  : "repeat(1, 1fr)",
                gap: data.hasImages ? "12px" : "16px",
                padding: "0 8px",
              }}
            >
              {data.options?.map((option: QuizOption, optIndex: number) => {
                const isSelected = currentSelections.includes(option.id);

                return (
                  <div
                    key={option.id}
                    className={`quiz-option-interactive ${
                      isSelected ? "selected" : ""
                    }`}
                    style={{
                      position: "relative",
                      background: isSelected
                        ? "linear-gradient(135deg, #F0EAE2 0%, #E8DDD4 100%)"
                        : "linear-gradient(135deg, #FFFBF7 0%, #FDF8F3 100%)",
                      border: `2px solid ${isSelected ? "#B89B7A" : "#E8DDD4"}`,
                      borderRadius: "16px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      overflow: "hidden",
                      padding: data.hasImages ? "12px" : "20px",
                      boxShadow: isSelected
                        ? "0 4px 12px rgba(184, 155, 122, 0.2)"
                        : "0 2px 8px rgba(0,0,0,0.05)",
                      transform: isSelected ? "scale(0.98)" : "scale(1)",
                    }}
                    onClick={() => {
                      setSelectedOptions((prev) => {
                        const current = prev[currentQuestionId] || [];
                        const isAlreadySelected = current.includes(option.id);

                        if (isAlreadySelected) {
                          // Remover seleção
                          return {
                            ...prev,
                            [currentQuestionId]: current.filter(
                              (id) => id !== option.id
                            ),
                          };
                        } else {
                          // Adicionar seleção (respeitando limites de seleção múltipla)
                          const maxSelections = data.multiSelect ? 3 : 1;
                          const newSelections =
                            current.length >= maxSelections
                              ? [...current.slice(1), option.id] // Remove o primeiro se exceder limite
                              : [...current, option.id];

                          return {
                            ...prev,
                            [currentQuestionId]: newSelections,
                          };
                        }
                      });
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget;
                      if (!isSelected) {
                        target.style.borderColor = "#D4C4B0";
                        target.style.transform = "translateY(-2px)";
                        target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget;
                      if (!isSelected) {
                        target.style.borderColor = "#E8DDD4";
                        target.style.transform = "translateY(0)";
                        target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                      }
                    }}
                    data-option-id={option.id}
                  >
                    {/* Indicador de seleção */}
                    {isSelected && (
                      <div
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          background: "#B89B7A",
                          color: "white",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        ✓
                      </div>
                    )}

                    {data.hasImages && option.image && (
                      <div
                        style={{ marginBottom: "12px", textAlign: "center" }}
                      >
                        <img
                          src={option.image}
                          alt={option.text}
                          style={{
                            width: "100%",
                            maxWidth: "200px",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "12px",
                            border: "1px solid #E8DDD4",
                          }}
                        />
                      </div>
                    )}
                    <div
                      style={{
                        fontSize: data.hasImages ? "0.9rem" : "1rem",
                        fontWeight: "500",
                        color: "#432818",
                        textAlign: data.hasImages ? "center" : "left",
                        lineHeight: "1.4",
                        padding: data.hasImages ? "0" : "4px 0",
                      }}
                    >
                      {option.text}
                    </div>
                    {option.category && (
                      <div
                        style={{
                          position: "absolute",
                          top: "8px",
                          left: "8px",
                          background: "rgba(184, 155, 122, 0.1)",
                          color: "#B89B7A",
                          fontSize: "0.7rem",
                          padding: "2px 6px",
                          borderRadius: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {option.category}
                      </div>
                    )}
                  </div>
                );
              }) || (
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#8B5A3C",
                    fontStyle: "italic",
                  }}
                >
                  Nenhuma opção configurada
                </div>
              )}
            </div>
            <div
              style={{
                textAlign: "center",
                margin: "24px 0 16px 0",
                color: "#8B5A3C",
                fontSize: "0.85rem",
              }}
            >
              {data.multiSelect
                ? `💡 Selecione até ${data.multiSelect || 3} opções (${
                    currentSelections.length
                  } selecionadas)`
                : `💡 Selecione uma opção (${
                    currentSelections.length > 0
                      ? "selecionada"
                      : "nenhuma selecionada"
                  })`}
            </div>
          </div>
        );
      }

      case "title":
      case "subtitle":
      case "text":
        return (
          <div
            style={{
              fontSize: style?.fontSize || "1rem",
              fontWeight: style?.fontWeight || "normal",
              textAlign: style?.textAlign || "left",
              color: style?.color || "#000000",
              padding: "8px 0",
              whiteSpace: "pre-line",
            }}
          >
            {data.text || "Clique para editar..."}
          </div>
        );

      case "image":
        return (
          <div className="text-center" style={{ padding: "16px 0" }}>
            <img
              src={data.src || "https://via.placeholder.com/400x300"}
              alt={data.alt || "Imagem"}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </div>
        );

      case "button":
        return (
          <div style={{ textAlign: "center", margin: "16px 0" }}>
            <button
              style={{
                padding: "12px 24px",
                background: "linear-gradient(135deg, #B89B7A 0%, #aa6b5d 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {data.text || "BOTÃO"}
            </button>
          </div>
        );

      case "spacer":
        return (
          <div
            style={{
              height: `${data.height || 32}px`,
              border: "1px dashed #cbd5e1",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748b",
              fontSize: "0.75rem",
              opacity: 0.5,
            }}
          >
            Espaçamento ({data.height || 32}px)
          </div>
        );

      case "video":
        return (
          <div style={{ margin: "16px 0", textAlign: "center" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "600px",
                margin: "0 auto",
                backgroundColor: "#000",
                borderRadius: "12px",
                overflow: "hidden",
                aspectRatio: "16/9",
              }}
            >
              {data.videoUrl ? (
                <iframe
                  src={data.videoUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                  allowFullScreen
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                  }}
                >
                  <Video className="mr-2" size={24} />
                  Vídeo de Vendas
                </div>
              )}
            </div>
          </div>
        );

      case "testimonial":
        return (
          <div
            style={{
              margin: "24px 0",
              padding: "24px",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              border: "1px solid #e9ecef",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}
            >
              <img
                src={
                  data.avatar ||
                  "https://via.placeholder.com/60x60/B89B7A/FFFFFF?text=👤"
                }
                alt="Avatar"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "1rem",
                    fontStyle: "italic",
                    marginBottom: "12px",
                    color: "#374151",
                    lineHeight: "1.6",
                  }}
                >
                  "
                  {data.text ||
                    "Este produto mudou minha vida completamente! Recomendo para todos que querem resultados reais."}
                  "
                </p>
                <div>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "#432818",
                      marginBottom: "4px",
                    }}
                  >
                    {data.name || "Cliente Satisfeito"}
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "#6B4F43" }}>
                    {data.role || "Cliente verificado"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "price":
        return (
          <div style={{ margin: "24px 0", textAlign: "center" }}>
            <div
              style={{
                padding: "32px",
                backgroundColor: "white",
                borderRadius: "16px",
                border: "2px solid #B89B7A",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              {data.originalPrice && (
                <div
                  style={{
                    fontSize: "1.25rem",
                    color: "#6B4F43",
                    textDecoration: "line-through",
                    marginBottom: "8px",
                  }}
                >
                  De: R$ {data.originalPrice}
                </div>
              )}
              <div
                style={{
                  fontSize: "3rem",
                  fontWeight: "700",
                  color: "#432818",
                  marginBottom: "8px",
                }}
              >
                R$ {data.price || "97"}
              </div>
              {data.installments && (
                <div style={{ fontSize: "1rem", color: "#6B4F43" }}>
                  ou 12x de R$ {data.installments}
                </div>
              )}
            </div>
          </div>
        );

      case "countdown":
        return (
          <div style={{ margin: "24px 0", textAlign: "center" }}>
            <div
              style={{
                padding: "24px",
                backgroundColor: "#dc2626",
                borderRadius: "12px",
                color: "white",
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "16px",
                }}
              >
                {data.title || "⏰ OFERTA LIMITADA!"}
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "16px",
                }}
              >
                {["23", "59", "45"].map((value, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "12px",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                      minWidth: "60px",
                    }}
                  >
                    <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>
                      {value}
                    </div>
                    <div style={{ fontSize: "0.75rem", opacity: 0.9 }}>
                      {["HRS", "MIN", "SEG"][index]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "guarantee":
        return (
          <div style={{ margin: "24px 0", textAlign: "center" }}>
            <div
              style={{
                padding: "24px",
                backgroundColor: "#ecfdf5",
                borderRadius: "12px",
                border: "2px solid #10b981",
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🛡️</div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#065f46",
                  marginBottom: "8px",
                }}
              >
                {data.title || "Garantia de 30 Dias"}
              </h3>
              <p style={{ color: "#047857" }}>
                {data.text ||
                  "Se não ficar satisfeito, devolvemos 100% do seu dinheiro!"}
              </p>
            </div>
          </div>
        );

      case "bonus":
        return (
          <div style={{ margin: "24px 0" }}>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                textAlign: "center",
                marginBottom: "16px",
                color: "#432818",
              }}
            >
              🎁 BÔNUS EXCLUSIVOS
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {(
                data.bonuses || [
                  {
                    id: "bonus1",
                    title: "Bônus #1: Guia Completo",
                    value: "R$ 197",
                    description:
                      "Material exclusivo para acelerar seus resultados",
                  },
                  {
                    id: "bonus2",
                    title: "Bônus #2: Acesso VIP",
                    value: "R$ 297",
                    description: "Grupo exclusivo para networking",
                  },
                ]
              ).map((bonus: BonusItem, index: number) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "16px",
                    backgroundColor: "#fff7ed",
                    borderRadius: "8px",
                    border: "1px solid #fed7aa",
                  }}
                >
                  <div style={{ marginRight: "12px", fontSize: "1.5rem" }}>
                    🎁
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        fontWeight: "600",
                        color: "#432818",
                        marginBottom: "4px",
                      }}
                    >
                      {bonus.title}
                    </h4>
                    <p style={{ fontSize: "0.875rem", color: "#6B4F43" }}>
                      {bonus.description}
                    </p>
                  </div>
                  <div style={{ fontWeight: "700", color: "#ea580c" }}>
                    {bonus.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "faq":
        return (
          <div style={{ margin: "24px 0" }}>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                textAlign: "center",
                marginBottom: "16px",
                color: "#432818",
              }}
            >
              ❓ Perguntas Frequentes
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {(
                data.faqs || [
                  {
                    id: "faq1",
                    question: "Como funciona a garantia?",
                    answer:
                      "Oferecemos 30 dias de garantia incondicional. Se não ficar satisfeito, devolvemos seu dinheiro.",
                  },
                  {
                    id: "faq2",
                    question: "Quanto tempo tenho acesso?",
                    answer:
                      "O acesso é vitalício! Você pode acessar quando quiser, quantas vezes quiser.",
                  },
                ]
              ).map((faq: FaqItem, index: number) => (
                <div
                  key={index}
                  style={{
                    padding: "16px",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <h4
                    style={{
                      fontWeight: "600",
                      color: "#432818",
                      marginBottom: "8px",
                    }}
                  >
                    {faq.question}
                  </h4>
                  <p style={{ fontSize: "0.875rem", color: "#6B4F43" }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "social-proof":
        return (
          <div style={{ margin: "24px 0", textAlign: "center" }}>
            <div
              style={{
                padding: "20px",
                backgroundColor: "#f3f4f6",
                borderRadius: "12px",
                border: "1px solid #d1d5db",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>👥</span>
                <span
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#432818",
                  }}
                >
                  +{data.customerCount || "5.000"} Clientes Satisfeitos
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "4px",
                  marginBottom: "8px",
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    style={{ color: "#fbbf24", fontSize: "1.25rem" }}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <p style={{ fontSize: "0.875rem", color: "#6B4F43" }}>
                {data.rating || "4.9"}/5 - Baseado em{" "}
                {data.reviewCount || "1.247"} avaliações
              </p>
            </div>
          </div>
        );

      default:
        return <div>Componente não reconhecido</div>;
    }
  };

  const renderPropertiesPanel = () => {
    const component = currentPage.components.find(
      (c) => c.id === selectedComponent
    );
    if (!component) return null;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">
            Propriedades - {component.type}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Texto para title, subtitle, text, button */}
          {["title", "subtitle", "text", "button"].includes(component.type) && (
            <div>
              <Label>Texto</Label>
              <Textarea
                value={component.data.text || ""}
                onChange={(e) =>
                  updateComponent(component.id, { text: e.target.value })
                }
                rows={3}
              />
            </div>
          )}

          {/* Propriedades de imagem e logo */}
          {["image", "logo"].includes(component.type) && (
            <>
              <div>
                <Label>URL da Imagem</Label>
                <Input
                  value={component.data.src || ""}
                  onChange={(e) =>
                    updateComponent(component.id, { src: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Texto Alternativo</Label>
                <Input
                  value={component.data.alt || ""}
                  onChange={(e) =>
                    updateComponent(component.id, { alt: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {/* Propriedades de input */}
          {component.type === "input" && (
            <>
              <div>
                <Label>Rótulo</Label>
                <Input
                  value={component.data.label || ""}
                  onChange={(e) =>
                    updateComponent(component.id, { label: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Placeholder</Label>
                <Input
                  value={component.data.placeholder || ""}
                  onChange={(e) =>
                    updateComponent(component.id, {
                      placeholder: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={component.data.required || false}
                  onCheckedChange={(checked) =>
                    updateComponent(component.id, { required: checked })
                  }
                />
                <Label>Obrigatório</Label>
              </div>
            </>
          )}

          {/* Propriedades de progress */}
          {component.type === "progress" && (
            <div>
              <Label>Valor do Progresso (%)</Label>
              <Input
                type="number"
                value={component.data.progressValue || 0}
                onChange={(e) =>
                  updateComponent(component.id, {
                    progressValue: parseInt(e.target.value) || 0,
                  })
                }
                min="0"
                max="100"
              />
            </div>
          )}

          {/* Propriedades de spacer */}
          {component.type === "spacer" && (
            <div>
              <Label>Altura (px)</Label>
              <Input
                type="number"
                value={component.data.height || 32}
                onChange={(e) =>
                  updateComponent(component.id, {
                    height: parseInt(e.target.value) || 32,
                  })
                }
              />
            </div>
          )}

          {/* Propriedades de opções */}
          {component.type === "options" && (
            <>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={component.data.hasImages || false}
                  onCheckedChange={(checked) =>
                    updateComponent(component.id, { hasImages: checked })
                  }
                />
                <Label>Com Imagens</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={component.data.multiSelect || false}
                  onCheckedChange={(checked) =>
                    updateComponent(component.id, { multiSelect: checked })
                  }
                />
                <Label>Múltipla Seleção</Label>
              </div>
            </>
          )}

          {/* Propriedades de vídeo */}
          {component.type === "video" && (
            <div>
              <Label>URL do Vídeo</Label>
              <Input
                value={component.data.videoUrl || ""}
                onChange={(e) =>
                  updateComponent(component.id, { videoUrl: e.target.value })
                }
                placeholder="https://www.youtube.com/embed/..."
              />
            </div>
          )}

          {/* Propriedades de depoimento */}
          {component.type === "testimonial" && (
            <>
              <div>
                <Label>Depoimento</Label>
                <Textarea
                  value={component.data.text || ""}
                  onChange={(e) =>
                    updateComponent(component.id, { text: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div>
                <Label>Nome do Cliente</Label>
                <Input
                  value={component.data.name || ""}
                  onChange={(e) =>
                    updateComponent(component.id, { name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Cargo/Função</Label>
                <Input
                  value={component.data.role || ""}
                  onChange={(e) =>
                    updateComponent(component.id, { role: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>URL do Avatar</Label>
                <Input
                  value={component.data.avatar || ""}
                  onChange={(e) =>
                    updateComponent(component.id, { avatar: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {/* Propriedades de preço */}
          {component.type === "price" && (
            <>
              <div>
                <Label>Preço Principal</Label>
                <Input
                  value={component.data.price || ""}
                  onChange={(e) =>
                    updateComponent(component.id, { price: e.target.value })
                  }
                  placeholder="97"
                />
              </div>
              <div>
                <Label>Preço Original (opcional)</Label>
                <Input
                  value={component.data.originalPrice || ""}
                  onChange={(e) =>
                    updateComponent(component.id, {
                      originalPrice: e.target.value,
                    })
                  }
                  placeholder="197"
                />
              </div>
              <div>
                <Label>Valor das Parcelas</Label>
                <Input
                  value={component.data.installments || ""}
                  onChange={(e) =>
                    updateComponent(component.id, {
                      installments: e.target.value,
                    })
                  }
                  placeholder="9,90"
                />
              </div>
            </>
          )}

          {/* Propriedades de countdown */}
          {component.type === "countdown" && (
            <div>
              <Label>Título do Countdown</Label>
              <Input
                value={component.data.title || ""}
                onChange={(e) =>
                  updateComponent(component.id, { title: e.target.value })
                }
                placeholder="⏰ OFERTA LIMITADA!"
              />
            </div>
          )}

          {/* Propriedades de garantia */}
          {component.type === "guarantee" && (
            <>
              <div>
                <Label>Título da Garantia</Label>
                <Input
                  value={component.data.title || ""}
                  onChange={(e) =>
                    updateComponent(component.id, { title: e.target.value })
                  }
                  placeholder="Garantia de 30 Dias"
                />
              </div>
              <div>
                <Label>Descrição da Garantia</Label>
                <Textarea
                  value={component.data.text || ""}
                  onChange={(e) =>
                    updateComponent(component.id, { text: e.target.value })
                  }
                  rows={2}
                />
              </div>
            </>
          )}

          {/* Propriedades de prova social */}
          {component.type === "social-proof" && (
            <>
              <div>
                <Label>Número de Clientes</Label>
                <Input
                  value={component.data.customerCount || ""}
                  onChange={(e) =>
                    updateComponent(component.id, {
                      customerCount: e.target.value,
                    })
                  }
                  placeholder="5.000"
                />
              </div>
              <div>
                <Label>Avaliação</Label>
                <Input
                  value={component.data.rating || ""}
                  onChange={(e) =>
                    updateComponent(component.id, { rating: e.target.value })
                  }
                  placeholder="4.9"
                />
              </div>
              <div>
                <Label>Número de Avaliações</Label>
                <Input
                  value={component.data.reviewCount || ""}
                  onChange={(e) =>
                    updateComponent(component.id, {
                      reviewCount: e.target.value,
                    })
                  }
                  placeholder="1.247"
                />
              </div>
            </>
          )}

          <Separator />
          <Button
            variant="destructive"
            onClick={() => deleteComponent(component.id)}
            className="w-full"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remover
          </Button>
        </CardContent>
      </Card>
    );
  };

  const getDeviceClass = () => {
    switch (deviceView) {
      case "mobile":
        return "max-w-sm mx-auto";
      case "tablet":
        return "max-w-md mx-auto";
      case "desktop":
        return "max-w-2xl mx-auto";
      default:
        return "max-w-2xl mx-auto";
    }
  };

  return (
    <div className="h-screen flex bg-background simple-editor">
      {/* COLUNA 1: ETAPAS DO FUNIL - 260px */}
      <div className="w-[260px] min-w-[260px] border-r bg-slate-50 overflow-hidden flex flex-col">
        <div className="p-3 border-b bg-slate-100">
          <h2 className="text-sm font-semibold mb-2 flex items-center gap-2">
            🔄 ETAPAS DO FUNIL
          </h2>

          {/* Abas do Editor */}
          <div className="flex gap-1 mb-3">
            <Button
              size="sm"
              variant={activeTab === "editor" ? "default" : "outline"}
              onClick={() => setActiveTab("editor")}
              className="h-6 px-2 text-xs flex-1"
            >
              🎨
            </Button>
            <Button
              size="sm"
              variant={activeTab === "config" ? "default" : "outline"}
              onClick={() => setActiveTab("config")}
              className="h-6 px-2 text-xs flex-1"
            >
              ⚙️
            </Button>
            <Button
              size="sm"
              variant={activeTab === "preview" ? "default" : "outline"}
              onClick={() => setActiveTab("preview")}
              className="h-6 px-2 text-xs flex-1"
            >
              👁️
            </Button>
          </div>

          {activeTab === "editor" && (
            <>
              {/* Nome do Funil */}
              <div className="mb-3">
                <Label className="text-xs">Nome do Funil</Label>
                <Input
                  value={currentFunnel.name}
                  onChange={(e) =>
                    setCurrentFunnel((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="mt-1 text-sm h-8"
                  placeholder="Nome do seu quiz"
                />
              </div>
            </>
          )}

          {activeTab === "config" && (
            <div className="text-center text-xs text-muted-foreground py-2">
              Configurações detalhadas na coluna lateral
            </div>
          )}

          {activeTab === "preview" && (
            <div className="space-y-2">
              <Button
                size="sm"
                className="w-full h-7 text-xs"
                onClick={openPreview}
              >
                <Eye className="h-3 w-3 mr-1" />
                Preview
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="w-full h-7 text-xs"
                onClick={saveChanges}
              >
                <Save className="h-3 w-3 mr-1" />
                Salvar
              </Button>
            </div>
          )}

          {/* Navegação entre páginas */}
          <div className="flex items-center gap-1 mb-3">
            <Button
              size="sm"
              variant="outline"
              onClick={goToPreviousPage}
              disabled={currentPageIndex === 0}
              className="h-7 w-7 p-0"
            >
              <ArrowLeft className="h-3 w-3" />
            </Button>
            <span className="text-xs text-muted-foreground flex-1 text-center">
              {currentPageIndex + 1} de {currentFunnel.pages.length}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPageIndex === currentFunnel.pages.length - 1}
              className="h-7 w-7 p-0"
            >
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>

          {/* Botões de Ação do Funil */}
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={addNewPage}
              title="Adicionar Página"
              className="h-7 px-2"
            >
              <Plus className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={duplicatePage}
              title="Duplicar Página"
              className="h-7 px-2"
            >
              <Copy className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={exportFunnel}
              title="Exportar Funil"
              className="h-7 px-2"
            >
              <Download className="h-3 w-3" />
            </Button>
            <Button size="sm" title="Salvar Funil" className="h-7 px-2">
              <Save className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {/* Lista de Páginas */}
            <div className="space-y-1">
              {currentFunnel.pages.map((page, index) => (
                <div key={page.id} className="relative">
                  <Button
                    variant={index === currentPageIndex ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start h-auto p-2"
                    onClick={() => setCurrentPageIndex(index)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <Badge
                        variant="secondary"
                        className="text-xs h-5 w-5 p-0 flex items-center justify-center"
                      >
                        {index + 1}
                      </Badge>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-xs truncate">
                          {page.title}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {page.type} • {page.components.length} itens
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {page.progress}%
                      </div>
                    </div>
                  </Button>

                  {/* Conectores visuais */}
                  {index < currentFunnel.pages.length - 1 && (
                    <div className="flex justify-center mt-1 mb-1">
                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Templates Prontos */}
            <div className="mt-4">
              <h3 className="text-xs font-semibold mb-2">
                📋 TEMPLATES PRONTOS
              </h3>
              <div className="space-y-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-8 text-xs"
                  onClick={() => {
                    const newPages = [...currentFunnel.pages];
                    newPages[currentPageIndex] = REAL_QUIZ_TEMPLATES.intro;
                    setCurrentFunnel((prev) => ({ ...prev, pages: newPages }));
                  }}
                >
                  📝 Introdução
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-8 text-xs"
                  onClick={() => {
                    const realQuestions = generateRealQuestionTemplates();
                    const newPages = [...currentFunnel.pages];
                    newPages[currentPageIndex] = realQuestions[0]; // Primeira questão real
                    setCurrentFunnel((prev) => ({ ...prev, pages: newPages }));
                  }}
                >
                  🖼️ Questão Real (Visual)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-8 text-xs"
                  onClick={() => {
                    const realQuestions = generateRealQuestionTemplates();
                    const newPages = [...currentFunnel.pages];
                    newPages[currentPageIndex] = realQuestions[1]; // Segunda questão real
                    setCurrentFunnel((prev) => ({ ...prev, pages: newPages }));
                  }}
                >
                  📄 Questão Real (Texto)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-8 text-xs"
                  onClick={() => {
                    const newPages = [...currentFunnel.pages];
                    newPages[currentPageIndex] = REAL_QUIZ_TEMPLATES.loading;
                    setCurrentFunnel((prev) => ({ ...prev, pages: newPages }));
                  }}
                >
                  ⏳ Loading
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-8 text-xs"
                  onClick={() => {
                    const newPages = [...currentFunnel.pages];
                    newPages[currentPageIndex] = REAL_QUIZ_TEMPLATES.result;
                    setCurrentFunnel((prev) => ({ ...prev, pages: newPages }));
                  }}
                >
                  🎯 Resultado
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-8 text-xs"
                  onClick={() => {
                    const newPages = [...currentFunnel.pages];
                    newPages[currentPageIndex] = REAL_QUIZ_TEMPLATES.offer;
                    setCurrentFunnel((prev) => ({ ...prev, pages: newPages }));
                  }}
                >
                  💰 Oferta
                </Button>

                <div className="text-xs font-medium text-emerald-600 mt-2 mb-1">
                  📊 PÁGINAS DE VENDA
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-8 text-xs"
                  onClick={() => {
                    const newPages = [...currentFunnel.pages];
                    newPages[currentPageIndex] = QUIZ_TEMPLATES.salesPage;
                    setCurrentFunnel((prev) => ({ ...prev, pages: newPages }));
                  }}
                >
                  🏪 Vendas Completa
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-8 text-xs"
                  onClick={() => {
                    const newPages = [...currentFunnel.pages];
                    newPages[currentPageIndex] = QUIZ_TEMPLATES.checkout;
                    setCurrentFunnel((prev) => ({ ...prev, pages: newPages }));
                  }}
                >
                  💳 Checkout
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-8 text-xs"
                  onClick={() => {
                    const newPages = [...currentFunnel.pages];
                    newPages[currentPageIndex] = QUIZ_TEMPLATES.upsell;
                    setCurrentFunnel((prev) => ({ ...prev, pages: newPages }));
                  }}
                >
                  🚀 Upsell
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* COLUNA 2: COMPONENTES - 240px */}
      <div className="w-[240px] min-w-[240px] border-r bg-blue-50 overflow-hidden flex flex-col">
        <div className="p-3 border-b bg-blue-100">
          <h2 className="text-sm font-semibold mb-2 flex items-center gap-2">
            🧩 COMPONENTES
          </h2>
          <p className="text-xs text-muted-foreground">
            Arraste e solte no canvas
          </p>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-3">
            {/* Componentes Básicos */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold mb-2 text-blue-700">
                📝 BÁSICOS
              </h3>
              <div className="space-y-1">
                {COMPONENTS.slice(0, 10).map((componentType) => {
                  const Icon = componentType.icon;
                  return (
                    <div
                      key={componentType.type}
                      className="component-item p-2 rounded border cursor-grab bg-white hover:bg-blue-100 transition-colors"
                      draggable
                      onDragStart={(e) => handleDragStart(e, componentType)}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-3 w-3 text-blue-600" />
                        <div>
                          <div className="font-medium text-xs">
                            {componentType.name}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {componentType.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Componentes de Venda */}
            <div>
              <h3 className="text-xs font-semibold mb-2 text-emerald-700">
                💰 VENDAS
              </h3>
              <div className="space-y-1">
                {COMPONENTS.slice(10).map((componentType) => {
                  const Icon = componentType.icon;
                  return (
                    <div
                      key={componentType.type}
                      className="component-item p-2 rounded border cursor-grab bg-white hover:bg-emerald-100 transition-colors"
                      draggable
                      onDragStart={(e) => handleDragStart(e, componentType)}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-3 w-3 text-emerald-600" />
                        <div>
                          <div className="font-medium text-xs">
                            {componentType.name}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {componentType.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* COLUNA 3: CANVAS - Flex restante */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-4">
          {/* Header do Canvas */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{currentPage.type}</Badge>
              <span className="font-medium text-sm">{currentPage.title}</span>
              <Badge variant="secondary" className="text-xs">
                Página {currentPageIndex + 1} de {currentFunnel.pages.length}
              </Badge>
            </div>

            {/* Preview Controls */}
            <div className="flex gap-1">
              <Button
                variant={deviceView === "mobile" ? "default" : "outline"}
                size="sm"
                onClick={() => setDeviceView("mobile")}
                className="h-8 w-8 p-0"
              >
                <Smartphone className="h-3 w-3" />
              </Button>
              <Button
                variant={deviceView === "tablet" ? "default" : "outline"}
                size="sm"
                onClick={() => setDeviceView("tablet")}
                className="h-8 w-8 p-0"
              >
                <Tablet className="h-3 w-3" />
              </Button>
              <Button
                variant={deviceView === "desktop" ? "default" : "outline"}
                size="sm"
                onClick={() => setDeviceView("desktop")}
                className="h-8 w-8 p-0"
              >
                <Monitor className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className={`quiz-preview ${getDeviceClass()}`}>
              {/* Header */}
              {currentPage.showHeader && (
                <div
                  style={{
                    padding: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
                    alt="Logo"
                    style={{
                      maxWidth: "120px",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}

              {/* Progress Bar */}
              {currentPage.showProgress && (
                <div style={{ padding: "0 1rem 2rem" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "8px",
                      backgroundColor: "#E5E7EB",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${currentPage.progress}%`,
                        background:
                          "linear-gradient(90deg, #B89B7A 0%, #aa6b5d 100%)",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Content Area */}
              <div
                className="max-w-600px mx-auto"
                style={{ padding: "0 1rem 2rem" }}
              >
                {/* Drop Zone inicial */}
                {currentPage.components.length === 0 && (
                  <div
                    className="drop-zone"
                    style={{ minHeight: "200px" }}
                    onDragOver={(e) => handleDragOver(e, 0)}
                    onDrop={(e) => handleDrop(e, 0)}
                  >
                    Arraste componentes aqui para começar
                  </div>
                )}

                {/* Componentes */}
                {currentPage.components.map((component, index) =>
                  renderComponent(component, index)
                )}

                {/* Drop zone final */}
                {currentPage.components.length > 0 && (
                  <div
                    className={`drop-zone ${
                      dragOverIndex === currentPage.components.length
                        ? "drag-over"
                        : ""
                    }`}
                    onDragOver={(e) =>
                      handleDragOver(e, currentPage.components.length)
                    }
                    onDrop={(e) => handleDrop(e, currentPage.components.length)}
                  >
                    Adicionar mais componentes
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COLUNA 4: PROPRIEDADES - 300px */}
      <div className="w-[300px] min-w-[300px] border-l bg-amber-50 overflow-hidden flex flex-col">
        <div className="p-3 border-b bg-amber-100">
          <h2 className="text-sm font-semibold mb-1 flex items-center gap-2">
            ⚙️ PROPRIEDADES
          </h2>
          <p className="text-xs text-muted-foreground">
            {selectedComponent
              ? `Editando: ${
                  currentPage.components.find((c) => c.id === selectedComponent)
                    ?.type || "componente"
                }`
              : "Selecione um componente para editar"}
          </p>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-3">
            {activeTab === "config" ? (
              // ABA DE CONFIGURAÇÕES
              <>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Configurações do Quiz
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Seções de Configuração */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {[
                        { id: "domain", label: "Domínio", icon: Globe },
                        { id: "seo", label: "SEO", icon: BarChart3 },
                        { id: "pixel", label: "Pixels", icon: Target },
                        { id: "utm", label: "UTM", icon: Link },
                        { id: "scoring", label: "Pontuação", icon: Star },
                        { id: "results", label: "Resultados", icon: Eye },
                      ].map((section) => (
                        <Button
                          key={section.id}
                          size="sm"
                          variant={
                            activeConfigSection === section.id
                              ? "default"
                              : "outline"
                          }
                          onClick={() => setActiveConfigSection(section.id)}
                          className="h-7 px-2 text-xs"
                        >
                          <section.icon className="h-3 w-3 mr-1" />
                          {section.label}
                        </Button>
                      ))}
                    </div>

                    {/* Configuração de Domínio */}
                    {activeConfigSection === "domain" && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Configuração de Domínio
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label className="text-xs">Domínio Principal</Label>
                            <Input
                              value={quizConfig.domain}
                              onChange={(e) =>
                                updateQuizConfig({ domain: e.target.value })
                              }
                              placeholder="https://seudominio.com.br"
                              className="h-8 text-sm"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Domínio onde o quiz será publicado
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Configuração de SEO */}
                    {activeConfigSection === "seo" && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Configurações de SEO
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label className="text-xs">Título da Página</Label>
                            <Input
                              value={quizConfig.seo.title}
                              onChange={(e) =>
                                updateConfig("seo", { title: e.target.value })
                              }
                              placeholder="Quiz: Descubra Seu Estilo Pessoal"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Descrição Meta</Label>
                            <Textarea
                              value={quizConfig.seo.description}
                              onChange={(e) =>
                                updateConfig("seo", {
                                  description: e.target.value,
                                })
                              }
                              placeholder="Descubra seu estilo pessoal único com nosso quiz personalizado..."
                              className="text-sm resize-none"
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Palavras-chave</Label>
                            <Input
                              value={quizConfig.seo.keywords}
                              onChange={(e) =>
                                updateConfig("seo", {
                                  keywords: e.target.value,
                                })
                              }
                              placeholder="quiz estilo, moda feminina, consultoria"
                              className="h-8 text-sm"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Configuração de Pixels */}
                    {activeConfigSection === "pixel" && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Pixels e Tracking
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label className="text-xs">Facebook Pixel ID</Label>
                            <Input
                              value={quizConfig.pixel.facebookPixelId}
                              onChange={(e) =>
                                updateConfig("pixel", {
                                  facebookPixelId: e.target.value,
                                })
                              }
                              placeholder="1234567890123456"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">
                              Google Analytics ID
                            </Label>
                            <Input
                              value={quizConfig.pixel.googleAnalyticsId}
                              onChange={(e) =>
                                updateConfig("pixel", {
                                  googleAnalyticsId: e.target.value,
                                })
                              }
                              placeholder="G-XXXXXXXXXX"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div className="pt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full"
                            >
                              <Target className="h-3 w-3 mr-2" />
                              Testar Conexão
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Configuração de UTM */}
                    {activeConfigSection === "utm" && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Link className="h-4 w-4" />
                            Parâmetros UTM para A/B Test
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label className="text-xs">UTM Source</Label>
                            <Input
                              value={quizConfig.utm.source}
                              onChange={(e) =>
                                updateConfig("utm", { source: e.target.value })
                              }
                              placeholder="facebook"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">UTM Medium</Label>
                            <Input
                              value={quizConfig.utm.medium}
                              onChange={(e) =>
                                updateConfig("utm", { medium: e.target.value })
                              }
                              placeholder="cpc"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">UTM Campaign</Label>
                            <Input
                              value={quizConfig.utm.campaign}
                              onChange={(e) =>
                                updateConfig("utm", {
                                  campaign: e.target.value,
                                })
                              }
                              placeholder="quiz_style_2025"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">UTM Content</Label>
                            <Input
                              value={quizConfig.utm.content}
                              onChange={(e) =>
                                updateConfig("utm", { content: e.target.value })
                              }
                              placeholder="criativo-1"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">UTM Term</Label>
                            <Input
                              value={quizConfig.utm.term}
                              onChange={(e) =>
                                updateConfig("utm", { term: e.target.value })
                              }
                              placeholder="estilo_elegante"
                              className="h-8 text-sm"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Configuração de Pontuação */}
                    {activeConfigSection === "scoring" && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Star className="h-4 w-4" />
                            Sistema de Pontuação
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label className="text-xs">
                              Pontos por Questão Normal
                            </Label>
                            <Input
                              type="number"
                              value={quizConfig.scoring.normalQuestionPoints}
                              onChange={(e) =>
                                updateConfig("scoring", {
                                  normalQuestionPoints:
                                    parseInt(e.target.value) || 1,
                                })
                              }
                              min="1"
                              max="5"
                              className="h-8 text-sm"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Pontos atribuídos por resposta nas questões
                              normais
                            </p>
                          </div>

                          <div>
                            <Label className="text-xs">
                              Limite de Seleção - Questões Normais
                            </Label>
                            <Input
                              type="number"
                              value={quizConfig.scoring.normalSelectionLimit}
                              onChange={(e) =>
                                updateConfig("scoring", {
                                  normalSelectionLimit:
                                    parseInt(e.target.value) || 3,
                                })
                              }
                              min="1"
                              max="8"
                              className="h-8 text-sm"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Quantas opções obrigatórias (3 recomendado)
                            </p>
                          </div>

                          <div>
                            <Label className="text-xs">
                              Limite de Seleção - Questões Estratégicas
                            </Label>
                            <Input
                              type="number"
                              value={quizConfig.scoring.strategicSelectionLimit}
                              onChange={(e) =>
                                updateConfig("scoring", {
                                  strategicSelectionLimit:
                                    parseInt(e.target.value) || 1,
                                })
                              }
                              min="1"
                              max="3"
                              className="h-8 text-sm"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Quantas opções para questões estratégicas (2
                              recomendado)
                            </p>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={quizConfig.scoring.autoAdvanceNormal}
                                onCheckedChange={(checked) =>
                                  updateConfig("scoring", {
                                    autoAdvanceNormal: checked,
                                  })
                                }
                              />
                              <Label className="text-xs">
                                Avanço Automático - Questões Normais
                              </Label>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Avança automaticamente quando 3ª opção for
                              selecionada
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={
                                  quizConfig.scoring.autoAdvanceStrategic
                                }
                                onCheckedChange={(checked) =>
                                  updateConfig("scoring", {
                                    autoAdvanceStrategic: checked,
                                  })
                                }
                              />
                              <Label className="text-xs">
                                Avanço Automático - Questões Estratégicas
                              </Label>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Avança automaticamente nas questões estratégicas
                              (recomendado: desabilitado)
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Configuração de Resultados */}
                    {activeConfigSection === "results" && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            Configuração da Página de Resultados
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={quizConfig.results.showUserName}
                                onCheckedChange={(checked) =>
                                  updateConfig("results", {
                                    showUserName: checked,
                                  })
                                }
                              />
                              <Label className="text-xs">
                                Mostrar Nome do Usuário
                              </Label>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Exibe o nome preenchido no QuizIntro
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={quizConfig.results.showPrimaryStyle}
                                onCheckedChange={(checked) =>
                                  updateConfig("results", {
                                    showPrimaryStyle: checked,
                                  })
                                }
                              />
                              <Label className="text-xs">
                                Mostrar Estilo Predominante
                              </Label>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Exibe o estilo principal com barra de porcentagem
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={quizConfig.results.showSecondaryStyles}
                                onCheckedChange={(checked) =>
                                  updateConfig("results", {
                                    showSecondaryStyles: checked,
                                  })
                                }
                              />
                              <Label className="text-xs">
                                Mostrar Estilos Complementares
                              </Label>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Exibe 2º e 3º estilos com porcentagens
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={quizConfig.results.showStyleImages}
                                onCheckedChange={(checked) =>
                                  updateConfig("results", {
                                    showStyleImages: checked,
                                  })
                                }
                              />
                              <Label className="text-xs">
                                Mostrar Imagem do Estilo
                              </Label>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Exibe imagem representativa do estilo predominante
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={quizConfig.results.showStyleGuides}
                                onCheckedChange={(checked) =>
                                  updateConfig("results", {
                                    showStyleGuides: checked,
                                  })
                                }
                              />
                              <Label className="text-xs">
                                Mostrar Guia do Estilo
                              </Label>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Exibe imagem do guia referente ao estilo
                              predominante
                            </p>
                          </div>

                          <Separator />

                          <div className="bg-blue-50 p-3 rounded-lg">
                            <h4 className="text-xs font-semibold mb-2">
                              Configuração de Teste A/B
                            </h4>
                            <div className="space-y-1 text-xs">
                              <p>
                                <strong>Teste A (/resultado):</strong> Resultado
                                + Oferta na mesma página
                              </p>
                              <p>
                                <strong>
                                  Teste B (/quiz-descubra-seu-estilo):
                                </strong>{" "}
                                Apenas página de venda
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Botões de Ação */}
                    <div className="mt-4 space-y-2">
                      <Button
                        onClick={saveChanges}
                        className="w-full"
                        size="sm"
                      >
                        <Save className="h-3 w-3 mr-2" />
                        Salvar Configurações
                      </Button>
                      <Button
                        onClick={openPreview}
                        variant="outline"
                        className="w-full"
                        size="sm"
                      >
                        <Eye className="h-3 w-3 mr-2" />
                        Preview Produção
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : selectedComponent ? (
              renderPropertiesPanel()
            ) : (
              <div className="text-center text-muted-foreground mt-8">
                <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  Clique em um componente no canvas para editá-lo
                </p>
              </div>
            )}

            {/* Configurações da Página */}
            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">
                  Configurações da Página
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs">Título da Página</Label>
                  <Input
                    value={currentPage.title}
                    onChange={(e) =>
                      updateCurrentPage({ title: e.target.value })
                    }
                    className="h-8 text-sm"
                  />
                </div>

                <div>
                  <Label className="text-xs">Progresso (%)</Label>
                  <Input
                    type="number"
                    value={currentPage.progress}
                    onChange={(e) =>
                      updateCurrentPage({
                        progress: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                    max="100"
                    className="h-8 text-sm"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={currentPage.showHeader}
                    onCheckedChange={(checked) =>
                      updateCurrentPage({ showHeader: checked })
                    }
                  />
                  <Label className="text-xs">Mostrar Header</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={currentPage.showProgress}
                    onCheckedChange={(checked) =>
                      updateCurrentPage({ showProgress: checked })
                    }
                  />
                  <Label className="text-xs">Mostrar Progresso</Label>
                </div>
              </CardContent>
            </Card>

            {/* Ações Rápidas */}
            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={exportFunnel}
                  className="w-full justify-start"
                >
                  <Download className="h-3 w-3 mr-2" />
                  Exportar Funil
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    window.open(
                      `/quiz-preview?funnel=${encodeURIComponent(
                        JSON.stringify(currentFunnel)
                      )}`,
                      "_blank"
                    );
                  }}
                  className="w-full justify-start"
                >
                  <Eye className="h-3 w-3 mr-2" />
                  Preview Funil
                </Button>

                <Button size="sm" className="w-full justify-start">
                  <Save className="h-3 w-3 mr-2" />
                  Salvar Funil
                </Button>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SimpleDragDropEditor;
