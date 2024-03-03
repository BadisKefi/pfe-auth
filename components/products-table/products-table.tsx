import { Product } from "@/models";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import {
  ReadProducts,
  ReadProductsWithCategories,
} from "@/actions/product-action";

export const ProductsTable = async () => {
  const { success, error, data } = await ReadProductsWithCategories();
  console.log("data : ");
  console.log(data);
  return (
    <div>
      {<DataTable data={data ? (data as Product[]) : []} columns={columns} />}
    </div>
  );
};
