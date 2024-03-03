import { UserTableSchema } from "@/schemas";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { ReadAllUsersWithoutPassword } from "@/actions/user";

export const UsersTable = async () => {
  const { success, error, data } = await ReadAllUsersWithoutPassword();
  return <div>{<DataTable data={data ? data : []} columns={columns} />}</div>;
};
