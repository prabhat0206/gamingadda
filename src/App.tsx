import React from "react";
import "./App.css";
import { Sidebar } from "./components/SideBar";
import { Navigation, UserModal } from "./components/Navigation";
import { backend_url } from "./connections/backend";
import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "./Routes/MainRoute";
import axios, { AxiosResponse } from "axios";

interface State {
  user: any;
  error: any;
  authenticated: boolean;
  isWalletLoading: boolean;
  wallet: number;
}

class App extends React.Component {
  state: State;
  constructor(props: any) {
    super(props);
    this.state = {
      user: {},
      error: null,
      authenticated: false,
      isWalletLoading: true,
      wallet: 0,
    };
  }
  async componentDidMount() {
    this.checkUser();
    this.getWallet();
  }
  checkUser() {
    axios(backend_url + "auth/login/success", { withCredentials: true })
      .then((response: AxiosResponse) => {
        if (response.data) {
          if (response.data.success) {
            this.setState({ user: response.data.user, authenticated: true });
          } else {
            this.setState({ authenticated: false });
          }
        }
      })
      .catch((error) => {
        this.setState({ authenticated: false, error: error });
      });
  }

  checkHight() {
    return window.innerHeight;
  }

  handleNotAuthenticated() {
    this.setState({ authenticated: false });
  }

  getWallet() {
    fetch(backend_url + "auth/get_wallet", {
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
            isWalletLoading: false,
            wallet: res.wallet.Item.wallet,
          });
        } else {
          this.checkUser();
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <BrowserRouter>
        <div
          className=" w-full flex filter bg-game overflow-hidden flex-col"
          style={{ height: this.checkHight() }}
        >
          <div className="flex w-full backdrop-filter backdrop-blur-lg">
            <Navigation
              isAuthenticated={this.state.authenticated}
              user={this.state.user}
              handleNotAuthenticated={this.handleNotAuthenticated.bind(this)}
              isWalletLoading={this.state.isWalletLoading}
              wallet={this.state.wallet}
            />
          </div>
          <div className="flex flex-1 flex-shrink-0 overflow-auto">
            <Sidebar />

            <div className="flex h-full flex-1 flex-col flex-grow filter backdrop-filter backdrop-blur-xl overflow-y-auto">
              <MainRouter
                user={this.state.user}
                walletAction={this.getWallet.bind(this)}
                isAuthenticated={this.state.authenticated}
                wallet={this.state.wallet}
              />
            </div>
          </div>
          <UserModal
            isAuthenticated={this.state.authenticated}
            user={this.state.user}
            handleNotAuthenticated={this.handleNotAuthenticated}
            isWalletLoading={this.state.isWalletLoading}
            wallet={this.state.wallet}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
