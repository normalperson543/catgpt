import { ArrowUpIcon } from "lucide-react";
import "./App.css";
import AppSidebar from "./components/app-sidebar";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "./components/ui/input-group";
import { SidebarProvider } from "./components/ui/sidebar";
import { Textarea } from "./components/ui/textarea";

function App() {
  return (
    <SidebarProvider className="w-full h-full">
      <AppSidebar />
      <div className="h-full w-full p-3">
        <div className="w-full flex flex-row gap-2 h-8 items-center">
          <p className="text-lg font-light">CatGPT</p>
        </div>
        <div className="h-full w-full p-2 flex items-center justify-center flex-col gap-8 -my-8">
          <h2 className="text-3xl tracking-wide font-light">
            Meow meow purr meow lick?
          </h2>
          <InputGroup className="w-1/2 rounded-full resize-none shadow-sm shadow-gray-300 p-2!">
            <InputGroupTextarea rows={1} placeholder="Ask anymeow" className="h-3"/>
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-sm" className="rounded-full" variant="default">
                <ArrowUpIcon width={24} height={24} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
