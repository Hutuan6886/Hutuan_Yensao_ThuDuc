export type CarouselType = {
  id: string;
  url: string;
  image: ImageType;
};
export type CategoryType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  name: string;

  product: ProductType[];
};

export type MassType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  value: number;

  productMass: ProductMassType[];
};

export type ProductMassType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  price: number;
  discount: number;

  productId: string;
  //   product: ProductType;

  massId: string;
  mass: MassType;

  // orderItems: OrderItem[]
};

export type ProductType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  label: string;

  images: ImageType[];

  categoryId: string;
  category: CategoryType;

  productMass: ProductMassType[];
  notion: ProductNotionType[];
  description: ProductDescriptionType[];
};

export type ProductNotionType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  title: string;
  content: string;
};

export type ProductDescriptionType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  title: string;
  imageId?: string;
  image?: ImageType;
  content: string;
};

export type ImageType = {
  id: string;
  href: string;
  alt: string;
  //   createdAt: Date;
  //   updatedAt: Date;

  //   carousel?: CarouselType;

  //   productId: string;
  //   product: ProductType;
  //   description: ProductDescriptionType;
};
