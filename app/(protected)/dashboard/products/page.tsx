import { ProductsTable } from "@/components/products-table/products-table";
import { ScrollArea } from "@/components/ui/scroll-area";
const ProductsPage = () => {
  return (
    <>
      <div className="flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Manage Products!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your products!
            </p>
          </div>
          <div className="flex items-center space-x-2"></div>
        </div>
        <ProductsTable />
      </div>
    </>
  );
};

export default ProductsPage;
