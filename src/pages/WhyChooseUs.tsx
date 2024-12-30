import { Link } from "react-router-dom";

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

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Why Choose FindMyInteriors?
        </h1>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Verified Providers</h3>
              <p>
                Every supplier, retailer, and service provider in our network undergoes
                a thorough vetting process. We check their credentials, product quality,
                service standards, and customer feedback to ensure you're working with
                reliable businesses.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Local Expertise</h3>
              <p>
                Our providers are familiar with local trends, supply chains, and
                market conditions. This local knowledge ensures you get products
                and services that perfectly match your area's style and requirements.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Free Consultations</h3>
              <p>
                Start your journey with a free consultation. Discuss your needs,
                explore product options, and understand service offerings before
                making any commitments.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Transparent Process</h3>
              <p>
                We believe in complete transparency. You'll receive detailed
                product information, clear pricing, and comprehensive service
                descriptions throughout your journey.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary/10 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Commitment to Quality
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Expert Selection</h3>
              <p>Only the top providers make it into our network.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Client Satisfaction</h3>
              <p>We maintain a 95% client satisfaction rate.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Project Support</h3>
              <p>Dedicated support throughout your entire journey.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Find Your Provider
          </Link>
        </div>
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} FindMyInteriors UK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default WhyChooseUs;