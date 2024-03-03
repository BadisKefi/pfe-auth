"use server";

import { db } from "@/lib/db";
import { ProductFormSchema } from "@/schemas";
import { z } from "zod";

export async function CreateProduct(values: z.infer<typeof ProductFormSchema>) {
  const validatedFields = ProductFormSchema.safeParse(values);
  if (!validatedFields.success) return { error: "invalid fields!", data: null };
  const {
    label,
    price,
    images,
    description,
    detailedDescription,
    informations,
    category,
    stock,
  } = validatedFields.data;

  try {
    const createdProduct = await db.product.create({
      data: {
        label,
        price,
        images,
        description: description ?? "",
        detailedDescription: detailedDescription ?? "",
        informations: informations ?? "",
        categoryId: category,
        stock: stock,
      },
    });
    return { success: "product created!", data: createdProduct };
  } catch (e) {
    return { error: "something went wrong!", data: null };
  }
}

export async function ReadProducts() {
  try {
    const products = await db.product.findMany();
    if (!products || products.length === 0)
      return { error: "no products found!", data: null };
    return { success: "products found!", data: products };
  } catch (e) {
    return { error: "something went wrong!", data: null };
  }
}
export async function ReadProductsWithCategories() {
  try {
    const products = await db.product.findMany({
      include: {
        Category: true,
      },
    });
    if (!products || products.length === 0)
      return { error: "no products found!", data: null };
    return { success: "products found!", data: products };
  } catch (e) {
    return { error: "something went wrong!", data: null };
  }
}

export async function ReadProductsWithLimit({
  page,
  amountPerPage,
}: {
  page: number;
  amountPerPage: number;
}) {
  const skip = (page - 1) * amountPerPage;
  try {
    const products = await db.product.findMany({
      skip: skip,
      take: amountPerPage,
    });
    if (!products || products.length === 0)
      return { error: `no products found for page number ${page}`, data: null };
    return {
      success: `products found for page number ${page}`,
      data: products,
    };
  } catch (e) {
    return { error: "something went wrong!", data: null };
  }
}

export async function ReadProductById({ id }: { id: string }) {
  try {
    const product = await db.product.findUnique({
      where: { id },
      include: {
        Category: true,
      },
    });
    if (!product) return { error: `no product found for id ${id}`, data: null };
    return {
      success: `product found for id ${id}`,
      data: product,
    };
  } catch (e) {
    return { error: "something went wrong!", data: null };
  }
}

// export async function ReadProductBetweenPriceRange({
//   min,
//   max,
// }: {
//   min: number;
//   max: number;
// }) {
//   try {
//     const product = await db.product.findMany({
//       where: {
//         price: {
//           gte: min,
//           lte: max,
//         },
//       },
//     });
//     if (!product)
//       return { error: `no products found between ${min} & ${max}`, data: null };
//     return {
//       success: `products found for between ${min} & ${max}`,
//       data: product,
//     };
//   } catch (e) {
//     return { error: "something went wrong!", data: null };
//   }
// }

export async function ReadProductBySearchTerm({ term }: { term: string }) {
  try {
    const product = await db.product.findMany({
      where: {
        OR: [
          {
            label: {
              contains: term,
            },
          },
          /* {
            description: {
              contains: term,
            },
          }, */
        ],
      },
    });
    if (!product)
      return { error: `no products found for search term ${term}`, data: null };
    return {
      success: `products found for search term ${term}`,
      data: product,
    };
  } catch (e) {
    return { error: "something went wrong!", data: null };
  }
}

export async function UpdateProduct({
  id,
  values,
}: {
  id: string;
  values: z.infer<typeof ProductFormSchema>;
}) {
  const validatedFields = ProductFormSchema.safeParse(values);
  if (!validatedFields.success) return { error: "invalid fields!", data: null };
  const {
    label,
    price,
    description,
    detailedDescription,
    informations,
    images,
    category,
  } = validatedFields.data;

  try {
    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        label,
        price,
        description,
        detailedDescription,
        informations,
        images,
        categoryId: category,
      },
    });
    return { success: "product updated!", data: updatedProduct };
  } catch (e) {
    return { error: "something went wrong!", data: null };
  }
}

export async function DeleteProduct({ id }: { id: string }) {
  try {
    const deletedProduct = await db.product.delete({
      where: { id },
    });
    return { success: "product deleted!", data: deletedProduct };
  } catch (e) {
    return { error: "something went wrong!", data: null };
  }
}
