import React from "react";

export class Navigation extends React.Component {
  componentDidMount() {
    this.showHide();
  }

  showHide = () => {
    const bar = document.querySelector(".sidebar");
    const btn = document.querySelector(".fa-bars");
    const blank = document.querySelector(".blank");
    btn?.addEventListener("click", () => {
      bar?.classList.toggle("-translate-x-full");
    });
    blank?.addEventListener("click", () => {
      bar?.classList.toggle("-translate-x-full");
    });
  };
  render() {
    return (
      <div className="w-full h-18 bg-black bg-opacity-70 flex items-center px-5 md:rounded-lg py-5 filter md:drop-shadow-md">
        <i className="fas fa-bars mr-4 text-red-600 xl:hidden"></i>
        <h1 className="font-bold font-sans text-red-600 text-lg">
          Gaming Adda
        </h1>
      </div>
    );
  }
}
