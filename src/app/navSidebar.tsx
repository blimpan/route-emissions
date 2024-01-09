"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const homeIcon = "/images/icons8-home.png";
const mapIcon = "/images/icons8-map.png";
const documentsIcon = "/images/icons8-terms-and-conditions.png";


const linkObjects = [
    {
        path: "/",
        icon: homeIcon,
        alt: "Home icon",
    },
    {
        path: "/route",
        icon: mapIcon,
        alt: "Map icon",
    },
    {
        path: "/how-it-works",
        icon: documentsIcon,
        alt: "Documents icon",
    },
];


export default function NavSidebar(props:any) {

    const pathname = usePathname();

    function renderLinksCB(linkObject:any) {

        const isOnPage = (pathname == linkObject.path)

        return (
            <div className={`flex justify-center place-items-center w-[50px] h-[50px] ${isOnPage ? 'bg-darker-almond' : ''}`} key={linkObject.alt}>
            <Link href={linkObject.path} onClick={props.onNavigation}>
                <Image
                src={linkObject.icon}
                width={40}
                height={40}
                alt={linkObject.alt}
                />
            </Link>
        </div>
        );
    }
    
    return (
        <div className="absolute flex flex-col top-[50px] border-black border-l border-b right-0 bg-almond z-10 w-[50px] h-min">
            {linkObjects.map(renderLinksCB)}
        </div>
    );
};
