import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-accent shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap justify-center gap-4 py-4 md:py-6 md:gap-8">
          <li className="w-full md:w-auto text-center">
            <Link 
              to="/" 
              className="text-primary hover:text-primary/80 transition-colors font-medium px-3 py-2 block"
            >
              Homepage
            </Link>
          </li>
          <li className="w-full md:w-auto text-center">
            <Link 
              to="/how-it-works" 
              className="text-primary hover:text-primary/80 transition-colors font-medium px-3 py-2 block"
            >
              How It Works
            </Link>
          </li>
          <li className="w-full md:w-auto text-center">
            <Link 
              to="/why-choose-us" 
              className="text-primary hover:text-primary/80 transition-colors font-medium px-3 py-2 block"
            >
              Why Choose Us
            </Link>
          </li>
          <li className="w-full md:w-auto text-center">
            <Link 
              to="/articles" 
              className="text-primary hover:text-primary/80 transition-colors font-medium px-3 py-2 block"
            >
              Articles
            </Link>
          </li>
          <li className="w-full md:w-auto text-center">
            <a 
              href="https://www.findmyinteriors.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white hover:bg-primary/90 transition-colors font-semibold px-6 py-2 rounded-full block mx-4 md:mx-0"
            >
              Post Free Today
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;