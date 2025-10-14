import { Carousel, Category, Image } from "@prisma/client";

export type CarouselWithImage = Carousel & {
  image: Image;
};

export type CategoryWithSub = Category & {
  parent: Category | null;
  children: CategoryWithSub[];
};
