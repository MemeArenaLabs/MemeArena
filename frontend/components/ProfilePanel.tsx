"use client";
import React, { useState } from "react";
import Image from "next/image";
import SvgIcon from "@/utils/SvgIcon";
import { Modal } from "@/components/Modal";

interface ProfilePanelProps {
  userName: string;
  isOpponent?: boolean;
  readOnly?: boolean;
}

export default function ProfilePanel({
  userName,
  isOpponent = false,
  readOnly = false,
}: ProfilePanelProps) {
  return (
    <div className={`flex  ${isOpponent ? "flex-row-reverse" : ""}`}>
      <Profile
        username={userName}
        readOnly={readOnly}
        isOpponent={isOpponent}
      />
      <Settings />
    </div>
  );
}

export const Profile: React.FC<{
  username: string;
  readOnly?: boolean;
  isOpponent?: boolean;
}> = ({ username, readOnly = false, isOpponent = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState(username);

  const userClasses = "clip-path-polygon-left-top pr-20";
  const enemyClasses = "clip-path-polygon-right-top flex-row-reverse pl-20";

  return (
    <div
      className={`flex items-center gap-2 bg-dark-blue-80 p-2 ${isOpponent ? enemyClasses : userClasses} ${!readOnly && "cursor-pointer"}`}
      onClick={!readOnly ? () => setIsModalOpen(true) : undefined}
    >
      <Image
        src="/assets/team-selection/avatar/example-avatar.png"
        width={28}
        height={28}
        alt={`${username}'s Avatar`}
      />
      <span
        className={`text-sm  font-bold ${isOpponent ? "text-right w-full" : ""}`}
      >
        {username}
      </span>
      {!readOnly && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="MY PROFILE"
        >
          <div className="gap-4  flex justify-between  items-center    ">
            <div className="relative ">
              <Image
                src="/assets/profile/avatar-example.png"
                width={112}
                height={112}
                alt={`${username}'s Avatar`}
              />
              <div className="bg-yellow rounded-full absolute top-0 right-0 p-1 m-1 text-black ">
                <SvgIcon name="fountain-pen" className=" w-3 h-3 " />
              </div>
            </div>
            <div>
              <div className="w-[461px]  flex justify-between p-2 mb-4  bg-dark-blue gap-2 items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className=" bg-transparent w-full  outline-none text-white font-bold"
                />
                <div className="text-yellow ">
                  <SvgIcon name="fountain-pen" className="ml-2 w-6 h-6 " />
                </div>
              </div>
              <div className="flex gap-2 h-7">
                <button className="bg-light-blue w-1/2 flex justify-center gap-2 items-center text-black font-bold px-4 py-2 text-[14px]">
                  <SvgIcon name="unplugged" className="ml-2 w-6 h-6" />{" "}
                  DISCONNECT
                </button>
                <button className="bg-yellow w-1/2 text-black flex justify-center items-center gap-2  font-bold px-4 py-2 text-[14px]">
                  <SvgIcon name="save" className="ml-2 w-6 h-6" /> SAVE PROFILE
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full"></div>
        </Modal>
      )}
    </div>
  );
};

export const Settings: React.FC<{}> = ({}) => {
  //handle settings modal
  return (
    <div className="pr-2 flex items-center justify-center w-14 bg-dark-blue-80 -ml-[5px] clip-path-polygon-left-gui-profile-setting pl-1 cursor-pointer p-2">
      <SvgIcon name="settings" className="ml-2 w-6 h-6" />
    </div>
  );
};
