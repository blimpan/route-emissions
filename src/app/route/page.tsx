"use client"

import Link from "next/link"
import getRoute from "../../../lib/mapsSource";
import MapComponent from "./customMap";

const requestData = {
  origin: {
    "address": "KTH Royal Institute of Technology, Brinellvägen 8, 114 28 Stockholm",
  },
  destination: {
    "address": "Karolinska Institute, Solnavägen 1, 171 77 Solna",
  },
  travelMode: 'WALK',
  /*
  routingPreference: "TRAFFIC_AWARE",
  routeModifiers: {
    "avoidHighways": false
  },
  */

  languageCode: 'en-US',
  units: 'METRIC',
};


export default function RoutePage() {

  let polylineStr: string;
  
  async function onDoApiThing() {
    const responseData = getRoute(requestData);
    const response = await responseData;
    console.log(response);
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Route Page</h1>
      <Link href="/">Link to Home Page</Link>
      <p></p>
      <button
      onClick={onDoApiThing}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Click to do API thing
      </button>
      <div className="debug flex w-full justify-center">
        <div className="debug w-1/2">
          <MapComponent encodedPolyline="uwfiJqihmBK@MbA^ES^YRJn@ADEU@?DNG\?T{@rALh@aB~BZlAVzAb@xANx@PVFZIPQP?^PvCtCfEVVVIHGFd@EHCRB@GXDPEPXx@Q`CeC~Ho@jBKJ{ApEeAdCWp@Rb@KZkBrDg@jAcApCT|@\jAABJf@@ABLr@i@ZGHFHVVbCNlBcA`Dw@zBAR@TID]dBKXBNGNMvBCfC@^Uv@SzAChB?rBEp@Ub@_@f@zA`G~@vDA^yApKIRQnAWn@QNW@EES`@G`@c@lAEj@AhA_@OeAKQLqArBWh@E\_CvFe@fAKNLl@VXJDD^b@nBn@nF?jA|ArPLx@Jh@JfBB|@W|d@@`@AzAE`@Qr[@^CtFC`AAvBBd@It@e@pA]j@IHy@zAYJSj@LTSj@Qr@MTsAjHg@dF]vBe@zAoDbIqAbDCCETHFGVWPXVDOPJMXNZMVkBlFyAtEM`@Qz@]`A@rAAXFnADvBDl@BlCg@F?NWD"/>
        </div>
      </div>
    </>
  )
}
