import { StaticImageData } from "next/image";
import { IconName } from "./SvgIcon";

export type TickerSymbol = "WIF" | "POPCAT" | "BONK" | "PONKE" | "GIGA" | "SOL";

export type Coin = {
  name: string;
  tickerSymbol: TickerSymbol;
  icon: IconName;
};

export type MemeCoin = Coin & {
  gladiatorIcon?: string;
};

export const supportedCoins: (MemeCoin | Coin)[] = [
  {
    name: "Solana",
    tickerSymbol: "SOL",
    icon: "solana",
  },
  {
    name: "DOG WIF HAT",
    tickerSymbol: "WIF",
    icon: "wif",
    gladiatorIcon: "/assets/stakes/gladiators/wif.png",
  },
  {
    name: "POPCAT",
    tickerSymbol: "POPCAT",
    icon: "popcat",
    gladiatorIcon: "/assets/stakes/gladiators/popcat.png",
  },
  {
    name: "BONK",
    tickerSymbol: "BONK",
    icon: "bonk",
    gladiatorIcon: "/assets/stakes/gladiators/bonk.png",
  },
  {
    name: "GIGACHAD",
    tickerSymbol: "GIGA",
    icon: "gigachad",
    gladiatorIcon: "/assets/stakes/gladiators/gigachad.png",
  },
  {
    name: "PONKE",
    tickerSymbol: "PONKE",
    icon: "ponke",
    gladiatorIcon: "/assets/stakes/gladiators/ponke.png",
  },
];
