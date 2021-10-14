import React from "react";
import { Contests } from "./Contest";

export class TournamentBox extends React.Component {
  render() {
    return (
      <div className="w-full py-5 flex flex-1 px-5 flex-col ">
        <h1 className="py-2 font-semibold text-xl w-full border-b-2 mb-4 text-white">
          Upcoming Contests
        </h1>
        <div className="flex flex-col md:overflow-y-auto md:overflow-x-hidden pr-2 max-h-90per">
          <Contests />
          <Contests />
          <Contests />
          <Contests />
          <Contests />
        </div>
      </div>
    );
  }
}
