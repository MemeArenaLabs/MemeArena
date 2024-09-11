import { Socket } from "socket.io";

export type UserInBattle = {
    client: Socket;
    userId: string;
    userMemes: { userMemeId: string, position?: number }[];
    proposed?: boolean
}

export type ActiveBattles = Map<string, UserInBattle[]>