import Header from "@/components/layout/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";

interface LocationCategoryLayoutProps {
  children: React.ReactNode;
}

const LocationCategoryLayout = ({ children }: LocationCategoryLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LocationCategoryLayout;