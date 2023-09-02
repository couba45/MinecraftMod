import React from "react";
import ReactTyped from "react-typed";

function Hero() {
  return (
    <div className="text-white max-h-fit">
      <div className="w-[100%] mx-auto text-center flex flex-col h-screen justify-center items-center absolute top-0 z-10">
        <div className="w-fit-content max-w-[800px] flex flex-col gap-3">
          <p className="text-emerald-400 text-xl font-bold md:text-2xl">
            CREATE A BRANDNEW WORLD
          </p>
          <h1 className="text-4xl font-bold font-futura md:text-5xl">
            Minecraft Mod
          </h1>
          <div>
            <p className="text-l text-xl">
              Easy to install, introducing items such as{" "}
              <ReactTyped
                className="text-gray-500 font-bold"
                strings={["Chairs", "Lamps", "Tables", "Cars"]}
                typeSpeed={80}
                backSpeed={80}
                loop
              />
            </p>
          </div>
          <a href="https://github.com/FOIIM/qol">
            <div className="w-[300px] mx-auto bg-emerald-400 text-black p-4 rounded-md mt-6 cursor-pointer font-bold hover:bg-emerald-700 hover:text-zinc-50 transition duration-200 ease-out">
              Get Started
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
