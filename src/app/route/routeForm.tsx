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
          className={`cursor-pointer border border-caput-brown drop-shadow-xl rounded-xl p-0.5 hover:drop-shadow-custom-button hover:translate-y-[-1px] transition-transform ${travelMode == mode ? 'bg-caput-brown' : 'bg-off-white'}`}
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
        <div className="flex flex-col w-full mt-3">
            <div className="flex flex-col sm:flex-row sm:justify-center">
                <div className="flex flex-col items-center sm:w-1/2 p-1">
                    <input
                        className="flex bg-almond text-black placeholder:text-gray-800 border drop-shadow-lg rounded-xl border-caput-brown h-8 w-10/12 max-w-sm pl-1"
                        type="text"
                        id="startingAddress" 
                        value={startAddress}
                        onChange={handleInputChange}
                        placeholder="Starting point"
                    />
                </div>
                <div className="flex flex-col items-center sm:w-1/2 p-1">
                    <input
                        className="flex bg-almond text-black placeholder:text-gray-800 border drop-shadow-lg rounded-xl border-caput-brown h-8 w-10/12 max-w-sm pl-1"
                        type="text"
                        id="destinationAddress" 
                        value={destinationAddress}
                        onChange={handleInputChange}
                        placeholder="Destination"
                    />
                </div>
            </div>
            <div className="flex w-full justify-center mt-3">
                <div className="flex flex-row w-10/12 max-w-sm justify-between p-1">
                    {customRadioBtn("TRANSIT", busIcon)}
                    {customRadioBtn("DRIVE", carIcon)}
                    {customRadioBtn("BICYCLE", bikeIcon)}
                    {customRadioBtn("WALK", walkIcon)}
                </div>
            </div>
            <div className="flex justify-center p-1 mt-3">
                <button
                onClick={onSubmitClicked}
                disabled={destinationAddress == "" || startAddress == "" || travelMode == ""}
                className="flex border border-british-green text-british-green font-semibold bg-off-white w-[140px] h-[40px] rounded-2xl drop-shadow-lg justify-center items-center
              hover:drop-shadow-custom-button hover:translate-y-[-1px] transition-transform disabled:opacity-50 disabled:cursor-not-allowed">    
                Get route
                </button>
            </div>
        </div>
        
    );
}
export default RouteForm;
