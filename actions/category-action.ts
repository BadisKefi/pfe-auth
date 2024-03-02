"use server";

import { db } from "@/lib/db";
import { CategoryFormSchema } from "@/schemas";
import { z } from "zod";

export async function CreateCategory(
  values: z.infer<typeof CategoryFormSchema>
) {
  const validatedFields = CategoryFormSchema.safeParse(values);
  if (!validatedFields.success) return { error: "invalid fields!", data: null };
  const { label, image, description, detailedDescription } =
    validatedFields.data;

  try {
    const createdCategory = await db.category.create({
      data: {
        label,
        image: image ? image : "",
        description: description ?? "",
        detailedDescription: detailedDescription ?? "",
      },
    });
    return { success: "category created!", data: createdCategory };
  } catch (e) {
    return { error: "something went wrong!", data: null };
  }
}

export async function ReadCategories() {
  try {
    const categories = await db.category.findMany();
    if (!categories || categories.length === 0)
      return { error: "no categories found!", data: null };
    return { success: "categories found!", data: categories };
  } catch (e) {
    return { error: "something went wrong!", data: null };
  }
}

export async function ReadCategoriesWithLimit({
  page,
  amountPerPage,
}: {
  page: number;
  amountPerPage: number;
}) {
  const skip = (page - 1) * amountPerPage;
  try {
    const categories = await db.category.findMany({
      skip: skip,
      take: amountPerPage,
    });
    if (!categories || categories.length === 0)
      return {
        error: `no categories found for page number ${page}`,
        data: null,
      };
    return {
      success: `categories found for page number ${page}`,
      data: categories,
    };
  } catch (e) {
    return { error: "something went wrong!", data: null };
  }
}

export async function ReadCategoryById({ id }: { id: string }) {
  try {
    const category = await db.category.findUnique({
      where: { id },
    });
    if (!category)
      return { error: `no category found for id ${id}`, data: null };
    return {
      success: `category found for id ${id}`,
      data: category,
    };
  } catch (e) {
    return { error: "something went wrong!", data: null };
  }
}

export async function ReadCategoryBySearchTerm({ term }: { term: string }) {
  try {
    const category = await db.category.findMany({
      where: {
        OR: [
          {
            label: {
              contains: term,
            },
          },
          {
            description: {
              contains: term,
            },
          },
          {
            detailedDescription: {
              contains: term,
            },
          },
        ],
      },
    });
    if (!category)
      return {
        error: `no categories found for search term ${term}`,
        data: null,
      };
    return {
      success: `categories found for search term ${term}`,
      data: category,
    };
  } catch (e) {
    return { error: "something went wrong!", data: null };
  }
}

export async function UpdateCategory({
  id,
  values,
}: {
  id: string;
  values: z.infer<typeof CategoryFormSchema>;
}) {
  const validatedFields = CategoryFormSchema.safeParse(values);
  if (!validatedFields.success) return { error: "invalid fields!", data: null };
  const { label, description, detailedDescription, image } =
    validatedFields.data;

  try {
    const updatedCategory = await db.category.update({
      where: { id },
      data: {
        label,
        description,
        detailedDescription,
        image,
      },
    });
    return { success: "category updated!", data: updatedCategory };
  } catch (e) {
    return { error: "something went wrong!", data: null };
  }
}

export async function DeleteCategory({ id }: { id: string }) {
  try {
    const deletedCategory = await db.category.delete({
      where: { id },
    });
    return { success: "category deleted!", data: deletedCategory };
  } catch (e) {
    return { error: "something went wrong!", data: null };
  }
}
