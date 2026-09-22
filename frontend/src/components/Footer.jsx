function Footer() {
  return (
    <footer className="bg-white shadow px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 mt-auto">
      {/* Left side: app name */}
      <h2 className="text-xl font-bold text-blue-600">DueNest</h2>

      {/* Center: quick links */}
      <div className="flex gap-4 text-sm text-gray-600">
        <a href="/about" className="hover:text-blue-600">About</a>
        <a href="/contact" className="hover:text-blue-600">Contact</a>
        <a href="/privacy" className="hover:text-blue-600">Privacy</a>
      </div>

      {/* Right side: copyright */}
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} DueNest. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
