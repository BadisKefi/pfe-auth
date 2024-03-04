import { RoleGate } from "@/components/auth/role-gate";
import { Separator } from "@/components/ui/separator";
import { UsersTable } from "@/components/users-table/users-table";
import { UserRole } from "@prisma/client";
const UsersPage = () => {
  return (
    <RoleGate allowedRole={UserRole.ADMIN}>
      <div className="h-full overflow-y-auto flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Manage Users!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of users!
            </p>
          </div>
          <div className="flex items-center space-x-2"></div>
        </div>
        <UsersTable />
      </div>
    </RoleGate>
  );
};

export default UsersPage;
