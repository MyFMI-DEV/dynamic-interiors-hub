import { Facebook, Instagram, Share2, X } from "lucide-react";

const SocialLinks = () => {
  return (
    <div className="flex justify-center space-x-6 mt-8 mb-8">
      <a
        href="https://www.facebook.com/people/Find-My-Interiors/61569302875457/"
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
        <X size={24} />
      </a>
    </div>
  );
};

export default SocialLinks;