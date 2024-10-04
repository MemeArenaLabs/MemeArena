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
  teamName: string;
  gladiators: GladiImg[];
};

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
    teamName: "MEMEKILLERS",
    gladiators: [
      { name: "Meme 1", imageUrl: "/assets/gladiators/magaiba.png" },
      { name: "Meme 2", imageUrl: "/assets/gladiators/magaiba.png" },
      { name: "Meme 3", imageUrl: "/assets/gladiators/bonk.png" },
    ],
  },
  {
    teamName: "MEMEKILLERS2",
    gladiators: [
      { name: "Meme 1", imageUrl: "/assets/gladiators/magaiba.png" },
      { name: "Meme 2", imageUrl: "/assets/gladiators/magaiba.png" },
      { name: "Meme 3", imageUrl: "/assets/gladiators/magaiba.png" },
    ],
  },
  {
    teamName: "MEMEKILLERS3",
    gladiators: [
      { name: "Meme 1", imageUrl: "/assets/gladiators/bonk.png" },
      { name: "Meme 2", imageUrl: "/assets/gladiators/bonk.png" },
      { name: "Meme 3", imageUrl: "/assets/gladiators/magaiba.png" },
    ],
  },
  {
    teamName: "MEMEKILLERS4",
    gladiators: [
      { name: "Meme 1", imageUrl: "/assets/gladiators/bonk.png" },
      { name: "Meme 2", imageUrl: "/assets/gladiators/bonk.png" },
      { name: "Meme 3", imageUrl: "/assets/gladiators/bonk.png" },
    ],
  },
];
