import { GoBackToListingProductsButton } from "@/components/go-back-to-listing-products-button";
import { Separator } from "@/components/ui/separator";
import { CreateProductForm } from "@/components/create-product-form";
const CreateProductPage = () => {
  return (
    <>
      <div className="h-full overflow-y-auto flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Manage Products!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a form to create new product!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <GoBackToListingProductsButton />
          </div>
        </div>
        <CreateProductForm />
      </div>
    </>
  );
};

export default CreateProductPage;
