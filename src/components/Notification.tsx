import React from "react";
import { Players } from "./Players";

export class Notification extends React.Component {
  render() {
    return (
      <div className="flex w-full md:w-2/5 py-5 px-5 flex-col">
        <div className="w-full h-auto max-h-1/2 bg-gray-100 bg-opacity-40 pl-5 rounded-lg overflow-hidden">
          <h1 className="w-full text-green-50 h-10 text-2xl pt-2">
            Notifications
          </h1>
          <div className="w-full h-full overflow-y-auto">
            <div className="text-white w-full mt-2 pb-5">
              <p>Someone recently win a contest</p>
              <p>Someone recently win a contest</p>
              <p>Someone recently win a contest</p>
              <p>Someone recently win a contest</p>
              <p>Someone recently win a contest</p>
              <p>Someone recently win a contest</p>
              <p>Someone recently win a contest</p>
              <p>Someone recently win a contest</p>
            </div>
          </div>
        </div>
        <div className="flex h-auto max-h-1/2 w-full mt-5 bg-gray-100 bg-opacity-40 flex-col rounded-lg px-5">
          <h1 className="w-full text-green-50 h-10 text-2xl pt-3">
            Top Players
          </h1>
          <div className="w-full h-full overflow-y-auto">
            <div className="text-white w-full mt-2 pb-5">
              <Players
                name={"John Doe"}
                total_kill={44}
                total_wins={10}
                profile_picture={
                  "https://cdn.pixabay.com/photo/2021/08/03/07/03/orange-6518675_960_720.jpg"
                }
              />
              <Players
                name={"Other Player"}
                total_kill={40}
                total_wins={9}
                profile_picture={
                  "https://cdn.pixabay.com/photo/2021/10/07/16/30/firefighters-6689112_960_720.jpg"
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
