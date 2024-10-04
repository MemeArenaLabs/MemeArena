import { Team } from "@/mockedData/mockedData";

type TeamCardProps = {
  onClick?: () => void;
  team: Team;
};

export default function TeamCard({ onClick, team }: TeamCardProps) {
  return (
    <div
      className="w-[97px] h-[87px] relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 z-20 transition-shadow duration-300 group-hover:shadow-[inset_0_0_0_4px_#FFFF00]"></div>
      <div className="h-[87px] w-[97px]">
        <div className="z-10 w-full h-full flex flex-col bg-no-repeat justify-between bg-[url('/assets/team-selection/gladiators/teams.png')]">
          <div className="flex justify-end p-1"></div>
          <div className="w-full bg-[#05345A] bg-opacity-70 p-1">
            <div className="text-[10px] font-bold text-white text-center">
              {team.teamName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
