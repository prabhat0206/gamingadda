import React from "react";
import "./App.css";
import { Navigation } from "./components/Navigation";
import { TournamentBox } from "./components/TournamentBox";

class App extends React.Component {
  render() {
    return (
      <>
        <div className="w-full h-screen filter md:py-4">
          {/* <div className="flex  h-screen flex-1 flex-col filter backdrop-filter backdrop-blur-xl"> */}
          <div className="md:px-5 flex w-full">
            <Navigation />
          </div>
          <TournamentBox />
          {/* </div> */}
        </div>
      </>
    );
  }
}

export default App;
