import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-secondary py-4">
      <div className="container mx-auto px-4">
        <ul className="flex justify-center space-x-8">
          <li>
            <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
              Homepage
            </Link>
          </li>
          <li>
            <Link to="/how-it-works" className="text-primary hover:text-primary/80 transition-colors">
              How It Works
            </Link>
          </li>
          <li>
            <Link to="/why-choose-us" className="text-primary hover:text-primary/80 transition-colors">
              Why Choose Us
            </Link>
          </li>
          <li>
            <Link 
              to="/post-free" 
              className="text-primary font-semibold hover:text-primary/80 transition-colors"
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