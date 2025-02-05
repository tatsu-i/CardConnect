import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { fetchUserAccount } from "@/features/userAccount/userAccountSlice";
import useAuth from "@/hooks/useAuth";
import { RootState, AppDispatch } from "@/store/store";
import { supabase } from "@/utils/supabase";
import { ChevronsUpDown, LogOut, User } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearProfileCard } from "@/features/profileCard/profileCardSlice";

const NavUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { username, iconUrl } = useSelector(
    (state: RootState) => state.userAccount
  );
  const { user } = useAuth();
  const { openMobile, setOpenMobile } = useSidebar();

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    dispatch(clearProfileCard());

    if (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchUserAccount(user.id));
    }
  }, [user, dispatch]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={iconUrl} alt="Icon" />
                <AvatarFallback className="rounded-lg">Icon</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{username}</span>
                <span className="truncate text-xs">
                  {user?.email ?? "user email"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={iconUrl} alt="" />
                  <AvatarFallback className="rounded-lg">Icon</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{username}</span>
                  <span className="truncate text-xs">
                    {user?.email ?? "user email"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link
                to={"/editaccount"}
                onClick={() => setOpenMobile(!openMobile)}
              >
                <DropdownMenuItem className="cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <User />
                  Account
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to={"/editaccount"} onClick={handleLogOut}>
                <DropdownMenuItem className="cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUser;
