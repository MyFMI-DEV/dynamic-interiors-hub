import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  location: string;
  subLocation: string;
  category?: string;
}

export const Breadcrumbs = ({ location, subLocation, category }: BreadcrumbsProps) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
      <Link to="/" className="hover:text-primary flex items-center">
        <Home className="h-4 w-4" />
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link to="/locations" className="hover:text-primary">
        Locations
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="font-medium text-foreground">
        {location}
      </span>
      <ChevronRight className="h-4 w-4" />
      <span className="font-medium text-foreground">
        {subLocation}
      </span>
      {category && (
        <>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">
            {category}
          </span>
        </>
      )}
    </nav>
  );
};