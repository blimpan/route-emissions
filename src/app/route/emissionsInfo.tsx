import Image from "next/image";
import { routeModel } from "../routeModel";

const busIcon = "/images/icons8-bus.png";
const carIcon = "/images/icons8-car.png";
const bikeIcon = "/images/icons8-bike.png";
const walkIcon = "/images/icons8-walk.png";

const CO2_ABSORPTION_PER_M_IN_G = 833;

export default function EmissionsInfo(props:any) {

    const sortedRoutes = routeModel.getRoutesByEmission();
    const highestEmissions = routeModel.getEmissions(sortedRoutes[0].travelMode);
    const lowestEmissions = routeModel.getEmissions(sortedRoutes[sortedRoutes.length-1].travelMode);
    // console.log("High: " + highestEmissions + " Low: " + lowestEmissions);


    function generateDescriptionText() {

        let vehicleInSentence = "";

        switch (sortedRoutes[0].travelMode) {
            case "TRANSIT":
                vehicleInSentence = "by bus";
                break;
            case "DRIVE":
                vehicleInSentence = "by car";
                break;
            case "BICYCLE":
                vehicleInSentence = "by bike";
                break;
            case "WALK":
                vehicleInSentence = "on foot";
                break;
        }

        const emissionsInTrees = (highestEmissions / CO2_ABSORPTION_PER_M_IN_G).toFixed(1)

        return (
            <p className="text-british-green">This route <strong>{vehicleInSentence}</strong> would generate <strong>{(highestEmissions/1000).toFixed(1)} kg</strong> of CO2e.
            That&apos;s equivalent to the monthly carbon offset of <strong>{emissionsInTrees} trees</strong>.
            </p>
        );

    }

    function renderModeRowCB(routeObj:any) {

        let rowIcon = "";
        switch (routeObj.travelMode) {
            case "TRANSIT":
                rowIcon = busIcon;
                break;
            case "DRIVE":
                rowIcon = carIcon;
                break;
            case "BICYCLE":
                rowIcon = bikeIcon;
                break;
            case "WALK":
                rowIcon = walkIcon;
                break;
        }

        const barPercentualWidth = Math.round((routeModel.getEmissions(routeObj.travelMode) / highestEmissions) * 100);
        const barAdjustedWidth = `${Math.round(barPercentualWidth / 5) * 5}%`;
        // console.log("Adjusted width: " + barAdjustedWidth)
        // <div className={`flex w-[${barAdjustedWidth}] h-4/5 rounded-md border border-black bg-gray-700`}></div>
        
        const emissionsText = (routeModel.getEmissions(routeObj.travelMode)/1000).toFixed(1) + " kg CO2e"

        return (
        <div className="flex flex-row w-full h-12 items-center" key={routeObj.travelMode}>

            <div className="flex w-8 h-8 mx-0.5">
                <Image
                    src={rowIcon}
                    alt={routeObj.travelMode + " icon"}
                    width={45}
                    height={45}
                />
            </div>
            <div className="flex grow h-full items-center"> {/* We put this div around to stop bar from pushing aside icon and text */}
                <div style={{ width: barAdjustedWidth }} className="flex h-4/5 rounded-md bg-caput-brown"></div>
            </div>

            <p className="w-12 text-xs text-center mx-1">{emissionsText}</p>
        </div>
        );
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex p-1 rounded-lg bg-dune">
                {generateDescriptionText()}
            </div>
            <div className="flex grow max-h-min mt-2 rounded-lg bg-dune">
                <div className="flex flex-col w-full max-h-min">
                    {routeModel.getRoutesByEmission().map(renderModeRowCB)}
                </div>
            </div>
        </div>
    );
}