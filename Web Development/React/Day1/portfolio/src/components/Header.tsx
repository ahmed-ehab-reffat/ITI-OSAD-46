export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a
            href="#"
            className="text-2xl font-bold italic bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            AE
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="hover:text-blue-400 transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#skills"
              className="hover:text-blue-400 transition-colors font-medium"
            >
              Skills
            </a>
            <a
              href="#portfolio"
              className="hover:text-blue-400 transition-colors font-medium"
            >
              Projects
            </a>
            <a
              href="#footer"
              className="hover:text-blue-400 transition-colors font-medium"
            >
              Contact
            </a>
            <a
              href="/CV.pdf"
              download
              className="px-4 py-2 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
            >
              Download CV
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
