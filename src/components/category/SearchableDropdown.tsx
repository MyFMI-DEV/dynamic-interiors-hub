import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";

interface SearchableDropdownProps {
  title: string;
  groups?: {
    heading: string;
    items: string[];
  }[];
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

  if (!Array.isArray(groups)) {
    console.warn('SearchableDropdown: groups prop is not an array');
    return null;
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
        <Command>
          <CommandInput placeholder={`Search ${title.toLowerCase()}...`} />
          <CommandEmpty>No {title.toLowerCase()} found.</CommandEmpty>
          {groups.map((group) => {
            if (!group || typeof group !== 'object') {
              console.warn('SearchableDropdown: Invalid group object');
              return null;
            }
            
            return (
              <CommandGroup key={group.heading} heading={group.heading}>
                {Array.isArray(group.items) && group.items.map((item) => {
                  if (typeof item !== 'string') {
                    console.warn('SearchableDropdown: Invalid item type');
                    return null;
                  }

                  const isActive = value === item.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <CommandItem
                      key={item}
                      onSelect={() => {
                        onSelect(item);
                        setOpen(false);
                      }}
                      className="flex items-center justify-between"
                    >
                      {item}
                      {isActive && <Check className="h-4 w-4" />}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchableDropdown;