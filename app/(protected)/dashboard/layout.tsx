import { cookies } from "next/headers";
import Dashboard from "./_components/dashboard";
import { UserRole } from "@prisma/client";
import { getCurrentRole } from "@/lib/current-role";
import { FormError } from "@/components/form-error";
import { UserButton } from "@/components/auth/user-button";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const role = await getCurrentRole();

  if (role && role !== UserRole.ADMIN) {
    return (
      <div className="w-screen h-screen flex justify-center items-center flex-col gap-2">
        <UserButton />
        <FormError message="go away hacker!" />

        <FormError message="you are not allowed in this place" />
      </div>
    );
  }
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
        {children}
      </Dashboard>
    </div>
  );
};

export default DashboardLayout;
