import { Typography, Box } from '@mui/material';
import Layout from '../components/Layout';

export default function AboutPage() {
  return (
    <>

      <div className="container mx-auto px-4 py-8">
        <Box className="max-w-3xl mx-auto">
          <Typography variant="h3" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to our blog! We are passionate about sharing knowledge and insights about web development,
            technology, and programming best practices.
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to create high-quality content that helps developers of all skill levels improve
            their craft and stay up-to-date with the latest trends and technologies in the industry.
          </Typography>
          <Typography variant="body1" paragraph>
            Whether you're a beginner just starting your journey in web development or an experienced
            developer looking to expand your knowledge, we've got something for you.
          </Typography>
          <Typography variant="h5" gutterBottom className="mt-6">
            Our Values
          </Typography>
          <Typography variant="body1" component="ul" className="list-disc pl-6">
            <li>Quality over quantity</li>
            <li>Clear and concise explanations</li>
            <li>Practical, real-world examples</li>
            <li>Community-driven learning</li>
          </Typography>
          <Typography variant="body1" className="mt-4">
            Feel free to explore our blog posts and join our community of developers!
          </Typography>
        </Box>
      </div>
    </>

  );
}

