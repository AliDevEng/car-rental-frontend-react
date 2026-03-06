import Link from "next/link";
import {
  Car,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Car className="h-7 w-7 text-amber-500" />
              <span className="text-xl font-bold text-white">MrRent</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Your trusted partner for car rentals. We offer a wide selection of high-quality
              vehicles for all your needs.
            </p>
            <div className="mt-5 flex gap-3">
              <span className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors cursor-pointer">
                <Facebook className="h-4 w-4" />
              </span>
              <span className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors cursor-pointer">
                <Instagram className="h-4 w-4" />
              </span>
              <span className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors cursor-pointer">
                <Twitter className="h-4 w-4" />
              </span>
              <span className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors cursor-pointer">
                <Linkedin className="h-4 w-4" />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  &#x203A; About Us
                </Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-amber-400 transition-colors">
                  &#x203A; Our Cars
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-400 transition-colors">
                  &#x203A; Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-400 transition-colors">
                  &#x203A; Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-400 transition-colors">
                  &#x203A; FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold text-white">Customer Service</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-amber-400 transition-colors">
                  &#x203A; Support
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  &#x203A; Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-400 transition-colors">
                  &#x203A; Insurance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-500" />
                08-123 456 78
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-500" />
                info@mrrent.se
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-amber-500" />
                <span>
                  Storgatan 123
                  <br />
                  Stockholm, Sweden
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 text-amber-500" />
                <span>
                  Mon-Fri: 08:00-18:00
                  <br />
                  Sat-Sun: 10:00-16:00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} MrRent. All rights reserved. | Privacy Policy | Terms
            of Use
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
