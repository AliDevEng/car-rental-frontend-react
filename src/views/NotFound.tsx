import Link from "next/link";

const NotFound = () => {
  return (
    <section className="card mx-auto max-w-lg text-center">
      <h2 className="text-3xl font-bold text-gray-900">404</h2>
      <p className="mt-3 text-gray-600">
        The page you requested does not exist.
      </p>
      <Link href="/" className="btn-primary mt-6 inline-flex">
        Go Home
      </Link>
    </section>
  );
};

export default NotFound;
