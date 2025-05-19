"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImagePlus, Loader2 } from "lucide-react"
import { useStore } from "@/lib/store"
import { generateId, generateExcerpt } from "@/lib/utils"
import type { Story } from "@/lib/types"
import { useNotification, Notification } from "@/components/notification"

export default function StoryForm({ story }: { story?: Story }) {
  const router = useRouter()
  const { addStory, updateStory: updateStoreStory } = useStore()
  const [title, setTitle] = useState(story?.title || "")
  const [content, setContent] = useState(story?.content || "")
  const [coverImage, setCoverImage] = useState<string | null>(story?.coverImage || null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { notification, showSuccess, showError, hideNotification } = useNotification()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    setImageFile(file)
    const imageUrl = URL.createObjectURL(file)
    setCoverImage(imageUrl)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!title.trim()) {
      setError("Title is required")
      setIsSubmitting(false)
      return
    }

    if (!content.trim()) {
      setError("Content is required")
      setIsSubmitting(false)
      return
    }

    try {
      let imageUrl = coverImage

      // If there's a new image file, convert it to a data URL for storage
      if (imageFile) {
        imageUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(imageFile)
        })
      }

      const now = new Date().toISOString()

      if (story) {
        // Update existing story
        const updatedStory: Story = {
          ...story,
          title,
          content,
          excerpt: generateExcerpt(content),
          coverImage: imageUrl,
          updatedAt: now,
        }

        // Update in store
        updateStoreStory(story.id, updatedStory)

        // Also try to update via API
        try {
          await fetch(`/api/stories/${story.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedStory),
          })
        } catch (apiError) {
          console.error("API update failed, but story was updated locally:", apiError)
        }

        showSuccess("Story updated successfully!")

        // Navigate to the story page
        setTimeout(() => {
          router.push(`/story/${story.id}`)
        }, 500)
      } else {
        // Create new story
        const newStory: Story = {
          id: generateId(),
          title,
          content,
          excerpt: generateExcerpt(content),
          coverImage: imageUrl,
          createdAt: now,
          updatedAt: now,
        }

        // Add to store
        addStory(newStory)

        // Also try to create via API
        try {
          await fetch("/api/stories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStory),
          })
        } catch (apiError) {
          console.error("API creation failed, but story was created locally:", apiError)
        }

        showSuccess("Story created successfully!")

        // Navigate to the homepage after a short delay to allow the store to update
        setTimeout(() => {
          router.push("/")
        }, 500)
      }
    } catch (err) {
      console.error("Error saving story:", err)
      setError("Failed to save story. Please try again.")
      showError("Failed to save story. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">{error}</div>}

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter story title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover-image">Cover Image</Label>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("cover-image")?.click()}
                className="flex items-center gap-2"
              >
                <ImagePlus className="h-4 w-4" />
                {coverImage ? "Change Image" : "Upload Image"}
              </Button>
              <Input id="cover-image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>

            {coverImage && (
              <div className="relative h-[200px] w-full mt-4 rounded-md overflow-hidden">
                <Image
                  src={coverImage || "/placeholder.svg"}
                  alt="Cover preview"
                  fill
                  className="object-cover"
                  unoptimized={typeof coverImage === "string" && coverImage.startsWith("data:")}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your story here..."
              className="min-h-[300px]"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/")} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {story ? "Update Story" : "Create Story"}
            </Button>
          </div>
        </form>
      </CardContent>
      {notification && (
        <Notification type={notification.type} message={notification.message} onClose={hideNotification} />
      )}
    </Card>
  )
}
