import React from "react";
import Tick from "../Assets/tick.gif";
import Cross from "../Assets/cross-red-cross.gif";
import { generateHash } from "../connections/hasher";
import { Outlet, useParams, Link } from "react-router-dom";
import Process from "../Assets/process.gif";
import { backend_url } from "../connections/backend";
import { User } from "../interface/interface";

interface Props {
  user: User;
  isAuthenticated: boolean;
}

export class Transcations extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className=" bg-white h-full flex overflow-hidden justify-center items-center">
        <Outlet />
      </div>
    );
  }
}

interface State {
  amount: number;
  phoneNumber: number;
}

export class FillBalance extends React.Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      amount: 0,
      phoneNumber: 0,
    };
  }

  _createForm(url: string, params: any) {
    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", url);

    for (let i in params) {
      let input = document.createElement("input");
      input.type = "hidden";
      input.name = params[i].name;
      input.value = params[i].value;
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }

  _sendDetails = () => {
    const { amount, phoneNumber } = this.state;
    const { user } = this.props;
    const key = "W1udhf";
    const txnid = Date.now().toString() + user.user_id.slice(0, 5);
    const hashString = generateHash({
      txnid: txnid,
      amount: amount.toString(),
      productinfo: "wallet",
      firstname: user.name,
      email: user.email,
    });
    const surl = `${backend_url}auth/transcations/success/${txnid}/${amount}`;
    const furl = `${backend_url}auth/transcations/fail/${txnid}/${amount}`;
    const params = [
      {
        name: "key",
        value: key,
      },
      {
        name: "txnid",
        value: txnid,
      },
      {
        name: "productinfo",
        value: "wallet",
      },
      {
        name: "amount",
        value: amount,
      },
      {
        name: "email",
        value: user.email,
      },
      {
        name: "firstname",
        value: user.name,
      },
      {
        name: "phone",
        value: phoneNumber,
      },
      {
        name: "hash",
        value: hashString,
      },
      {
        name: "surl",
        value: surl,
      },
      {
        name: "furl",
        value: furl,
      },
    ];
    this._createForm("https://secure.payu.in/_payment", params);
  };

  render() {
    return (
      <div className="flex flex-col justify-content items-center">
        <h1 className="text-xl transform capitalize">Enter your amount</h1>
        <form action="">
          <div className="flex items-end border-b-2">
            <i className="fas fa-rupee-sign mb-2"></i>
            <input
              type="number"
              className="mt-2 outline-none px-2 py-1"
              placeholder="1000"
              onChange={(event) => {
                this.setState({ amount: event.target.value });
              }}
            />
          </div>
        </form>
        <form action="">
          <div className="flex items-end border-b-2">
            <i className="fas fa-phone mb-2"></i>
            <input
              type="number"
              className="mt-2 outline-none px-2 py-1"
              placeholder="0123456789"
              onChange={(event) => {
                this.setState({ phoneNumber: event.target.value });
              }}
            />
          </div>
        </form>
        {this.state.amount >= 1 &&
        this.state.phoneNumber.toString().length === 10 ? (
          <button
            onClick={this._sendDetails}
            className="p-2 px-5 bg-green-500 text-white mt-2 rounded-xl font-bold hover:bg-green-900 transition ease-in-out duration-200"
          >
            ADD &nbsp;<i className="fas fa-rupee-sign"></i> {this.state.amount}
          </button>
        ) : null}
      </div>
    );
  }
}

interface StateTrans {
  message: string;
  amount: number;
  isLoading: boolean;
  status: string;
  txnid: string;
  user_first_name: string;
}

export class TranscationsLoder extends React.Component {
  render() {
    return (
      <div className="flex justify-center items-center flex-col">
        <img src={Process} alt="Success" className=" w-64" />
        <span className="text-center"></span>
        <div className="text-center font-bold text-xl w-2/5 animate-pulse bg-gray-200 rounded-lg p-4"></div>

        <div className="text-sm p-4 bg-gray-300 w-3/5 rounded-lg animate-pulse mt-2"></div>
        <div className="p-2 bg-pink-400 rounded-lg mt-2 text-white px-6 animate-pulse">
          Verifying...
        </div>
      </div>
    );
  }
}

export function TransPanel(props: any) {
  const { txnid } = useParams();
  return <TranscationsIdentityfier {...props} txnid={txnid} />;
}

interface TranscationsIdentityfierProps {
  user: User;
  isAuthenticated: boolean;
  txnid: string;
}

class TranscationsIdentityfier extends React.Component<TranscationsIdentityfierProps> {
  state: StateTrans;
  constructor(props: TranscationsIdentityfierProps) {
    super(props);
    this.state = {
      message: "",
      amount: 0,
      isLoading: true,
      status: "",
      txnid: "",
      user_first_name: "",
    };
  }

  async componentDidMount() {
    await this.getTransactionDetails();
    this.setState({ user_first_name: this.props.user.name });
  }

  async getTransactionDetails() {
    this.setState({ isLoading: true });
    await fetch(
      backend_url + "auth/get_transaction_details/" + this.props.txnid,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          this.setState({
            isLoading: false,
            amount: parseInt(result.data.amount, 0),
            status: result.data.status,
            txnid: result.data.txnid,
            message:
              result.data.status === "success"
                ? "Balance added"
                : result.data.field9,
          });
        }
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          message: "transcation id not found",
        });
      });
  }

  render() {
    return this.state.isLoading ? (
      <TranscationsLoder />
    ) : this.state.status === "success" ? (
      <Success {...this.state} />
    ) : (
      <Failure {...this.state} />
    );
  }
}

export class Success extends React.Component<StateTrans> {
  render() {
    return (
      <div className="flex justify-center items-center flex-col">
        <img src={Tick} alt="Success" className=" w-64" />
        <h1 className="text-center">{this.props.message}</h1>
        <h1 className="text-center font-bold text-xl">
          <i className="fas fa-rupee-sign"></i> {this.props.amount}
        </h1>
        <h1 className="text-sm">
          Added to {this.props.user_first_name}'s Wallet
        </h1>
        <Link
          to="/"
          className="p-2 bg-green-500 rounded-lg mt-2 text-white px-4 hover:bg-green-900 transition ease-in-out duration-200"
        >
          Go to Home
        </Link>
      </div>
    );
  }
}

export class Failure extends React.Component<StateTrans> {
  render() {
    return (
      <div className="flex justify-content items-center flex-col">
        <img src={Cross} alt="Success" className=" w-32" />
        <h1 className="text-center mt-3">{this.props.message}</h1>
        <h1 className="text-center font-bold text-xl">
          <i className="fas fa-rupee-sign"></i> {this.props.amount}
        </h1>
        <h1 className="text-sm">
          Unable to Add in {this.props.user_first_name}'s Wallet
        </h1>
        <Link
          to="/add_balance"
          className="p-2 bg-red-500 rounded-lg mt-2 text-white px-4 hover:bg-red-900 transition ease-in-out duration-200 flex justify-center items-center"
        >
          Retry
        </Link>
      </div>
    );
  }
}
