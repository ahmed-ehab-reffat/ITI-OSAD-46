import cv from '../assets/CV.pdf';

export default function About() {
  return (
    <section
      id="about"
      className="py-16 px-4 bg-linear-to-b from-white to-gray-50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">About Me</h2>
          <div className="h-1 w-20 bg-linear-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>

        <div>
          <div>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Dedicated front-end developer in building responsive and
              user-friendly web applications. Proficient in React and modern
              frameworks, with a strong foundation in accessibility and
              performance optimization. Skilled in translating wireframes into
              functional and visually appealing interfaces. Seeking a
              challenging role to leverage my technical expertise and contribute
              to innovative projects.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Education
                </h3>
                <p className="text-gray-600">
                  B.Sc. in Computer Science • Akhbar EL-Youm Academy
                </p>
                <p className="text-gray-600">
                  ITI Open Source 46 (11-month program)
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Experience
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-linear-to-r from-blue-500 to-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
                    <span className="text-gray-700">
                      Senior Frontend Developer — Acme Inc. (2022-Present)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-linear-to-r from-blue-500 to-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
                    <span className="text-gray-700">
                      Frontend Engineer — Tech Studio (2019-2022)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-linear-to-r from-blue-500 to-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
                    <span className="text-gray-700">
                      Junior Developer — WebLabs (2017-2019)
                    </span>
                  </li>
                </ul>
              </div>

              <a
                className="inline-block px-6 py-3 mt-4 bg-linear-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                href={cv}
                download
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
