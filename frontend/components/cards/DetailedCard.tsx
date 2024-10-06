import React from "react";
import Image from "next/image";
import SvgIcon from "@/utils/SvgIcon";

interface DetailedCardProps {
  name: string;
  imageUrl: string;
  onClick: () => void;
}

const DetailedCard: React.FC<DetailedCardProps> = ({
  name,
  imageUrl,
  onClick,
}) => {
  return (
    <div className="flex items-center">
      <div
        className="w-full max-w-[98px] border-2 border-transparent hover:border-2 hover:border-yellow"
        onClick={onClick}
      >
        <div className="w-[94px] h-[100px] cursor-pointer border-4 border-dark-blue-70 border-opacity-70 relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={`${name} skill`}
            layout="fill"
            objectFit="cover"
            quality={90}
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-[#05345A] bg-opacity-70 p-1 flex justify-between items-center">
            <div className="text-xs font-bold text-white text-center">
              {name}
            </div>
            <SvgIcon name="info" className="w-[14px] h-[14px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCard;
