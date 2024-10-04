import SvgIcon from "@/utils/SvgIcon";
import Image from "next/image";

interface SkillCardProps {
  skill: {
    name: string;
    imageUrl: string;
  };
  onClick: () => void;
}

const DetailedCard: React.FC<SkillCardProps> = ({ skill, onClick }) => {
  return (
    <div className="flex items-center">
      <div
        className="w-full max-w-[98px] border-2 border-transparent hover:border-2 hover:border-yellow"
        onClick={onClick}
      >
        <div className="w-[94px] h-[100px] cursor-pointer border-4 border-dark-blue-70 border-opacity-70">
          <div className="z-10 h-full flex flex-col justify-end bg-[url('/assets/battle-layout/skills/magaiba-card.png')]">
            <div className="w-full bg-[#05345A] bg-opacity-70 p-1 flex justify-between items-center">
              <div className="text-xs font-bold text-white text-center">
                {skill.name}
              </div>
              <SvgIcon name="info" className="w-[14px] h-[14px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCard;
