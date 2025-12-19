const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
  Welcome to ClientSphere
</h1>


          <p className="text-lg md:text-2xl text-blue-100 mb-10">
            Building exceptional digital experiences for amazing clients worldwide
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300"
            >
              View Our Projects
            </a>

            <a
              href="#contact"
              className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
