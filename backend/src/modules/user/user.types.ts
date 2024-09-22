import { UserMemeDetails } from '../meme/meme.types';

export interface UserDetails {
  id: string;
  walletAddress: string;
  username: string;
  userMemes: UserMemeDetails[];
}
