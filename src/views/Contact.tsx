"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Have a question or need help? We&apos;re here for you. Reach out anytime and we&apos;ll
            get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-gray-200 p-6 text-center">
              <Phone className="mx-auto h-10 w-10 text-amber-500" />
              <h3 className="mt-4 font-semibold text-gray-900">Phone</h3>
              <p className="mt-1 text-sm text-gray-600">08-123 456 78</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 text-center">
              <Mail className="mx-auto h-10 w-10 text-amber-500" />
              <h3 className="mt-4 font-semibold text-gray-900">Email</h3>
              <p className="mt-1 text-sm text-gray-600">info@mrrent.se</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 text-center">
              <MapPin className="mx-auto h-10 w-10 text-amber-500" />
              <h3 className="mt-4 font-semibold text-gray-900">Address</h3>
              <p className="mt-1 text-sm text-gray-600">Storgatan 123, Stockholm</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 text-center">
              <Clock className="mx-auto h-10 w-10 text-amber-500" />
              <h3 className="mt-4 font-semibold text-gray-900">Hours</h3>
              <p className="mt-1 text-sm text-gray-600">
                Mon-Fri: 08-18
                <br />
                Sat-Sun: 10-16
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form + Map Placeholder */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Form */}
            <div className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
              <div className="mt-2 h-1 w-16 rounded bg-amber-500" />

              {submitted && (
                <div className="mt-4 rounded-lg bg-green-50 p-4 text-green-700">
                  Thank you! Your message has been sent. We&apos;ll get back to you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-600"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Map placeholder */}
            <div className="flex flex-col gap-6">
              <div className="flex-1 rounded-lg bg-gray-200 flex items-center justify-center min-h-[300px]">
                <div className="text-center text-gray-500">
                  <MapPin className="mx-auto h-12 w-12" />
                  <p className="mt-2 font-medium">Map</p>
                  <p className="text-sm">Storgatan 123, Stockholm</p>
                </div>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900">Frequently Asked</h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-amber-500">Q:</span>
                    <span>
                      <strong>What do I need to rent a car?</strong>
                      <br />A valid driver&apos;s license and a credit card.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-amber-500">Q:</span>
                    <span>
                      <strong>Can I cancel my booking?</strong>
                      <br />
                      Yes, free cancellation up to 24 hours before pickup.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-amber-500">Q:</span>
                    <span>
                      <strong>Is insurance included?</strong>
                      <br />
                      Yes, comprehensive insurance is included in all rentals.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
