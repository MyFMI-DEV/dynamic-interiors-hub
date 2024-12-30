import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const LeadForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here we'll add Supabase integration later
      toast({
        title: "Success!",
        description: "We'll be in touch soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        interest: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Get Started Today</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Input
            placeholder="What are you interested in?"
            value={formData.interest}
            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default LeadForm;