import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const WhyChooseUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <Link to="/">
            <img 
              src="/lovable-uploads/d60fa430-dfe1-4db5-84c4-ac740134aa18.png" 
              alt="FindMyInteriors UK" 
              className="h-16 mx-auto"
            />
          </Link>
        </div>
      </header>

      <Navigation />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Why Choose FindMyInteriors?
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your trusted partner in finding the perfect interior solutions for your home
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="bg-accent rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Verified Providers</h3>
              <p className="text-gray-600">
                Every supplier, retailer, and service provider in our network undergoes
                a thorough vetting process. We check their credentials, product quality,
                service standards, and customer feedback to ensure you're working with
                reliable businesses.
              </p>
            </div>
            <div className="bg-accent rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Local Expertise</h3>
              <p className="text-gray-600">
                Our providers are familiar with local trends, supply chains, and
                market conditions. This local knowledge ensures you get products
                and services that perfectly match your area's style and requirements.
              </p>
            </div>
            <img 
              src="/lovable-uploads/6af940b2-5b76-4bcd-b7ca-68bf3f4ee3de.png"
              alt="Modern Interior Design"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-8">
            <img 
              src="/lovable-uploads/bd18e090-6c0c-4e6b-b171-2697b28d3eb8.png"
              alt="Home Interior Layout"
              className="w-full rounded-lg shadow-lg mb-8"
            />
            <div className="bg-primary/5 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-primary mb-8">
                Our Commitment to Quality
              </h2>
              <div className="grid gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-primary">Expert Selection</h3>
                  <p className="text-gray-600">Only the top providers make it into our network.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-primary">Client Satisfaction</h3>
                  <p className="text-gray-600">We maintain a 95% client satisfaction rate.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-primary">Project Support</h3>
                  <p className="text-gray-600">Dedicated support throughout your entire journey.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-accent rounded-lg p-12">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Ready to Transform Your Space?
          </h2>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:bg-primary/90 h-12 px-8 py-2"
          >
            Find Your Provider
          </Link>
        </div>
      </main>

      <footer className="bg-primary text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} FindMyInteriors UK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default WhyChooseUs;