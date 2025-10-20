import {
  Carousel,
  Category,
  Description,
  Image,
  Notion,
  Product,
  ProductMass,
} from "@prisma/client";

export type CarouselType = Carousel & {
  image: Image;
};

export type CategoryType = Category & {
  children?: CategoryType[];
};

export type ProductType = {
  id: string;
  label: string;
  createdAt: Date;
  updatedAt: Date;

  // Category
  category: CategoryType;

  // Images
  images: {
    id: string;
    href: string;
    alt: string;
  }[];

  // ProductMass
  productMass: {
    id: string;
    price: number;
    discount: number;
    massId: string;
  }[];

  // Notion
  notion: {
    id: string;
    title: string;
    content: string;
  }[];

  // Description
  description: {
    id: string;
    title: string;
    content: string;
    image?: {
      id: string;
      href: string;
      alt: string;
    } | null;
  }[];
};
