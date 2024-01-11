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
        <div className="flex flex-col rounded-xl p-2 "> {/* Meet the stack */}
          <h2 className="text-xl font-semibold text-british-green">Meet The Stack</h2>
          <p className="text-british-green-darker mt-1">This React <img src={reactIcon} alt="React logo" className="inline-block w-6 -m-0.5 translate-y-[-2px]"/> app was designed in Figma <img src={figmaIcon} alt="Figma logo" className="inline-block w-6 -m-0.5 translate-y-[-1px]"/>, built using Next.js <img src={nextIcon} alt="Next.js logo" className="inline-block w-6 -m-0.5 translate-y-[-2px]"/> , written in TypeScript <img src={typescriptIcon} alt="TypeScript logo" className="inline-block w-7 -m-0.5 translate-y-[-2px]"/> and deployed using <img src={vercelLogo} alt="Vercel logo" className="inline-block h-4 -m-0.5 translate-y-[-1px]"/></p>
        </div>
        
        <div className="flex flex-col rounded-xl p-2 border-caput-brown bg-dune mt-2"> {/* The math */}
          <h2 className="text-xl font-semibold text-british-green">The Math</h2>
          <p className="text-british-green-darker mt-1">By using the Routes API from Google Maps we get the time and distance for a route between point A and point B using our four modes of transportation. As of writing, the estimated emissions are calculated by multiplying the distance by an amount of grams CO2e per passenger kilometer. <br/><br/> The sources I have used to try and set an amount of CO2e/km for each mode of transportation can be found below.</p>
        </div>

        <div className="flex flex-col rounded-xl p-2 mt-2"> {/* Sources and credit */}
          <h2 className="text-xl font-semibold text-british-green">Sources & Credit</h2>
          <p className="text-british-green-darker mt-1">Bernet, Ross. “How Much CO2 Does A Tree Absorb?” <a href="https://onetreeplanted.org/blogs/stories/how-much-co2-does-tree-absorb" className="underline" target="_blank">One Tree Planted</a>, July 2023.<br/><br/>
          Mizdrak, A., Cobiac, L.J., Cleghorn, C.L. et al. ”Fuelling walking and cycling: human powered locomotion is associated with non-negligible greenhouse gas emissions.” <a href="https://doi.org/10.1038/s41598-020-66170-y" className="underline" target="_blank">Scientific Reports</a>, June 2020.<br/><br/>
          <a href="https://klimatsmartsemester.se/transportmedelsberakningar" className="underline" target="_blank">Klimatsmart Semester</a>. “Transportmedelsberäkningar.” Accessed December 2023.<br/><br/>
          Icons are from <a href="icons8.com" className="underline" target="_blank">Icons8</a>.<br/><br/>
          Google Maps disclaimer: Routes for walking and biking are in beta and might sometimes be missing clear sidewalks, pedestrian paths, or bicycling paths.</p>
        </div>

      </div>
    </div>
  )
}
