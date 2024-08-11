import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const postsDirectory = path.join(process.cwd(), 'posts')

export function getPosts() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    return {
      id: fileName.replace(/\.md$/, ''),
      ...matterResult.data,
      content: matterResult.content,
    }
  })
  return allPostsData
}
