import React from "react";
import Image from "next/image";
import SvgIcon from "@/utils/SvgIcon";

interface ProfilePanelProps {
  username?: string;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({
  username = "Magaibero22",
}) => (
  <div className="flex m-2">
    <Profile username={username} />
    <Settings />
  </div>
);

export default ProfilePanel;

export function Profile({ username }: { username: string }) {
  return (
    <div className="flex items-center gap-2 w-40 bg-dark-blue-80 clip-path-polygon-left-gui-profile-selection p-2 cursor-pointer">
      <Image
        src="/assets/team-selection/avatar/example-avatar.png"
        width={28}
        height={28}
        alt={`${username}'s Avatar`}
      />
      <span className="text-sm font-bold">{username}</span>
    </div>
  );
}

export function Settings() {
  return (
    <div className="pr-2 flex items-center justify-center w-14 bg-dark-blue-80 -ml-[5px] clip-path-polygon-left-gui-profile-setting pl-1 cursor-pointer p-2">
      <SvgIcon name="settings" className="ml-2 w-6 h-6" />
    </div>
  );
}
