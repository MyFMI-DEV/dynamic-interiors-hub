import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import LocationCategory from "./pages/LocationCategory";
import LocationList from "./pages/LocationList";
import HowItWorks from "./pages/HowItWorks";
import WhyChooseUs from "./pages/WhyChooseUs";
import PostFree from "./pages/PostFree";
import Sitemap from "./pages/Sitemap";
import Articles from "./pages/Articles";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/locations" element={<LocationList />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/post-free" element={<PostFree />} />
          <Route path="/sitemap.xml" element={<Sitemap />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/:location/:category" element={<LocationCategory />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;