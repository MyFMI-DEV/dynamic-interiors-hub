import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBrowseClick = () => {
    navigate("/london/all");
    toast({
      title: "Welcome!",
      description: "Browse our selection of interior products and services.",
    });
  };

  const handlePlatformRedirect = () => {
    window.open("https://www.findmyinteriors.com", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary py-12 md:py-24">
        <div className="container mx-auto px-4">
          <img 
            src="/lovable-uploads/d60fa430-dfe1-4db5-84c4-ac740134aa18.png" 
            alt="FindMyInteriors UK" 
            className="h-24 md:h-32 lg:h-40 mx-auto transition-all duration-300 hover:scale-105"
          />
          <h2 className="text-white text-xl md:text-2xl mt-6 text-center font-light">
            Your Shortcut to the Best Deals on Home Products and Services
          </h2>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handlePlatformRedirect}
            className="gap-2 text-lg"
          >
            Sign up/login to post today <ExternalLink className="h-5 w-5" />
          </Button>
          <p className="mt-4 text-muted-foreground">
            Join our Find My Interiors Community today and connect with local experts to find the best products, service and deals
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-center text-text mb-8">
          Find Interior Products & Services in the UK
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">For Buyers</h2>
            <p className="mb-4">Access the best deals on home products and services, completely free!</p>
            <Button 
              className="w-full"
              onClick={handleBrowseClick}
            >
              Start Browsing
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">For Sellers</h2>
            <p className="mb-4">Join our platform to list your products and services.</p>
            <Button 
              className="w-full"
              onClick={handlePlatformRedirect}
            >
              Post on Platform <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>
      </main>

      <footer className="bg-primary text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} FindMyInteriors UK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;