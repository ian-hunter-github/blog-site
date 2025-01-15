import { Grid, Typography } from "@mui/material";
import { usePosts } from "../context/PostsContext";
import BlogCard from "../components/BlogCard/BlogCard";

const HomePageContent = () => {
  const { posts } = usePosts();

  // Handle undefined or null posts
  if (!posts) {
    console.log("Posts are loading...");
    return (
      <>
        <Typography variant="h4" gutterBottom>
          Blog Posts
        </Typography>
        <Typography variant="body1">Loading...</Typography>
      </>
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Blog Posts
      </Typography>
      <Grid container spacing={3}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              {/* Use updated BlogCard component */}
              <BlogCard post={post} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No posts available</Typography>
        )}
      </Grid>
    </>
  );
};

export default HomePageContent;
