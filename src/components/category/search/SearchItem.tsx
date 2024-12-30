import { CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";

interface SearchItemProps {
  item: string;
  isActive: boolean;
  onSelect: (value: string) => void;
  onClose: () => void;
}

const SearchItem = ({ item, isActive, onSelect, onClose }: SearchItemProps) => {
  return (
    <CommandItem
      key={item}
      onSelect={() => {
        onSelect(item);
        onClose();
      }}
      className="flex items-center justify-between"
    >
      {item}
      {isActive && <Check className="h-4 w-4" />}
    </CommandItem>
  );
};

export default SearchItem;