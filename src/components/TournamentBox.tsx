import React from "react";
import { Contests, ContestLoader } from "./Contest";
import { backend_url } from "../connections/backend";
import { useNavigate, useParams } from "react-router-dom";
import { User, Tournament } from "../interface/interface";
import Process from "../Assets/process.gif";
import moment from "moment";

interface State {
  all_tournament: Tournament[];
  played_games: Tournament[];
  isConnected: boolean;
  isLoading: boolean;
  isLoadingRecently: boolean;
}

interface Props {
  user: User;
  isAuthenticated: boolean;
  isEnrolling: boolean;
  enteryFunction: (id: string) => void;
  canShowDialog: boolean;
  message: string;
  status: number;
  closeAction: () => void;
}

export class TournamentBox extends React.Component<Props> {
  state: State;
  constructor(props: any) {
    super(props);
    this.state = {
      all_tournament: [],
      played_games: [],
      isConnected: true,
      isLoading: true,
      isLoadingRecently: true,
    };
  }

  async componentDidMount() {
    await this.getTounament();
    await this.getPlayedGames();
  }

  async getTounament() {
    this.setState({ isLoading: true });
    await fetch(backend_url)
      .then((response) => response.json())
      .then((tournament) => {
        if (tournament.status === 200) {
          this.setState({
            isLoading: false,
            all_tournament: tournament.Items.upcomingGame,
          });
        } else {
          this.setState({ isConnected: false, isLoading: false });
        }
      })
      .catch((err) => {
        this.setState({ isConnected: false, isLoading: false });
      });
  }

  async getPlayedGames() {
    this.setState({ isLoadingRecently: true });
    await fetch(backend_url + "played_games")
      .then((game) => game.json())
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            played_games: res.data,
            isLoadingRecently: false,
          });
        }
      })
      .catch((err) => {
        this.setState({ isConnected: false, isLoading: false });
      });
  }

  canRefreshAction() {
    this.getTounament();
    this.getPlayedGames();
  }

  checkStartTime(time: Date) {
    if (moment(time).valueOf() > moment().valueOf()) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div className="w-full flex flex-1 flex-col">
        {this.props.canShowDialog ? (
          <ModalEntery
            position={this.props.status}
            message={this.props.message}
            closeAction={this.props.closeAction}
            canRefreshAction={this.canRefreshAction.bind(this)}
          />
        ) : null}
        <div className="w-full py-5 flex flex-1 px-5 flex-col ">
          {!this.state.isLoading
            ? this.state.all_tournament.map((tournament: Tournament) => {
                return this.checkStartTime(tournament.start_time) ? (
                  <>
                    <h1 className="py-2 font-semibold text-xl w-full border-b-2 mb-4 text-white">
                      Live Contests{" "}
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-200"></span>
                      <span className="animate-ping absolute inline-flex h-20 w-20 top-0 left-0 rounded-full bg-green-200 opacity-75"></span>
                    </h1>
                    <Contests
                      key={tournament.id}
                      tournament={tournament}
                      user={this.props.user}
                      enteryFunction={this.props.enteryFunction}
                      isEnrolling={this.props.isEnrolling}
                      canRefreshAction={this.canRefreshAction.bind(this)}
                      isAuthenticated={this.props.isAuthenticated}
                    />
                  </>
                ) : null;
              })
            : null}
          <h1 className="py-2 font-semibold text-xl w-full border-b-2 mb-4 text-white">
            Upcoming Contests
          </h1>
          {this.state.isLoading ? (
            <div>
              <ContestLoader />
              <ContestLoader />
              <ContestLoader />
            </div>
          ) : this.state.isConnected ? (
            <div className="flex flex-col pr-2">
              {this.state.all_tournament
                .reverse()
                .map((tournament: Tournament) => {
                  return !this.checkStartTime(tournament.start_time) ? (
                    <Contests
                      key={tournament.id}
                      tournament={tournament}
                      user={this.props.user}
                      enteryFunction={this.props.enteryFunction}
                      isEnrolling={this.props.isEnrolling}
                      canRefreshAction={this.canRefreshAction.bind(this)}
                      isAuthenticated={this.props.isAuthenticated}
                    />
                  ) : null;
                })}
            </div>
          ) : (
            <div className="flex flex-1 justify-center items-center flex-col text-white">
              <span className="text-6xl mb-4">
                <i className="fas fa-code-branch"></i>
              </span>
              <h1>Check your internet connection</h1>
            </div>
          )}
        </div>
        {this.state.isConnected ? (
          <div className="w-full py-5 flex flex-1 px-5 flex-col ">
            {!(this.state.played_games.length > 0) ? null : (
              <h1 className="py-2 font-semibold text-xl w-full border-b-2 mb-4 text-white">
                Recently Played Games
              </h1>
            )}
            {this.state.isLoadingRecently ? (
              <div>
                <ContestLoader />
              </div>
            ) : (
              <div className="flex flex-col pr-2">
                {this.state.played_games.map((tournament: Tournament) => {
                  return (
                    <Contests
                      key={tournament.id}
                      canRefreshAction={this.canRefreshAction.bind(this)}
                      tournament={tournament}
                      user={this.props.user}
                      isAuthenticated={this.props.isAuthenticated}
                      enteryFunction={this.props.enteryFunction}
                      isEnrolling={this.props.isEnrolling}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export const InternalContests = (props: any) => {
  const navigate = useNavigate();
  const { contest_id } = useParams();
  const [isLoading, setisLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<any>({});

  React.useEffect(() => {
    setisLoading(true);
    fetch(backend_url + "tour_details/" + contest_id)
      .then((data) => data.json())
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.Item);
          setisLoading(false);
        }
      })
      .catch((error) => {
        setisLoading(false);
        console.error(error);
      });
  }, [contest_id]);
  const { emails }: any = props.user;
  return isLoading ? (
    <div className=" animate-pulse w-full py-5 flex flex-1 px-5 flex-col">
      <div className="py-2 font-semibold text-xl w-full border-b-2 mb-4 text-white flex items-center">
        <i
          onClick={() => navigate(-1)}
          className="fas fa-arrow-left cursor-pointer"
        ></i>{" "}
        &nbsp; <div className=" w-2/5 p-3 bg-gray-50 rounded-lg"></div>
      </div>
      <div className="flex flex-col flex-1 pr-2 max-h-90per bg-opacity-40 rounded-lg py-3 px-4 text-white">
        <div className=" w-1/5 p-3 bg-gray-50 rounded-lg"></div>
        <div className=" w-3/5 p-4 bg-gray-50 rounded-lg mt-2"></div>
        <br />
        <div className=" w-2/5 p-3 bg-gray-50 rounded-lg mt-1"></div>
        <div className=" w-2/5 p-3 bg-gray-50 rounded-lg mt-1"></div>
        <div className=" w-2/5 p-3 bg-gray-50 rounded-lg mt-1"></div>
        <br />
        <h1>
          Your Current &nbsp; <i className="fas fa-wallet"></i> Wallet balance:{" "}
          {props.wallet}
        </h1>
        <br />
        {props.isAuthenticated ? (
          <div className="p-3 bg-green-500 font-bold rounded-lg flex justify-center items-center">
            Loading...
          </div>
        ) : (
          <div className="p-3 font-bold rounded-lg transition ease-in-out duration-300">
            Sign In to join this league
          </div>
        )}
        <button
          onClick={() => navigate(-1)}
          className="p-3 mt-2 bg-red-500 rounded-lg font-bold hover:bg-red-900 transition ease-in-out duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full py-5 flex flex-1 px-5 flex-col">
      {props.canShowDialog ? (
        <ModalEntery
          position={props.status}
          message={props.message}
          closeAction={props.closeAction}
          canRefreshAction={() => null}
        />
      ) : null}
      <h1 className="py-2 font-semibold text-xl w-full border-b-2 mb-4 text-white">
        <i
          onClick={() => navigate(-1)}
          className="fas fa-arrow-left cursor-pointer"
        ></i>{" "}
        &nbsp;{data.name}
      </h1>
      <div className="flex flex-col flex-1 pr-2 max-h-90per bg-opacity-40 rounded-lg py-3 px-4 text-white">
        <h1 className="text-sm">Prize Pool</h1>
        <h1 className="text-xl font-bold">{data.prize}</h1>
        <br />
        <h1>Total Players Allowed: {data.capacity}</h1>
        <h1>Total Players Entered: {data.currently_joined}</h1>
        <h1>Entery Fee: {data.entery_fee}</h1>
        <br />
        <h1>
          Your Current &nbsp; <i className="fas fa-wallet"></i> Wallet balance:{" "}
          {props.wallet}
        </h1>
        <br />
        {props.isAuthenticated ? (
          data.isClosed ? (
            <div className="p-3 font-bold rounded-lg transition ease-in-out duration-300">
              {data.winner} is the winner
            </div>
          ) : data.players.some((a: any) => a.email === emails[0].value) ? (
            <h1>You are already enrolled</h1>
          ) : parseInt(data.capacity) === data.currently_joined ? (
            <span className="md:text-lg font-semibold">Room Full</span>
          ) : (
            <button
              onClick={() => props.enteryFunction(data.id)}
              className="p-3 bg-green-500 font-bold rounded-lg hover:bg-green-900 transition ease-in-out duration-300"
            >
              I would like to join this league
            </button>
          )
        ) : (
          <div className="p-3 font-bold rounded-lg transition ease-in-out duration-300">
            Sign In to join this league
          </div>
        )}
        <button
          onClick={() => navigate(-1)}
          className="p-3 mt-2 bg-red-500 rounded-lg font-bold hover:bg-red-900 transition ease-in-out duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

interface PropsModal {
  position: number;
  message?: string;
  closeAction: () => void;
  canRefreshAction: () => void;
}
class ModalEntery extends React.Component<PropsModal> {
  render() {
    return (
      <div className="absolute w-full bg-black text-white top-0 left-0 h-full z-40 bg-opacity-70 flex justify-center items-center">
        {this.props.position === 300 ? (
          <div className=" md:w-3/6 w-5/6 p-5 rounded-lg flex justify-center items-center flex-col">
            <h1 className="font-bold text-xl">Adding you to Game</h1>
            <hr />
            <img src={Process} alt="" className="w-3/6" />
            <h1>Please wait and don't refresh this page</h1>
          </div>
        ) : this.props.position === 200 ? (
          <div className=" md:w-3/6 w-5/6 p-5 rounded-lg flex justify-center items-center flex-col">
            <h1 className="font-bold text-xl">You are added</h1>
            <hr />
            <i className="fas fa-check text-green-600 text-4xl"></i>
            <button
              onClick={() => {
                this.props.closeAction();
                this.props.canRefreshAction();
              }}
              className="p-1 px-3 mt-2 bg-red-500 rounded-lg font-bold hover:bg-red-900 transition ease-in-out duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          <div className=" md:w-3/6 w-5/6 p-5 rounded-lg flex justify-center items-center flex-col">
            <h1 className="font-bold text-xl text-center">
              You are not added due to {this.props.message}
            </h1>
            <hr />
            <i className="fas fa-times text-red-600 text-4xl"></i>
            <button
              onClick={() => {
                this.props.closeAction();
                this.props.canRefreshAction();
              }}
              className="p-1 px-3 mt-2 bg-red-500 rounded-lg font-bold hover:bg-red-900 transition ease-in-out duration-300"
            >
              Close
            </button>
          </div>
        )}
      </div>
    );
  }
}
