import {FaEnvelope, FaFacebook, FaGithub, FaLinkedin} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h5 className="mb-1 text-lg font-semibold">Contact</h5>
            <p>
              <FaEnvelope className="inline mr-2" />
              <a
                className="text-white hover:underline"
                href="mailto:ahmed.ehab.reffat@gmail.com"
              >
                ahmed.ehab.reffat@gmail.com
              </a>
            </p>
          </div>
          <div className="md:w-1/2 md:text-right">
            <h5 className="mb-1 text-lg font-semibold">Follow</h5>
            <div className="flex gap-3 md:justify-end">
              <a
                className="text-white hover:text-gray-400 transition"
                href="#"
                aria-label="facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                className="text-white hover:text-gray-400 transition"
                href="#"
                aria-label="github"
              >
                <FaGithub size={24} />
              </a>
              <a
                className="text-white hover:text-gray-400 transition"
                href="#"
                aria-label="linkedin"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-3 text-sm">
          &copy; <span id="year"></span> Ahmed Ehab • Built with ❤️
        </div>
      </div>
    </footer>
  );
}
