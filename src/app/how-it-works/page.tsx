import Link from "next/link"

const reactIcon = "/images/icons8-react.png";
const figmaIcon = "/images/icons8-figma.png";
const nextIcon = "/images/nextjs-icon.png";
const typescriptIcon = "/images/icons8-typescript.png";
const vercelLogo = "/images/vercel-logotype-dark.png";

export default function HowItWorks() {
  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-full m-2">
        <div className="flex flex-col rounded-xl p-2 border-caput-brown bg-dune"> {/* Meet the stack */}
          <h2 className="text-xl font-semibold text-british-green">Meet The Stack</h2>
          <p className="text-british-green-darker mt-1">This React <img src={reactIcon} alt="React logo" className="inline-block w-6 -m-0.5 translate-y-[-2px]"/> app was designed in Figma <img src={figmaIcon} alt="Figma logo" className="inline-block w-6 -m-0.5 translate-y-[-1px]"/>, built using Next.js <img src={nextIcon} alt="Next.js logo" className="inline-block w-6 -m-0.5 translate-y-[-2px]"/> , written in TypeScript <img src={typescriptIcon} alt="TypeScript logo" className="inline-block w-7 -m-0.5 translate-y-[-2px]"/> and deployed using <img src={vercelLogo} alt="Vercel logo" className="inline-block h-4 -m-0.5 translate-y-[-1px]"/></p>
        </div>
        
        <div> {/* The math */}

        </div>
        <div> {/* Sources and credit */}

        </div>

      </div>
    </div>
  )
}
