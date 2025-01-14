import { Box, Typography, Grid } from '@mui/material';
import { GitHub, LinkedIn, Twitter, Mail } from '@mui/icons-material';

export default function ContactPage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <Grid container spacing={6} className="items-center">
                    <Grid item xs={12} md={4}>
                        <Box className="text-center">
                            <img
                                src="/placeholder.svg?height=300&width=300"
                                alt="Ian Hunter"
                                className="rounded-full mx-auto w-64 h-64"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h3" gutterBottom>
                            Ian Hunter
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Feel free to get in touch with me through any of the following channels:
                        </Typography>
                        <Box className="space-y-4">
                            <Box className="flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                <Typography>
                                    <a href="mailto:ian.hunter@example.com" className="text-primary hover:underline">
                                        ian.hunter@example.com
                                    </a>
                                </Typography>
                            </Box>
                            <Box className="flex gap-4">
                                <a
                                    href="https://twitter.com/ianhunter"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-primary"
                                >
                                    <Twitter className="h-6 w-6" />
                                </a>
                                <a
                                    href="https://linkedin.com/in/ianhunter"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-primary"
                                >
                                    <LinkedIn className="h-6 w-6" />
                                </a>
                                <a
                                    href="https://github.com/ianhunter"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-primary"
                                >
                                    <GitHub className="h-6 w-6" />
                                </a>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

