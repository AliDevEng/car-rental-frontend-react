import Link from "next/link";

const Home = () => {
  return (
    <section className="card">
      <h2 className="text-2xl font-bold text-gray-900">
        Welcome to Car Rental System
      </h2>
      <p className="mt-3 text-gray-600">
        Browse categories, discover available cars, and manage rentals with a
        clean modern interface.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/cars" className="btn-primary">
          Browse Cars
        </Link>
        <Link href="/register" className="btn-secondary">
          Create Account
        </Link>
      </div>
    </section>
  );
};

export default Home;
