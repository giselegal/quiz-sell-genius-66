// Versão corrigida do ComponentPropertyEditor
const ComponentPropertyEditor: React.FC<{
  type: string;
  props: QuizComponentProps;
  onPropsChange: (newProps: Partial<QuizComponentProps>) => void;
}> = ({ type, props, onPropsChange }) => {
  const handleChange = (key: string, value: unknown) => {
    onPropsChange({ [key]: value });
  };

  // Editor de estilos JSON
  const StylesEditor = () => (
    <div className="space-y-3">
      <label className="text-sm font-medium leading-none text-zinc-100">
        Estilos (JSON)
      </label>
      <textarea
        className="flex min-h-[80px] w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        value={JSON.stringify(props.styles || {}, null, 2)}
        onChange={(e) => {
          try {
            const styles = JSON.parse(e.target.value);
            handleChange("styles", styles);
          } catch {
            // Ignora erros de parse durante a digitação
          }
        }}
        placeholder='{"color": "#FF0000", "fontSize": "1.2rem"}'
      />
    </div>
  );

  // Renderiza campos específicos para cada tipo de componente
  switch (type) {
    case "heading":
    case "text":
      return (
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Texto
            </label>
            <textarea
              className="flex min-h-[60px] w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              value={props.text || ""}
              onChange={(e) => handleChange("text", e.target.value)}
              placeholder="Digite o texto aqui..."
            />
          </div>
          <StylesEditor />
        </div>
      );

    case "image":
      return (
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              URL da Imagem
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={props.src || ""}
              onChange={(e) => handleChange("src", e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>
          <StylesEditor />
        </div>
      );

    case "button":
      return (
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium leading-none text-zinc-100">
              Texto do Botão
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-700 px-3 py-2 text-sm text-zinc-100"
              value={props.buttonText || ""}
              onChange={(e) => handleChange("buttonText", e.target.value)}
              placeholder="Ex: Continuar"
            />
          </div>
          <StylesEditor />
        </div>
      );

    default:
      return (
        <div className="space-y-4">
          <div className="text-zinc-400 text-sm text-center p-4 bg-zinc-800/50 rounded-md">
            Editor de propriedades para '{type}' em desenvolvimento.
          </div>
          <StylesEditor />
        </div>
      );
  }
};
