import {
  Blog,
  Carousel,
  Category,
  Description,
  Image,
  Notion,
  Product,
  ProductMass,
} from "@prisma/client";

export type CarouselType = Carousel & {
  image: Image | null;
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
  category: {
    id: string;
    name: string;
  };

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
    mass?: {
      value: number;
    };
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

export type BlogType = Blog & {
  thumbnail: Image | null;
};

export type SectionInfoType = {
  title: string;
  description: string[];
  href: string;
};