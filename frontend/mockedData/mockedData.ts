import { IconName } from "@/utils/SvgIcon";

export interface GladiatorStat {
  label: string;
  value: number;
  icon: IconName;
}

export interface GladiatorInfo {
  name: string;
  type: string;
  stats: GladiatorStat[];
}

export type GladiImg = {
  name: string;
  imageUrl: string;
  imagePfpUrl: string;
};

export type Team = {
  id: string;
  teamName: string;
  gladiators: GladiImg[];
};

export const userName = "User1";

export const mockGladiatorInfo: GladiatorInfo = {
  name: "MAGAIBA",
  type: "TANK / PLANT",
  stats: [
    { value: 420, icon: "broken-heart", label: "HP" },
    { value: 36, icon: "battered-axe", label: "ATTACK" },
    { value: 12, icon: "crossed-swords", label: "CRITICAL CHANCE" },
    { value: 45, icon: "shield-impact", label: "DEFENSE" },
    { value: 69, icon: "speedometer", label: "SPEED" },
  ],
};

export const mockedTeams: Team[] = [
  {
    id: "team-a",
    teamName: "MEMEKILLERS",
    gladiators: [
      { name: "gigachad", imageUrl: "/assets/gladiators/no-bg/gigachad.png" , imagePfpUrl:"/assets/gladiators/pfp/gigachad.png" , },
      { name: "popcat", imageUrl: "/assets/gladiators/no-bg/popcat.png" , imagePfpUrl:"/assets/gladiators/pfp/popcat.png" ,},
      { name: "bonk", imageUrl: "/assets/gladiators/no-bg/bonk.png" , imagePfpUrl:"/assets/gladiators/pfp/bonk.png" ,},
    ],
  },
  {
    id: "team-b",
    teamName: "MEMEKILLERS2",
    gladiators: [
      { name: "gigachad", imageUrl: "/assets/gladiators/no-bg/gigachad.png" , imagePfpUrl:"/assets/gladiators/pfp/gigachad.png" , },
      { name: "popcat", imageUrl: "/assets/gladiators/no-bg/popcat.png" , imagePfpUrl:"/assets/gladiators/pfp/popcat.png" ,},
      { name: "bonk", imageUrl: "/assets/gladiators/no-bg/bonk.png" , imagePfpUrl:"/assets/gladiators/pfp/bonk.png" ,},
    ],
  },
  {
    id: "team-c",
    teamName: "MEMEKILLERS3",
    gladiators: [
      { name: "gigachad", imageUrl: "/assets/gladiators/no-bg/gigachad.png" , imagePfpUrl:"/assets/gladiators/pfp/gigachad.png" , },
      { name: "popcat", imageUrl: "/assets/gladiators/no-bg/popcat.png" , imagePfpUrl:"/assets/gladiators/pfp/popcat.png" ,},
      { name: "bonk", imageUrl: "/assets/gladiators/no-bg/bonk.png" , imagePfpUrl:"/assets/gladiators/pfp/bonk.png" ,},
    ],
  },
  {
    id: "team-d",
    teamName: "MEMEKILLERS4",
    gladiators: [
      { name: "gigachad", imageUrl: "/assets/gladiators/no-bg/gigachad.png" , imagePfpUrl:"/assets/gladiators/pfp/gigachad.png" , },
      { name: "popcat", imageUrl: "/assets/gladiators/no-bg/popcat.png" , imagePfpUrl:"/assets/gladiators/pfp/popcat.png" ,},
      { name: "bonk", imageUrl: "/assets/gladiators/no-bg/bonk.png" , imagePfpUrl:"/assets/gladiators/pfp/bonk.png" ,},
    ],
  },
];
