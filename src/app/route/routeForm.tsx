import { useState } from "react";
import Image from "next/image";

const busIcon = "/images/icons8-bus.png";
const carIcon = "/images/icons8-car.png";
const bikeIcon = "/images/icons8-bike.png";
const walkIcon = "/images/icons8-walk.png";

const modeIconsWidth = 40;
const modeIconsHeight = modeIconsWidth;

const RouteForm = (props) => {

    const [startAddress, setStartAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");

    function handleInputChange(e) {
        const {id, value} = e.target;
        if (id == "startingAddress") {
            setStartAddress(value.trim());
        } else {
            setDestinationAddress(value.trim())
        }
    }

    function onSubmitClicked() {
        console.log(`Start address: ${startAddress}`)
        console.log(`Destination address: ${destinationAddress}`)
        if (startAddress.trim() == '' || destinationAddress.trim() == '') { // If either input fields are empty
            alert("Please fill in the input fields!")
        } else {
            props.onSubmit({start: startAddress, destination: destinationAddress})
        }
    }


    const [selectedMode, setSelectedMode] = useState(null);

    const customRadioBtn = (mode:string, icon:string) => (
        <label
          key={mode}
          className={`cursor-pointer border rounded-2xl p-0.5 hover:shadow-md ${
            selectedMode == mode ? 'bg-gray-300' : ''
          }`}
        >
          <input
            type="radio"
            name="modeOfTransportRadio"
            className="hidden"
            onChange={() => setSelectedMode(mode)}
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
        <div className="debug flex flex-col w-full min-w-[320px]">
            <div className="flex flex-col sm:flex-row sm:justify-center">
                <div className="debug flex flex-col items-center sm:w-1/2 p-1">
                    <input
                        className="border shadow rounded-2xl border-gray-400 h-8 w-10/12 max-w-sm"
                        type="text"
                        id="startingAddress" 
                        value={startAddress}
                        onChange={handleInputChange}
                        placeholder="Starting point"
                    />
                </div>
                <div className="debug flex flex-col items-center sm:w-1/2 p-1">
                    <input
                        className="border shadow rounded-xl border-gray-400 h-8 w-10/12 max-w-sm"
                        type="text"
                        id="destinationAddress" 
                        value={destinationAddress}
                        onChange={handleInputChange}
                        placeholder="Destination"
                    />
                </div>
            </div>
            <div className="debug flex w-full justify-center">
                <div className="debug flex flex-row w-full max-w-sm justify-between p-1">
                    {customRadioBtn("Bus", busIcon)}
                    {customRadioBtn("Car", carIcon)}
                    {customRadioBtn("Bike", bikeIcon)}
                    {customRadioBtn("Walk", walkIcon)}
                </div>
            </div>
            <div className="debug flex justify-center p-1">
                <button
                onClick={onSubmitClicked}
                disabled={destinationAddress == "" || startAddress == ""}
                className="bg-blue-500 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-2xl">
                Get route
                </button>
            </div>
        </div>
        
    );
}
export default RouteForm;
