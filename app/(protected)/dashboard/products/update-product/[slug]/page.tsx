import { ReadProductById } from "@/actions/product-action";
import { GoBackToListingProductsButton } from "@/components/go-back-to-listing-products-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UpdateProductForm } from "@/components/update-product-form";
import { Category, Product } from "@/models";
// import { UpdateProductForm } from "@/components/update-product-form";
const UpdateProductPage = async ({ params }: { params: { slug: string } }) => {
  const res = await ReadProductById({ id: params.slug });
  return (
    <>
      <div className="flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Manage Products!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a form to update your product!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <GoBackToListingProductsButton />
          </div>
        </div>
        {res.data && (
          <UpdateProductForm
            product={res.data as Product}
            category={res.data.Category as Category}
          />
        )}
      </div>
    </>
  );
};

export default UpdateProductPage;
