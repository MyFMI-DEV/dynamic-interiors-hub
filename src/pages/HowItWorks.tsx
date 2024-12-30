import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          How Find My Interiors Works
        </h1>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 rounded-lg border bg-card">
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
            <h3 className="text-xl font-semibold mb-4">Browse Categories</h3>
            <p className="text-muted-foreground">
              Explore our comprehensive directory of interior services and products in your area.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg border bg-card">
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
            <h3 className="text-xl font-semibold mb-4">Compare Options</h3>
            <p className="text-muted-foreground">
              Review detailed information about each provider and compare their services.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg border bg-card">
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
            <h3 className="text-xl font-semibold mb-4">Connect Directly</h3>
            <p className="text-muted-foreground">
              Contact your chosen providers directly through our platform.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            onClick={() => navigate("/london/all")}
            className="mx-auto"
          >
            Start Browsing Now
          </Button>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;