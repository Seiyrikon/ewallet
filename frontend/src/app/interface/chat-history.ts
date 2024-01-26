export interface ChatHistory {
  user_id: number,
  recipient_id: number,
  username: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  profilePicture: string | null;
  last_message: string,
  created_at: Date
}
