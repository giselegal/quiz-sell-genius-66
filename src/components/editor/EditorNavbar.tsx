import React from "react";
import { Button } from "@/components/ui/button";
import {
  Save,
  Undo,
  Redo,
  Play,
  Cloud,
  Settings,
  Palette,
  Workflow,
  PencilRuler,
  UserRoundSearch,
} from "lucide-react";

export const EditorNavbar: React.FC = () => {
  return (
    <div className="h-fit border-b relative z-[20] bg-zinc-950/50 backdrop-blur-lg">
      <div className="w-full flex flex-wrap md:flex-nowrap justify-between">
        {/* Left section - Logo and basic controls */}
        <div className="order-0 md:order-0 flex w-full max-w-[5.75rem] lg:max-w-[18rem]">
          <div className="border-r">
            <Button
              variant="ghost"
              className="inline-block relative font-bold px-4 py-[1rem] text-zinc-100 border border-transparent hover:-100 rounded-none h-full md:px-5"
            >
              <span className="h-full flex items-center w-full justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </span>
            </Button>
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex p-3 gap-1 md:gap-2">
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                disabled
              >
                <Redo className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Center section - Main navigation */}
        <div className="border-t md:border-t-0 md:order-1 w-full">
          <div className="md:mx-auto md:max-w-[32rem] flex h-full items-center justify-center p-1 md:p-0 gap-1 md:gap-2">
            <Button
              variant="default"
              className="ghost bg-primary text-foreground h-10 px-4 py-2"
            >
              <PencilRuler className="md:mr-2 md:mx-0 mx-4 h-4 w-4" />
              <span className="hidden md:inline">Construtor</span>
            </Button>
            <Button
              variant="ghost"
              className="hover:bg-primary hover:text-foreground h-10 px-4 py-2"
            >
              <Workflow className="md:mr-2 md:mx-0 mx-4 h-4 w-4" />
              <span className="hidden md:inline">Fluxo</span>
            </Button>
            <Button
              variant="ghost"
              className="hover:bg-primary hover:text-foreground h-10 px-4 py-2"
            >
              <Palette className="md:mr-2 md:mx-0 mx-4 h-4 w-4" />
              <span className="hidden md:inline">Design</span>
            </Button>
            <Button
              variant="ghost"
              className="hover:bg-primary hover:text-foreground h-10 px-4 py-2"
            >
              <UserRoundSearch className="md:mr-2 md:mx-0 mx-4 h-4 w-4" />
              <span className="hidden md:inline">Leads</span>
            </Button>
            <Button
              variant="ghost"
              className="hover:bg-primary hover:text-foreground h-10 px-4 py-2"
            >
              <Settings className="md:mr-2 md:mx-0 mx-4 h-4 w-4" />
              <span className="hidden md:inline">Configurações</span>
            </Button>
          </div>
        </div>

        {/* Right section - Action buttons */}
        <div className="md:flex hidden order-1 md:order-3 w-fit gap-1 md:gap-2 p-3">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"></path>
              <path d="M10 19v-3.96 3.15"></path>
              <path d="M7 19h5"></path>
              <rect width="6" height="10" x="16" y="12" rx="2"></rect>
            </svg>
          </Button>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <circle cx="12" cy="4.5" r="2.5"></circle>
              <path d="m10.2 6.3-3.9 3.9"></path>
              <circle cx="4.5" cy="12" r="2.5"></circle>
              <path d="M7 12h10"></path>
              <circle cx="19.5" cy="12" r="2.5"></circle>
              <path d="m13.8 17.7 3.9-3.9"></path>
              <circle cx="12" cy="19.5" r="2.5"></circle>
            </svg>
          </Button>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Play className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-10 px-4 py-2">
            <span className="md:inline hidden">Salvar</span>
            <Save className="w-4 h-4 md:hidden block" />
          </Button>
          <Button className="h-10 px-4 py-2">
            <span className="md:inline hidden">Publicar</span>
            <Cloud className="w-4 h-4 md:hidden block" />
          </Button>
        </div>
      </div>
    </div>
  );
};
