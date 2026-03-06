import { Car, Shield, Users, Award, Clock, MapPin } from "lucide-react";

const stats = [
  { label: "Cars in Fleet", value: "150+", icon: Car },
  { label: "Happy Customers", value: "10,000+", icon: Users },
  { label: "Years of Experience", value: "12+", icon: Award },
  { label: "Support Available", value: "24/7", icon: Clock },
];

const teamMembers = [
  { name: "Erik Johansson", role: "CEO & Founder", initials: "EJ" },
  { name: "Anna Lindberg", role: "Operations Manager", initials: "AL" },
  { name: "Marcus Nilsson", role: "Fleet Manager", initials: "MN" },
  { name: "Sara Andersson", role: "Customer Service Lead", initials: "SA" },
];

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">About MrRent</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Your trusted partner for hassle-free car rentals since 2014. We make getting on the road
            simple, affordable, and enjoyable.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              <div className="mt-2 h-1 w-16 rounded bg-amber-500" />
              <p className="mt-4 leading-relaxed text-gray-600">
                At MrRent, we believe everyone deserves access to reliable and comfortable
                transportation. Whether you need a compact city car for a quick errand, a spacious
                SUV for a family adventure, or a transport vehicle for your business — we have you
                covered.
              </p>
              <p className="mt-4 leading-relaxed text-gray-600">
                Founded in Stockholm, we have grown to become one of Sweden&apos;s most trusted car
                rental services. Our commitment to quality vehicles, transparent pricing, and
                exceptional customer service sets us apart.
              </p>
            </div>
            <div className="flex items-center justify-center rounded-xl bg-gray-100 p-12">
              <div className="text-center">
                <Car className="mx-auto h-24 w-24 text-amber-500" />
                <p className="mt-4 text-lg font-semibold text-gray-700">
                  Quality vehicles, fair prices
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg bg-white p-6 text-center shadow-sm">
                <stat.icon className="mx-auto h-10 w-10 text-amber-500" />
                <p className="mt-3 text-3xl font-extrabold text-gray-900">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Why Choose MrRent?</h2>
            <div className="mx-auto mt-2 h-1 w-16 rounded bg-amber-500" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-200 p-6">
              <Shield className="h-10 w-10 text-amber-500" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Full Insurance Included</h3>
              <p className="mt-2 text-sm text-gray-600">
                All our rentals include comprehensive insurance so you can drive with peace of mind.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6">
              <Award className="h-10 w-10 text-amber-500" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Well-Maintained Fleet</h3>
              <p className="mt-2 text-sm text-gray-600">
                Every car is regularly serviced and inspected to ensure safety and comfort.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6">
              <MapPin className="h-10 w-10 text-amber-500" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Convenient Locations</h3>
              <p className="mt-2 text-sm text-gray-600">
                Pick up and drop off at multiple locations across Stockholm and surrounding areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Our Team</h2>
            <div className="mx-auto mt-2 h-1 w-16 rounded bg-amber-500" />
            <p className="mt-4 text-gray-600">The people behind MrRent</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-navy text-xl font-bold text-amber-500">
                  {member.initials}
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
