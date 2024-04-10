import Link from "next/link";
import { MdLogin } from "react-icons/md";

const LogInButton = () => {
  return (
    <Link 
      href='/login' 
      alt='login' 
      className="flex flex-row bg-sky-950 p-2 rounded-md items-center gap-2 hover:bg-sky-800 text-slate-300 hover:text-white text-xs"
    >
      <MdLogin className="w-4 h-4"/>
      Login
    </Link>
  );
}
export default LogInButton;