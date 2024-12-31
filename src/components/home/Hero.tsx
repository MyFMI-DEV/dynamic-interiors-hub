interface HeroProps {
  backgroundImage: string;
}

const Hero = ({ backgroundImage }: HeroProps) => {
  return (
    <header className="relative bg-primary py-8 md:py-16">
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage}
          alt="Modern interior design" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-primary/50"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
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