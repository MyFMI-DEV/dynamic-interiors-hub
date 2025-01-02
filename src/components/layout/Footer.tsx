import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Share2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Links */}
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

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: info@findmyinteriors.com</li>
              <li>Phone: 01134 182082</li>
              <li>Monday - Friday: 9:00 AM - 5:00 PM</li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Address</h3>
            <address className="not-italic">
              FindMyInteriors UK<br />
              7 Bell Yard<br />
              London<br />
              WC2A 2JR<br />
              United Kingdom
            </address>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mt-8 mb-8">
          <a
            href="https://www.facebook.com/findmyinteriors"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition-colors"
            aria-label="Follow us on Facebook"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://www.instagram.com/findmyinteriors"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition-colors"
            aria-label="Follow us on Instagram"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://www.pinterest.com/findmyinteriors"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition-colors"
            aria-label="Follow us on Pinterest"
          >
            <Share2 size={24} />
          </a>
          <a
            href="https://twitter.com/findmyinteriors"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition-colors"
            aria-label="Follow us on X (formerly Twitter)"
          >
            <Twitter size={24} />
          </a>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>© {new Date().getFullYear()} FindMyInteriors UK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;