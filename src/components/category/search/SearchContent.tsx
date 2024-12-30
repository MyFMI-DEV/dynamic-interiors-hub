import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "@/components/ui/command";
import SearchItem from "./SearchItem";

interface SearchContentProps {
  title: string;
  groups: { heading: string; items: string[] }[];
  value: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

const SearchContent = ({ title, groups = [], value, onSelect, onClose }: SearchContentProps) => {
  // Ensure groups is always an array
  const safeGroups = Array.isArray(groups) ? groups : [];
  
  return (
    <Command>
      <CommandInput placeholder={`Search ${title.toLowerCase()}...`} />
      <CommandEmpty>No {title.toLowerCase()} found.</CommandEmpty>
      {safeGroups.map((group) => (
        <CommandGroup key={group.heading} heading={group.heading}>
          {(group.items || []).map((item) => (
            <SearchItem
              key={item}
              item={item}
              isActive={value === item.toLowerCase().replace(/\s+/g, '-')}
              onSelect={onSelect}
              onClose={onClose}
            />
          ))}
        </CommandGroup>
      ))}
    </Command>
  );
};

export default SearchContent;