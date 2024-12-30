import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LeadForm from "@/components/LeadForm";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <img 
            src="/lovable-uploads/d60fa430-dfe1-4db5-84c4-ac740134aa18.png" 
            alt="FindMyInteriors UK" 
            className="h-16 mx-auto"
          />
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
              onClick={() => window.location.href = "https://www.findmyinteriors.com"}
            >
              Start Browsing
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">For Sellers</h2>
            <p className="mb-4">Join for free and only pay for the leads you win through our credit system.</p>
            <Button 
              className="w-full"
              onClick={() => window.location.href = "https://www.findmyinteriors.com"}
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