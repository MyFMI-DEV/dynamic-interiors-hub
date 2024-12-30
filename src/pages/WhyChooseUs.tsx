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

      <nav className="bg-accent py-4 shadow-md">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center space-x-8">
            <li>
              <Link to="/how-it-works" className="text-primary hover:text-primary-light font-medium">
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/why-choose-us" className="text-primary hover:text-primary-light font-medium">
                Why Choose Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-12">
              Why Choose FindMyInteriors?
            </h1>
            <img 
              src="/lovable-uploads/bd18e090-6c0c-4e6b-b171-2697b28d3eb8.png"
              alt="Home Interior Layout"
              className="w-full rounded-lg shadow-lg mb-8"
            />
          </div>
          <div>
            <img 
              src="/lovable-uploads/6af940b2-5b76-4bcd-b7ca-68bf3f4ee3de.png"
              alt="Modern Interior Design"
              className="w-full rounded-lg shadow-lg mb-8"
            />
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
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:bg-primary/90 h-10 px-4 py-2"
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