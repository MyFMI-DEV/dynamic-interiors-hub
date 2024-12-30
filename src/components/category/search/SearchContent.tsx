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

const SearchContent = ({ title, groups, value, onSelect, onClose }: SearchContentProps) => {
  // Ensure groups is always an array and each group has valid items
  const safeGroups = (groups || []).map(group => ({
    ...group,
    items: Array.isArray(group.items) ? group.items : []
  }));
  
  return (
    <Command>
      <CommandInput placeholder={`Search ${title.toLowerCase()}...`} />
      <CommandEmpty>No {title.toLowerCase()} found.</CommandEmpty>
      {safeGroups.length > 0 ? (
        safeGroups.map((group) => (
          <CommandGroup key={group.heading} heading={group.heading}>
            {group.items.map((item) => (
              <SearchItem
                key={item}
                item={item}
                isActive={value === item.toLowerCase().replace(/\s+/g, '-')}
                onSelect={onSelect}
                onClose={onClose}
              />
            ))}
          </CommandGroup>
        ))
      ) : (
        <CommandEmpty>No {title.toLowerCase()} available.</CommandEmpty>
      )}
    </Command>
  );
};

export default SearchContent;