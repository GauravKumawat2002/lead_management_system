import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import sideBarRoutes from "@/routes/side-bar-routes";
import Link from "next/link";
const companyLogo = "SERP DIGI SOLUTIONS";
const items = [
  {
    title: sideBarRoutes.at(0)?.name,
    url: sideBarRoutes.at(0)?.href,
    icon: Home,
  },
  {
    title: sideBarRoutes.at(1)?.name,
    url: sideBarRoutes.at(1)?.href,
    icon: Inbox,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{companyLogo} </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url as string}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
