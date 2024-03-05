import { GoBackToListingCategoriesButton } from "@/components/go-back-to-listing-categories-button";
import { Separator } from "@/components/ui/separator";
import { CreateCategoryForm } from "@/components/create-category-form";
import { ScrollArea } from "@/components/ui/scroll-area";
const CreateCategoryPage = () => {
  return (
    <>
      <div className="flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Manage Categories!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a form to create new category!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <GoBackToListingCategoriesButton />
          </div>
        </div>
        <CreateCategoryForm />
      </div>
    </>
  );
};

export default CreateCategoryPage;
