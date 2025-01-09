import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import LocationCategory from "@/pages/LocationCategory";
import CreateHarrogateArticle from "@/pages/CreateHarrogateArticle";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ArticleDetail />} />
        <Route path="/:location/:category" element={<LocationCategory />} />
        <Route path="/create-harrogate-article" element={<CreateHarrogateArticle />} />
      </Routes>
    </Router>
  );
}

export default App;
