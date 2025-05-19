import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { Story } from "@/lib/types"

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "stories.json")

// Ensure data directory exists
function ensureDirectories() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    } catch (error) {
      console.error("Failed to create data directory:", error)
    }
  }

  if (!fs.existsSync(DATA_FILE)) {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify([]), "utf8")
    } catch (error) {
      console.error("Failed to create stories file:", error)
    }
  }
}

// Get all stories
function getStories(): Story[] {
  ensureDirectories()
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading stories:", error)
    return []
  }
}

// Save stories
function saveStories(stories: Story[]): boolean {
  ensureDirectories()
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(stories, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error saving stories:", error)
    return false
  }
}

export async function GET() {
  try {
    const stories = getStories()
    return NextResponse.json(stories)
  } catch (error) {
    console.error("Error in GET /api/stories:", error)
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newStory = await request.json()
    const stories = getStories()

    // Add the new story
    stories.unshift(newStory)

    // Save the updated stories
    if (saveStories(stories)) {
      return NextResponse.json(newStory, { status: 201 })
    } else {
      throw new Error("Failed to save story")
    }
  } catch (error) {
    console.error("Error in POST /api/stories:", error)
    return NextResponse.json({ error: "Failed to create story" }, { status: 500 })
  }
}
