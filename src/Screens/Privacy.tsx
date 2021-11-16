import { Component } from "react";
import Logo from "../Assets/vfred.png";

export class Privacy extends Component {
  render() {
    return (
      <>
        <title>Privacy Policy - Virtual Fight Gaming Arena</title>;
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
                <i className="fas fa-file-word"></i> Privacy Policy
              </h1>
              <p className="p-6">
                Welcome To Virtual Fight Arena, where you can play and show your
                aggression in games to win prizes. Here you know how to use your
                email, photos, name, and cookies. First of all, we will never
                share your details with anyone, your email work as our user id
                and we store cookies to create login session. All payments are
                encrypted and secure by the PayU payment gateway. We will store
                your bank details for your refunds and We will never store your
                card details and other payment details. You should be 13 years
                old or up before using our service.{" "}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
