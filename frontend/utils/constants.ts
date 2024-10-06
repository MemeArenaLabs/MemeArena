import { Token } from "@/types/tokens";

export type Coin = {
  name: string;
  tickerSymbol: Token;
  iconUrl: string;
};

export type MemeCoin = Coin & {
  gladiatorIcon?: string;
};

export const supportedCoins: (MemeCoin | Coin)[] = [
  {
    name: "Solana",
    tickerSymbol: Token.SOL,
    iconUrl: "/assets/coin-logos/solana.svg",
  },
  {
    name: "DOG WIF HAT",
    tickerSymbol: Token.WIF,
    iconUrl: "/assets/coin-logos/wif.png",
    gladiatorIcon: "/assets/stakes/gladiators/wif.png",
  },
  {
    name: "POPCAT",
    tickerSymbol: Token.POPCAT,
    iconUrl: "/assets/coin-logos/popcat.png",
    gladiatorIcon: "/assets/stakes/gladiators/popcat.png",
  },
  {
    name: "BONK",
    tickerSymbol: Token.BONK,
    iconUrl: "/assets/coin-logos/bonk.png",
    gladiatorIcon: "/assets/stakes/gladiators/bonk.png",
  },
  {
    name: "GIGACHAD",
    tickerSymbol: Token.GIGA,
    iconUrl: "/assets/coin-logos/gigachad.png",
    gladiatorIcon: "/assets/stakes/gladiators/gigachad.png",
  },
  {
    name: "PONKE",
    tickerSymbol: Token.BONK,
    iconUrl: "/assets/coin-logos/ponke.png",
    gladiatorIcon: "/assets/stakes/gladiators/ponke.png",
  },
];
