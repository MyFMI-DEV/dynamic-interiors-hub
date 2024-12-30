import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface SearchButtonProps {
  title: string;
}

const SearchButton = ({ title }: SearchButtonProps) => {
  return (
    <Button 
      variant="secondary" 
      className="min-w-[200px] justify-between"
    >
      {title}
      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );
};

export default SearchButton;