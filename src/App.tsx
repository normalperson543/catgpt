import { CatIcon, CheckIcon, ChevronDownIcon } from "lucide-react";
import "./App.css";
import AppSidebar from "./components/app-sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Button } from "./components/ui/button";
import { useRef, useState } from "react";
import Home from "./components/pages/home";
import type { ChatMessage, Token } from "./lib/types";
import Chatting from "./components/pages/chatting";
import { fakeGenerateImage, fakeTypeMessages } from "./lib/chat-api";

function createCancelToken() {
  let cancelled = false;
  return {
    cancel() {
      cancelled = true;
    },
    get isCancelled() {
      return cancelled;
    },
  }; // generated with AI
}
function App() {
  const [chatting, setChatting] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const token = useRef<Token>(null);

  function handleChat(message: string, generateImage: boolean) {
    const newMessages: ChatMessage[] = [
      ...messages,
      {
        actor: "user",
        message: message,
        complete: true,
      },
    ];
    setMessages(newMessages);
    token.current = createCancelToken();
    const generationRandomChance = Math.random();
    if (generationRandomChance < 0.9 && !generateImage) {
      fakeTypeMessages(newMessages, setMessages, setLoading, token.current);
    } else {
      // "generate" an image 10% of the time.
      fakeGenerateImage(newMessages, setMessages, setLoading);
    }
  }
  return (
    <SidebarProvider className="w-full h-full">
      <AppSidebar
        onHome={() => {
          token.current?.cancel();
          setMessages([]);
          setChatting(false);
          setLoading(false);
        }}
      />
      <div className="h-full w-full p-3 flex flex-col">
        <div className="w-full flex flex-row gap-2 h-8 items-center fixed top-3 bg-background">
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
                      <p className="text-muted-foreground">
                        Great for everyday meowing tasks
                      </p>
                    </div>
                    <CheckIcon width={12} height={12} />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {chatting ? (
          <Chatting
            messages={messages}
            loading={loading}
            onSend={(message, generateImage) => {
              handleChat(message, generateImage);
            }}
            onStop={() => token.current?.cancel()}
            onRegenerate={() => {
              console.log("b");
              const newMessages: ChatMessage[] = messages.filter(
                (m, i) => m.complete && i !== messages.length - 1,
              );
              setMessages(newMessages);
              token.current = createCancelToken();
              fakeTypeMessages(
                newMessages,
                setMessages,
                setLoading,
                token.current,
              );
            }}
          />
        ) : (
          <Home
            onChat={(message, generateImage) => {
              setChatting(true);
              handleChat(message, generateImage);
            }}
          />
        )}
      </div>
    </SidebarProvider>
  );
}

export default App;
