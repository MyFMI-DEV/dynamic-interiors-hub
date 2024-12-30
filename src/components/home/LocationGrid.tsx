import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LocationGridProps {
  locations: string[] | undefined;
}

const LocationGrid = ({ locations }: LocationGridProps) => {
  const navigate = useNavigate();

  return (
    <section className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-8">Available Locations</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {locations?.map((city) => (
          <Button
            key={city}
            variant="outline"
            onClick={() => navigate(`/${city.toLowerCase()}/all`)}
            className="text-lg"
          >
            {city}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default LocationGrid;