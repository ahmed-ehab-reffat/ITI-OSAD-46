import me from '../assets/suit.jpg';

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Hi, I'm{' '}
              <span className="bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Ahmed Ehab
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mb-6 leading-relaxed">
              I build beautiful and performant web applications using modern
              technologies. Specializing in React, Tailwind CSS, and creating
              exceptional user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#footer"
                className="px-8 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Hire Me
              </a>
              <a
                href="#portfolio"
                className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:shadow-lg transition-all duration-300"
              >
                View Projects
              </a>
            </div>
          </div>
          <div className="flex justify-center order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <img
                src={me}
                alt="Ahmed Ehab"
                className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full shadow-2xl object-cover border-4 border-white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
