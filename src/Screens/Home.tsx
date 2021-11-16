import React from "react";
import { Notification } from "../components/Notification";
import { Outlet } from "react-router-dom";

interface State {
  canShow: boolean;
}

export class Home extends React.Component {
  state: State;
  constructor(props: any) {
    super(props);
    this.state = { canShow: false };
  }
  render() {
    return (
      <>
        <title>Virtual Fight Gaming Arena</title>
        <div className="flex flex-col lg:flex-row ">
          <Outlet />
          <Notification />
        </div>
      </>
    );
  }
}
