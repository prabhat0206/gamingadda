import React from "react";
import { backend_url } from "../connections/backend";
import { Link } from "react-router-dom";
import { User } from "../interface/interface";

interface Props {
  user: User;
  isAuthenticated: boolean;
}

interface State {
  isLoading: boolean;
  otherData: any;
  rank: number;
  canShow: boolean;
}

export class Wallet extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
      otherData: {},
      rank: 0,
      canShow: false,
    };
  }

  componentDidMount() {
    this.getOtherData();
  }

  showHide() {
    if (this.state.canShow) {
      this.setState({ canShow: false });
    } else {
      this.setState({ canShow: true });
    }
  }

  getOtherData() {
    this.setState({ isLoading: true });
    fetch(backend_url + "auth/get_other_details", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            isLoading: false,
            otherData: res.data.details,
            rank: res.data.rank,
          });
        } else {
          this.setState({ isLoading: false });
        }
      });
  }

  render() {
    return (
      <>
        <title>Profile - Virtual Fight Gaming Arena</title>
        {this.props.isAuthenticated ? (
          <div className="py-5 px-5">
            <h1 className="text-3xl font-bold text-white border-b-2 pb-1">
              <i className="fas fa-user-circle"> </i> Profile
            </h1>
            <div className="flex w-full py-5 flex-col sm:flex-row items-center">
              <div className="flex">
                <img
                  src={this.props.user.photos[0].value}
                  alt=""
                  className=" w-36 h-36 rounded-full"
                />
              </div>
              <div className="flex text-white sm:px-5 justify-center flex-col">
                <h1 className="text-xl font-bold">
                  {this.props.user.displayName}
                </h1>
                <h1>{this.props.user.emails[0].value}</h1>
                <h1 className="mt-1">
                  Free fire ID:{" "}
                  {this.state.isLoading ? (
                    <span className=" p-2 px-6 ml-1 text-xs bg-gray-100 rounded-sm animate-pulse"></span>
                  ) : this.state.otherData.in_game_name === "" ? (
                    <button
                      className="p-1 px-2 ml-1 text-xs bg-green-500 rounded-sm"
                      onClick={this.showHide.bind(this)}
                    >
                      Add
                    </button>
                  ) : (
                    this.state.otherData.in_game_name
                  )}
                </h1>
              </div>
            </div>
            {this.state.canShow ? (
              <Modal
                closeAction={this.showHide.bind(this)}
                refreshAction={this.getOtherData.bind(this)}
              />
            ) : null}
            <div className="flex sm:p-5 mt-5 flex-col md:flex-row">
              <div className="flex flex-1 text-white flex-col">
                <h1 className="font-bold text-xl">
                  <i className="fas fa-wallet"></i> &nbsp;Wallet
                </h1>
                <br />
                {this.state.isLoading ? (
                  <>
                    <div className="bg-gray-50 animate-pulse opacity-30 w-full md:w-2/4 h-8 rounded-lg"></div>
                    <div className="md:w-60 w-full p-2 bg-green-500 mt-2 rounded-lg font-bold h-9 animate-pulse "></div>
                  </>
                ) : (
                  <>
                    <h2>
                      Current Balance: &nbsp;
                      <i className="fas fa-rupee-sign"></i>{" "}
                      {this.state.otherData.wallet}
                    </h2>
                    <Link
                      to="/add_balance"
                      className="md:w-60 w-full p-2 bg-green-500 mt-2 rounded-lg font-bold hover:bg-green-900 transition duration-200 ease-in-out flex justify-center items-center"
                    >
                      Add Balance
                    </Link>
                  </>
                )}
                <Link
                  to="/history"
                  className="md:w-60 w-full p-2 bg-red-500 mt-2 rounded-lg font-bold hover:bg-red-900 transition duration-200 ease-in-out flex justify-center items-center"
                >
                  Last Transcations
                </Link>
              </div>
              <div className="flex flex-1 text-white mt-5 md:mt-0 flex-col">
                <h1 className="font-bold text-xl">
                  <i className="fas fa-gamepad"></i> &nbsp;Game Performance
                </h1>
                <br />
                {this.state.isLoading ? (
                  <>
                    <div className="bg-gray-50 animate-pulse opacity-30 w-full md:w-2/4 h-8 rounded-lg"></div>
                    <div className="bg-gray-50 animate-pulse opacity-30 w-full md:w-2/4 h-8 rounded-lg mt-2"></div>
                  </>
                ) : (
                  <>
                    <h1>
                      Total Wins: {this.state.otherData.wins} &nbsp;
                      <i className="fas fa-trophy"></i>
                    </h1>
                    <h1>
                      Rank: {this.state.rank} &nbsp;
                      <i className="fas fa-level-up-alt"></i>
                    </h1>
                  </>
                )}
                <button className="md:w-60 w-full p-2 bg-blue-500 mt-2 rounded-lg font-bold hover:bg-blue-900 transition duration-200 ease-in-out">
                  Play New Game
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-full ">
            <div className="text-white font-bold text-3xl">
              Sign In to view your profile
            </div>
          </div>
        )}
      </>
    );
  }
}

interface ModalProps {
  closeAction: () => void;
  refreshAction: () => void;
}

interface ModalState {
  uid: string;
  isLoading: boolean;
}

class Modal extends React.Component<ModalProps> {
  state: ModalState;
  constructor(props: ModalProps) {
    super(props);
    this.state = {
      uid: "",
      isLoading: false,
    };
  }

  async setUid() {
    this.setState({ isLoading: true });
    await fetch(backend_url + "auth/set_uid", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: this.state.uid,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 200) {
          this.props.closeAction();
          this.setState({ isLoading: false });
          this.props.refreshAction();
        }
      })
      .catch((error) => {
        alert("Unable to set your uid");
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <div className="absolute z-10 w-full h-full top-0 left-0 bg-black bg-opacity-70 flex justify-center items-center">
        <div className="p-5 bg-white rounded-lg md:w-3/6">
          <div className="flex items-center justify-between">
            <h1 className="">Add Your free fire id (one time only)</h1>
            {this.state.isLoading ? null : (
              <i onClick={this.props.closeAction} className="fas fa-times"></i>
            )}
          </div>
          <hr className="" />
          <input
            type="text"
            className=" py-2 mt-4 outline-none"
            placeholder="enter your uid"
            onChange={(e) => {
              this.setState({ uid: e.target.value });
            }}
          />
          <hr />
          {this.state.uid === "" ? null : this.state.isLoading ? (
            <div className="px-4 py-2 w-full bg-green-500 mt-2 rounded-lg text-white animate-pulse flex justify-center items-center">
              Add
            </div>
          ) : (
            <button
              onClick={this.setUid.bind(this)}
              className="px-4 py-2 w-full bg-green-500 mt-2 rounded-lg text-white hover:bg-green-900 transition duration-200 ease-in-out"
            >
              Add
            </button>
          )}
        </div>
      </div>
    );
  }
}
