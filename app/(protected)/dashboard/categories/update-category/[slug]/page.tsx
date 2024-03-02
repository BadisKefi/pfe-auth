import { ReadCategoryById } from "@/actions/category-action";
import { GoBackToListingCategoriesButton } from "@/components/go-back-to-listing-categories-button";
import { Separator } from "@/components/ui/separator";
import { UpdateCategoryForm } from "@/components/update-category-form";
const UpdateCategoryPage = async ({ params }: { params: { slug: string } }) => {
  const res = await ReadCategoryById({ id: params.slug });
  return (
    <>
      <div className="h-full overflow-y-auto flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Manage Categories!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a form to update your category!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <GoBackToListingCategoriesButton />
          </div>
        </div>
        {res.data && <UpdateCategoryForm category={res.data} />}
      </div>
    </>
  );
};

export default UpdateCategoryPage;
