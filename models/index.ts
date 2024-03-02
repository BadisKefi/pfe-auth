import { UserRole } from "@prisma/client";

export type Product = {
  id?: string;
  label?: string;
  description?: string;
  detailedDescription?: string;
  reviews?: {
    name: string;
    stars: 1 | 2 | 3 | 4 | 5;
    value: string;
    email: string;
  }[];
  informations?: string;
  images?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  price?: number;
  soldedPrice?: number;
  category?: Category;
};

export type Category = {
  id: string;
  label: string;
  description?: string;
  detailedDescription?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  products?: Product[];
};

export type User = {
  id: string;
  name: string;
  isTwoFactorEnabled: boolean;
  role: UserRole;
  email: string;
  password: string;
};
