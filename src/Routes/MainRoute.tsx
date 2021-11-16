import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../Screens/Home";
import { History } from "../Screens/History";
import { Wallet } from "../Screens/WalletandProfile";
import { TournamentBox, InternalContests } from "../components/TournamentBox";
import { Transcations, FillBalance, TransPanel } from "../Screens/Transcation";
import { User } from "../interface/interface";
import { backend_url } from "../connections/backend";
import { Terms } from "../Screens/Terms";
import { Privacy } from "../Screens/Privacy";

interface PropsRouter {
  user: User;
  isAuthenticated: boolean;
  wallet: number;
  walletAction: () => void;
}

interface State {
  isEnrolling: boolean;
  canShowDialog: boolean;
  message: string;
  status: number;
}

export class MainRouter extends Component<PropsRouter> {
  state: State;
  constructor(props: PropsRouter) {
    super(props);
    this.state = {
      isEnrolling: false,
      canShowDialog: false,
      message: "",
      status: 300,
    };
  }
  async enteryButton(id: string) {
    this.setState({ isEnrolling: true, canShowDialog: true });
    await fetch(backend_url + "auth/enroll_player", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ tournament_id: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          isEnrolling: false,
          message: result.message,
          status: result.status,
        });
        this.props.walletAction();
      })
      .catch((err) => {
        this.setState({
          status: 500,
          message: err.message,
          isEnrolling: false,
        });
        this.props.walletAction();
      });
  }

  closeAction() {
    if (this.state.canShowDialog) {
      this.setState({ canShowDialog: false });
    }
  }
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            path="/"
            element={
              <TournamentBox
                status={this.state.status}
                message={this.state.message}
                closeAction={this.closeAction.bind(this)}
                canShowDialog={this.state.canShowDialog}
                user={this.props.user}
                enteryFunction={this.enteryButton.bind(this)}
                isEnrolling={this.state.isEnrolling}
                isAuthenticated={this.props.isAuthenticated}
              />
            }
          />
          <Route
            path=":contest_id"
            element={
              <InternalContests
                {...this.props}
                enteryFunction={this.enteryButton.bind(this)}
                status={this.state.status}
                message={this.state.message}
                closeAction={this.closeAction.bind(this)}
                canShowDialog={this.state.canShowDialog}
              />
            }
          />
        </Route>
        <Route
          path="/profile"
          element={
            <Wallet
              user={this.props.user}
              isAuthenticated={this.props.isAuthenticated}
            />
          }
        />
        <Route
          path="/history"
          element={<History isAuthenticated={this.props.isAuthenticated} />}
        />
        <Route path="/add_balance" element={<Transcations {...this.props} />}>
          <Route
            path="/add_balance"
            element={<FillBalance {...this.props} />}
          />
          <Route
            path="/add_balance/transcation/:txnid"
            element={<TransPanel {...this.props} />}
          />
        </Route>
        <Route path="/terms_and_conditions" element={<Terms />} />
        <Route path="/privacy_policy" element={<Privacy />} />
      </Routes>
    );
  }
}
