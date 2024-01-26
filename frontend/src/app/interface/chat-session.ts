export interface ChatSession {
  sender_id: number,
  receiver_id: number,
  username: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  profilePicture: string | null;
  message: string,
  created_at: Date
}
