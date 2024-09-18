// components/BattleArea.tsx
import React from 'react';
import Image from 'next/image';

interface BattleAreaProps {
  currentTurn: 1 | 2;
  showAttackEffect?: boolean;
}

const BattleArea: React.FC<BattleAreaProps> = ({ currentTurn, showAttackEffect }) => {
  return (
    <div className="flex-grow flex h-[100%] justify-center">
      <div className="w-[567px] h-full flex justify-between items-center">
        <div className="">
          <Image
            className={`relative player z-40 ${currentTurn === 1 ? 'border-2 border-yellow-400' : ''}`}
            src="/assets/battle-layout/gladiators/magaiba.png"
            width={200}
            height={200}
            alt="Jugador"
          />
          <Image
            className="mt-[-30px] animate-pulse z-0"
            src="/assets/battle-layout/gui-gladiators/shadow-gladiators.png"
            width={200}
            height={50}
            alt="Sombra jugador"
          />
        </div>
        <div className="">
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
            width={200}
            height={200}
            alt="Enemigo"
          />
          <Image
            className="mt-[-30px] enemy z-0"
            src="/assets/battle-layout/gui-gladiators/shadow-gladiators.png"
            width={200}
            height={50}
            alt="Sombra enemigo"
          />
        </div>
      </div>
    </div>
  );
};

export default BattleArea;