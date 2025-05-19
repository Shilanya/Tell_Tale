"use client"

import { useEffect, useState } from "react"
import { notFound, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Edit, Loader2 } from "lucide-react"
import { useStore } from "@/lib/store"
import DeleteStoryButton from "@/components/delete-story-button"
import { formatDate } from "@/lib/utils"
import type { Story } from "@/lib/types"

export default function StoryPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getStory, loading } = useStore()
  const [story, setStory] = useState<Story | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadStory = async () => {
      // First try to get from store
      if (!loading) {
        const storeStory = getStory(params.id)
        if (storeStory) {
          console.log("Found story in store:", storeStory.id)
          setStory(storeStory)
          setIsLoading(false)
          return
        }
      }

      // If not in store or store is still loading, try API
      try {
        console.log("Fetching story from API:", params.id)
        const response = await fetch(`/api/stories/${params.id}`)
        if (!response.ok) {
          throw new Error("Story not found")
        }
        const apiStory = await response.json()
        console.log("Found story in API:", apiStory.id)
        setStory(apiStory)
      } catch (error) {
        console.error("Error loading story:", error)
        router.push("/not-found")
      } finally {
        setIsLoading(false)
      }
    }

    loadStory()
  }, [params.id, getStory, loading, router])

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!story) {
    return notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/">
          <Button variant="outline">Back to Stories</Button>
        </Link>
        <div className="flex gap-2">
          <Link href={`/edit/${story.id}`}>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteStoryButton id={story.id} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{story.title}</h1>
        <p className="text-muted-foreground mb-6">
          Created on {formatDate(story.createdAt)}
          {story.updatedAt !== story.createdAt && ` • Updated on ${formatDate(story.updatedAt)}`}
        </p>

        {story.coverImage && (
          <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={story.coverImage || "/placeholder.svg"}
              alt={story.title}
              fill
              className="object-cover"
              priority
              unoptimized={story.coverImage.startsWith("data:")}
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {story.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
