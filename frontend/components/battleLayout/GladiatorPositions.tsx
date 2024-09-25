import React from "react";
import Image from "next/image";

interface Position {
  src: string;
  alt: string;
  isActive?: boolean;
  isDead?: boolean;
}

const positions: Position[] = [
  {
    src: "/assets/battle-layout/position-gladiators/gladiator.png",
    alt: "Position 1",
    isActive: true,
  },
  {
    src: "/assets/battle-layout/position-gladiators/next-gladiator.svg",
    alt: "Position 2",
  },
  {
    src: "/assets/battle-layout/position-gladiators/gladiator.png",
    alt: "Position 3",
    isDead: true,
  },
];

export default function GladiatorPositions(): JSX.Element {
  return (
    <div className="flex justify-end gap-2">
      {positions.map((position, index) => (
        <GladiatorPosition key={index} {...position} />
      ))}
    </div>
  );
}

interface GladiatorPositionProps extends Position {}

const GladiatorPosition: React.FC<GladiatorPositionProps> = ({
  src,
  alt,
  isDead = false,
  isActive = false,
}) => (
  <div
    className={`border-2 ${isActive ? "border-light-blue" : "border-transparent"}`}
  >
    <div className="relative">
      <Image
        src={src}
        width={50}
        height={50}
        alt={alt}
        className={isDead ? "bg-black opacity-70" : ""}
      />
      {isDead && (
        <Image
          src="/assets/battle-layout/position-gladiators/dead.svg"
          width={50}
          height={24}
          alt="Dead"
          className="absolute top-[25%] left-0 z-10"
        />
      )}
    </div>
  </div>
);
