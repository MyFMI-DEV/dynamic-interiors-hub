const Header = () => {
  return (
    <header className="bg-primary w-full py-6">
      <div className="container mx-auto px-4">
        <img 
          src="/lovable-uploads/d60fa430-dfe1-4db5-84c4-ac740134aa18.png" 
          alt="FindMyInteriors UK" 
          className="h-24 mx-auto" // Increased from h-16 to h-24 (50% bigger)
        />
      </div>
    </header>
  );
};

export default Header;