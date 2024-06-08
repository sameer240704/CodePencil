import React from "react";
import { Navbar } from "../components";
import HTML from "../assets/snap-html.png";
import CSS from "../assets/snap-css.png";
import JS from "../assets/snap-js.png";
import CPP from "../assets/snap-cpp.png";

const LandingPage = () => {
  return (
    <div className="h-screen w-screen bg-background-100 relative overflow-hidden">
      <Navbar />
      <div className="w-full h-[calc(100vh-40px)] flex flex-col items-center justify-center z-10 relative">
        <div className="top-0 flex flex-col justify-center items-center lg:mt-7">
          <h1 className="text-[140px] font-[900] text-secondary-100 tracking-wider leading-[1.4]">
            Create.
          </h1>
          <h1 className="text-[140px] font-[900] text-secondary-200 tracking-wider leading-[1.4]">
            Compile.
          </h1>
          <h1 className="text-[140px] font-[900] text-secondary-300 tracking-wider leading-[1.4]">
            Collaborate.
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center text-slate-300 tracking-wide font-semibold gap-4 text-2xl mt-14 lg:text-3xl z-20 relative">
          <h1>
            Unleash your creativity, build amazing projects, and code seamlessly
            together.
          </h1>
          <span className="flex">
            <h1>Welcome to</h1>
            <span className="flex ml-2 font-extrabold">
              <h1 className="text-white">Code</h1>
              <h1 className="text-purple-500">Pencil</h1>
            </span>
            <h1 className="ml-2">— the community for developers and coders.</h1>
          </span>
        </div>
      </div>

      <div className="background-container h-full w-full absolute top-0 left-0 z-0">
        <img
          src={HTML}
          className="float-1 h-[350px] w-auto opacity-60 absolute top-32 left-32 rounded-xl"
        ></img>
        <img
          src={CSS}
          className="float-2 h-[400px] w-auto opacity-60 absolute bottom-20 right-[500px] rotate-12 rounded-xl"
        ></img>
        <img
          src={JS}
          className="float-3 h-[350px] w-auto opacity-60 absolute top-40 right-20 -rotate-45 rounded-xl"
        ></img>
        <img
          src={CPP}
          className="float-4 h-[350px] w-auto opacity-60 absolute bottom-10 left-64 rounded-xl"
        ></img>
      </div>
    </div>
  );
};

export default LandingPage;
