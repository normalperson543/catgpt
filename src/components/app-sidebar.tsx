import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  CatIcon,
  GithubIcon,
  PanelRightIcon,
  SquarePenIcon,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import githubIcon from "@/assets/github.svg";

const items = [
  {
    title: "New meow",
    href: "#",
    icon: SquarePenIcon,
  },
];

function SidebarToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      size="icon-sm"
      onClick={(event) => {
        event.stopPropagation();
        toggleSidebar();
      }}
      variant="ghost"
    >
      <PanelRightIcon
        width={12}
        height={12}
        className="text-muted-foreground"
      />
    </Button>
  );
}
function HomeButton() {
  return (
    <Button
      size="icon-sm"
      variant="ghost"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <CatIcon width={36} height={36} />
    </Button>
  );
}
export default function AppSidebar() {
  const { open, toggleSidebar } = useSidebar();
  const [hovering, setHovering] = useState(false);
  return (
    <Sidebar
      collapsible="icon"
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={!open ? `cursor-ew-resize` : ""}
      onClick={() => {
        if (!open) toggleSidebar();
      }}
    >
      <SidebarHeader>
        <div className="flex flex-row">
          <div className="flex-1">
            {!open ? (
              hovering ? (
                <Tooltip>
                  <TooltipTrigger>
                    <SidebarToggle />
                  </TooltipTrigger>
                  <TooltipContent>Open me sidebar meow</TooltipContent>
                </Tooltip>
              ) : (
                <HomeButton />
              )
            ) : (
              <HomeButton />
            )}
          </div>
          {open && <SidebarToggle />}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <a href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <SidebarMenuButton size="lg">
                  <Avatar className="rounded-full">
                    <AvatarImage src="https://avatars.githubusercontent.com/u/148504965" />
                  </Avatar>
                  <div className="flex flex-col">
                    <p>normalperson543</p>
                    <p className="text-muted-foreground">Click me :3</p>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <a href="https://github.com/normalperson543/catgpt" target="_blank">
                      <img src={githubIcon} width={24} height={24} />
                      GitHub repository
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
