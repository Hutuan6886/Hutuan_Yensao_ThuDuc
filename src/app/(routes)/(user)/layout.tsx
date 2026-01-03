import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import { getCategories } from "@/servers/category";
import { CategoryType } from "@/types";

async function HomeLayout({ children }: { children: React.ReactNode }) {
  const categories: CategoryType[] = await getCategories();
    return (
      <div className="w-full min-h-screen">
        <Header categories={categories} />
        {children}
        <Footer />
      </div>
    );
}

export default HomeLayout;
