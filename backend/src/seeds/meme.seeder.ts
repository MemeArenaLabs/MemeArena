import { DataSource } from 'typeorm';
import { Meme } from '../modules/meme/meme.entity';
import { Token } from '../modules/token/token.entity';
import { ELEMENTS } from '../modules/battle/battle.constants';
import { PROFESSIONS } from '../modules/token/token.constants';

export async function seedMemes(
  dataSource: DataSource,
  tokens: Token[],
): Promise<Meme[]> {
  const memeRepository = dataSource.getRepository(Meme);

  const elements = Object.values(ELEMENTS);
  const professions = Object.values(PROFESSIONS);

  const nameMapping = {
    WIF: { name: 'Wifrix' },
    POPCAT: { name: 'Popcator' },
    BONK: { name: 'Bongo' },
    GIGA: { name: 'Chadius' },
    MOODENG: { name: 'Moodenkuro' },
  };

  const memes: Meme[] = [];

  for (const token of tokens) {
    // Comprobamos si el símbolo del token está en el mapping
    const memeData = nameMapping[token.symbol];

    if (!memeData) {
      console.warn(`No se encontró un nombre para el token: ${token.symbol}`);
      continue; // Saltamos los tokens que no tienen un mapping
    }

    for (const element of elements) {
      for (const profession of professions) {
        const randomVariation = +Math.random() * 10;
        const meme = memeRepository.create({
          name: `${memeData.name}`,
          hpBase: 5 + Math.floor(randomVariation),
          attackBase: 100 + Math.floor(randomVariation),
          defenseBase: 100 + Math.floor(randomVariation),
          speedBase: 100 + Math.floor(randomVariation),
          element,
          profession,
          token,
        });
        await memeRepository.save(meme);
        memes.push(meme);
      }
    }
  }

  console.log('Memes seeded successfully!');
  return memes;
}
