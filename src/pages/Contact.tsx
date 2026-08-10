import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";

const serviceOptions = [
  "Tax Planning & Preparation",
  "Making Tax Digital (MTD)",
  "Bookkeeping Services",
  "Business Advisory",
  "Payroll Services",
  "Company Formation",
  "Management Accounts",
  "Audit & Assurance",
  "Year-End Accounts",
  "Something else",
];

const Contact = () => {
  const [sent, setSent] = useState(false);

  /**
   * With no server behind the site, the form hands the enquiry to the
   * visitor's email client pre-addressed to PJFL. To post it somewhere
   * instead (Formspree, Netlify Forms, an API route), replace the body of
   * this handler with a fetch() to that endpoint.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone") || "Not provided"}`,
      `Service of interest: ${get("service") || "Not specified"}`,
      "",
      "Message:",
      get("message"),
    ].join("\n");

    const subject = `Website enquiry — ${get("service") || "General"}`;
    window.location.href = `${site.emailHref}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#fcfef1]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#345e7d] py-16 text-white">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold">Contact Us</h1>
            <p className="text-lg opacity-90 sm:text-xl">
              Get in touch for a free, no-obligation consultation — we usually reply within one
              working day
            </p>
          </div>
        </div>
      </section>

      {/* Contact details */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="text-center transition-shadow hover:shadow-lg">
              <CardContent className="p-8">
                <Phone className="mx-auto mb-4 h-10 w-10 text-[#345e7d]" />
                <h2 className="mb-2 font-semibold text-[#345e7d]">Call Us</h2>
                <a href={site.phoneHref} className="text-gray-600 hover:text-[#bc1823]">
                  {site.phone}
                </a>
              </CardContent>
            </Card>

            <Card className="text-center transition-shadow hover:shadow-lg">
              <CardContent className="p-8">
                <Mail className="mx-auto mb-4 h-10 w-10 text-[#345e7d]" />
                <h2 className="mb-2 font-semibold text-[#345e7d]">Email Us</h2>
                <a href={site.emailHref} className="break-words text-gray-600 hover:text-[#bc1823]">
                  {site.email}
                </a>
              </CardContent>
            </Card>

            <Card className="text-center transition-shadow hover:shadow-lg">
              <CardContent className="p-8">
                <MapPin className="mx-auto mb-4 h-10 w-10 text-[#345e7d]" />
                <h2 className="mb-2 font-semibold text-[#345e7d]">Visit Us</h2>
                <a
                  href={site.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-[#bc1823]"
                >
                  {site.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Form + hours */}
          <div className="mt-14 grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-8">
                  <h2 className="mb-2 text-2xl font-bold text-[#345e7d]">Send Us A Message</h2>
                  <p className="mb-6 text-sm text-gray-600">
                    Tell us a little about what you need and we'll come back to you with next
                    steps and a clear price.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="name">Full name *</Label>
                        <Input id="name" name="name" required placeholder="Jane Smith" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="jane@example.co.uk"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="phone">Phone number</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="07700 900000" />
                      </div>
                      <div>
                        <Label htmlFor="service">Service of interest</Label>
                        <select
                          id="service"
                          name="service"
                          defaultValue=""
                          className="flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#345e7d] focus-visible:ring-offset-1"
                        >
                          <option value="" disabled>
                            Please select…
                          </option>
                          {serviceOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">How can we help? *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Tell us about your business and what you're looking for…"
                      />
                    </div>

                    <Button type="submit" size="lg" variant="destructive" className="w-full sm:w-auto">
                      Send Enquiry
                    </Button>

                    {sent && (
                      <p className="rounded-md bg-[#345e7d]/10 p-3 text-sm text-[#345e7d]">
                        Your email client should have opened with your enquiry ready to send. If
                        it didn't, email us directly at{" "}
                        <a href={site.emailHref} className="font-semibold underline">
                          {site.email}
                        </a>
                        .
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <div className="h-full overflow-hidden rounded-lg border border-gray-200">
                <iframe
                  title="Map showing PJFL Accountants, 38 Rusham Rd, Egham"
                  src="https://maps.google.com/maps?q=38%20Rusham%20Rd%2C%20Egham%2C%20Surrey%20TW20%209LP&z=15&output=embed"
                  className="h-96 w-full border-0 lg:h-full lg:min-h-[28rem]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#345e7d] py-16 text-white">
        <div className="container px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Prefer To Talk It Through?</h2>
          <p className="mb-8 text-lg opacity-90 sm:text-xl">
            Give us a call and speak to a qualified accountant
          </p>
          <Button asChild size="lg" variant="destructive">
            <a href={site.phoneHref}>Call {site.phone}</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
