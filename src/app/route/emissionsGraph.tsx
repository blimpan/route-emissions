import Image from "next/image";
import { routeModel } from "../routeModel";

const busIcon = "/images/icons8-bus.png";
const carIcon = "/images/icons8-car.png";
const bikeIcon = "/images/icons8-bike.png";
const walkIcon = "/images/icons8-walk.png";

export default function GraphComponent(props:any) {

    const sortedRoutes = routeModel.getRoutesByEmission();
    const highestEmissions = routeModel.getEmissions(sortedRoutes[0].travelMode);
    const lowestEmissions = routeModel.getEmissions(sortedRoutes[sortedRoutes.length-1].travelMode);
    console.log("High: " + highestEmissions + " Low: " + lowestEmissions);

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
        console.log("Adjusted width: " + barAdjustedWidth)
        // <div className={`flex w-[${barAdjustedWidth}] h-4/5 rounded-md border border-black bg-gray-700`}></div>
        
        const emissionsText = routeModel.getEmissions(routeObj.travelMode) + " g CO2"

        return (
        <div className="debug flex flex-row w-full h-12 items-center" key={routeObj.travelMode}>

            <div className="flex w-8 h-8 mr-1">
                <Image
                    src={rowIcon}
                    alt={routeObj.travelMode + " icon"}
                    width={45}
                    height={45}
                />
            </div>
            <div className="flex grow h-full items-center"> {/* Put this div around to stop bar from pushing icon and text */}
                <div className={`flex w-[${barAdjustedWidth}] h-4/5 rounded-md border border-black bg-gray-700`}></div>
            </div>

            <p className="w-12 text-xs text-center">{emissionsText}</p>
        </div>
        );
    }

    return (
        <div className="debug flex border w-full h-full rounded-xl bg-gray-200 border-black">
            <div className="flex flex-col w-full h-full">
                {routeModel.getRoutesByEmission().map(renderModeRowCB)}
            </div>
        </div>
    );
}