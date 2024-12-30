import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LeadForm from "@/components/LeadForm";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBrowseClick = () => {
    navigate("/london/all"); // Default to London/all categories as starting point
    toast({
      title: "Welcome!",
      description: "Browse our selection of interior products and services.",
    });
  };

  const handleSellerClick = () => {
    toast({
      title: "Coming Soon",
      description: "Seller registration will be available shortly.",
    });
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
            <p className="mb-4">Join for free and only pay for the leads you win through our credit system.</p>
            <Button 
              className="w-full"
              onClick={handleSellerClick}
            >
              Post Free Today
            </Button>
          </Card>
        </div>

        <LeadForm />
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