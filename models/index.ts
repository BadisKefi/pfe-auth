type Product = {
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

type Category = {
  id: string;
  label: string;
  description?: string;
  detailedDescription?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  products?: Product[];
};
