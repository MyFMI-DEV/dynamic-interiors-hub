import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import WhyChooseUs from "./pages/WhyChooseUs";
import LocationCategory from "./pages/LocationCategory";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/how-it-works",
    element: <HowItWorks />,
  },
  {
    path: "/why-choose-us",
    element: <WhyChooseUs />,
  },
  {
    path: "/:location/:category",
    element: <LocationCategory />,
  },
  {
    path: "/articles",
    element: <Articles />,
  },
  {
    path: "/articles/:slug",
    element: <ArticleDetail />,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;