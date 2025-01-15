// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPostPage from "./pages/BlogPostPage";
import BlogPostEditorPage from "./pages/BlogPostEditorPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Layout from "./components/Layout";
import PostsProvider from "./context/PostsContext";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "./theme/theme";

const isDarkMode = false; // Replace with actual theme toggle logic
const theme = isDarkMode ? darkTheme : lightTheme;

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize and apply global Material-UI styles */}
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
    </ThemeProvider>
  );
};

export default App;
