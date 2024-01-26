export interface User {
  userId: number,
  friendId: number,
  username: string,
  role: string,
  firstName: string,
  middleName: string,
  lastName: string,
  profilePicture: string | null,
  friendRequestFlag: boolean,
  friendFlag: boolean
}
