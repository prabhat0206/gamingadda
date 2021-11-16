import React from "react";

interface Props {
  name: string;
  total_wins: number;
  profile_picture: string;
}

export class Players extends React.Component<Props> {
  render() {
    return (
      <div className="flex w-full h-13 items-center mt-3">
        <img
          src={this.props.profile_picture}
          alt=""
          className="w-12 h-12 rounded-full"
        />
        <div className="flex w-full flex-col px-2">
          <h1 className="text-lg font-bold">{this.props.name}</h1>
          <div className="flex text-xs">
            <p className="">Total wins: {this.props.total_wins}</p>
          </div>
        </div>
      </div>
    );
  }
}

export class PlayerLoading extends React.Component {
  render() {
    return (
      <div className="flex w-full h-13 items-center mt-3 animate-pulse">
        <div className="flex w-14 h-12 rounded-full bg-gray-50 opacity-50" />
        <div className="flex w-full flex-col px-2">
          <div className="text-lg font-bold bg-gray-50 opacity-50 w-2/5 p-3 rounded-lg"></div>
          <div className="flex text-xs bg-gray-50 opacity-50 w-2/5 p-2 rounded-md mt-1">
            <p className="ml-5"></p>
          </div>
        </div>
      </div>
    );
  }
}
