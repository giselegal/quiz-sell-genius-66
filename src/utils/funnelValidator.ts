import { QuizFunnel, ResultPageBlock } from "@/types/quizResult";

type ValidationIssue = {
  level: "error" | "warning";
  message: string;
  context?: Record<string, any>;
};

const ALLOWED_BLOCK_TYPES: ResultPageBlock["type"][] = [
  "title",
  "subtitle",
  "styleResult",
  "image",
  "text",
  "cta",
  "testimonial",
  "bonus",
  "guarantee",
  "carousel",
];

function validateBlock(
  block: ResultPageBlock,
  index: number
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!block.id) {
    issues.push({
      level: "error",
      message: `Bloco #${index} sem id`,
      context: { index },
    });
  }

  if (!ALLOWED_BLOCK_TYPES.includes(block.type)) {
    issues.push({
      level: "error",
      message: `Tipo de bloco inválido: ${block.type}`,
      context: { id: block.id },
    });
  }

  if (typeof block.order !== "number") {
    issues.push({
      level: "error",
      message: `Bloco ${block.id} sem ordem numérica`,
    });
  }

  if (block.type === "cta") {
    const btn = (block.settings || {}).buttonText;
    const url = (block.settings || {}).url;
    if (!btn || typeof btn !== "string") {
      issues.push({
        level: "error",
        message: `CTA ${block.id} sem buttonText válido`,
      });
    }
    if (!url || typeof url !== "string" || !/^https?:\/\//.test(url)) {
      issues.push({
        level: "error",
        message: `CTA ${block.id} com URL inválida`,
        context: { url },
      });
    }
  }

  if (block.type === "styleResult") {
    const styleCategory = (block.settings || {}).styleCategory;
    if (!styleCategory || typeof styleCategory !== "string") {
      issues.push({
        level: "error",
        message: `styleResult ${block.id} sem styleCategory`,
      });
    }
  }

  if (block.type === "testimonial") {
    const author = (block.settings || {}).author;
    if (!author || typeof author !== "string") {
      issues.push({
        level: "warning",
        message: `testimonial ${block.id} sem author`,
      });
    }
  }

  return issues;
}

export function validateFunnel(funnel: QuizFunnel): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!funnel) {
    return [{ level: "error", message: "Funil inexistente" }];
  }

  if (!funnel.resultPage) {
    issues.push({ level: "error", message: "Funil sem resultPage" });
    return issues;
  }

  const blocks = funnel.resultPage.blocks || [];

  // ordens únicas e sequenciais
  const orders = blocks.map((b) => b.order);
  const hasDuplicates = new Set(orders).size !== orders.length;
  if (hasDuplicates) {
    issues.push({
      level: "error",
      message: "Há ordens duplicadas entre os blocos",
      context: { orders },
    });
  }

  const sorted = [...orders].sort((a, b) => a - b);
  const sequential = sorted.every((v, i) => v === i);
  if (!sequential) {
    issues.push({
      level: "warning",
      message: "Ordens não sequenciais (0..n-1)",
      context: { orders },
    });
  }

  blocks.forEach((block, idx) => {
    issues.push(...validateBlock(block, idx));
  });

  return issues;
}

// Utilitário para ler do localStorage quando usado no browser
export function validateStoredFunnel(): ValidationIssue[] {
  try {
    const raw = localStorage.getItem("currentQuizFunnel");
    if (!raw)
      return [
        {
          level: "error",
          message: "Nenhum funil salvo em localStorage: currentQuizFunnel",
        },
      ];
    const funnel = JSON.parse(raw) as QuizFunnel;
    return validateFunnel(funnel);
  } catch (e) {
    return [
      {
        level: "error",
        message: "Falha ao ler funil salvo",
        context: { error: String(e) },
      },
    ];
  }
}
