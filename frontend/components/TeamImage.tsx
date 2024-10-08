import Image from "next/image";

export default function Component() {
  return (
    <div className="relative w-full h-full h-18 flex justify-center items-end">
      {/* Custom Shadow SVG */}
      <div className="absolute bottom-0.5 left-1/2 transform -translate-x-11 w-32">
        <Image
          src="/assets/gladiators/shadow.svg"
          alt="Shadow"
          width={87}
          height={13}
        />
      </div>

      {/* Characters */}
      <div className="absolute left-0 bottom-2 z-10 transform -translate-x-1/5">
        <Image
          src={"/assets/gladiators/no-bg/bonk.png"}
          alt="Left character"
          width={62.12}
          height={62.12}
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-2 z-20">
        <Image
          src="/assets/gladiators/no-bg/gigachad.png"
          alt="Middle character"
          width={62.12}
          height={62.12}
          className="object-contain"
        />
      </div>
      <div className="absolute right-0 bottom-2 z-10 transform translate-x-1/5">
        <Image
          src="/assets/gladiators/no-bg/wif.png"
          alt="Right character"
          width={62.12}
          height={62.12}
          className="object-contain"
        />
      </div>
    </div>
  );
}
