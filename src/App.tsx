import React from "react";
import "./App.css";
import { Navigation } from "./components/Navigation";
import { TournamentBox } from "./components/TournamentBox";
import { Notification } from "./components/Notification";
import { Sidebar } from "./components/SideBar";

class App extends React.Component {
  render() {
    return (
      <>
        <div className="w-full h-screen filter  bg-game overflow-hidden">
          <div className="flex flex-1">
            <Sidebar />
            <div className="flex h-screen flex-1 md:py-4 flex-col filter backdrop-filter backdrop-blur-xl overflow-y-auto">
              <div className="md:px-5 flex w-full ">
                <Navigation />
              </div>
              <div className="flex flex-col md:flex-row h-full">
                <TournamentBox />
                <Notification />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
