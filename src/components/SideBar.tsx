import React from "react";

export class Sidebar extends React.Component {
  render() {
    return (
      <>
        <div
          className="flex xl:w-80 w-full text-white absolute bg-black bg-opacity-80 -translate-x-full inset-y-0 z-50 left-0 transform  transition duration-200 ease-in-out
         xl:-translate-x-0 xl:relative sidebar
        "
        >
          <div className="w-4/5 sm:w-3/5 xl:w-full bg-black p-5 inset-y-0 h-full">
            <div className="w-full mt-2 px-5 py-3 rounded-md font-semibold flex items-center hover:bg-red-400 transition duration-200">
              <i className="fas fa-home pr-2"></i>
              <h1>Home</h1>
            </div>
            <div className="w-full mt-2  px-5 py-3 rounded-md font-semibold flex items-center hover:bg-red-400 transition duration-200">
              <i className="fas fa-history pr-2"></i>
              <h1>History</h1>
            </div>
          </div>
          <div className="w-1/5 sm:w-full xl:w-0 h-full blank"></div>
        </div>
      </>
    );
  }
}
