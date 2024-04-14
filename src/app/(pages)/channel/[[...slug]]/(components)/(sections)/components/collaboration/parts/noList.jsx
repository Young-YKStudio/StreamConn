import { MdOutlineWarningAmber } from "react-icons/md";

const NoListCollarb = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-1">
      <MdOutlineWarningAmber className="w-8 h-8 text-yellow-500"/>
      <p className="text-xs">No Collarborations yet.</p>
    </div>
  );
}
export default NoListCollarb;