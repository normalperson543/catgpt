import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CatIcon, PanelRightIcon, SquarePenIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const items = [
  {
    title: "New chat",
    href: "#",
    icon: SquarePenIcon,
  },
];

function SidebarToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button size="icon-sm" onClick={toggleSidebar} variant="ghost">
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
    <Button size="icon-sm" variant="ghost">
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
      onClick={() => {toggleSidebar}
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
              <SidebarMenuButton asChild>
                <a href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
