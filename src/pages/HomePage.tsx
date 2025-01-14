// HomePage.tsx
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import Layout from "../components/Layout";


const HomePageContent = () => {
  const { posts } = usePosts();

  // Handle undefined or null posts
  if (!posts) {
    console.log("Posts are loading...");
    return (
      <Layout>
        <h1>Blog Posts</h1>
        <p>Loading...</p>
      </Layout>
    );
  }

  console.log("Posts in context:", posts);

  return (
    <Layout>
      <h1>Blog Posts</h1>
      <Grid container spacing={2}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Grid item xs={12} sm={6} md={3} key={post.id}>
              <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{post.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {post.summary}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </Grid>
    </Layout>
  );
};

export default HomePageContent;
