// BlogPostEditorPage.tsx
import { useState } from "react";
import ReactMarkdownEditorLite from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown"; // For rendering markdown
import "react-markdown-editor-lite/lib/index.css";
import "../index.css"; // Ensure global styles are applied
import Layout from "../components/Layout";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const renderHTML = (text: string) => {
  const processedText = text.replace(/\\n/g, "\n"); // Replace escaped `\n` with actual newlines
  return <ReactMarkdown>{processedText}</ReactMarkdown>;
};

let copyCounter = 1; // Counter for copying posts

const BlogPostEditorPage = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    createdAt: new Date().toISOString(),
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false); // State to handle loading spinner

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMarkdownChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const fetchSearchResults = async () => {
    setLoadingSearch(true); // Show spinner while searching
    try {
      const response = await fetch(`${BACKEND_URL}/fullTextSearch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      setSearchResults(data.posts || []);
      setShowSearchDialog(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoadingSearch(false); // Hide spinner after search completes
    }
  };

  const handleSelectPost = (post: any) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      summary: post.summary.replace(/\\n/g, "\n"),
      content: post.content.replace(/\\n/g, "\n"),
      createdAt: post.created_at || new Date().toISOString(),
    });
    setShowSearchDialog(false);
  };

  const handleCreate = async () => {
    try {
      const newTitle = `${formData.title} (${copyCounter++})`;
      await fetch(`${BACKEND_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, title: newTitle }),
      });
      alert("Post copied successfully!");
    } catch (error) {
      console.error("Error copying post:", error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedPost) return;
    if (window.confirm("Are you sure you want to update this post?")) {
      try {
        await fetch(`${BACKEND_URL}/updatePost`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: selectedPost.id,
            title: formData.title,
            summary: formData.summary.replace(/\n/g, "\\n"),
            content: formData.content.replace(/\n/g, "\\n"),
            createdAt: formData.createdAt,
          }),
        });
        alert("Post updated successfully!");
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }
  };

  const handleDelete = async () => {
    if (!selectedPost) return;
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await fetch(`${BACKEND_URL}/delete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: selectedPost.id }),
        });
        alert("Post deleted successfully!");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <Layout>
      <Container style={{ minHeight: "calc(100vh - 150px)" }}>
        <h1>Blog Post Editor</h1>

        <Grid container spacing={2} marginBottom={3}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Search Posts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={fetchSearchResults}
              disabled={loadingSearch}
            >
              {loadingSearch ? <CircularProgress size={24} color="inherit" /> : "Search"}
            </Button>
          </Grid>
        </Grid>

        <Dialog open={showSearchDialog} onClose={() => setShowSearchDialog(false)}>
          <DialogTitle>Search Results</DialogTitle>
          <DialogContent>
            <List>
              {searchResults.map((post) => (
                <ListItem key={post.id} disablePadding>
                  <ListItemButton onClick={() => handleSelectPost(post)}>
                    <ListItemText
                      primary={`[ID: ${post.id}] ${post.title}`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSearchDialog(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={2} marginBottom={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Post ID"
              value={selectedPost ? selectedPost.id : ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <label>Summary:</label>
            <ReactMarkdownEditorLite
              value={formData.summary}
              renderHTML={renderHTML}
              onChange={({ text }) => handleMarkdownChange("summary", text)}
              config={{
                view: {
                  menu: true,
                  md: true,
                  html: true,
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <label>Content:</label>
            <ReactMarkdownEditorLite
              value={formData.content}
              renderHTML={renderHTML}
              onChange={({ text }) => handleMarkdownChange("content", text)}
              style={{ minHeight: "300px" }}
              config={{
                view: {
                  menu: true,
                  md: true,
                  html: true,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="datetime-local"
              label="Date and Time"
              name="createdAt"
              value={formData.createdAt.replace("Z", "")}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={handleCreate}
            >
              Copy
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              disabled={!selectedPost}
            >
              Update
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={!selectedPost}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default BlogPostEditorPage;
