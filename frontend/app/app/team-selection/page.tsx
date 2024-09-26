import React from "react";
import Image from "next/image";
import SvgIcon from "@/lib/utils/SvgIcon";

export default function TeamSelection() {
  return (
    <main className="flex flex-col bg-gray-900 text-white bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/team-selection/bg/bg.png')]">
      <div className="flex flex-grow">
      
        <div className="pt-2 pl-2 ">
          {/* User CTA profile */}
          <div className="pb-2 flex items-center">
            <div className=" cursor-pointer flex gap-2 items-center p-1 w-40 bg-dark-blue-80 h-[43px] clip-path-polygon-left-gui-profile-selection ">
              <div>
                <Image
                  src="/assets/team-selection/avatar/example-avatar.png "
                  width={26.5}
                  height={26.5}
                  alt="Avatar"
                />
              </div>
              <div className="text-[14px] font-bold">Magaibero22</div>
            </div>
            <div className="cursor-pointer w-14 pl-1 bg-dark-blue-80 h-[43px] ml-[-5px] clip-path-polygon-left-gui-profile-setting flex items-center justify-center">
              <Image
                src="/icons/settings.svg"
                width={24}
                height={24}
                alt="Setting"
              />
            </div>
          </div>

  {/* Left side and Center - Characters */}
          <div className="flex">
            <div>
              <div className="space-y-2 overflow-y-auto max-w-[78px] max-h-[271px]">
                <Image
                  className="border-2 border-yellow"
                  src="/assets/team-selection/gladiators/magaiba.png"
                  width={78}
                  height={78}
                  alt="Sombra jugador"
                />

                <Image
                  className="border-2 border-transparent hover:border-yellow"
                  src="/assets/team-selection/gladiators/magaiba.png"
                  width={78}
                  height={78}
                  alt="Sombra jugador"
                />

                <Image
                  className="border-2 border-transparent hover:border-yellow"
                  src="/assets/team-selection/gladiators/magaiba.png"
                  width={78}
                  height={78}
                  alt="Sombra jugador"
                />

                <Image
                  className="border-2 border-transparent hover:border-yellow"
                  src="/assets/team-selection/gladiators/magaiba.png"
                  width={78}
                  height={78}
                  alt="Sombra jugador"
                />

                <Image
                  className="border-2 border-transparent hover:border-yellow"
                  src="/assets/team-selection/gladiators/magaiba.png"
                  width={78}
                  height={78}
                  alt="Sombra jugador"
                />

                <Image
                  className="border-2 border-transparent hover:border-yellow"
                  src="/assets/team-selection/gladiators/magaiba.png"
                  width={78}
                  height={78}
                  alt="Sombra jugador"
                />
              </div>

              <div className="pt-2">
                <button className="bg-yellow text-black font-bold text-[14px    ] w-[78px] h-[28px] flex items-center justify-evenly">
                  <SvgIcon name="barbute" className="text-dark h-4 w-4  " />
                  ADD
                </button>
              </div>
            </div>

            <div>
              <div>
                <h1 className="relative mt-[-16px]">MAGAIBA </h1>
                <h3 className="relative mt-[-16px] pl-2 text-yellow">
                  TANK / PLANT
                </h3>
              </div>
              <div></div>
              <div className="flex pt-2">
                <div className=" px-2  min-w-[229px]">
                  <div className="flex px-2 py-1 max-h-[28px] justify-between clip-path-bg-left bg-dark-blue-50 items-center mb-2 ">
                    <div className="flex items-center gap-1">
                      <SvgIcon
                        name="broken-heart"
                        className="text-light-blue h-4 w-4"
                      />
                      <p className="text-light-blue text-[12px] font-medium">
                        HP
                      </p>
                    </div>

                    <div className="flex  items-center gap-1">
                      <SvgIcon
                        name="market-up"
                        className="text-white h-[6px] w-[7px]"
                      />
                      <p className=" text-[12px] font-bold pr-4">420</p>
                    </div>
                  </div>
                  <div className="flex px-2 py-1 max-h-[28px] justify-between clip-path-bg-left bg-dark-blue-50 items-center mb-2 ">
                    <div className="flex items-center gap-1">
                      <SvgIcon
                        name="battered-axe"
                        className="text-light-blue h-4 w-4"
                      />
                      <p className="text-light-blue text-[12px] font-medium">
                        ATTACK
                      </p>
                    </div>

                    <div className="flex  items-center gap-1">
                      <SvgIcon
                        name="market-down"
                        className="text-white h-[6px] w-[7px]"
                      />
                      <p className=" text-[12px] font-bold pr-4">36</p>
                    </div>
                  </div>
                  <div className="flex px-2 py-1 max-h-[28px] justify-between clip-path-bg-left bg-dark-blue-50 items-center mb-2 ">
                    <div className="flex items-center gap-1">
                      <SvgIcon
                        name="zeus-sword"
                        className="text-light-blue h-4 w-4"
                      />
                      <p className="text-light-blue text-[12px] font-medium ">
                        CRITICAL CHANCE
                      </p>
                    </div>

                    <div className="flex  items-center gap-1">
                      <SvgIcon
                        name="market-up"
                        className="text-white h-[6px] w-[7px]"
                      />
                      <p className=" text-[12px] font-bold pr-4">12</p>
                    </div>
                  </div>
                  <div className="flex px-2 py-1 max-h-[28px] justify-between clip-path-bg-left bg-dark-blue-50 items-center mb-2 ">
                    <div className="flex items-center gap-1">
                      <SvgIcon
                        name="shield-impact"
                        className="text-light-blue h-4 w-4"
                      />
                      <p className="text-light-blue text-[12px] font-medium">
                        DEFENSE
                      </p>
                    </div>

                    <div className="flex  items-center gap-1">
                      <SvgIcon
                        name="market-down"
                        className="text-white h-[6px] w-[7px]"
                      />
                      <p className=" text-[12px] font-bold pr-4">45</p>
                    </div>
                  </div>
                  <div className="flex px-2 py-1 max-h-[28px] justify-between clip-path-bg-left bg-dark-blue-50 items-center mb-2 ">
                    <div className="flex items-center gap-1">
                      <SvgIcon
                        name="speedometer"
                        className="text-light-blue h-4 w-4"
                      />
                      <p className="text-light-blue text-[12px] font-medium">
                        SPEED
                      </p>
                    </div>

                    <div className="flex  items-center gap-1">
                      <SvgIcon
                        name="market-up"
                        className="text-white h-[6px] w-[7px]"
                      />
                      <p className=" text-[12px] font-bold pr-4">69</p>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="grid mt-[-100px] mx-auto w-full  justify-center h-40">
                    <Image
                      className="relative player z-40   "
                      src="/assets/battle-layout/gladiators/magaiba.png"
                      width={226}
                      height={226}
                      alt="Jugador"
                    />
                    <Image
                      className="mt-[-30px] animate-pulse z-0"
                      src="/assets/battle-layout/gui-gladiators/shadow-gladiators.png"
                      width={234}
                      height={60}
                      alt="Sombra jugador"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Skills */}
        <div className="w-full bg-[url('/assets/team-selection/bg/bg-skills.png')] z-0 ">
          <div className="pr-2 pt-2">
            <h2 className="text-right text-xl font-bold mb-4 pt-2">Skills</h2>
            <div className="flex justify-end">
              <div className="grid grid-cols-2 gap-1  ">
                <div className=" flex items-center">
                  <div className="w-full max-w-[98px] border-2 border-transparent hover:border-2 hover:border-yellow">
                    <div className=" w-[94px] h-[100px]  cursor-pointer  border-4 border-dark-blue-70 border-opacity-70  ">
                      <div className=" z-10 h-full flex flex-col justify-between bg-[url('/assets/battle-layout/skills/magaiba-card.png')]">
                        <div className="flex justify-end p-1">
                          <Image
                            src="/assets/battle-layout/gui-skills/info-skills.svg"
                            width={12}
                            height={12}
                            alt="Skill Info"
                          />
                        </div>
                        <div className="w-full bg-[#05345A] bg-opacity-70 p-1">
                          <div className="text-xs font-bold text-white text-center">
                            Skill Name
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" flex items-center">
                  <div className="w-full max-w-[98px] border-2 border-transparent hover:border-2 hover:border-yellow">
                    <div className=" w-[94px] h-[100px]  cursor-pointer  border-4 border-dark-blue-70 border-opacity-70  ">
                      <div className=" z-10 h-full flex flex-col justify-between bg-[url('/assets/battle-layout/skills/magaiba-card.png')]">
                        <div className="flex justify-end p-1">
                          <Image
                            src="/assets/battle-layout/gui-skills/info-skills.svg"
                            width={12}
                            height={12}
                            alt="Skill Info"
                          />
                        </div>
                        <div className="w-full bg-[#05345A] bg-opacity-70 p-1">
                          <div className="text-xs font-bold text-white text-center">
                            Skill Name
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" flex items-center">
                  <div className="w-full max-w-[98px] border-2 border-transparent hover:border-2 hover:border-yellow">
                    <div className=" w-[94px] h-[100px]  cursor-pointer  border-4 border-dark-blue-70 border-opacity-70  ">
                      <div className=" z-10 h-full flex flex-col justify-between bg-[url('/assets/battle-layout/skills/magaiba-card.png')]">
                        <div className="flex justify-end p-1">
                          <Image
                            src="/assets/battle-layout/gui-skills/info-skills.svg"
                            width={12}
                            height={12}
                            alt="Skill Info"
                          />
                        </div>
                        <div className="w-full bg-[#05345A] bg-opacity-70 p-1">
                          <div className="text-xs font-bold text-white text-center">
                            Skill Name
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" flex items-center">
                  <div className="w-full max-w-[98px] border-2 border-transparent hover:border-2 hover:border-yellow">
                    <div className=" w-[94px] h-[100px]  cursor-pointer  border-4 border-dark-blue-70 border-opacity-70  ">
                      <div className=" z-10 h-full flex flex-col justify-between bg-[url('/assets/battle-layout/skills/magaiba-card.png')]">
                        <div className="flex justify-end p-1">
                          <Image
                            src="/assets/battle-layout/gui-skills/info-skills.svg"
                            width={12}
                            height={12}
                            alt="Skill Info"
                          />
                        </div>
                        <div className="w-full bg-[#05345A] bg-opacity-70 p-1">
                          <div className="text-xs font-bold text-white text-center">
                            Skill Name
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom - Button Bar */}
      <div className="px-2 pb-2">
        <div className="flex">
          <button className="clip-path-buttom-bar-left min-w-[186px] h-[40px] bg-dark-blue hover:bg-dark-blue hover:text-yellow text-white font-bold py-2 flex pl-4  items-center mr-[-20px]">
            <span className="mr-2 text-white">
              <SvgIcon name="barbute" className="text-white h-5 w-5 " />
            </span>{" "}
            Gladiators
          </button>
          <button className="clip-path-buttom-bar-center min-w-[186px] h-[40px] bg-dark-blue-50 hover:bg-dark-blue hover:text-yellow  text-white font-bold py-2  flex justify-center items-center mr-[-20px]">
            <span className="mr-2">
              {" "}
              <SvgIcon name="all-for-one" className="text-white h-5 w-5 " />
            </span>{" "}
            Teams
          </button>
          <button className="clip-path-buttom-bar-center min-w-[186px] h-[40px] bg-dark-blue-50 hover:bg-dark-blue hover:text-yellow text-white font-bold py-2 flex justify-center items-center mr-[-20px]">
            <span className="mr-2">
              {" "}
              <SvgIcon name="hand-money" className="text-white h-5 w-5 " />
            </span>{" "}
            Stake
          </button>
          <button className="clip-path-buttom-bar-right w-full h-[40px] bg-yellow  ow-500 hover:bg-yellow-600 text-black flex justify-center hover:opacity-85 font-bold py-2">
            <span className="mr-2">
              {" "}
              <SvgIcon name="crossed-swords" className="text-black h-5 w-5 " />
            </span>{" "}
            FIGHT!
          </button>
        </div>
      </div>
    </main>
  );
}
