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
import { CreateCategory } from "@/actions/category-action";
import { MultiImageDropzoneUsageTwoSingle } from "./MultiImageDropzoneUsageTwoSingle";
import { useEdgeStore } from "@/lib/edgestore";
import { useRouter } from "next/navigation";
import Jodit from "./Jodit";
import { FileState } from "./MultiImageDropzoneTwoSingle";
import { Textarea } from "./ui/textarea";

export const CreateCategoryForm = () => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [detailedDescriptionContent, setDetailedDescriptionContent] =
    useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [isPendingImages, startTransitionImages] = useTransition();
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      label: "",

      description: "",
      detailedDescription: "",
    },
  });
  const onSubmit = (values: z.infer<typeof CategoryFormSchema>) => {
    console.log("started...");
    startTransition(async () => {
      setSuccess("");
      setError("");
      values.detailedDescription = detailedDescriptionContent;

      if (fileStates[0])
        try {
          values.image = fileStates[0]?.file as string;
          await edgestore.publicFiles.confirmUpload({
            url: fileStates[0].file as string,
          });
        } catch (err) {
          console.log("error validating images");
        }
    });

    CreateCategory(values).then((response) => {
      setError(response.error);
      setSuccess(response.success);
    });
    router.push("/dashboard/categories");
    // router.refresh();
  };

  return (
    <Form {...form}>
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
          Create Category
        </Button>
      </form>
    </Form>
  );
};
