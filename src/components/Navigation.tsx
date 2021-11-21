import React from "react";
import { backend_url } from "../connections/backend";
import { Link } from "react-router-dom";
import Logo from "../Assets/vfred.png";

interface State {
  isLoggedIn: boolean;
}

interface Props {
  isAuthenticated: boolean;
  user: User;
  handleNotAuthenticated: () => void;
  isWalletLoading: boolean;
  wallet: number;
}

interface User {
  name: string;
  id: string;
  email: string;
  profile_picture: string;
}

export class Navigation extends React.Component<Props> {
  state: State;
  constructor(props: any) {
    super(props);
    this.state = {
      isLoggedIn: true,
    };
  }

  componentDidMount() {
    this.showHide();
  }

  public showHide = () => {
    const bar = document.querySelector(".sidebar");
    const btn = document.querySelector(".fa-bars");
    const blank = document.querySelector(".blank");
    const close = document.querySelector(".close");
    btn?.addEventListener("click", () => {
      bar?.classList.toggle("-translate-x-full");
    });
    blank?.addEventListener("click", () => {
      bar?.classList.toggle("-translate-x-full");
    });
    close?.addEventListener("click", () => {
      bar?.classList.toggle("-translate-x-full");
    });
  };

  static _handleSignInClick = () => {
    window.open(backend_url + "auth/google", "_self");
  };

  public _handleLogoutClick = () => {
    window.open(backend_url + "auth/logout", "_self");
    this.props.handleNotAuthenticated();
  };

  render() {
    return (
      <div className="w-full h-18 bg-opacity-70 flex items-center bg-black py-2 filter px-5 md:drop-shadow-md">
        <div className="flex flex-1 justify-start items-center">
          <i className="fas fa-bars mr-4 text-red-600 xl:hidden"></i>
          <div className="flex justify-center items-center">
            <img src={Logo} alt="" className="w-10 h-10" />
            <h1 className="font-bold font-sans text-red-600 sm:text-3xl text-xl ml-2">
              Virtual Fight
            </h1>
          </div>
        </div>
        <div className="flex flex-1 justify-end items-center text-white">
          {this.props.isAuthenticated ? (
            <>
              <div className="hidden sm:flex">
                <img
                  src={this.props.user.profile_picture}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div className="pl-2 hidden lg:block">
                  <h2 className="text-lg">{this.props.user.name}</h2>
                  <h3 className=" text-xs">{this.props.user.email}</h3>
                </div>
              </div>
              {this.props.isWalletLoading ? (
                <div className="hidden sm:flex items-center animate-pulse mx-3 hover:text-green-400 transition ease-in-out duration-200">
                  <i className="fas fa-wallet mr-2 text-2xl"></i>
                  <h1 className="text-lg">
                    <i className=" fas fa-rupee-sign"></i>
                  </h1>
                </div>
              ) : (
                <Link
                  to="/profile"
                  className="hidden sm:flex items-center mx-3 hover:text-green-400 transition ease-in-out duration-200"
                >
                  <i className="fas fa-wallet mr-2 text-2xl"></i>

                  <h1 className="text-lg">
                    <i className=" fas fa-rupee-sign"></i> {this.props.wallet}
                  </h1>
                </Link>
              )}
              <a
                className="hidden sm:block ml-4 bg-red-600 p-2 rounded-lg transition duration-200 hover:bg-red-200 hover:text-black ease-in-out"
                href="#h"
                onClick={this._handleLogoutClick.bind(this)}
              >
                Logout
              </a>
              <div
                className="flex sm:hidden"
                onClick={UserModal.showHideUserModal}
              >
                <img
                  src={this.props.user.profile_picture}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </>
          ) : (
            <>
              <button
                className=" sm:mr-4 bg-green-600 p-2 rounded-lg px-4 transition duration-200 hover:bg-green-200 hover:text-black ease-in-out"
                onClick={Navigation._handleSignInClick}
              >
                Sign In
              </button>
              <button
                className="hidden sm:block bg-blue-500 p-2 px-4 rounded-lg trasition duration-200 hover:bg-blue-200 hover:text-black ease-in-out"
                onClick={Navigation._handleSignInClick}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}

export class UserModal extends React.Component<Props> {
  static showHideUserModal = () => {
    const user_modal = document.getElementById("user-model");
    user_modal?.classList.toggle("hidden");
  };
  public _handleLogoutClick = () => {
    window.open(backend_url + "auth/logout", "_self");
    this.props.handleNotAuthenticated();
  };
  render() {
    return (
      <div id="user-model" className=" hidden absolute top-14 right-1 pr-1">
        {this.props.isAuthenticated ? (
          <div className="bg-black bg-opacity-80 mt-1 rounded-lg text-white px-2 ease-in-out transition-all duration-200">
            <div className="flex justify-center items-center">
              <img
                src={this.props.user.profile_picture}
                alt=""
                className=" w-20 h-20 rounded-full mt-3"
              />
            </div>
            <div className="w-full p-2 flex justify-center items-center flex-col">
              <span className="font-semibold">{this.props.user.name}</span>
              <span>{this.props.user.email}</span>
            </div>
            <hr color="white" />
            <div className="w-full p-2 px-3 flex flex-col justify-center items-center">
              <Link to="/profile" className="font-semibold">
                <i className="fas fa-wallet"></i> Wallet{" "}
                <i className="fas fa-rupee-sign"></i> {this.props.wallet}
              </Link>
              <button
                className="w-full mt-2 flex justify-center items-center font-semibold mb-3 bg-red-600 p-2 rounded-lg transition duration-200 hover:bg-red-200 hover:text-black ease-in-out"
                onClick={this._handleLogoutClick}
              >
                Logout
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
