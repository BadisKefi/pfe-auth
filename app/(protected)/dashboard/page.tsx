import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";

const DashboardPage = () => {
  return (
    <>
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <Separator />
    </>
  );
};

export default DashboardPage;
