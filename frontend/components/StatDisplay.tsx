import SvgIcon from "@/utils/SvgIcon";

interface StatDisplayProps {
  icon: string;
  label: string;
  value: number;
}

export default function StatDisplay({ icon, label, value }: StatDisplayProps) {
  return (
    <div className="flex px-2 py-1 max-h-[28px] justify-between clip-path-bg-left bg-dark-blue-50 items-center mb-2">
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
