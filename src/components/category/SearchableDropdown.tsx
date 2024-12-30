import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import SearchContent from "./search/SearchContent";

interface SearchableDropdownProps {
  title: string;
  groups: { heading: string; items: string[] }[];
  value: string;
  onSelect: (value: string) => void;
  isLoading?: boolean;
}

const SearchableDropdown = ({ 
  title, 
  groups = [], 
  value, 
  onSelect,
  isLoading = false 
}: SearchableDropdownProps) => {
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <Button 
        variant="secondary" 
        className="min-w-[200px] justify-between"
        disabled
      >
        Loading...
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="secondary" 
          className="min-w-[200px] justify-between"
        >
          {title}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <SearchContent
          title={title}
          groups={groups}
          value={value}
          onSelect={onSelect}
          onClose={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default SearchableDropdown;