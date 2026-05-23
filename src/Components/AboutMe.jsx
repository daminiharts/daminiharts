import React from 'react';

const AboutMe = () => {
  return (
    <section className=" bg-[#f1f1f1]">
      <div className='max-w-6xl m-auto min-h-screen  flex flex-col md:flex-row items-center justify-center px-6 py-12  gap-10' >

      {/* Left - Image */}
      <div className="w-full md:w-1/2">
        <img
          src="/images/about.jpg" // 👈 Replace with your image path
          alt="About Me"
          className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
        />
      </div>

      {/* Right - Text */}
      <div className="w-full md:w-1/2 space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">About Me</h1>
        <p className="text-gray-600 text-lg ">
          I'm a passionate developer who loves bringing ideas to life through code. With a strong background in both frontend and backend development, I focus on crafting intuitive, responsive, and user-centered applications.
        </p>
        <p className="text-gray-600 text-lg">
          Outside of coding, I enjoy exploring creative design, photography, and sharing knowledge with the community. Let's build something awesome together!
        </p>
      </div>
      
      </div>
    </section>
  );
};

export default AboutMe;
