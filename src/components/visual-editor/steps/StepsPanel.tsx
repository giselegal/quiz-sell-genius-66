import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface EditorStage {
  id: string;
  name: string;
  type: "intro" | "quiz" | "strategic" | "transition" | "result" | "offer";
}

interface StepsPanelProps {
  stages: EditorStage[];
  currentStage: string;
  onStageSelect: (stageId: string) => void;
}

const getStageTypeColor = (type: string) => {
  switch (type) {
    case "intro":
      return "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 shadow-sm";
    case "quiz":
      return "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 shadow-sm";
    case "strategic":
      return "bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 shadow-sm";
    case "transition":
      return "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 shadow-sm";
    case "result":
      return "bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 shadow-sm";
    case "offer":
      return "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 shadow-sm";
    default:
      return "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-600 shadow-sm";
  }
};

const getStageTypeIcon = (type: string) => {
  switch (type) {
    case "intro":
      return "🏠";
    case "quiz":
      return "❓";
    case "strategic":
      return "🎯";
    case "transition":
      return "🔄";
    case "result":
      return "📊";
    case "offer":
      return "💎";
    default:
      return "📄";
  }
};

export const StepsPanel: React.FC<StepsPanelProps> = ({
  stages,
  currentStage,
  onStageSelect,
}) => {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex-shrink-0 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-bold">📋</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-0.5">Etapas</h3>
            <p className="text-xs text-slate-500 font-medium">
              {stages.length} {stages.length === 1 ? "etapa" : "etapas"}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1 px-1">
        <div className="p-4 space-y-2 pb-6">
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              className={cn(
                "group relative transition-all duration-300 ease-out",
                currentStage === stage.id
                  ? "transform scale-[1.02] z-10"
                  : "hover:transform hover:scale-[1.01]"
              )}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full h-auto p-0 rounded-2xl border-2 transition-all duration-300 shadow-sm hover:shadow-lg active:scale-[0.98]",
                  currentStage === stage.id
                    ? "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-200 shadow-lg ring-1 ring-blue-100"
                    : "bg-white border-slate-150 hover:border-slate-200 hover:bg-slate-50/70"
                )}
                onClick={() => onStageSelect(stage.id)}
              >
                <div className="w-full p-4">
                  {/* Stage Number & Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-sm",
                        currentStage === stage.id
                          ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                      )}
                    >
                      {index + 1}
                    </div>
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all duration-200",
                        currentStage === stage.id
                          ? "bg-white/50 backdrop-blur-sm"
                          : "group-hover:bg-slate-100/70"
                      )}
                    >
                      {getStageTypeIcon(stage.type)}
                    </div>
                  </div>

                  {/* Stage Name */}
                  <div className="text-left mb-3">
                    <h4
                      className={cn(
                        "font-semibold text-sm leading-tight transition-colors duration-200 break-words",
                        currentStage === stage.id
                          ? "text-slate-800"
                          : "text-slate-700 group-hover:text-slate-800"
                      )}
                    >
                      {stage.name}
                    </h4>
                  </div>

                  {/* Stage Type Badge */}
                  <div className="flex justify-end">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs font-medium px-3 py-1 rounded-full border-0 shadow-sm capitalize",
                        getStageTypeColor(stage.type),
                        currentStage === stage.id && "shadow-md"
                      )}
                    >
                      {stage.type}
                    </Badge>
                  </div>
                </div>

                {/* Active Indicator */}
                {currentStage === stage.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-gradient-to-b from-blue-400 to-indigo-600 rounded-r-full shadow-sm" />
                )}
              </Button>

              {/* Connector Line */}
              {index < stages.length - 1 && (
                <div className="absolute left-[18px] bottom-0 w-px h-2 bg-slate-200 transform translate-y-full" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100 flex-shrink-0 bg-white/60 backdrop-blur-sm">
        <div className="text-xs text-slate-500 text-center bg-slate-50/80 rounded-lg p-2 border border-slate-100">
          {currentStage ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse" />
              <span className="font-medium text-slate-600">
                Editando:{" "}
                {stages.find((s) => s.id === currentStage)?.name || "Etapa"}
              </span>
            </div>
          ) : (
            <span className="text-slate-400">
              Selecione uma etapa para editar
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
