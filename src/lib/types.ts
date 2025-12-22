export type ChatMessage = {
  actor: "user" | "ai",
  message: string,
  complete: boolean
}