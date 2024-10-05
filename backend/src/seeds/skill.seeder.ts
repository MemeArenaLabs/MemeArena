// src/seeds/skill.seeder.ts

import { DataSource } from 'typeorm';
import { Meme, Skill, SkillType } from '../modules/meme/meme.entity';
export enum Token {
  SOL = 'SOL',
  WIF = 'WIF',
  POPCAT = 'POPCAT',
  BONK = 'BONK',
  GIGA = 'GIGA',
  PONKE = 'PONKE',
  MOODENG = 'MOODENG'
}
export async function seedSkills(dataSource: DataSource, memes: Meme[]): Promise<void> {
  const skillRepository = dataSource.getRepository(Skill);

  const skillsData = {
    [Token.WIF]: [
      {
        name: 'dogwifhatSkill1',
        title: 'Moonshot',
        quote: '“Unleash a moon fragment to crush your opponent!”',
        description: 'Dog wif Hat hurls a piece of the moon, dealing heavy damage.',
        damage: 80,
        speed: 1,
        skillType: SkillType.DAMAGE,
      },
      {
        name: 'dogwifhatSkill2',
        title: 'Crochet Trap',
        quote: '“A handmade net that stops opponents in their tracks.”',
        description: 'Dog wif Hat throws a crochet net, immobilizing the enemy for 1 to 3 turns.',
        damage: 0,
        speed: 1,
        skillType: SkillType.STUN,
      },
      {
        name: 'dogwifhatSkill3',
        title: 'Dog wif helmet',
        quote: '“A helmet that boosts defense and resilience.”',
        description: 'Equipping a sturdy helmet, Dog wif Hat increases defense by 30%.',
        damage: 0,
        speed: 1,
        skillType: SkillType.BUFF,
      },
      {
        name: 'dogwifhatSkill4',
        title: 'Fatal Fetch',
        quote: '“A deadly gamble—could end it all in one shot.”',
        description: '1 in 20 chance to instantly defeat the opponent with a single attack.',
        damage: 9999,
        speed: 1,
        skillType: SkillType.DAMAGE,
      },
    ],
    [Token.BONK]: [
      {
        name: 'bonkSkill1',
        title: 'Home run hit',
        quote: '“Swing for the fences! Either land a massive hit or miss completely.”',
        description: 'Bonk takes a wild swing with his bat. It has a chance to deal high damage (home run) or miss entirely (strikeout).',
        damage: 100,
        speed: 1,
        skillType: SkillType.DAMAGE,
      },
      {
        name: 'bonkSkill2',
        title: 'Blitz attack',
        quote: '“Strike before your opponent can react.”',
        description: 'Bonk charges forward with incredible speed, landing a quick attack that ensures you move faster than your opponent.',
        damage: 60,
        speed: 2,
        skillType: SkillType.DAMAGE,
      },
      {
        name: 'bonkSkill3',
        title: 'Golden Slammer',
        quote: '“A bat of legends, boosting your power.”',
        description: 'Bonk wields a golden bat, increasing his attack power by 20% for a short duration.',
        damage: 0,
        speed: 1,
        skillType: SkillType.BUFF,
      },
      {
        name: 'bonkSkill4',
        title: 'Bat Shield',
        quote: '“Deflect incoming damage with precision.”',
        description: 'Bonk uses his bat to block the next incoming attack, reducing 99% of the damage.',
        damage: 0,
        speed: 1,
        skillType: SkillType.BUFF,
      },
    ],
    [Token.GIGA]: [
      {
        name: 'gigachadSkill1',
        title: 'Alpha Flex',
        quote: '“Strike a pose and power up!”',
        description: 'Gigachad flexes his muscles, gaining 20% more damage and increasing his defense by 10%.',
        damage: 0,
        speed: 1,
        skillType: SkillType.BUFF,
      },
      {
        name: 'gigachadSkill2',
        title: 'Giga Slam',
        quote: '“Lift and slam your opponent with raw power.”',
        description: 'Gigachad grabs his opponent and slams them to the ground, dealing heavy damage.',
        damage: 90,
        speed: 1,
        skillType: SkillType.DAMAGE,
      },
      {
        name: 'gigachadSkill3',
        title: 'Bro Barrage',
        quote: '“Deliver a rapid combo of powerful punches.”',
        description: 'Gigachad unleashes a series of punches, hitting the enemy 2 to 3 times in quick succession.',
        damage: 30,
        speed: 1,
        skillType: SkillType.DAMAGE,
      },
      {
        name: 'gigachadSkill4',
        title: 'Timber Bash',
        quote: '“Wield a massive trunk to crush your foes.”',
        description: 'Gigachad swings a heavy tree trunk he cut down himself, dealing massive damage to all enemies.',
        damage: 100,
        speed: 1,
        skillType: SkillType.DAMAGE,
      },
    ],
    [Token.POPCAT]: [
      {
        name: 'popcatSkill1',
        title: 'Pop Pitch',
        quote: '“Open wide and unleash a sonic blast!”',
        description: 'Popcat opens its mouth and releases a powerful sound wave that deals damage to the opponent.',
        damage: 70,
        speed: 1,
        skillType: SkillType.DAMAGE,
      },
      {
        name: 'popcatSkill2',
        title: 'Viral Surge',
        quote: '“Harness the power of internet fame!”',
        description: 'Popcat taps into its viral essence, boosting its attack power by 10% to 50% for a short time based on sheer meme energy.',
        damage: 0,
        speed: 1,
        skillType: SkillType.BUFF,
      },
      {
        name: 'popcatSkill3',
        title: 'Mouse Trap',
        quote: '“No mouse escapes Popcat’s grasp!”',
        description: 'Popcat lunges at the opponent with lightning speed, striking them with a powerful swipe. This attack has a chance to stun.',
        damage: 60,
        speed: 2,
        skillType: SkillType.STUN,
      },
      {
        name: 'popcatSkill4',
        title: 'Knife Pop',
        quote: '“Pop, then slice with surprise!”',
        description: 'In an unexpected turn, Popcat pops and brandishes a knife, delivering a critical attack that has a high chance of dealing massive damage.',
        damage: 100,
        speed: 1,
        skillType: SkillType.DAMAGE,
      },
    ],
    [Token.MOODENG]: [
      {
        name: 'moodengSkill1',
        title: 'Geyser Spout',
        quote: '“Release a pressurized water stream!”',
        description: 'Moodeng sprays a high-pressure stream of water from its mouth, dealing significant water-type damage. If Moodeng is at full health, the damage is amplified.',
        imageUrl: 'https://.../Moodeng_2.png',
        damage: 80,
        speed: 1,
        skillType: SkillType.DAMAGE,
      },
      {
        name: 'moodengSkill2',
        title: 'Jawbreaker Chomp',
        quote: '“A crushing bite with massive force!”',
        description: 'Moodeng opens its powerful jaws wide and delivers a devastating chomp, inflicting heavy damage.',
        damage: 90,
        speed: 1,
        skillType: SkillType.DAMAGE,
      },
      {
        name: 'moodengSkill3',
        title: 'Belly Slam',
        quote: '“Bounce with brute force!”',
        description: 'Moodeng uses its huge belly to slam into the opponent, dealing damage with a chance to stun for 1 turn.',
        damage: 70,
        speed: 1,
        skillType: SkillType.STUN,
      },
      {
        name: 'moodengSkill4',
        title: 'Mud Splash',
        quote: '“Splatter mud everywhere, blinding your foes!”',
        description: "Moodeng splashes mud all around, dealing light damage and reducing the opponent's accuracy for the next turn.",
        damage: 50,
        speed: 1,
        skillType: SkillType.DEBUFF,
      },
    ],
  };

  for (const meme of memes) {
    const memeSkills = skillsData[meme.token.symbol];
    if (memeSkills) {
      for (const skillData of memeSkills) {
        const skill = skillRepository.create({
          ...skillData,
          meme,
        });
        await skillRepository.save(skill);
      }
      const switchSkill = skillRepository.create({
        name: `${meme.name.toLowerCase().replace(/\s+/g, '')}Skill5`,
        title: 'Switch Meme',
        quote: '“Swap out to a fresh meme ally.”',
        description: 'Switches to another meme in your collection.',
        damage: 0,
        speed: 1,
        skillType: SkillType.SWITCH,
        meme,
      });
      await skillRepository.save(switchSkill);
    } else {
      console.warn(`No skills found for meme: ${meme.name}`);
    }
  }

  console.log('Skills seeded successfully!');
}
