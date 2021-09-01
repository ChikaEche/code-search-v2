export interface Project {
  name: string,
  userId: string,
  files?: {
    name: string,
    text: string[]
  },
  projectId?: string
}
