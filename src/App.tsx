import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LocationCategory from "./pages/LocationCategory";
import HowItWorks from "./pages/HowItWorks";
import WhyChooseUs from "./pages/WhyChooseUs";
import PostFree from "./pages/PostFree";
import Sitemap from "./pages/Sitemap";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/post-free" element={<PostFree />} />
          <Route path="/sitemap.xml" element={<Sitemap />} />
          <Route path="/:location/:category" element={<LocationCategory />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;