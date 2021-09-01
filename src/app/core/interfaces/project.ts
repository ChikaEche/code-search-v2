export interface Project {
  name: string,
  userId: string,
  files?: {
    [fileId: string] : {
      name: string,
      text: string[]
    }
  },
  projectId?: string
}
