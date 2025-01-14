import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { BlogPost } from '../types/blog';
import { blogPosts } from '../data/posts';

export default function SearchPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialQuery = searchParams.get('q') || '';
    const [query] = useState(initialQuery);
    const [results, setResults] = useState<BlogPost[]>([]);

    const performSearch = (searchQuery: string) => {
        const searchResults = blogPosts.filter(
            post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.summary.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(searchResults);
    };

    useEffect(() => {
        performSearch(initialQuery);
    }, [initialQuery]);

    // const handleSearch = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     performSearch(query);
    // };

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <Box className="mb-6">
                    <Link to="/" className="text-primary hover:underline">
                        ← Back to Home
                    </Link>
                    <Typography variant="h4" className="mt-4 mb-6">
                        Search Results
                    </Typography>
                </Box>

                {results.length > 0 ? (
                    <>
                        <Typography variant="h6" className="mb-4">
                            Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                        </Typography>
                        <Grid container spacing={4}>
                            {results.map((post) => (
                                <Grid key={post.id} item xs={12} sm={6} md={4} lg={3}>
                                    <BlogCard post={post} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                ) : (
                    <Typography variant="body1" className="text-center mt-8">
                        No results found for "{query}". Try a different search term.
                    </Typography>
                )}
            </div>
        </>
    );
}

