/**
 * Plugin Vite para adicionar tags de componentes Lovable
 * Necessário para que o Lovable possa identificar e editar componentes React
 */

export function componentTagger() {
  return {
    name: 'lovable-component-tagger',
    transform(code, id) {
      // Processa apenas arquivos React/TypeScript
      if (!/\.(jsx|tsx)$/.test(id)) {
        return null;
      }

      // Adiciona data attributes para componentes exportados
      const transformedCode = code.replace(
        /export\s+(default\s+)?(?:function|const|class)\s+(\w+)/g,
        (match, defaultExport, componentName) => {
          return `${match} /* @lovable-component: ${componentName} */`;
        }
      );

      return transformedCode !== code ? {
        code: transformedCode,
        map: null
      } : null;
    }
  };
}
