import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Home, Inbox } from "lucide-react";
import HeaderContent from "./HeaderContent";
import NavUser from "./NavUser";
import { Link } from "react-router-dom";

const items = [
  {
    title: "プロフィールカード",
    url: "/profilecard",
    icon: Home,
  },
  {
    title: "プロフィールカードを編集",
    url: "/editprofilecard",
    icon: Inbox,
  },
];

const AppSidebar = () => {
  const { openMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <HeaderContent />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      onClick={() => setOpenMobile(!openMobile)}
                    >
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
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
