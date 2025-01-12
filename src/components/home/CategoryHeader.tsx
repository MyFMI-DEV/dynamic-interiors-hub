import React from 'react';

const CategoryHeader = () => {
  return (
    <div className="mb-12">
      <h2 className="text-4xl font-bold text-center mb-4">
        Our Interior & Home Categories
      </h2>
      <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
        Explore our comprehensive range of interior design and home improvement categories
      </p>
      
      <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
        <img 
          src="/lovable-uploads/f52364c4-2d45-4061-a066-3401a207801d.png"
          alt="Stylish interior design showcase"
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
      </div>
    </div>
  );
};

export default CategoryHeader;