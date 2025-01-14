// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPostPage from "./pages/BlogPostPage";
import BlogPostEditorPage from "./pages/BlogPostEditorPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Layout from "./components/Layout";
import PostsProvider from "./context/PostsContext";

const App = () => {

  return (
    <PostsProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<BlogPostPage />} />
            <Route path="/editor" element={<BlogPostEditorPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </Router>
    </PostsProvider>
  );
};

export default App;
