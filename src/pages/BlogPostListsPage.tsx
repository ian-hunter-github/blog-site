import { Grid, Typography, Skeleton } from "@mui/material";
import { usePosts } from "../context/PostsContext";
import BlogCard from "../components/BlogCard/BlogCard";
import Pagination from "../components/Pagination";

const BlogPostListsPage = () => {
  const { posts, currentPage, totalPages, setCurrentPage } = usePosts();

  if (!posts) {
    return (
      <>
        <Typography variant="h4" gutterBottom>
          Blog Posts
        </Typography>
        <Grid container spacing={3}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" height={200} />
              <Skeleton width="60%" />
              <Skeleton />
              <Skeleton width="80%" />
            </Grid>
          ))}
        </Grid>
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
              <BlogCard post={post} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No posts available</Typography>
        )}
      </Grid>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default BlogPostListsPage;
