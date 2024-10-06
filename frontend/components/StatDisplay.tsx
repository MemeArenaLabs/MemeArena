import SvgIcon, { IconName } from "@/utils/SvgIcon";

interface StatDisplayProps {
  icon: IconName;
  label: string;
  value: number;
}

export default function StatDisplay({ icon, label, value }: StatDisplayProps) {
  return (
    <div className="flex pl-2 pr-4 py-1 max-h-[28px] justify-between clip-path-bg-left bg-dark-blue-50 items-center">
      <div className="flex items-center gap-1">
        <SvgIcon name={icon} className="text-light-blue h-4 w-4" />
        <p className="text-light-blue text-[12px] font-medium">{label}</p>
      </div>
      <div className="flex items-center gap-1">
        <p className="text-[12px] font-bold pr-4">{value}</p>
      </div>
    </div>
  );
}
