import fs from 'fs/promises';
import path from 'path';

export async function readMarkdownFile(filename: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'src/posts', filename);
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error("Failed to read markdown file:", error);
    throw error;
  }
}
