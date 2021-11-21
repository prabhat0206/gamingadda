import React from "react";
import { Link } from "react-router-dom";
import { User, Tournament } from "../interface/interface";
import { Navigation } from "../components/Navigation";
import moment from "moment";

interface Props {
  tournament: Tournament;
  user: User;
  isAuthenticated: boolean;
  canRefreshAction: () => void;
  enteryFunction: (id: string) => void;
  isEnrolling: boolean;
}

export class Contests extends React.Component<Props> {
  checkColor() {
    if (
      moment(this.props.tournament.start_time).valueOf() > moment().valueOf()
    ) {
      return "gray-100";
    } else {
      if (this.props.tournament.isClosed) {
        return "yellow-200";
      } else {
        return "green-200";
      }
    }
  }
  checkTime() {
    if (
      moment(this.props.tournament.start_time).valueOf() - 300000 >
      moment().valueOf()
    ) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <>
        <div
          className={`flex w-full h-auto rounded-lg filter px-5 py-4 bg-${this.checkColor()} bg-opacity-60 backdrop-filter backdrop-blur-sm mb-4 flex-col`}
        >
          <div className="md:flex w-full  justify-between">
            <Link
              to={`/${this.props.tournament.id}`}
              className="flex flex-1 md:flex-col justify-between "
            >
              <h1>Prize Pool</h1>
              <span className="font-bold font-sans md:text-md md:py-1">
                {this.props.tournament.prize}
              </span>
            </Link>
            {this.props.tournament.isClosed ? (
              <Link
                to={`/${this.props.tournament.id}`}
                className="flex flex-1 md:flex-col justify-between"
              >
                <h1>Total Players Played</h1>
                <span className="font-bold font-sans md:text-md md:py-1">
                  {this.props.tournament.currently_joined}
                </span>
              </Link>
            ) : (
              <>
                <Link
                  to={`/${this.props.tournament.id}`}
                  className="flex flex-1 md:flex-col justify-between"
                >
                  <h1 className="sm:ml-2">Capacity</h1>
                  <span className="font-bold font-sans md:text-md md:py-1 sm:ml-2">
                    Max {this.props.tournament.capacity} allowed
                  </span>
                </Link>
                <Link
                  to={`/${this.props.tournament.id}`}
                  className="flex flex-1 md:flex-col justify-between"
                >
                  <h1>Registrations</h1>
                  <span className="font-bold font-sans md:text-md md:py-1">
                    <span className="md:text-lg">
                      {this.props.tournament.currently_joined}
                    </span>{" "}
                    players joined
                  </span>
                </Link>
              </>
            )}
            {this.props.tournament.isClosed ? (
              <div className="flex flex-col ">
                <h1 className="">Winner</h1>
                <span className="font-semibold font-sans md:text-md md:py-1">
                  <span className="md:text-lg">
                    {this.props.tournament.winner}
                  </span>{" "}
                </span>
              </div>
            ) : (
              <div className="flex sm:flex-col justify-between ">
                {!this.checkTime() && !this.props.tournament.isClosed ? (
                  <span className="md:text-lg font-semibold flex-1 justify-content items-center flex">
                    Live Now
                  </span>
                ) : parseInt(this.props.tournament.capacity) ===
                  this.props.tournament.currently_joined ? (
                  <span className="md:text-lg font-semibold flex-1 justify-content items-center flex">
                    Room Full
                  </span>
                ) : (
                  <>
                    <h1 className="font-semibold">Entery Fee</h1>
                    <span className="font-semibold font-sans md:text-md md:py-1">
                      <span className="md:text-lg">
                        &#8377;{this.props.tournament.entery_fee}
                      </span>
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
          {this.props.tournament.isClosed ? null : (
            <div className="flex w-full sm:mt-0 mt-2 text-sm justify-between">
              <div className="flex-1 items-center flex">
                <span className="items-center">
                  {moment(this.props.tournament.start_time).valueOf() >
                  moment().valueOf()
                    ? "Start " +
                      moment(this.props.tournament.start_time).fromNow()
                    : "Started " +
                      moment(this.props.tournament.start_time).fromNow()}
                </span>
              </div>
              <div className="flex-1 items-center justify-end flex">
                {this.props.isAuthenticated ? (
                  this.props.tournament.players.some(
                    (p) => p.email === this.props.user.email
                  ) ? (
                    <h1 className="text-sm">Already enrolled</h1>
                  ) : parseInt(this.props.tournament.capacity) ===
                    this.props.tournament.currently_joined ? null : (
                    <button
                      onClick={() => {
                        this.props.enteryFunction(this.props.tournament.id);
                        this.props.canRefreshAction();
                      }}
                      className="bg-green-500 w-100 px-5 py-2 text-white rounded-lg"
                    >
                      {this.props.isEnrolling ? (
                        "Enrolling"
                      ) : (
                        <span>Join Now</span>
                      )}
                    </button>
                  )
                ) : !this.checkTime() ? null : (
                  <button
                    onClick={() => Navigation._handleSignInClick()}
                    className="bg-green-500 w-100 px-5 py-2 text-white rounded-lg"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export class ContestLoader extends React.Component {
  render() {
    return (
      <div className="flex animate-pulse w-full h-auto rounded-lg filter px-5 py-4 bg-gray-100 bg-opacity-60 backdrop-filter backdrop-blur-sm mb-4 flex-col">
        <div className="md:flex w-full  justify-between">
          <div className="flex flex-1 md:flex-col justify-between mr-5">
            <div className="p-3 bg-gray-50 opacity-40 rounded-lg mb-2"></div>
            <span className="font-bold font-sans md:text-lg md:py-2 h-10 rounded-lg opacity-30 bg-gray-50"></span>
          </div>
          <div className="flex flex-1 md:flex-col justify-between mr-5">
            <div className="p-3 bg-gray-50 opacity-40 rounded-lg mb-2"></div>
            <span className="font-bold font-sans md:text-lg md:py-2 h-10 rounded-lg opacity-30 bg-gray-50"></span>
          </div>
          <div className="flex flex-1 md:flex-col justify-between mr-5">
            <div className="p-3 bg-gray-50 opacity-40 rounded-lg mb-2"></div>
            <span className="font-bold font-sans md:text-lg md:py-2 h-10 rounded-lg opacity-30 bg-gray-50"></span>
          </div>
          <div className="flex flex-1 md:flex-col justify-between ">
            <div className="p-3 bg-gray-50 opacity-40 rounded-lg mb-2"></div>
            <span className="font-bold font-sans md:text-lg md:py-2 h-10 rounded-lg opacity-30 bg-green-500"></span>
          </div>
        </div>
        <div className="flex py-2 rounded-lg text-xs w-1/5 bg-gray-50 bg-opacity-40 mt-2"></div>
      </div>
    );
  }
}
