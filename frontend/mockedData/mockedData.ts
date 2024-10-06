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
      { name: "magaiba", imageUrl: "/assets/gladiators/magaiba.png" },
      { name: "magaiba", imageUrl: "/assets/gladiators/magaiba.png" },
      { name: "bonk", imageUrl: "/assets/gladiators/bonk.png" },
    ],
  },
  {
    id: "team-b",
    teamName: "MEMEKILLERS2",
    gladiators: [
      { name: "magaiba", imageUrl: "/assets/gladiators/magaiba.png" },
      { name: "magaiba", imageUrl: "/assets/gladiators/magaiba.png" },
      { name: "magaiba", imageUrl: "/assets/gladiators/magaiba.png" },
    ],
  },
  {
    id: "team-c",
    teamName: "MEMEKILLERS3",
    gladiators: [
      { name: "bonk", imageUrl: "/assets/gladiators/bonk.png" },
      { name: "bonk", imageUrl: "/assets/gladiators/bonk.png" },
      { name: "magaiba", imageUrl: "/assets/gladiators/magaiba.png" },
    ],
  },
  {
    id: "team-d",
    teamName: "MEMEKILLERS4",
    gladiators: [
      { name: "bonk", imageUrl: "/assets/gladiators/bonk.png" },
      { name: "bonk", imageUrl: "/assets/gladiators/bonk.png" },
      { name: "bonk", imageUrl: "/assets/gladiators/bonk.png" },
    ],
  },
];
