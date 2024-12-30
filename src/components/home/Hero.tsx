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
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <img 
          src="/lovable-uploads/d60fa430-dfe1-4db5-84c4-ac740134aa18.png" 
          alt="FindMyInteriors UK" 
          className="h-24 md:h-32 lg:h-40 mx-auto transition-all duration-300 hover:scale-105"
        />
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl mt-8 text-center font-bold">
          Discover Premium Home & Interior Solutions Near You
        </h1>
        <p className="text-white text-xl md:text-2xl mt-4 text-center font-light">
          Connect with Trusted Suppliers, Retailers, and Service Providers Today
        </p>
      </div>
    </header>
  );
};

export default Hero;