import { useState } from "react";


const RouteForm = (props) => {

    const [startAddress, setStartAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");

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
        props.onSubmit({start: startAddress, destination: destinationAddress})
    }
    
    return (
        <div className="debug flex flex-col w-full">
            <div className="flex flex-col sm:flex-row sm:justify-center">
                <div className="debug flex flex-col items-center sm:w-1/2">
                    <label htmlFor="startingAddress">Starting point</label>
                    <input
                        className="border shadow rounded-lg border-gray-400"
                        type="text"
                        id="startingAddress" 
                        value={startAddress}
                        onChange={handleInputChange}
                        placeholder="123 Main St, City, Country"
                    />
                </div>
                <div className="debug flex flex-col items-center sm:w-1/2">
                    <label htmlFor="destinationAddress">Destination</label>
                    <input
                        className="border shadow rounded-lg border-gray-400"
                        type="text"
                        id="destinationAddress" 
                        value={destinationAddress}
                        onChange={handleInputChange}
                        placeholder="123 Main St, City, Country"
                    />
                </div>
            </div>
            <div className="debug flex justify-center p-1">
                <button
                onClick={onSubmitClicked}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Click to do API thing
        
                </button>
            </div>
        </div>
    );

}

export default RouteForm;
