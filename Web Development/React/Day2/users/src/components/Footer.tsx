export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 pt-8 border-t border-gray-200">
      <div className="text-center text-gray-600 text-sm">
        <p>&copy; {currentYear} User Directory. All rights reserved.</p>
        <p className="mt-2 text-gray-500">
          Built with React, TypeScript, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
