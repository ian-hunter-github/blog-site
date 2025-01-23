import fm from "front-matter";

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
}

export async function loadMarkdownPosts(): Promise<BlogPost[]> {
  console.log("loadMarkdownPosts is being called"); // Debug start

  try {
    // List of markdown files to fetch
    const files: unknown[] = []; // Add all markdown filenames here
    console.log("Fetching files:", files); // Debug file list

    // Fetch and process all markdown files
    const posts: BlogPost[] = await Promise.all(
      files.map(async (fileName) => {
        console.log("Fetching:", fileName); // Debug individual file fetch
        const response = await fetch(`/content/${fileName}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${fileName}`);
        }

        const fileContent = await response.text();
        console.log("Fetched content:", fileContent.slice(0, 100)); // Debug snippet

        const { attributes, body } = fm<{
          title: string;
          summary: string;
          image: string;
          date: string;
        }>(fileContent);

        const post = {
          id: fileName.replace(".md", ""), // Remove the .md extension
          title: attributes.title || "Untitled Post", // Fallback for missing title
          summary: attributes.summary || "No summary available.", // Fallback for missing summary
          content: body,
          image: attributes.image || "/placeholder.png", // Fallback for missing image
          date: attributes.date || new Date().toISOString(), // Fallback for missing date
        };

        console.log("Processed Post:", post); // Debug processed post
        return post;
      })
    );

    console.log("All Posts Processed:", posts); // Debug final posts array
    return posts;
  } catch (error) {
    console.error("Error in loadMarkdownPosts:", error);
    return [];
  }
}
