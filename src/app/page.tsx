import Link from "next/link"
import Image from "next/image";

const busIcon = "/images/icons8-bus.png";
const carIcon = "/images/icons8-car.png";
const bikeIcon = "/images/icons8-bike.png";
const walkIcon = "/images/icons8-walk.png";
const meOnBoat = "/images/me-on-a-boat.png";

const modeIconsWidth = 40;
const modeIconsHeight = modeIconsWidth;

export default function Home() {


  function onCTAClick() {
    
  }


  function renderDecoIcons(iconPath:string, alt:string) {
    
    return (
      <div className="flex bg-caput-brown rounded-xl w-[45px] h-[45px] items-center justify-center">
        <Image
          src={iconPath}
          alt={alt}
          width={modeIconsWidth}
          height={modeIconsHeight}
          />
      </div>
    );
  }

  return (
    <main>
      <div className="flex flex-col w-full mt-2"> {/* Highest div */}
        <div className="flex flex-col w-full"> {/* Header */}
        <div className="flex flex-row w-full h-[255px]">
          <div className="relative flex flex-col w-3/4 pl-2 pt-2"> {/* Title and subtitle */}
            <h1 className="text-british-green text-2xl font-semibold">
                How eco-friendly is your transportation?</h1>
            <h2 className="text-british-green text-base pt-5">
              Calculate and compare CO2e emissions from taking the bus, driving, walking and biking.</h2>
          </div>

          <div className="flex flex-col justify-around items-center w-1/4">
            {renderDecoIcons(busIcon, "Bus icon")}
            {renderDecoIcons(carIcon, "Car icon")}
            {renderDecoIcons(walkIcon, "Walk icon")}
            {renderDecoIcons(bikeIcon, "Bike icon")}
          </div>
        </div>
        <div className="flex h-0 justify-center translate-y-[-53px]">
          <Link
              href={"/route"}
              className="flex border border-british-green text-british-green font-semibold bg-off-white w-[160px] h-[45px] rounded-2xl drop-shadow-lg justify-center items-center
              hover:drop-shadow-custom-button hover:translate-y-[-1px] transition-transform ">
                Find out!
              </Link>
        </div>
        </div>

        <div className="flex flex-col w-full mt-6"> {/* Details */}
          <div className="flex m-2 bg-dune rounded-2xl">
            <p className="text-british-green text-[15px] p-2">Eco Routes is a project I made in my spare time based on an idea I got during a sustainability course.</p>
          </div>
          <div className="flex m-2 bg-dune rounded-2xl">
            <p className="text-british-green text-[15px] p-2">It uses emissions data from various sources (found <a href="/how-it-works" className="underline">here</a>) and a Google Maps API to calculate the estimated amount of CO2 a route between two places would generate.</p>
          </div>
        </div>

        <h2 className="flex mt-6 justify-center text-lg text-british-green font-semibold">
          About me
        </h2>
        <div className="flex flex-col w-full"> {/* About me */}
          <div className="flex min-h-[200px] relative">
            <Image className="custom-obj-pos" src={meOnBoat} fill={true} alt="Linus on boat" objectFit="cover" priority={false} quality={100}/>
          </div>
          <div className="flex m-2 bg-dune rounded-2xl">
            <p className="text-british-green text-[15px] p-2">I&apos;m an ambitious and optimistic student with a passion for most things tech and problem solving. Currently learning how to leverage code in order to develop the next generation of software and engaging content at KTH, one of Europe&apos;s leading technical universities.</p>
          </div>

        </div>
      </div> 
    </main>
  )
}