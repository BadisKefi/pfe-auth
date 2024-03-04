import { UserTableSchema } from "@/schemas";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { ReadAllUsersWithoutPassword } from "@/actions/user";
import { z } from "zod";

export const UsersTable = async () => {
  const { success, error, data } = await ReadAllUsersWithoutPassword();
  console.warn("users must be those down:");
  console.warn(data);
  console.warn("users must be those up:");

  return <div>{<DataTable data={data ? data : []} columns={columns} />}</div>;
};
