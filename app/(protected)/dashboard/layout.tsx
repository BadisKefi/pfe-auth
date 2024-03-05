import { cookies } from "next/headers";
import Dashboard from "./_components/dashboard";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultLayout = layout ? JSON.parse(layout.value) : [265, 1366];
  const defaultCollapsed =
    collapsed?.value === undefined
      ? true
      : collapsed
      ? JSON.parse(collapsed.value)
      : true;
  return (
    <div className="h-screen w-full flex-col md:flex">
      <Dashboard
        defaultLayout={defaultLayout}
        navCollapsedSize={4}
        defaultCollapsed={defaultCollapsed}
      >
        <ScrollArea className="h-full">{children}</ScrollArea>
      </Dashboard>
    </div>
  );
};

export default DashboardLayout;
