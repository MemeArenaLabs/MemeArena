import React from 'react';
import Image from 'next/image';

const GladiatorPositions: React.FC = () => {
  return (
    <div className="flex justify-end gap-2">
      <div>
        <Image src="/assets/battle-layout/position-gladiators/Rectangle 22.png" width={50} height={50} alt="Posición 1" />
      </div>
      <div>
        <Image src="/assets/battle-layout/position-gladiators/Group 34.png" width={50} height={50} alt="Posición 2" />
      </div>
      <div>
        <Image src="/assets/battle-layout/position-gladiators/Group 35.png" width={50} height={50} alt="Posición 3" />
      </div>
    </div>
  );
};

export default GladiatorPositions;