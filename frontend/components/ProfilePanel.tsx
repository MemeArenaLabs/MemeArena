import React from "react";
import Image from "next/image";

interface ProfilePanelProps {
  username?: string;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({
  username = "Magaibero22",
}) => (
  <div className="flex items-center pb-2">
    <div className="flex items-center gap-2 w-40 h-[43px] bg-dark-blue-80 clip-path-polygon-left-gui-profile-selection p-1 cursor-pointer">
      <Image
        src="/assets/team-selection/avatar/example-avatar.png"
        width={26.5}
        height={26.5}
        alt={`${username}'s Avatar`}
      />
      <span className="text-sm font-bold">{username}</span>
    </div>
    <div className="flex items-center justify-center w-14 h-[43px] bg-dark-blue-80 -ml-[5px] clip-path-polygon-left-gui-profile-setting pl-1 cursor-pointer">
      <Image src="/icons/settings.svg" width={24} height={24} alt="Settings" />
    </div>
  </div>
);

export default ProfilePanel;
