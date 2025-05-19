"use client"

import { useEffect, useState } from "react"
import { notFound, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import StoryForm from "@/components/story-form"
import { useStore } from "@/lib/store"
import type { Story } from "@/lib/types"

export default function EditStoryPage({ params }: { params: { id: string } }) {
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
          console.log("Found story in store for editing:", storeStory.id)
          setStory(storeStory)
          setIsLoading(false)
          return
        }
      }

      // If not in store or store is still loading, try API
      try {
        console.log("Fetching story from API for editing:", params.id)
        const response = await fetch(`/api/stories/${params.id}`)
        if (!response.ok) {
          throw new Error("Story not found")
        }
        const apiStory = await response.json()
        console.log("Found story in API for editing:", apiStory.id)
        setStory(apiStory)
      } catch (error) {
        console.error("Error loading story for editing:", error)
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
      <h1 className="text-3xl font-bold mb-8">Edit Story</h1>
      <StoryForm story={story} />
    </div>
  )
}
