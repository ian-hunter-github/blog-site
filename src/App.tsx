import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import HomePage from "./pages/HomePage";
import BlogPostPage from "./pages/BlogPostPage";
import BlogPostEditorPage from "./pages/BlogPostEditorPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Layout from "./components/Layout";
import PostsProvider from "./context/PostsContext";
import { CssBaseline } from "@mui/material";

const App = () => {
  return (
    <ErrorBoundary>
      <CssBaseline /> {/* Normalize and apply global Material-UI styles */}
      <PostsProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
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
    </ErrorBoundary>
  );
};

export default App;
