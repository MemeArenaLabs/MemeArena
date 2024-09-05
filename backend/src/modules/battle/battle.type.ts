import { Socket } from "socket.io";

export type UserInBattle = {
    client: Socket;
    userId: string;
    userMemeIds: string[];
}

export type ActiveBattles = Map<string, UserInBattle[]>