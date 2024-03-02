import { columns } from "./columns";
import { DataTable } from "./data-table";
import { ReadProducts } from "@/actions/product-action";

export const ProductsTable = async () => {
  const { success, error, data } = await ReadProducts();
  return <div>{<DataTable data={data ? data : []} columns={columns} />}</div>;
};
