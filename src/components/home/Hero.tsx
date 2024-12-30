interface HeroProps {
  backgroundImage: string;
}

const Hero = ({ backgroundImage }: HeroProps) => {
  return (
    <header className="relative bg-primary py-12 md:py-24">
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage}
          alt="Modern interior design" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-primary/60"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <img 
          src="/lovable-uploads/d60fa430-dfe1-4db5-84c4-ac740134aa18.png" 
          alt="FindMyInteriors UK" 
          className="h-20 md:h-24 lg:h-32 mx-auto transition-all duration-300 hover:scale-105"
        />
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl mt-8 text-center font-bold leading-tight">
          Discover Interiors Solutions Near You
        </h1>
        <p className="text-white/90 text-xl md:text-2xl mt-4 text-center font-light max-w-2xl mx-auto">
          Connect with Trusted Suppliers and Service Providers for the Best Deals Today
        </p>
      </div>
    </header>
  );
};

export default Hero;