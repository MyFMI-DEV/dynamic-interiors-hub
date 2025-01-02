import { Link } from "react-router-dom";

const QuickLinks = () => {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li>
          <Link to="/" className="hover:text-white/80 transition-colors">
            Homepage
          </Link>
        </li>
        <li>
          <Link to="/how-it-works" className="hover:text-white/80 transition-colors">
            How It Works
          </Link>
        </li>
        <li>
          <Link to="/why-choose-us" className="hover:text-white/80 transition-colors">
            Why Choose Us
          </Link>
        </li>
        <li>
          <a 
            href="https://www.findmyinteriors.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition-colors"
          >
            Post Free Today
          </a>
        </li>
      </ul>
    </div>
  );
};

export default QuickLinks;