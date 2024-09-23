import Image from "next/image";

interface SkillsGUIProps {
  onAttack: () => void;
  isActive: boolean;
}

export function SkillCards({}) {
  return (
    <div className="relative w-full min-w-[100px] outline-4 outline-yellow-500">
      <div className="relative w-[100px] h-[100px]  cursor-pointer border-4 border-[#05345A]  bg-[url('/assets/battle-layout/skills/magaiba-card.png')]">
        <div className="relative z-10 h-full flex flex-col justify-between ">
          <div className="flex justify-end p-1">
            <Image
              src="/assets/battle-layout/gui-skills/info-skills.svg"
              width={12}
              height={12}
              alt="Skill Info"
            />
          </div>
          <div className="w-full bg-[#05345A] bg-opacity-70 p-1">
            <div className="text-xs font-bold text-white text-center">Skill Name</div>
          </div>
        </div>
      </div>
    </div>
  );
}
