import { UserMemeDetails } from "../../meme/meme.types";


export interface UserResponseDto {
  id: string;
  walletAddress: string;
  username: string;
  userMemes: UserMemeDetails[];
}