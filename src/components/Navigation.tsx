import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-accent shadow-sm">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap justify-center space-x-4 md:space-x-8 py-6">
          <li>
            <Link 
              to="/" 
              className="text-primary hover:text-primary/80 transition-colors font-medium px-3 py-2"
            >
              Homepage
            </Link>
          </li>
          <li>
            <Link 
              to="/how-it-works" 
              className="text-primary hover:text-primary/80 transition-colors font-medium px-3 py-2"
            >
              How It Works
            </Link>
          </li>
          <li>
            <Link 
              to="/why-choose-us" 
              className="text-primary hover:text-primary/80 transition-colors font-medium px-3 py-2"
            >
              Why Choose Us
            </Link>
          </li>
          <li>
            <Link 
              to="/post-free" 
              className="bg-primary text-white hover:bg-primary/90 transition-colors font-semibold px-6 py-2 rounded-full"
            >
              Post Free Today
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;