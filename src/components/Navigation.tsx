import React from "react";

export class Navigation extends React.Component {
  render() {
    return (
      <div className="w-full h-18 bg-black bg-opacity-70 flex items-center px-5 md:rounded-lg py-5 filter md:drop-shadow-md">
        <i className="fas fa-bars mr-4 text-red-600 "></i>
        <h1 className="font-bold font-sans text-red-600 text-lg">
          Gaming Adda
        </h1>
      </div>
    );
  }
}
