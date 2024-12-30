import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Category {
  main_category: string;
  sub_categories: string[];
}

interface CategoryTabsProps {
  categories: Category[];
  location: string;
}

const CategoryTabs = ({ categories, location }: CategoryTabsProps) => {
  return (
    <Tabs defaultValue={categories[0]?.main_category} className="w-full">
      <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-transparent">
        {categories.map((cat) => (
          <TabsTrigger
            key={cat.main_category}
            value={cat.main_category}
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            {cat.main_category}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((cat) => (
        <TabsContent key={cat.main_category} value={cat.main_category}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.sub_categories.map((subCat) => (
              <Link
                key={subCat}
                to={`/${location}/${subCat.toLowerCase().replace(/\s+/g, '-')}`}
                className="p-4 bg-accent rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                {subCat}
              </Link>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CategoryTabs;