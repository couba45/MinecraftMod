import React from "react";
import wb_image from "../resources/website_image.jpeg";
function About() {
  return (
    <div
      id="about"
      className="h-fit-content md:h-screen w-screen flex flex-col justify-center p-11 md:p-32"
    >
      <div className="flex flex-col lg:flex-row gap-6 items-center w-full">
        <div className="md:w-[100%]">
          <h1 className="text-4xl md:text-5xl pt-16 font-bold mb-7">About:</h1>
          <p>
            The project is based around the popular video game, Minecraft. The
            task is to create a mod and implement our ideas into the video game.
            We created a website to promote the mod and use MySQL to store the
            user information and feedback. The project was created because we’re
            all interested in Minecraft. We strive to improve the vanilla
            version of the game to allow many gamers to have an increased
            immersive experience in Minecraft.
          </p>
        </div>
        <div className="w-[100%]">
          <img className="object-cover " src={wb_image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default About;
