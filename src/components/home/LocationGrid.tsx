import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LocationGridProps {
  locations: string[] | undefined;
}

const LocationGrid = ({ locations }: LocationGridProps) => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-accent">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Available Locations</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Find interior design services and products in these major cities
        </p>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {locations?.map((city) => (
            <Button
              key={city}
              variant="outline"
              onClick={() => navigate(`/${city.toLowerCase()}/all`)}
              className="text-lg px-8 py-6 hover:bg-primary hover:text-white transition-colors"
            >
              {city}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationGrid;