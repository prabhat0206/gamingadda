import React from "react";

interface Props {
  name: string;
  total_kill: number;
  total_wins: number;
  profile_picture: string;
}

export class Players extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
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
            <p>Total kills: {this.props.total_kill}</p>
            <p className="ml-5">Total wins: {this.props.total_wins}</p>
          </div>
        </div>
      </div>
    );
  }
}
