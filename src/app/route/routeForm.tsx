import { useState } from "react";
import Image from "next/image";

const busIcon = "/images/icons8-bus.png";
const carIcon = "/images/icons8-car.png";
const bikeIcon = "/images/icons8-bike.png";
const walkIcon = "/images/icons8-walk.png";

const modeIconsWidth = 40;
const modeIconsHeight = modeIconsWidth;

const RouteForm = (props) => {

    const [startAddress, setStartAddress] = useState<string>("");
    const [destinationAddress, setDestinationAddress] = useState<string>("");

    function handleInputChange(e) {
        const {id, value} = e.target;
        if (id == "startingAddress") {
            setStartAddress(value);
        } else {
            setDestinationAddress(value)
        }
    }

    function onSubmitClicked() {
        console.log(`Start address: ${startAddress}`)
        console.log(`Destination address: ${destinationAddress}`)
        console.log(`Travel mode: ${travelMode}`)
        
        props.onSubmit({"start": startAddress, "destination": destinationAddress, "travelMode": travelMode})   
    }


    const [travelMode, setTravelMode] = useState("");

    const customRadioBtn = (mode:string, icon:string) => (
        <label
          key={mode}
          className={`cursor-pointer border rounded-2xl p-0.5 hover:shadow-md ${
            travelMode == mode ? 'bg-gray-300' : ''
          }`}
        >
          <input
            type="radio"
            name="modeOfTransportRadio"
            className="hidden"
            onChange={() => setTravelMode(mode)}
          />
          <Image
            src={icon}
            alt={`${mode} icon`}
            width={modeIconsWidth}
            height={modeIconsHeight}
          />
        </label>
      );
    
    return (
        <div className="flex flex-col w-full min-w-[320px]">
            <div className="flex flex-col sm:flex-row sm:justify-center">
                <div className="flex flex-col items-center sm:w-1/2 p-1">
                    <input
                        className="border shadow rounded-xl border-gray-400 h-8 w-10/12 max-w-sm pl-1"
                        type="text"
                        id="startingAddress" 
                        value={startAddress}
                        onChange={handleInputChange}
                        placeholder="Starting point"
                    />
                </div>
                <div className="flex flex-col items-center sm:w-1/2 p-1">
                    <input
                        className="border shadow rounded-xl border-gray-400 h-8 w-10/12 max-w-sm pl-1"
                        type="text"
                        id="destinationAddress" 
                        value={destinationAddress}
                        onChange={handleInputChange}
                        placeholder="Destination"
                    />
                </div>
            </div>
            <div className="flex w-full justify-center">
                <div className="flex flex-row w-10/12 max-w-sm justify-between p-1">
                    {customRadioBtn("TRANSIT", busIcon)}
                    {customRadioBtn("DRIVE", carIcon)}
                    {customRadioBtn("BICYCLE", bikeIcon)}
                    {customRadioBtn("WALK", walkIcon)}
                </div>
            </div>
            <div className="flex justify-center p-1">
                <button
                onClick={onSubmitClicked}
                disabled={destinationAddress == "" || startAddress == "" || travelMode == ""}
                className="bg-blue-500 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-2xl">
                Get route
                </button>
            </div>
        </div>
        
    );
}
export default RouteForm;
