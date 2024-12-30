import { Link } from "react-router-dom";

const HowItWorks = () => {
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
          How FindMyInteriors Works
        </h1>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Browse Categories</h3>
            <p>
              Explore our comprehensive range of interior design services and choose
              the category that matches your needs.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Select Your Location</h3>
            <p>
              Find interior designers in your area who understand local styles and
              preferences.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Get Connected</h3>
            <p>
              We'll connect you with the best interior design professionals for a
              free initial consultation.
            </p>
          </div>
        </div>

        <div className="bg-secondary/10 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            What to Expect
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Free Initial Consultation</h3>
              <p>
                Every designer offers a free initial consultation to discuss your
                project, understand your needs, and provide preliminary advice.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Detailed Proposal</h3>
              <p>
                After the consultation, you'll receive a detailed proposal outlining
                the scope of work, timeline, and costs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Project Management</h3>
              <p>
                Your chosen designer will manage the entire project, from concept to
                completion, ensuring a smooth and stress-free experience.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Start Your Journey
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

export default HowItWorks;