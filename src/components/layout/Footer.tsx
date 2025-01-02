import QuickLinks from "./footer/QuickLinks";
import ContactInfo from "./footer/ContactInfo";
import AddressInfo from "./footer/AddressInfo";
import SocialLinks from "./footer/SocialLinks";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <QuickLinks />
          <ContactInfo />
          <AddressInfo />
        </div>
        <SocialLinks />
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>© {new Date().getFullYear()} FindMyInteriors UK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;