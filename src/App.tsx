import { CatIcon, CheckIcon, ChevronDownIcon } from "lucide-react";
import "./App.css";
import AppSidebar from "./components/app-sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
import { Button } from "./components/ui/button";
import { useState } from "react";
import Home from "./components/pages/home";

function App() {
  const [chatting, setChatting] = useState(false)
  return (
    <SidebarProvider className="w-full h-full">
      <AppSidebar />
      <div className="h-full w-full p-3">
        <div className="w-full flex flex-row gap-2 h-8 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex flex-row gap-2" variant="ghost">
                <p className="text-lg font-light">CatGPT</p>
                <ChevronDownIcon width={16} height={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <CatIcon width={32} height={32} />
                  <div className="flex flex-row gap-4 items-center">
                  <div className="flex flex-col">
                    <p>CatGPT</p>
                    <p className="text-muted-foreground">Great for everyday meowing tasks</p>
                  </div>
                    <CheckIcon width={12} height={12} />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {chatting ? <div></div>: <Home setChatting={() => setChatting(true)} />}
      </div>
    </SidebarProvider>
  );
}

export default App;
