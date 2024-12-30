const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} FindMyInteriors UK. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;