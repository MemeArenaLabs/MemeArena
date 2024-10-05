export type TickerSymbol = "WIF" | "POPCAT" | "BONK" | "PONKE" | "GIGA" | "SOL";

export type Coin = {
  name: string;
  tickerSymbol: TickerSymbol;
  iconUrl: string;
};

export type MemeCoin = Coin & {
  gladiatorIcon?: string;
};

export const supportedCoins: (MemeCoin | Coin)[] = [
  {
    name: "Solana",
    tickerSymbol: "SOL",
    iconUrl: "/assets/coin-logos/solana.svg",
  },
  {
    name: "DOG WIF HAT",
    tickerSymbol: "WIF",
    iconUrl: "/assets/coin-logos/wif.png",
    gladiatorIcon: "/assets/stakes/gladiators/wif.png",
  },
  {
    name: "POPCAT",
    tickerSymbol: "POPCAT",
    iconUrl: "/assets/coin-logos/popcat.png",
    gladiatorIcon: "/assets/stakes/gladiators/popcat.png",
  },
  {
    name: "BONK",
    tickerSymbol: "BONK",
    iconUrl: "/assets/coin-logos/bonk.png",
    gladiatorIcon: "/assets/stakes/gladiators/bonk.png",
  },
  {
    name: "GIGACHAD",
    tickerSymbol: "GIGA",
    iconUrl: "/assets/coin-logos/gigachad.png",
    gladiatorIcon: "/assets/stakes/gladiators/gigachad.png",
  },
  {
    name: "PONKE",
    tickerSymbol: "PONKE",
    iconUrl: "/assets/coin-logos/ponke.png",
    gladiatorIcon: "/assets/stakes/gladiators/ponke.png",
  },
];
