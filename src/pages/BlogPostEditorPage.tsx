// BlogPostEditorPage.tsx
import { useState } from "react";
import ReactMarkdownEditorLite from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import "../index.css";
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
import SearchIcon from "@mui/icons-material/Search";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const renderHTML = (text: string) => {
  const processedText = text.replace(/\\n/g, "\n");
  return <ReactMarkdown>{processedText}</ReactMarkdown>;
};

let copyCounter = 1;

const BlogPostEditorPage = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [originalData, setOriginalData] = useState({
    title: "",
    summary: "",
    content: "",
    createdAt: "",
  });
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    createdAt: new Date().toISOString(),
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // Spinner state
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    message: "",
    type: "info", // "info" for success/info, "confirm" for confirmation
    onYes: () => setDialog({ ...dialog, open: false }),
    onNo: () => setDialog({ ...dialog, open: false }),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMarkdownChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/fullTextSearch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      setSearchResults(data.posts || []);
      setShowSearchDialog(true); // Ensure dialog opens
    } catch (error) {
      setDialog({
        open: true,
        title: "Error",
        message: "Error fetching search results.",
        type: "info",
        onYes: () => setDialog({ ...dialog, open: false }),
        onNo: () => {}, // Ensure onNo is always defined
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPost = (post: any) => {
    setSelectedPost(post);
    setOriginalData({
      title: post.title,
      summary: post.summary.replace(/\\n/g, "\n"),
      content: post.content.replace(/\\n/g, "\n"),
      createdAt: post.created_at || new Date().toISOString(),
    });
    setFormData({
      title: post.title,
      summary: post.summary.replace(/\\n/g, "\n"),
      content: post.content.replace(/\\n/g, "\n"),
      createdAt: post.created_at || new Date().toISOString(),
    });
    setShowSearchDialog(false);
  };

  const handleCreate = async () => {
    const newTitle = `${formData.title} (${copyCounter++})`;
    setLoading(true);
    try {
      await fetch(`${BACKEND_URL}/createPost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, title: newTitle }),
      });

      setDialog({
        open: true,
        title: "Success",
        message: `Post "${newTitle}" created successfully.`,
        type: "info",
        onYes: () => setDialog({ ...dialog, open: false }),
        onNo: () => {}, // Ensure onNo is always defined
      });
    } catch (error) {
      setDialog({
        open: true,
        title: "Error",
        message: "Error creating post.",
        type: "info",
        onYes: () => setDialog({ ...dialog, open: false }),
        onNo: () => {}, // Ensure onNo is always defined
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedPost) return;
    setLoading(true);
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
      setDialog({
        open: true,
        title: "Success",
        message: `Post "${formData.title}" updated successfully.`,
        type: "info",
        onYes: () => setDialog({ ...dialog, open: false }),
        onNo: () => {}, // Ensure onNo is always defined
      });
    } catch (error) {
      setDialog({
        open: true,
        title: "Error",
        message: "Error updating post.",
        type: "info",
        onYes: () => setDialog({ ...dialog, open: false }),
        onNo: () => {}, // Ensure onNo is always defined
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!selectedPost) return;
    setDialog({
      open: true,
      title: "Confirm Deletion",
      message: `Are you sure you want to delete the post "${formData.title}"?`,
      type: "confirm",
      onYes: () => {
        executeDelete();
        setDialog({ ...dialog, open: false });
      },
      onNo: () => setDialog({ ...dialog, open: false }), // Explicitly set onNo
    });
  };

  const executeDelete = async () => {
    setLoading(true);
    try {
      await fetch(`${BACKEND_URL}/deletePost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedPost.id }),
      });
      setDialog({
        open: true,
        title: "Success",
        message: `Post "${formData.title}" deleted successfully.`,
        type: "info",
        onYes: () => setDialog({ ...dialog, open: false }),
        onNo: () => {}, // Ensure onNo is always defined
      });
      setSelectedPost(null);
      setFormData({
        title: "",
        summary: "",
        content: "",
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      setDialog({
        open: true,
        title: "Error",
        message: "Error deleting post.",
        type: "info",
        onYes: () => setDialog({ ...dialog, open: false }),
        onNo: () => {}, // Ensure onNo is always defined
      });
    } finally {
      setLoading(false);
    }
  };

  const isCreateDisabled = !formData.summary.trim() && !formData.content.trim();
  const isUpdateEnabled =
    selectedPost &&
    (formData.title !== originalData.title ||
      formData.summary !== originalData.summary ||
      formData.content !== originalData.content ||
      formData.createdAt !== originalData.createdAt);

  return (
    <>
      <Container style={{ minHeight: "calc(100vh - 150px)" }}>
        <h1>Blog Post Editor</h1>

        {loading && <CircularProgress />}

        {/* Search Section */}
        <Grid container spacing={2} alignItems="center" marginBottom={3}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={fetchSearchResults}
              disabled={loading}
              style={{ minWidth: "48px", height: "100%" }}
            >
              <SearchIcon />
            </Button>
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              label="Search Posts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
        </Grid>

        {/* Dialogs */}
        <Dialog open={dialog.open} onClose={dialog.type === "info" ? dialog.onYes : dialog.onNo}>
          <DialogTitle>{dialog.title}</DialogTitle>
          <DialogContent>
            <p>{dialog.message}</p>
          </DialogContent>
          <DialogActions>
            {dialog.type === "confirm" && (
              <>
                <Button onClick={dialog.onNo} color="error">
                  No
                </Button>
                <Button onClick={dialog.onYes} color="primary">
                  Yes
                </Button>
              </>
            )}
            {dialog.type === "info" && (
              <Button onClick={dialog.onYes} color="primary">
                Close
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Search Results Dialog */}
        <Dialog open={showSearchDialog} onClose={() => setShowSearchDialog(false)}>
          <DialogTitle>Search Results</DialogTitle>
          <DialogContent>
            <List>
              {searchResults.map((post) => (
                <ListItem key={post.id} disablePadding>
                  <ListItemButton onClick={() => handleSelectPost(post)}>
                    <ListItemText primary={`[ID: ${post.id}] ${post.title}`} />
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

        {/* Form Fields */}
        <Grid container spacing={2} alignItems="center" marginBottom={3}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="ID"
              value={selectedPost ? selectedPost.id : ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
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
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={handleCreate}
              disabled={isCreateDisabled || loading}
            >
              {selectedPost ? "Copy" : "Create"}
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              disabled={!isUpdateEnabled || loading}
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
              disabled={!selectedPost || loading}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BlogPostEditorPage;
