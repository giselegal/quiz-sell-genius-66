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
  Users
} from "lucide-react";

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
    price?: number;
    originalPrice?: number;
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
  type: "intro" | "question" | "loading" | "result" | "offer" | "sales" | "checkout" | "upsell" | "thankyou" | "webinar" | "launch";
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

// Templates de páginas do funil completo
const QUIZ_TEMPLATES = {
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

  question1: {
    id: "question-1",
    title: "Questão Visual - Tipo de Roupa",
    type: "question" as const,
    progress: 25,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-1",
        type: "progress" as const,
        data: { progressValue: 25 },
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
        id: "options-1",
        type: "options" as const,
        data: {
          hasImages: true,
          multiSelect: false,
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
              text: "Informação de moda, inovação e funcionalidade",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/13_qccdqv.webp",
              value: "Contemporâneo",
              category: "Contemporâneo",
            },
            {
              id: "opt-4",
              text: "Luxo, refinamento e qualidade",
              image:
                "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_rqy7yh.webp",
              value: "Elegante",
              category: "Elegante",
            },
          ],
        },
        style: {},
      },
    ],
  },

  question2: {
    id: "question-2",
    title: "Questão de Personalidade",
    type: "question" as const,
    progress: 50,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "progress-2",
        type: "progress" as const,
        data: { progressValue: 50 },
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
        id: "options-2",
        type: "options" as const,
        data: {
          hasImages: false,
          multiSelect: false,
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
        id: "progress-3",
        type: "progress" as const,
        data: { progressValue: 75 },
        style: {},
      },
      {
        id: "title-4",
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
        id: "subtitle-2",
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
        id: "progress-4",
        type: "progress" as const,
        data: { progressValue: 100 },
        style: {},
      },
      {
        id: "title-5",
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
        id: "title-6",
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
        id: "subtitle-3",
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
        id: "button-2",
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
        id: "title-7",
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
        id: "subtitle-4",
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
        id: "image-2",
        type: "image" as const,
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp",
          alt: "Guia de estilo",
        },
        style: {},
      },
      {
        id: "text-1",
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
        id: "button-3",
        type: "button" as const,
        data: { text: "QUERO MEU GUIA AGORA" },
        style: {},
      },
    ],
  },
};

const SimpleDragDropEditor: React.FC = () => {
  // Estado do funil completo
  const [currentFunnel, setCurrentFunnel] = useState<QuizFunnel>({
    id: "quiz-funnel-1",
    name: "Quiz de Estilo Pessoal",
    pages: [
      QUIZ_TEMPLATES.intro,
      QUIZ_TEMPLATES.question1,
      QUIZ_TEMPLATES.question2,
      QUIZ_TEMPLATES.loading,
      QUIZ_TEMPLATES.result,
      QUIZ_TEMPLATES.offer,
    ],
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
            { id: "bonus1", title: "Bônus #1: Guia Completo", value: "R$ 197", description: "Material exclusivo para acelerar seus resultados" },
            { id: "bonus2", title: "Bônus #2: Acesso VIP", value: "R$ 297", description: "Grupo exclusivo para networking" }
          ],
        };
      case "faq":
        return {
          faqs: [
            { id: "faq1", question: "Como funciona a garantia?", answer: "Oferecemos 30 dias de garantia incondicional. Se não ficar satisfeito, devolvemos seu dinheiro." },
            { id: "faq2", question: "Quanto tempo tenho acesso?", answer: "O acesso é vitalício! Você pode acessar quando quiser, quantas vezes quiser." }
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

      case "options":
        return (
          <div style={{ margin: "16px 0" }}>
            {data.options?.map((option: QuizOption) => (
              <div
                key={option.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "16px",
                  margin: "8px 0",
                  background: "white",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  cursor: "pointer",
                }}
              >
                {data.hasImages && option.image && (
                  <img
                    src={option.image}
                    alt={option.text}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginRight: "12px",
                    }}
                  />
                )}
                <span>{option.text}</span>
              </div>
            ))}
          </div>
        );

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
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <img
                src={data.avatar || "https://via.placeholder.com/60x60/B89B7A/FFFFFF?text=👤"}
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
                  "{data.text || "Este produto mudou minha vida completamente! Recomendo para todos que querem resultados reais."}"
                </p>
                <div>
                  <p style={{ fontWeight: "600", color: "#432818", marginBottom: "4px" }}>
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
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "16px" }}>
                {data.title || "⏰ OFERTA LIMITADA!"}
              </h3>
              <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
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
                    <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>{value}</div>
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
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#065f46", marginBottom: "8px" }}>
                {data.title || "Garantia de 30 Dias"}
              </h3>
              <p style={{ color: "#047857" }}>
                {data.text || "Se não ficar satisfeito, devolvemos 100% do seu dinheiro!"}
              </p>
            </div>
          </div>
        );

      case "bonus":
        return (
          <div style={{ margin: "24px 0" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "600", textAlign: "center", marginBottom: "16px", color: "#432818" }}>
              🎁 BÔNUS EXCLUSIVOS
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {(data.bonuses || [
                { id: "bonus1", title: "Bônus #1: Guia Completo", value: "R$ 197", description: "Material exclusivo para acelerar seus resultados" },
                { id: "bonus2", title: "Bônus #2: Acesso VIP", value: "R$ 297", description: "Grupo exclusivo para networking" }
              ]).map((bonus: BonusItem, index: number) => (
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
                  <div style={{ marginRight: "12px", fontSize: "1.5rem" }}>🎁</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: "600", color: "#432818", marginBottom: "4px" }}>
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
            <h3 style={{ fontSize: "1.5rem", fontWeight: "600", textAlign: "center", marginBottom: "16px", color: "#432818" }}>
              ❓ Perguntas Frequentes
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {(data.faqs || [
                { id: "faq1", question: "Como funciona a garantia?", answer: "Oferecemos 30 dias de garantia incondicional. Se não ficar satisfeito, devolvemos seu dinheiro." },
                { id: "faq2", question: "Quanto tempo tenho acesso?", answer: "O acesso é vitalício! Você pode acessar quando quiser, quantas vezes quiser." }
              ]).map((faq: FaqItem, index: number) => (
                <div
                  key={index}
                  style={{
                    padding: "16px",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <h4 style={{ fontWeight: "600", color: "#432818", marginBottom: "8px" }}>
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px" }}>
                <span style={{ fontSize: "1.5rem" }}>👥</span>
                <span style={{ fontSize: "1.25rem", fontWeight: "600", color: "#432818" }}>
                  +{data.customerCount || "5.000"} Clientes Satisfeitos
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "8px" }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#fbbf24", fontSize: "1.25rem" }}>⭐</span>
                ))}
              </div>
              <p style={{ fontSize: "0.875rem", color: "#6B4F43" }}>
                {data.rating || "4.9"}/5 - Baseado em {data.reviewCount || "1.247"} avaliações
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
                    updateComponent(component.id, { originalPrice: e.target.value })
                  }
                  placeholder="197"
                />
              </div>
              <div>
                <Label>Valor das Parcelas</Label>
                <Input
                  value={component.data.installments || ""}
                  onChange={(e) =>
                    updateComponent(component.id, { installments: e.target.value })
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
                    updateComponent(component.id, { customerCount: e.target.value })
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
                    updateComponent(component.id, { reviewCount: e.target.value })
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
      {/* Painel Lateral */}
      <div className="w-80 border-r bg-muted/30 overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-4">Editor de Funil</h2>

          {/* Nome do Funil */}
          <div className="mb-4">
            <Label className="text-xs">Nome do Funil</Label>
            <Input
              value={currentFunnel.name}
              onChange={(e) =>
                setCurrentFunnel((prev) => ({ ...prev, name: e.target.value }))
              }
              className="mt-1"
              placeholder="Nome do seu quiz"
            />
          </div>

          <div className="flex gap-1 mb-4">
            <Button
              variant={deviceView === "mobile" ? "default" : "outline"}
              size="sm"
              onClick={() => setDeviceView("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
            <Button
              variant={deviceView === "tablet" ? "default" : "outline"}
              size="sm"
              onClick={() => setDeviceView("tablet")}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={deviceView === "desktop" ? "default" : "outline"}
              size="sm"
              onClick={() => setDeviceView("desktop")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {/* Navegador de Páginas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Páginas do Funil</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Fluxo completo do quiz
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentFunnel.pages.map((page, index) => (
                    <div key={page.id} className="relative">
                      <Button
                        variant={
                          index === currentPageIndex ? "default" : "outline"
                        }
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setCurrentPageIndex(index)}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <Badge variant="secondary" className="text-xs">
                            {index + 1}
                          </Badge>
                          <div className="flex-1 text-left">
                            <div className="font-medium text-sm truncate">
                              {page.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {page.type} • {page.components.length} componentes
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
              </CardContent>
            </Card>

            {/* Configurações da Página Atual */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Configurações da Página
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label>Título da Página</Label>
                  <Input
                    value={currentPage.title}
                    onChange={(e) =>
                      updateCurrentPage({ title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Progresso (%)</Label>
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
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={currentPage.showHeader}
                    onCheckedChange={(checked) =>
                      updateCurrentPage({ showHeader: checked })
                    }
                  />
                  <Label>Mostrar Header</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={currentPage.showProgress}
                    onCheckedChange={(checked) =>
                      updateCurrentPage({ showProgress: checked })
                    }
                  />
                  <Label>Mostrar Progresso</Label>
                </div>
              </CardContent>
            </Card>

            {/* Templates Prontos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Templates do Quiz</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Substitua a página atual por um template
                </p>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    const newPages = [...currentFunnel.pages];
                    newPages[currentPageIndex] = QUIZ_TEMPLATES.intro;
                    setCurrentFunnel((prev) => ({ ...prev, pages: newPages }));
                  }}
                >
                  📝 Página de Introdução
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    const newPages = [...currentFunnel.pages];
                    newPages[currentPageIndex] = QUIZ_TEMPLATES.question1;
                    setCurrentFunnel((prev) => ({ ...prev, pages: newPages }));
                  }}
                >
                  🖼️ Questão Visual
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    const newPages = [...currentFunnel.pages];
                    newPages[currentPageIndex] = QUIZ_TEMPLATES.question2;
                    setCurrentFunnel((prev) => ({ ...prev, pages: newPages }));
                  }}
                >
                  📄 Questão de Texto
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    const newPages = [...currentFunnel.pages];
                    newPages[currentPageIndex] = QUIZ_TEMPLATES.loading;
                    setCurrentFunnel((prev) => ({ ...prev, pages: newPages }));
                  }}
                >
                  ⏳ Tela de Loading
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    const newPages = [...currentFunnel.pages];
                    newPages[currentPageIndex] = QUIZ_TEMPLATES.result;
                    setCurrentFunnel((prev) => ({ ...prev, pages: newPages }));
                  }}
                >
                  🎯 Página de Resultado
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    const newPages = [...currentFunnel.pages];
                    newPages[currentPageIndex] = QUIZ_TEMPLATES.offer;
                    setCurrentFunnel((prev) => ({ ...prev, pages: newPages }));
                  }}
                >
                  💰 Página de Oferta
                </Button>

                <Separator />

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={duplicatePage}
                >
                  <Copy className="h-3 w-3 mr-2" />
                  Duplicar Página Atual
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={addNewPage}
                >
                  <Plus className="h-3 w-3 mr-2" />
                  Adicionar Nova Página
                </Button>

                {currentFunnel.pages.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full justify-start"
                    onClick={deletePage}
                  >
                    <Trash2 className="h-3 w-3 mr-2" />
                    Excluir Página
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Componentes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Componentes</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Arraste e solte no editor
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {COMPONENTS.map((componentType) => {
                    const Icon = componentType.icon;
                    return (
                      <div
                        key={componentType.type}
                        className="component-item p-3 rounded-lg border cursor-grab"
                        draggable
                        onDragStart={(e) => handleDragStart(e, componentType)}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <div>
                            <div className="font-medium text-sm">
                              {componentType.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {componentType.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Painel de Propriedades */}
            {selectedComponent && renderPropertiesPanel()}
          </div>
        </ScrollArea>
      </div>

      {/* Editor Principal */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{currentPage.type}</Badge>
              <span className="font-medium">{currentPage.title}</span>
              <Badge variant="secondary" className="text-xs">
                Página {currentPageIndex + 1} de {currentFunnel.pages.length}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              {/* Navegação entre páginas */}
              <div className="flex items-center gap-1 mr-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={goToPreviousPage}
                  disabled={currentPageIndex === 0}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={goToNextPage}
                  disabled={currentPageIndex === currentFunnel.pages.length - 1}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  // Preview do funil completo
                  window.open(
                    `/quiz-preview?funnel=${encodeURIComponent(
                      JSON.stringify(currentFunnel)
                    )}`,
                    "_blank"
                  );
                }}
              >
                <Play className="h-4 w-4 mr-2" />
                Testar Funil
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => console.log("Preview:", currentPage)}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>

              <Button size="sm" variant="outline" onClick={exportFunnel}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>

              <Button size="sm">
                <Save className="h-4 w-4 mr-2" />
                Salvar Funil
              </Button>
            </div>
          </div>

          {/* Preview Area */}
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
    </div>
  );
};

export default SimpleDragDropEditor;
