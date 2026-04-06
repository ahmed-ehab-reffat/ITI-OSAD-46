import mentally from '../assets/mentally.jpg';
import progectManager from '../assets/projectManager.webp';

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="py-16 px-4 bg-linear-to-b from-gray-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Projects</h2>
          <div className="h-1 w-20 bg-linear-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
            >
              <div className="relative overflow-hidden h-56 bg-gray-200">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col grow">
                <h5 className="text-xl font-semibold text-gray-900 mb-2">
                  {p.title}
                </h5>
                <p className="text-gray-600 text-sm mb-6 grow">{p.summary}</p>
                <div className="flex gap-3 mt-auto">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 bg-linear-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300 text-center"
                  >
                    Live
                  </a>
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-300 transition-all duration-300 text-center"
                  >
                    Repo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Project = {
  id: number;
  title: string;
  summary: string;
  description: string;
  image: string;
  live: string;
  repo: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Mentally',
    summary: 'A platform for mental health support and resources.',
    description:
      'Next.js application using Tailwind CSS, next-intl, Typescript, and other technologies.',
    image: mentally,
    live: 'https://mentally-eight.vercel.app/',
    repo: 'https://github.com/ahmed-ehab-reffat/mentally'
  },
  {
    id: 2,
    title: 'Project Management App',
    summary: 'Organize your projects efficiently',
    description:
      'A React-based projects manager with drag-and-drop functionality, priority levels, and deadline tracking.',
    image: progectManager,
    live: 'https://refs-project-managment.vercel.app/',
    repo: 'https://github.com/ahmed-ehab-reffat/refs-project-managment'
  },
  {
    id: 3,
    title: 'Portfolio Website',
    summary: 'Showcase your work',
    description:
      'Responsive portfolio site built with React and Tailwind CSS, featuring smooth animations and transitions.',
    image: '../assets/project3.jpg',
    live: '#',
    repo: '#'
  }
];
