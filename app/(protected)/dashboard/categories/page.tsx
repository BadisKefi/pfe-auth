import { CategoriesTable } from "@/components/categories-table/categories-table";
import { CreateCategoryButton } from "@/components/create-category-button";
import { Separator } from "@/components/ui/separator";

const CategoriesPage = () => {
  return (
    <>
      <div className="flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Manage Categories!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your categories!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <CreateCategoryButton />
          </div>
        </div>
        <CategoriesTable />
      </div>
    </>
  );
};

export default CategoriesPage;
