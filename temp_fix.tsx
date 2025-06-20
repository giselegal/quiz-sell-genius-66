// Arquivo temporário para corrigir a estrutura JSX

// O problema está no switch case dentro da função renderEditPanel
// A estrutura correta seria:

switch (type) {
  case "image":
    return (
      <div className="space-y-4">
        {/* Conteúdo da case image */}
        <StylesEditor />
      </div>
    );

  case "input":
    return <div className="space-y-4">{/* Conteúdo da case input */}</div>;

  default:
    return null;
}
