"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Story, Character } from "./types"

interface StoreContextType {
  // Stories
  stories: Story[]
  addStory: (story: Story) => void
  updateStory: (id: string, updatedStory: Story) => void
  removeStory: (id: string) => void
  getStory: (id: string) => Story | undefined

  // Characters
  characters: Character[]
  addCharacter: (character: Character) => void
  updateCharacter: (id: string, updatedCharacter: Character) => void
  removeCharacter: (id: string) => void
  getCharacter: (id: string) => Character | undefined

  loading: boolean
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

// Keys for localStorage
const STORIES_STORAGE_KEY = "tell-tale-stories"
const CHARACTERS_STORAGE_KEY = "tell-tale-characters"

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [stories, setStories] = useState<Story[]>([])
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)

  // Load stories and characters from localStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load stories
        const storedStories = localStorage.getItem(STORIES_STORAGE_KEY)
        if (storedStories) {
          const parsedStories = JSON.parse(storedStories)
          setStories(parsedStories)
        }

        // Load characters
        const storedCharacters = localStorage.getItem(CHARACTERS_STORAGE_KEY)
        if (storedCharacters) {
          const parsedCharacters = JSON.parse(storedCharacters)
          setCharacters(parsedCharacters)
        }

        // Fetch stories from API
        try {
          const storiesResponse = await fetch("/api/stories")
          if (storiesResponse.ok) {
            const apiStories = await storiesResponse.json()
            if (Array.isArray(apiStories) && apiStories.length > 0) {
              // Merge with localStorage stories
              const storyMap = new Map()
              if (storedStories) {
                JSON.parse(storedStories).forEach((story: Story) => {
                  storyMap.set(story.id, story)
                })
              }
              apiStories.forEach((story: Story) => {
                storyMap.set(story.id, story)
              })
              const mergedStories = Array.from(storyMap.values())
              setStories(mergedStories)
              localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(mergedStories))
            }
          }
        } catch (error) {
          console.error("Error fetching stories from API:", error)
        }

        // Fetch characters from API
        try {
          const charactersResponse = await fetch("/api/characters")
          if (charactersResponse.ok) {
            const apiCharacters = await charactersResponse.json()
            if (Array.isArray(apiCharacters) && apiCharacters.length > 0) {
              // Merge with localStorage characters
              const characterMap = new Map()
              if (storedCharacters) {
                JSON.parse(storedCharacters).forEach((character: Character) => {
                  characterMap.set(character.id, character)
                })
              }
              apiCharacters.forEach((character: Character) => {
                characterMap.set(character.id, character)
              })
              const mergedCharacters = Array.from(characterMap.values())
              setCharacters(mergedCharacters)
              localStorage.setItem(CHARACTERS_STORAGE_KEY, JSON.stringify(mergedCharacters))
            }
          }
        } catch (error) {
          console.error("Error fetching characters from API:", error)
        }
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Save stories to localStorage whenever they change
  useEffect(() => {
    if (stories.length > 0) {
      localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(stories))
    }
  }, [stories])

  // Save characters to localStorage whenever they change
  useEffect(() => {
    if (characters.length > 0) {
      localStorage.setItem(CHARACTERS_STORAGE_KEY, JSON.stringify(characters))
    }
  }, [characters])

  // Story methods
  const addStory = (story: Story) => {
    setStories((prevStories) => [story, ...prevStories])
  }

  const updateStory = (id: string, updatedStory: Story) => {
    setStories((prevStories) => prevStories.map((story) => (story.id === id ? updatedStory : story)))
  }

  const removeStory = (id: string) => {
    setStories((prevStories) => prevStories.filter((story) => story.id !== id))
  }

  const getStory = (id: string) => {
    return stories.find((story) => story.id === id)
  }

  // Character methods
  const addCharacter = (character: Character) => {
    setCharacters((prevCharacters) => [character, ...prevCharacters])
  }

  const updateCharacter = (id: string, updatedCharacter: Character) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) => (character.id === id ? updatedCharacter : character)),
    )
  }

  const removeCharacter = (id: string) => {
    setCharacters((prevCharacters) => prevCharacters.filter((character) => character.id !== id))
  }

  const getCharacter = (id: string) => {
    return characters.find((character) => character.id === id)
  }

  return (
    <StoreContext.Provider
      value={{
        stories,
        addStory,
        updateStory,
        removeStory,
        getStory,
        characters,
        addCharacter,
        updateCharacter,
        removeCharacter,
        getCharacter,
        loading,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
