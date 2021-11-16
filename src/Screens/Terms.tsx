import { Component } from "react";
import Logo from "../Assets/vfred.png";

export class Terms extends Component {
  render() {
    return (
      <>
        <title>Terms and Conditions - Virtual Fight Gaming Arena</title>
        <div className="w-full h-full p-1">
          <div className="bg-gray-50 w-full h-full rounded-lg bg-opacity-30">
            <div className="w-full overflow-y-auto flex flex-col justify-center text-white">
              <div className="flex justify-center items-center mt-6 ">
                <img src={Logo} alt="virtual fight" className="w-16 h-16" />
                <h1 className="text-center p-3 text-4xl font-bold text-red-600">
                  Virtual Fight
                </h1>
              </div>
              <h1 className="text-center p-3 text-2xl mt-4 ">
                <i className="fas fa-file-word"></i> Terms and Conditions
              </h1>
              <p className="p-6">
                Welcome To Virtual Fight Arena, where you can play and show your
                aggression in games to win prizes. We have some terms and
                conditions which you should read before using our site.
                <ul style={{ listStyle: "inside" }} className="mt-2">
                  <li>
                    We are not responsible for any kind of loss of transactions.
                  </li>
                  <li>You should be 13 years old or up.</li>
                  <li>Your prize will be sent to your email address.</li>
                  <li>
                    If you have any problem during joining the tournament you
                    can contact us without any hesitation.{" "}
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
