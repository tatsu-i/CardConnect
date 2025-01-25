import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import AppSidebar from "../components/layout/sidebar/AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";
import MainContent from "@/components/layout/mainContent/MainContent";

const DashBoard = () => {
  const isMobile = useIsMobile();
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="absolute left-4 flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="flex flex-1 justify-center">
            <h1 className="text-2xl">CardConnect</h1>
          </div>
        </header>
        <MainContent />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashBoard;
