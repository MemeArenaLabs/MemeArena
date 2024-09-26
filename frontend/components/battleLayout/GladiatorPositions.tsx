import React from 'react';
import Image from 'next/image';

const GladiatorPositions: React.FC = () => { 
  return (
    <div className="flex justify-end gap-2">
      <div className="border-2 border-light-blue">
        <Image src="/assets/battle-layout/position-gladiators/gladiator.png" width={50} height={50} alt="Posición 1" />
      </div>
      <div className="border-2 border-transparent">
        <Image src="/assets/battle-layout/position-gladiators/next-gladiator.svg" width={50} height={50} alt="Posición 2" />
      </div>
  
      <div className="relative flex justify-between items-center border-2 border-transparent">
        <Image 
          className="absolute z-10"         
          src="/assets/battle-layout/position-gladiators/dead.svg" 
          width={50} 
          height={24} 
          alt="Posición 3" 
        />
        
        <Image 
          className="relative z-0 bg-black opacity-70 " 
          src="/assets/battle-layout/position-gladiators/gladiator.png" 
          width={50} 
          height={50} 
          alt="Posición 1" 
        />
      </div>
    </div>
  );
};

export default GladiatorPositions;