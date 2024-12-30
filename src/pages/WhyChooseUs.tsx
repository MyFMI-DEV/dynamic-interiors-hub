import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const WhyChooseUs = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      title: "Verified Professionals",
      description: "All listed professionals are thoroughly vetted and reviewed."
    },
    {
      title: "Local Expertise",
      description: "Find specialists who understand your local area and requirements."
    },
    {
      title: "Free to Use",
      description: "Access our entire network of professionals at no cost."
    },
    {
      title: "Direct Communication",
      description: "Connect directly with service providers, no middleman."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Why Choose Find My Interiors?
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 rounded-lg border bg-card">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center space-y-4">
          <p className="text-lg text-muted-foreground mb-6">
            Join thousands of homeowners who have found their perfect interior service providers through our platform.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/london/all")}
            className="mx-auto"
          >
            Find Professionals Now
          </Button>
        </div>
      </main>
    </div>
  );
};

export default WhyChooseUs;