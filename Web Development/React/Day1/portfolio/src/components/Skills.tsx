import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaNode,
  FaDatabase,
  FaGit,
  FaFigma
} from 'react-icons/fa';
import {SiTypescript, SiTailwindcss, SiVite} from 'react-icons/si';

export default function Skills() {
  return (
    <section id="skills" className="py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Skills</h2>
          <div className="h-1 w-20 bg-linear-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {skills.map((skill) => (
            <div key={skill.id} className="space-y-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">{skill.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                  <p className="text-xs text-gray-600">{skill.category}</p>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-blue-500 to-purple-600 transition-all duration-700 ease-out"
                  style={{width: `${skill.level}%`}}
                ></div>
              </div>
              <p className="text-right text-xs text-gray-600 font-semibold">
                {skill.level}%
              </p>
            </div>
          ))}
        </div>

        <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Expertise Areas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category}
                className="bg-white rounded-lg py-4 px-3 text-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                <p className="font-semibold text-gray-900 text-sm">
                  {category}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {skills.filter((s) => s.category === category).length} skills
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
  icon: React.ReactNode;
}

const skills: Skill[] = [
  {
    id: 1,
    name: 'React',
    category: 'Frontend',
    level: 90,
    icon: <FaReact className="text-blue-400" />
  },
  {
    id: 2,
    name: 'TypeScript',
    category: 'Language',
    level: 85,
    icon: <SiTypescript className="text-blue-600" />
  },
  {
    id: 3,
    name: 'Tailwind CSS',
    category: 'Styling',
    level: 90,
    icon: <SiTailwindcss className="text-cyan-400" />
  },
  {
    id: 4,
    name: 'JavaScript',
    category: 'Language',
    level: 95,
    icon: <FaJs className="text-yellow-400" />
  },
  {
    id: 5,
    name: 'HTML5',
    category: 'Frontend',
    level: 95,
    icon: <FaHtml5 className="text-orange-500" />
  },
  {
    id: 6,
    name: 'CSS3',
    category: 'Styling',
    level: 90,
    icon: <FaCss3Alt className="text-blue-500" />
  },
  {
    id: 7,
    name: 'Node.js',
    category: 'Backend',
    level: 80,
    icon: <FaNode className="text-green-500" />
  },
  {
    id: 8,
    name: 'Database',
    category: 'Backend',
    level: 75,
    icon: <FaDatabase className="text-gray-400" />
  },
  {
    id: 9,
    name: 'Git',
    category: 'Tools',
    level: 85,
    icon: <FaGit className="text-red-500" />
  },
  {
    id: 10,
    name: 'Figma',
    category: 'Design',
    level: 70,
    icon: <FaFigma className="text-purple-500" />
  },
  {
    id: 11,
    name: 'Vite',
    category: 'Tools',
    level: 85,
    icon: <SiVite className="text-purple-500" />
  }
];

const categories = [
  'Frontend',
  'Backend',
  'Language',
  'Styling',
  'Tools',
  'Design'
];
