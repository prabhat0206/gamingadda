import React from "react";
import { backend_url } from "../connections/backend";
import { Players, PlayerLoading } from "./Players";
// import { io } from "socket.io-client";

interface State {
  isLoading: boolean;
  players: any[];
  isConnected: boolean;
  notifications: string[];
  isLoadingNotifications: boolean;
}

export class Notification extends React.Component {
  state: State;
  constructor(props: any) {
    super(props);
    this.state = {
      players: [],
      isLoading: true,
      isConnected: true,
      notifications: [],
      isLoadingNotifications: false,
    };
  }
  componentDidMount() {
    this.getTopPlayers();
    // const socket = io(socket_url);
    // socket.on("all_recent", (msg) => {
    //   this.setState({
    //     notifications: msg.message,
    //     isLoadingNotifications: false,
    //   });
    // });
    // socket.on("notification", (msg) => {
    //   let notifications = this.state.notifications;
    //   notifications.unshift(msg.message);
    //   this.setState({
    //     notifications: notifications,
    //   });
    // });
  }
  getTopPlayers() {
    fetch(backend_url + "top_players")
      .then((players) => players.json())
      .then((res) => {
        this.setState({ players: res.data, isLoading: false });
      })
      .catch((err) => {
        this.setState({ isConnected: false, isLoading: false });
      });
  }
  render() {
    return (
      <div className="flex w-full lg:w-2/5 py-5 px-5 lg:flex-col sm:flex-row flex-col">
        {/* <div className="w-full h-auto block bg-gray-100 bg-opacity-40 pl-5 rounded-lg overflow-hidden">
          <h1 className="w-full text-green-50 h-10 text-2xl pt-2">
            Notifications
          </h1>
          <div className="w-full h-full">
            <div className="text-white w-full mt-2 pb-5">
              {this.state.isLoadingNotifications ? (
                <>
                  <NotificationLoading />
                  <NotificationLoading />
                  <NotificationLoading />
                  <NotificationLoading />
                </>
              ) : this.state.notifications.length > 0 ? (
                this.state.notifications.map((notification) => (
                  <p>{notification}</p>
                ))
              ) : (
                <p>Currently no notifications are available</p>
              )}
            </div>
          </div>
        </div> */}
        <div className="flex h-auto w-full sm:ml-2 lg:ml-0 lg:mt-5 sm:mt-0 mt-4 bg-gray-100 bg-opacity-40 flex-col rounded-lg px-5">
          <h1 className="w-full text-green-50 h-10 text-2xl pt-3">
            Top Players
          </h1>
          <div className="w-full h-full overflow-y-auto">
            <div className="text-white w-full mt-2 pb-5">
              {this.state.isLoading ? (
                <>
                  <PlayerLoading />
                  <PlayerLoading />
                  <PlayerLoading />
                </>
              ) : this.state.isConnected ? (
                this.state.players.map((player: any) => {
                  return (
                    <Players
                      key={player.user_id}
                      name={player.name}
                      total_wins={player.wins}
                      profile_picture={player.profile_picture}
                    />
                  );
                })
              ) : (
                <div className="w-full p-5">
                  <i className="fas fa-code-branch"></i>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class NotificationLoading extends React.Component {
  render() {
    return (
      <div className=" w-full pr-5 animate-pulse mb-1">
        <div className="bg-gray-50 bg-opacity-50 w-full p-3 rounded-lg"></div>
      </div>
    );
  }
}
