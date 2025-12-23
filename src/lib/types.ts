export type ChatMessage = {
  actor: "user" | "ai";
  message: string;
  complete: boolean;
  image?: string
};
export type Token = { cancel(): void; readonly isCancelled: boolean };

export type CatImageResp = {
  id: string;
  tags: string[];
  created_at: string;
  url: string;
  mimetype: string;
};
