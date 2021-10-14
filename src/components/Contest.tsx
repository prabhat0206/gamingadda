import React from "react";

export class Contests extends React.Component {
  render() {
    return (
      <>
        <div className="flex w-full h-auto rounded-lg filter px-5 py-4 bg-gray-100 bg-opacity-60 backdrop-filter backdrop-blur-sm mb-4 flex-col">
          <div className="md:flex w-full  justify-between">
            <div className="flex flex-1 md:flex-col justify-between ">
              <h1>Prize Pool</h1>
              <span className="font-bold font-sans md:text-lg md:py-2">
                weekly diamond subscription
              </span>
            </div>
            <div className="flex flex-1 md:flex-col justify-between">
              <h1>Capacity of Room</h1>
              <span className="font-bold font-sans md:text-lg md:py-2">50</span>
            </div>
            <div className="flex flex-1 md:flex-col justify-between">
              <h1>Total Registrations</h1>
              <span className="font-bold font-sans md:text-lg md:py-2">45</span>
            </div>
            <div className="flex flex-col ">
              <h1 className="font-semibold">Entery</h1>
              <button className="bg-green-500 w-100 px-5 py-2 mt-3 text-white rounded-lg">
                Join &#8377;10
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
