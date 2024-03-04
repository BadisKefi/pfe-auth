"use client";

import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Nav } from "./nav";
import { Boxes, Group, LayoutDashboard, Users } from "lucide-react";

import LogoPackedIn from "@/public/logo-packedin.png";
import LogoPackedInSquare from "@/public/logo-packedin-square.png";
import LogoPackedInDark from "@/public/logo-packedin-dark.png";
import LogoPackedInSquareDark from "@/public/logo-packedin-square-dark.png";
import React from "react";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "next-themes";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { UserButton } from "@/components/auth/user-button";
import { Logo } from "@/components/Logo";
import { UserNav } from "@/components/user-nav";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";

interface DashboardProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children: React.ReactNode;
}

const Dashboard = ({
  defaultLayout = [265, 655],
  defaultCollapsed = true,
  navCollapsedSize,
  children,
}: DashboardProps) => {
  const { theme, systemTheme } = useTheme();
  function extractLogoFromPureThemeAndCollapseState(
    t: string | undefined,
    st: string | undefined,
    c: boolean
  ) {
    if ((t === "system" && st === "dark") || t === "dark")
      return c ? LogoPackedInSquareDark : LogoPackedInDark;
    if ((t === "system" && st === "light") || t === "light")
      return c ? LogoPackedInSquare : LogoPackedIn;
  }
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <>
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes
            )}`;
          }}
          className="h-full items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={15}
            maxSize={20}
            onCollapse={() => {
              setIsCollapsed(true);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                true
              )}`;
            }}
            onExpand={() => {
              setIsCollapsed(false);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                false
              )}`;
            }}
            className={cn(
              isCollapsed &&
                "min-w-[50px] transition-all duration-300 ease-in-out"
            )}
          >
            <div className="flex justify-between flex-col h-full">
              <div>
                <div className="h-[22px]"></div>

                <div className="flex items-center justify-center">
                  <Logo
                    size={isCollapsed ? "sm" : "lg"}
                    className="h-11 w-auto"
                  />
                </div>
                <div className="h-[22px]"></div>
                <Separator />
                <div className="h-[22px]"></div>

                <Nav
                  isCollapsed={isCollapsed}
                  links={[
                    {
                      href: "/dashboard",
                      title: "Dashboard",
                      icon: LayoutDashboard,
                    },
                    {
                      href: "/dashboard/products",
                      title: "Products",
                      icon: Boxes,
                    },
                    {
                      href: "/dashboard/categories",
                      title: "Categories",
                      icon: Group,
                    },
                  ]}
                />
                <div className="h-[22px]"></div>

                <RoleGate allowedRole={UserRole.ADMIN}>
                  <Separator />
                  <div className="h-[22px]"></div>
                  <Nav
                    isCollapsed={isCollapsed}
                    links={[
                      {
                        href: "/dashboard/users",
                        title: "Users",
                        icon: Users,
                      },
                    ]}
                  />
                </RoleGate>
                <div className="h-[22px]"></div>
              </div>
              <div className="flex items-center justify-center mt-2 mb-2 gap-2 flex-wrap">
                <UserNav />
                <Separator
                  orientation={isCollapsed ? "horizontal" : "vertical"}
                />
                <ModeToggle />
              </div>
              {/* <div className="flex justify-center items-center gap-2 flex-col mb-2">
                <div>
                  <UserButton />
                </div>
              </div> */}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </>
  );
};

export default Dashboard;
