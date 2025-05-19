export interface Story {
  id: string
  title: string
  content: string
  excerpt: string
  coverImage: string | null
  createdAt: string
  updatedAt: string
}

export interface Character {
  id: string
  name: string
  origin: string
  birthDate: string
  backstory: string
  traits: string[]
  image: string | null
  createdAt: string
  updatedAt: string
}
