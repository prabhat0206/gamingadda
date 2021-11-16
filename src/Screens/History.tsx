import React from "react";
import { backend_url } from "../connections/backend";

interface State {
  lastTrans: any[];
  isLoadingTrans: boolean;
  isLoadingHistory: boolean;
  history: any[];
}

interface Props {
  isAuthenticated: boolean;
}

export class History extends React.Component<Props> {
  state: State;
  constructor(props: any) {
    super(props);
    this.state = {
      lastTrans: [],
      isLoadingTrans: true,
      isLoadingHistory: true,
      history: [],
    };
  }

  componentDidMount() {
    this.getLastTranscations();
    this.getHistory();
  }

  getHistory() {
    fetch(backend_url + "auth/getLastGames", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          this.setState({ history: data.data, isLoadingHistory: false });
        }
      })
      .catch((err) => {
        this.setState({ isLoadingHistory: false });
      });
  }

  getLastTranscations() {
    this.setState({ isLoadingTrans: true });
    fetch(backend_url + "auth/getTrans", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          this.setState({
            lastTrans: result.data,
            isLoadingTrans: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoadingTrans: false });
      });
  }
  render() {
    return (
      <>
        <title>History - Virtual Fight Gaming Arena</title>
        <div className="flex flex-1 text-white p-5 flex-col h-screen overflow-hidden">
          <h1 className=" text-3xl font-bold border-b-2 border-solid border-white pb-2">
            History <i className="fas fa-history"></i>
          </h1>
          {!this.props.isAuthenticated ? (
            <div className="flex w-full h-full justify-center items-center text-3xl">
              <h1>Sign in to see your information</h1>
            </div>
          ) : (
            <div className=" flex-1 mt-2 flex h-full flex-col sm:flex-row overflow-y-auto">
              <div className="flex flex-1 p-2 flex-col">
                <h1 className="text-xl font-semibold">Recent played game</h1>
                <div className=" flex flex-1 mt-1 flex-col pr-2 overflow-y-auto">
                  {this.state.isLoadingHistory ? (
                    <>
                      <HistoryBoxLoader />
                      <HistoryBoxLoader />
                      <HistoryBoxLoader />
                    </>
                  ) : (
                    this.state.history.map((history: any) => {
                      return <HistoryBox key={history.id} history={history} />;
                    })
                  )}
                </div>
              </div>
              <div className="flex-1 flex p-2 flex-col ">
                <h1 className="text-xl font-semibold">Recent transcations </h1>
                <div className=" flex flex-1 mt-1 flex-col pr-2 overflow-y-auto">
                  {this.state.isLoadingTrans ? (
                    <>
                      <div className="w-3/5 p-3 bg-gray-50 bg-opacity-50 rounded-md animate-pulse"></div>
                      <div className="w-3/5 p-3 bg-gray-50 bg-opacity-50 rounded-md animate-pulse mt-1"></div>
                      <div className="w-3/5 p-3 bg-gray-50 bg-opacity-50 rounded-md animate-pulse mt-1"></div>
                      <div className="w-3/5 p-3 bg-gray-50 bg-opacity-50 rounded-md animate-pulse mt-1"></div>
                      <div className="w-3/5 p-3 bg-gray-50 bg-opacity-50 rounded-md animate-pulse mt-1"></div>
                      <div className="w-3/5 p-3 bg-gray-50 bg-opacity-50 rounded-md animate-pulse mt-1"></div>
                    </>
                  ) : this.state.lastTrans === [] ? (
                    <h2 className="text-lg">
                      Currently not transcations history available
                    </h2>
                  ) : (
                    this.state.lastTrans.map((item: any) => {
                      return item.status === "success" ? (
                        <h2 key={item.txnid} className="text-sm">
                          {item.addedon} <i className="fas fa-rupee-sign"></i>{" "}
                          {item.amount} added to your wallet through {item.mode}
                        </h2>
                      ) : (
                        <h2 key={item.txnid} className=" text-sm">
                          {item.addedon}{" "}
                          {item.error_Message.replace("customer", "you")}
                        </h2>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

interface HistoryProps {
  history: any;
}
class HistoryBox extends React.Component<HistoryProps> {
  render() {
    return (
      <div className="w-full bg-gray-100 bg-opacity-40 mt-2 rounded-lg p-2 flex flex-col">
        <h1 className=" text-lg font-semibold">{this.props.history.name}</h1>
        <div className="flex justify-between">
          <h2>prize: {this.props.history.prize}</h2>
          <h2>winner: {this.props.history.winner}</h2>
        </div>
      </div>
    );
  }
}

class HistoryBoxLoader extends React.Component {
  render() {
    return (
      <div className="w-full bg-gray-100 bg-opacity-40 mt-2 rounded-lg p-2 flex flex-col animate-pulse">
        <div className=" text-lg font-semibold p-3 w-3/6 rounded-md bg-gray-50 bg-opacity-70"></div>
        <div className="flex justify-between">
          <div className="p-2 bg-gray-50 bg-opacity-70 w-2/6 rounded-md mt-1"></div>
          <div className="p-2 bg-gray-50 bg-opacity-70 w-2/6 rounded-md mt-1"></div>
        </div>
      </div>
    );
  }
}
