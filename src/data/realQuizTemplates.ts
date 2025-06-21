// Templates baseados no quiz original com questões reais
import { QuizQuestion } from "@/types/quiz";
import { quizQuestions } from "@/data/quizQuestions";

// Interfaces locais baseadas no SimpleDragDropEditor
interface SimpleComponent {
  id: string;
  type: "title" | "subtitle" | "text" | "image" | "button" | "spacer" | "input" | "options" | "progress" | "logo";
  data: {
    text?: string;
    src?: string;
    alt?: string;
    height?: number;
    label?: string;
    placeholder?: string;
    required?: boolean;
    options?: Array<{
      id: string;
      text: string;
      image?: string;
      value: string;
      category?: string;
    }>;
    multiSelect?: boolean;
    hasImages?: boolean;
    progressValue?: number;
    price?: string;
    originalPrice?: string;
    installments?: string;
    currency?: string;
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

interface SimplePage {
  id: string;
  title: string;
  type: "intro" | "question" | "loading" | "result" | "offer";
  progress: number;
  showHeader: boolean;
  showProgress: boolean;
  components: SimpleComponent[];
}

// Função para converter questão real em template
const createQuestionTemplate = (question: QuizQuestion, pageIndex: number): SimplePage => {
  const components: SimpleComponent[] = [
    // Logo
    {
      id: `logo-${question.id}`,
      type: "logo",
      data: {
        src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
        alt: "Logo Gisele Galvão"
      },
      style: { textAlign: "center" as const, margin: "0 0 2rem 0" }
    },
    // Progress Bar
    {
      id: `progress-${question.id}`,
      type: "progress",
      data: { progressValue: Math.round((pageIndex / 21) * 100) },
      style: { margin: "0 0 3rem 0" }
    },
    // Título da questão
    {
      id: `title-${question.id}`,
      type: "title",
      data: { text: question.title },
      style: {
        fontSize: "1.75rem",
        fontWeight: "700",
        textAlign: "center" as const,
        color: "#432818",
        margin: "0 0 3rem 0"
      }
    },
    // Opções da questão
    {
      id: `options-${question.id}`,
      type: "options",
      data: {
        hasImages: question.type !== "text",
        multiSelect: true,
        options: question.options.map(opt => ({
          id: opt.id,
          text: opt.text,
          image: opt.imageUrl || undefined,
          value: opt.id,
          category: opt.styleCategory
        }))
      },
      style: {
        margin: "0 0 3rem 0"
      }
    }
  ];

  return {
    id: `page-${question.id}`,
    title: `Questão ${pageIndex + 1}: ${question.title.substring(0, 30)}...`,
    type: "question",
    progress: Math.round((pageIndex / 21) * 100),
    showHeader: true,
    showProgress: true,
    components
  };
};

// Templates das páginas principais
export const QUIZ_TEMPLATES = {
  intro: {
    id: "page-intro",
    title: "Introdução do Quiz",
    type: "intro" as const,
    progress: 0,
    showHeader: true,
    showProgress: false,
    components: [
      {
        id: "logo-intro",
        type: "logo" as const,
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
          alt: "Logo Gisele Galvão"
        },
        style: { textAlign: "center" as const, margin: "0 0 3rem 0" }
      },
      {
        id: "title-intro",
        type: "title" as const,
        data: { text: "DESCUBRA SEU ESTILO PESSOAL" },
        style: {
          fontSize: "2.5rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
          margin: "0 0 1rem 0"
        }
      },
      {
        id: "subtitle-intro",
        type: "subtitle" as const,
        data: { text: "Responda algumas perguntas e descubra qual estilo combina mais com você!" },
        style: {
          fontSize: "1.25rem",
          textAlign: "center" as const,
          color: "#8B5A3C",
          margin: "0 0 3rem 0"
        }
      },
      {
        id: "input-name",
        type: "input" as const,
        data: {
          label: "SEU NOME",
          placeholder: "Digite seu primeiro nome",
          required: true
        },
        style: { margin: "0 0 2rem 0" }
      },
      {
        id: "input-email",
        type: "input" as const,
        data: {
          label: "SEU MELHOR E-MAIL",
          placeholder: "seuemail@exemplo.com",
          required: false
        },
        style: { margin: "0 0 3rem 0" }
      },
      {
        id: "button-start",
        type: "button" as const,
        data: { text: "COMEÇAR O QUIZ" },
        style: {
          backgroundColor: "#B89B7A",
          color: "#FFFFFF",
          padding: "1rem 2rem",
          borderRadius: "8px",
          fontSize: "1.1rem",
          fontWeight: "600",
          textAlign: "center" as const
        }
      }
    ] as SimpleComponent[]
  },

  loading: {
    id: "page-loading",
    title: "Calculando Resultado",
    type: "loading" as const,
    progress: 95,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "logo-loading",
        type: "logo" as const,
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
          alt: "Logo"
        },
        style: { textAlign: "center" as const, margin: "0 0 3rem 0" }
      },
      {
        id: "title-loading",
        type: "title" as const,
        data: { text: "CALCULANDO SEU RESULTADO..." },
        style: {
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
          margin: "0 0 2rem 0"
        }
      },
      {
        id: "text-loading",
        type: "text" as const,
        data: { text: "Analisando suas respostas para descobrir seu estilo único..." },
        style: {
          textAlign: "center" as const,
          color: "#8B5A3C",
          fontSize: "1.1rem",
          margin: "0 0 3rem 0"
        }
      }
    ] as SimpleComponent[]
  },

  result: {
    id: "page-result",
    title: "Página de Resultado",
    type: "result" as const,
    progress: 100,
    showHeader: true,
    showProgress: false,
    components: [
      {
        id: "logo-result",
        type: "logo" as const,
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
          alt: "Logo"
        },
        style: { textAlign: "center" as const, margin: "0 0 2rem 0" }
      },
      {
        id: "title-result",
        type: "title" as const,
        data: { text: "SEU ESTILO PESSOAL É:" },
        style: {
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
          margin: "0 0 2rem 0"
        }
      },
      {
        id: "style-name",
        type: "subtitle" as const,
        data: { text: "[NOME DO ESTILO PREDOMINANTE]" },
        style: {
          fontSize: "2.5rem",
          fontWeight: "800",
          textAlign: "center" as const,
          color: "#B89B7A",
          margin: "0 0 1rem 0"
        }
      },
      {
        id: "style-percentage",
        type: "text" as const,
        data: { text: "85% de compatibilidade" },
        style: {
          textAlign: "center" as const,
          fontSize: "1.2rem",
          color: "#8B5A3C",
          margin: "0 0 3rem 0"
        }
      },
      {
        id: "style-image",
        type: "image" as const,
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp",
          alt: "Imagem do Estilo"
        },
        style: { textAlign: "center" as const, margin: "0 0 2rem 0" }
      },
      {
        id: "style-description",
        type: "text" as const,
        data: { text: "Seu estilo combina elegância e praticidade, sempre buscando peças versáteis que reflitam sua personalidade única." },
        style: {
          textAlign: "center" as const,
          fontSize: "1.1rem",
          color: "#432818",
          margin: "0 0 3rem 0",
          padding: "0 2rem"
        }
      },
      {
        id: "button-offer",
        type: "button" as const,
        data: { text: "VER GUIA COMPLETO DO SEU ESTILO" },
        style: {
          backgroundColor: "#B89B7A",
          color: "#FFFFFF",
          padding: "1rem 2rem",
          borderRadius: "8px",
          fontSize: "1.1rem",
          fontWeight: "600",
          textAlign: "center" as const
        }
      }
    ] as SimpleComponent[]
  },

  offer: {
    id: "page-offer",
    title: "Página de Oferta",
    type: "offer" as const,
    progress: 100,
    showHeader: true,
    showProgress: false,
    components: [
      {
        id: "logo-offer",
        type: "logo" as const,
        data: {
          src: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
          alt: "Logo"
        },
        style: { textAlign: "center" as const, margin: "0 0 2rem 0" }
      },
      {
        id: "title-offer",
        type: "title" as const,
        data: { text: "TRANSFORME SEU VISUAL COMPLETAMENTE" },
        style: {
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center" as const,
          color: "#432818",
          margin: "0 0 1rem 0"
        }
      },
      {
        id: "subtitle-offer",
        type: "subtitle" as const,
        data: { text: "Consultoria Personalizada de Imagem" },
        style: {
          fontSize: "1.5rem",
          textAlign: "center" as const,
          color: "#B89B7A",
          margin: "0 0 3rem 0"
        }
      },
      {
        id: "price-offer",
        type: "price" as const,
        data: {
          price: "197",
          originalPrice: "497",
          installments: "19,70",
          currency: "R$"
        },
        style: { textAlign: "center" as const, margin: "0 0 2rem 0" }
      },
      {
        id: "button-buy",
        type: "button" as const,
        data: { text: "QUERO TRANSFORMAR MEU VISUAL AGORA" },
        style: {
          backgroundColor: "#B89B7A",
          color: "#FFFFFF",
          padding: "1rem 2rem",
          borderRadius: "8px",
          fontSize: "1.2rem",
          fontWeight: "600",
          textAlign: "center" as const
        }
      }
    ] as SimpleComponent[]
  }
};

// Gerar templates das questões reais
export const generateRealQuestionTemplates = (): SimplePage[] => {
  return quizQuestions.map((question, index) => createQuestionTemplate(question, index));
};

// Templates completos do quiz
export const COMPLETE_QUIZ_TEMPLATES = {
  ...QUIZ_TEMPLATES,
  // Adicionar questões reais dinamicamente
  ...generateRealQuestionTemplates().reduce((acc, template, index) => {
    acc[`question${index + 1}`] = template;
    return acc;
  }, {} as Record<string, SimplePage>)
};
