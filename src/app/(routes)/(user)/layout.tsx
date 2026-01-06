import Footer from "@/app/(routes)/(user)/_components/Footer";
import Header from "@/app/(routes)/(user)/_components/Header";
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
