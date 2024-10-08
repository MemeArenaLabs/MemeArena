import React from "react";
import Image from "next/image";
import { Team } from "@/mockedData/mockedData";

const TeamDisplay = ({ team }: { team: Team }) => {
  return (
    <div>
      <div>
        <h2 className="relative mt-[-8px]">{team.teamName}</h2>
      </div>

      <div className="flex w-[600px] justify-center pt-2">
        <div className="w-full">
          <div className="grid mx-auto w-full justify-center h-40">
            <div className="flex max-w-[498px]">
              {team.gladiators.map((gladiator) => (
                <CharacterImage
                  key={`team1_${gladiator.name}`}
                  name={gladiator.name}
                  imageUrl={gladiator.imageUrl}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <Image
                className="mt-[-50px] animate-pulse z-0"
                src="/assets/team-selection/bg/big-shadow.png"
                width={471}
                height={72}
                alt="Player shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDisplay;

const CharacterImage = ({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) => (
  <div className="mr-[-50px]">
    <Image
      className="relative z-10"
      src={imageUrl}
      alt={`${name} skill`}
      width={226}
      height={226}
    />
  </div>
);
