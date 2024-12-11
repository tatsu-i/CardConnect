import React from "react";
import { SidebarProvider, SidebarTrigger } from "../../ui/sidebar";
import AppSidebar from "./AppSidebar";

const Sidebar = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  );
};

export default Sidebar;
