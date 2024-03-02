"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState, useTransition } from "react";
import { CategoryFormSchema } from "@/schemas";
import { useEdgeStore } from "@/lib/edgestore";
import { useRouter } from "next/navigation";
import Jodit from "./Jodit";
import { UpdateCategory } from "@/actions/category-action";
import { FileState } from "./MultiImageDropzoneTwoSingle";
import { MultiImageDropzoneUsageTwoSingle } from "./MultiImageDropzoneUsageTwoSingle";
import { Textarea } from "./ui/textarea";
import { Category } from "@/models";

export const UpdateCategoryForm = ({ category }: { category: Category }) => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [detailedDescriptionContent, setDetailedDescriptionContent] =
    useState<string>(category.detailedDescription || "");

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
    category.image ? convertImagesToFiles([category.image]) : []
  );
  const { edgestore } = useEdgeStore();

  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      label: category.label,
      image: category.image,
      description: category.description,
      detailedDescription: category.detailedDescription,
    },
  });
  const onSubmit = (values: z.infer<typeof CategoryFormSchema>) => {
    startTransition(async () => {
      setSuccess("");
      setError("");
      values.detailedDescription = detailedDescriptionContent;
      values.image = fileStates[0].file as string;

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
      if (category.id)
        UpdateCategory({ id: category.id, values }).then((response) => {
          setError(response.error);
          setSuccess(response.success);
        });
      router.push("/dashboard/categories");
      // router.refresh();
    });
  };

  return (
    <Form {...form}>
      {/* <ImagesFormField /> */}
      {/* <Tiptap /> */}
      <FormItem>
        <FormLabel>Image Banner</FormLabel>
        <FormControl>
          <MultiImageDropzoneUsageTwoSingle
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
                    placeholder="Category Label..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isPending}
                    placeholder="Category Description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
        </div>
        <FormSuccess message={success} />
        <FormError message={error} />
        <Button
          disabled={isPending || isPendingImages}
          type="submit"
          className="w-full"
        >
          Update Category
        </Button>
      </form>
    </Form>
  );
};
