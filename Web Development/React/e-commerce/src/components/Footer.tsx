export default function Footer() {
  return (
    <footer className="bg-purple-900 text-white border-t-4 border-purple-500">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-black text-lg mb-4">About TrendHub</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Your ultimate destination for trending products at unbeatable
            prices.
          </p>
        </div>
        <div>
          <h3 className="font-black text-lg mb-4">Quick Access</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a
                href="/"
                className="hover:text-yellow-300 transition font-semibold"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="hover:text-yellow-300 transition font-semibold"
              >
                Products
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-black text-lg mb-4">Get in Touch</h3>
          <p className="text-gray-300 text-sm">
            Email: ahmed.ehab.reffat@gmail.com
            <br />
            Phone: 011565011565
          </p>
        </div>
      </div>
      <div className="border-t border-purple-700 py-6 text-center text-gray-400 text-sm">
        <p className="font-semibold">© 2026 Giza-Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}
