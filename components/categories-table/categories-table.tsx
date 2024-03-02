import { columns } from "./columns";
import { DataTable } from "./data-table";
import { ReadCategories } from "@/actions/category-action";

export const CategoriesTable = async () => {
  const { success, error, data } = await ReadCategories();
  return <div>{<DataTable data={data ? data : []} columns={columns} />}</div>;
};
