import React from "react";
import { Link } from "react-router-dom";
import { isDesktop } from "react-device-detect";

export class Sidebar extends React.Component {
  hidePanel = () => {
    const bar = document.querySelector(".sidebar");
    if (!isDesktop) {
      bar?.classList.toggle("-translate-x-full");
    }
  };
  render() {
    return (
      <>
        <div
          className="flex xl:w-80 w-full text-white absolute bg-black md:bg-opacity-70 inset-y-0 z-20 xl:z-0 left-0 transform  transition duration-200 ease-in-out
         xl:-translate-x-0 xl:relative sidebar backdrop-filter backdrop-blur-lg -translate-x-full
        "
        >
          <div className="block top-10 right-10 fixed close xl:hidden">
            <i className="fas fa-times text-white text-xl"></i>
          </div>
          <div className="w-4/5 sm:w-3/5 xl:w-full p-5 inset-y-0 h-full">
            <Link
              to="/"
              onClick={this.hidePanel}
              className="w-full mt-2 px-5 py-3 rounded-md font-semibold flex items-center hover:bg-red-400 transition duration-200"
            >
              <i className="fas fa-home pr-2"></i>
              <h1>Home</h1>
            </Link>
            <Link
              to="/profile"
              onClick={this.hidePanel}
              className="w-full mt-2  px-5 py-3 rounded-md font-semibold flex items-center hover:bg-red-400 transition duration-200"
            >
              <i className="fas fa-user-circle pr-2"></i>
              <h1>Profile</h1>
            </Link>
            <Link
              to="/history"
              onClick={this.hidePanel}
              className="w-full mt-2  px-5 py-3 rounded-md font-semibold flex items-center hover:bg-red-400 transition duration-200"
            >
              <i className="fas fa-history pr-2"></i>
              <h1>History</h1>
            </Link>
            <Link
              to="/terms_and_conditions"
              onClick={this.hidePanel}
              className="w-full mt-2  px-5 py-3 rounded-md font-semibold flex items-center hover:bg-red-400 transition duration-200"
            >
              <i className="fas fa-file-word pr-2"></i>
              <h1>Terms and Conditions</h1>
            </Link>
            <Link
              to="/privacy_policy"
              onClick={this.hidePanel}
              className="w-full mt-2  px-5 py-3 rounded-md font-semibold flex items-center hover:bg-red-400 transition duration-200"
            >
              <i className="fas fa-shield-alt pr-2"></i>
              <h1>Privacy Policy</h1>
            </Link>
          </div>
          <div className="w-1/5 sm:w-full xl:w-0 h-full blank"></div>
        </div>
      </>
    );
  }
}
