export const getGladiatorImgUri = (tokenSymbol: string) => {
  return `/assets/gladiators/no-bg/${tokenSymbol.toLowerCase()}.png`;
};

export const getGladiatorColosseumBgImgUri = (tokenSymbol: string) => {
  return `/assets/gladiators/pfp/${tokenSymbol.toLowerCase()}.png`;
};

export const getGladiatorSkillImgUri = (skillName: string) => {
  return `/assets/gladiators/skills/${skillName}.png`;
};
