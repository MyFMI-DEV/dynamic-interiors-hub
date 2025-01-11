import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySelectorProps {
  categories: string[] | undefined;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategorySelector = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategorySelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Category</label>
      <Select onValueChange={setSelectedCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories?.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelector;