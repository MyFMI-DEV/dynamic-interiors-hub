const Features = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">Why Choose FindMyInteriors?</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              We're committed to connecting you with the best interior solutions
            </p>
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="bg-accent rounded-full w-16 h-16 flex-shrink-0 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">Verified Providers</h3>
                  <p className="text-muted-foreground">
                    All our suppliers and service providers are thoroughly vetted and reviewed for quality assurance.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group">
                <div className="bg-accent rounded-full w-16 h-16 flex-shrink-0 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">Free Consultation</h3>
                  <p className="text-muted-foreground">
                    Get free initial consultations with your chosen providers to discuss your project needs.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group">
                <div className="bg-accent rounded-full w-16 h-16 flex-shrink-0 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">Local Expertise</h3>
                  <p className="text-muted-foreground">
                    Find providers who understand your local market and can deliver solutions that match your preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/lovable-uploads/42ffcb97-aa24-47f0-834e-33757c6f5cae.png"
              alt="Home interior layout"
              className="w-full rounded-lg shadow-xl"
            />
            <img 
              src="/lovable-uploads/b47542a6-4411-407e-8cb4-28a1ca0f5371.png"
              alt="Interior design consultation"
              className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full border-4 border-white shadow-lg object-cover hidden md:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;