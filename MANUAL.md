# Blog Site Technical Manual

## Overview

This is a React-based blog site built with Vite and TypeScript. The site features:

- Markdown-based blog posts
- Responsive design
- Theme support
- Pagination
- Testing with Jest and React Testing Library

## Project Structure

```
blog-site/
├── public/                # Static assets and content
│   └── content/           # Markdown blog posts
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components
│   ├── services/          # API/service layer
│   ├── context/           # React context providers
│   ├── utils/             # Utility functions
│   └── __tests__/         # Test files
```

## Development Setup

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Run tests:

```bash
npm test
```

## Adding Blog Posts

1. Create a new Markdown file in `public/content/` with frontmatter:

```markdown
---
title: "Post Title"
date: "YYYY-MM-DD"
summary: "Brief description"
---
```

2. Update `public/content/file-list.json` to include the new post:

```json
{
  "posts": ["post1.md", "post2.md", "new-post.md"]
}
```

## Key Components

- `BlogCard/BlogCard.tsx`: Displays blog post previews
- `MarkdownRenderer.tsx`: Renders Markdown content
- `Pagination.tsx`: Handles post pagination
- `PostsContext.tsx`: Manages blog post state
- `blogPostService.ts`: Handles post data fetching

## Testing

The project uses Jest and React Testing Library. Key test files:

- `blogPostService.test.ts`: Service layer tests
- `MarkdownHandling.test.jsx`: Markdown utility tests
- Component tests in `__tests__` directories

## Deployment

1. Build production version:

```bash
npm run build
```

2. Deploy the `dist/` folder to your hosting provider.

### Vercel Deployment

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy:

```bash
vercel
```

### Netlify Deployment

1. Connect your Git repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
