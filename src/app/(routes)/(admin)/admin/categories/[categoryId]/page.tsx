import { CategoryWithSub } from "@/types";
import { getCategoryById } from "@/servers/category";
import CategoryForm from "../_components/CategoryForm";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;
  const data: CategoryWithSub | null = await getCategoryById(categoryId);
  return <CategoryForm categoryData={data} />;
};

export default CategoryPage;
