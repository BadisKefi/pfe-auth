"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { CheckIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useEffect, useState, useTransition } from "react";
import { ProductFormSchema } from "@/schemas";
import { ImagesFormField } from "@/components/images-form-field";
import { useEdgeStore } from "@/lib/edgestore";
import { useRouter } from "next/navigation";
import Tiptap from "./Tiptap";
import Jodit from "./Jodit";
import { UpdateProduct } from "@/actions/product-action";
import { FileState, MultiImageDropzoneTwo } from "./MultiImageDropzoneTwo";
import { MultiImageDropzoneUsageTwo } from "./MultiImageDropzoneUsageTwo";
import { ReadCategories } from "@/actions/category-action";

export const UpdateProductForm = ({
  product,
  category,
}: {
  product: Product;
  category: Category;
}) => {
  console.log("------------");
  console.log(category);
  console.log(product);

  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
      return str; // Return the original string if it's shorter than or equal to the maxLength
    } else {
      return str.substring(0, maxLength) + "..."; // Truncate the string and add ellipsis
    }
  }
  useEffect(() => {
    ReadCategories().then((res) => setCategories(res.data as Category[]));
  }, []);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [descriptionContent, setDescriptionContent] = useState<string>(
    product.description || ""
  );
  const [detailedDescriptionContent, setDetailedDescriptionContent] =
    useState<string>(product.detailedDescription || "");
  const [informationsContent, setInformationsContent] = useState<string>(
    product.informations || ""
  );
  const [isPending, startTransition] = useTransition();
  const [isPendingImages, startTransitionImages] = useTransition();
  function extractNameFromUrl(url: string) {
    const filename = url.split("/").pop()?.split(".")[0];
    if (filename) return filename;
  }
  function convertImagesToFiles(images: string[]): FileState[] {
    return images.map((url) => ({
      file: url,
      key: extractNameFromUrl(url) || "",
      progress: "COMPLETE",
    }));
  }

  const [fileStates, setFileStates] = useState<FileState[]>(
    product.images ? convertImagesToFiles(product.images) : []
  );
  const { edgestore } = useEdgeStore();

  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      label: product.label,
      price: product.price,
      images: product.images,
      description: product.description,
      detailedDescription: product.detailedDescription,
      informations: product.informations,
      category: category.id,
    },
  });
  const onSubmit = (values: z.infer<typeof ProductFormSchema>) => {
    startTransition(async () => {
      setSuccess("");
      setError("");

      const priceAsString: unknown = values.price;
      const price: number = parseFloat(String(priceAsString));
      values.price = price;
      values.images = fileStates.map((f) => f.file as string);
      values.description = descriptionContent;
      values.detailedDescription = detailedDescriptionContent;
      values.informations = informationsContent;
      console.log("new value for images : ");
      console.info(values.images);
      await Promise.all(
        fileStates.map(async (fs) => {
          try {
            await edgestore.publicFiles.confirmUpload({
              url: fs.file as string,
            });
          } catch (err) {
            console.log("error validating images");
          }
        })
      );
      if (product.id)
        UpdateProduct({ id: product.id, values }).then((response) => {
          setError(response.error);
          setSuccess(response.success);
        });
      router.push("/dashboard/products");
      // router.refresh();
    });
  };
  console.log("oooooooooooo");
  console.log(form.getValues());
  return (
    <Form {...form}>
      {/* <ImagesFormField /> */}
      {/* <Tiptap /> */}
      <FormItem>
        <FormLabel>Images</FormLabel>
        <FormControl>
          <MultiImageDropzoneUsageTwo
            fileStates={fileStates}
            setFileStates={setFileStates}
            startTransition={startTransitionImages}
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Product Label..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Jodit
                content={descriptionContent}
                setContent={setDescriptionContent}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Detailed Description</FormLabel>
            <FormControl>
              <Jodit
                content={detailedDescriptionContent}
                setContent={setDetailedDescriptionContent}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Informations Table</FormLabel>
            <FormControl>
              <Jodit
                content={informationsContent}
                setContent={setInformationsContent}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    disabled={isPending}
                    placeholder="00.00"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Select Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? categories.find(
                              (category) => category.id === field.value
                            )?.label
                          : "Select category"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search in categories..."
                        className="h-9"
                      />
                      <CommandEmpty>No category found.</CommandEmpty>
                      {!categories ? (
                        <CommandEmpty>No category found.</CommandEmpty>
                      ) : (
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              value={category.label}
                              key={category.id}
                              onSelect={() => {
                                form.setValue("category", category.id);
                              }}
                            >
                              {truncateString(category.label, 10).trim()}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  category.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the category that will be linked to this product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormSuccess message={success} />
        <FormError message={error} />
        <Button
          disabled={isPending || isPendingImages}
          type="submit"
          className="w-full"
        >
          Update Prodcut
        </Button>
      </form>
    </Form>
  );
};
