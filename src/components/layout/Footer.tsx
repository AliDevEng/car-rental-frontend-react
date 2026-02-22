const Footer = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-gray-600 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Car Rental System</span>
        <span>Built with React + TypeScript + Vite</span>
      </div>
    </footer>
  );
};

export default Footer;
