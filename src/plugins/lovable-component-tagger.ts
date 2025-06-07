// Component Tagger Plugin para Lovable - Versão Segura e Otimizada
import { Plugin } from "vite";

export function componentTagger(): Plugin {
  console.log("🔧 Lovable Component Tagger Plugin inicializado");
  return {
    name: "lovable-component-tagger",
    enforce: "post" as const, // Mudado para 'post' para não conflitar com React SWC
    transform(code: string, id: string) {
      console.log(`🔍 Plugin processando: ${id}`);

      // Aplicar apenas em arquivos React/TSX específicos
      if (!id.match(/\.(tsx|jsx)$/)) {
        return null;
      }

      console.log(`✅ Arquivo TSX/JSX detectado: ${id}`);

      // Pular node_modules e arquivos de teste
      if (
        id.includes("node_modules") ||
        id.includes(".test.") ||
        id.includes(".spec.")
      ) {
        console.log(`⏭️ Pulando arquivo: ${id}`);
        return null;
      }

      try {
        // Estratégia mais segura: adicionar apenas metadados no início do arquivo
        const fileName =
          id
            .split("/")
            .pop()
            ?.replace(/\.(tsx|jsx)$/, "") || "Unknown";
        const componentName =
          fileName.charAt(0).toUpperCase() + fileName.slice(1);

        // Verificar se é um componente React válido (contém JSX)
        if (
          !code.includes("<") ||
          (!code.includes("React") && !code.includes("jsx"))
        ) {
          console.log(`⏭️ Não é componente React válido: ${id}`);
          return null;
        }

        console.log(`🎯 Adicionando metadados Lovable para: ${componentName}`);

        // Adicionar metadados Lovable de forma segura
        const lovableMetadata = `/* Lovable Component Metadata */
// @lovable-component: ${componentName}
// @lovable-file: ${id.replace(process.cwd(), "")}
// @lovable-timestamp: ${Date.now()}

`;

        const transformedCode = lovableMetadata + code;

        console.log(
          `✅ Metadados adicionados com sucesso para: ${componentName}`
        );

        return {
          code: transformedCode,
          map: null,
        };
      } catch (error) {
        // Em caso de erro, retornar código original
        console.warn(
          `Lovable Component Tagger: Error processing ${id}:`,
          error
        );
        return null;
      }
    },
  };
}
