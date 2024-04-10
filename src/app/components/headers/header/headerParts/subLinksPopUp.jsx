import { subMenuLinks, supportsLinks } from "@/app/data/headerLinks";
import Link from "next/link";

const SubLinksPopUp = ({session}) => {
  return (
    <div className="absolute top-[2.65em] bg-sky-800 p-2 rounded-md shadow-md z-40">
      <p className="block text-sm font-semibold border-b border-white/40 border-0.5 pb-1 ">General</p>
      <div className='pt-2 pb-2 flex flex-col gap-1'>
        {subMenuLinks && subMenuLinks.map((link) => (
          <Link 
            href={link.href}
            key={link.name + 'subLinkMenu'}
            className="text-xs flex flex-row gap-2 flex-nowrap py-1 hover:bg-sky-950 items-center px-2 rounded-md" 
          >
            {link.icon}
            {link.name} 
          </Link>
        ))}
      </div>
      <p className="block font-semibold text-sm border-b border-white/40 border-0.5 pb-1 pt-2 ">Supports</p>
      <div
        className='pb-2 flex flex-col gap-1'
      >
        {supportsLinks && supportsLinks.map((link) => (
          <div
            key={link.name + 'supportsLinks'}
            className="text-xs pt-2"
          >
            <p>{link.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SubLinksPopUp;