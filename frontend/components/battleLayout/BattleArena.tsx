// components/BattleArea.tsx
import React from 'react';
import Image from 'next/image';

interface BattleArenaProps {
  currentTurn: 1 | 2;
  showAttackEffect?: boolean;
}

const BattleArena: React.FC<BattleArenaProps> = ({ currentTurn, showAttackEffect }) => {
  return (
    <div className="">
      <div className="w-full flex justify-center gap-[250px]">
        <div className="grid justify-end">
          <Image
            className={`relative player z-40 ${currentTurn === 1 ? 'border-2 border-yellow-400' : ''}`}
            src="/assets/battle-layout/gladiators/magaiba.png"
            width={151}
            height={170}
            alt="Jugador"
          />
          <Image
            className="mt-[-30px] animate-pulse z-0"
            src="/assets/battle-layout/gui-gladiators/shadow-gladiators.png"
            width={151}
            height={50}
            alt="Sombra jugador"
          />
        </div>


        <div className=" justify-center">
          {showAttackEffect && (
            <Image
              className="absolute z-40"
              width={190}
              height={190}
              src="/assets/battle-layout/skills-effects/punch.gif"
              alt="Efecto de ataque"
            />
          )}
          <Image
            className={`relative enemy z-30 ${currentTurn === 2 ? 'border-2 border-yellow-400' : ''}`}
            src="/assets/battle-layout/gladiators/bonk.png"
            width={164}
            height={180}
            alt="Enemigo"
          />
          <Image
            className="mt-[-30px] enemy z-0"
            src="/assets/battle-layout/gui-gladiators/shadow-gladiators.png"
            width={164}
            height={50}
            alt="Sombra enemigo"
          />
        </div>
      </div>
    </div>
  );
};

export default BattleArena;