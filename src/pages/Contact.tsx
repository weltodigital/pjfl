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

/**
 * Set to true once Resend is configured (see "Contact form" in the README:
 * verify pjfl.co.uk, then add RESEND_API_KEY and CONTACT_FROM in Vercel).
 * While false the page shows call/email options instead of the form, so
 * visitors are never handed a form that can't deliver.
 */
const CONTACT_FORM_ENABLED: boolean = false;

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

type Status = "idle" | "sending" | "sent" | "error";

const Contact = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  /** Posts the enquiry to the serverless function, which emails PJFL. */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget; // capture before awaiting
    const payload = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error || "We couldn't send your message. Please try again."
        );
      }

      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't send your message. Please try again."
      );
      setStatus("error");
    }
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

          {/* Enquiry panel + map */}
          <div className="mt-14 grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              {!CONTACT_FORM_ENABLED ? (
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col justify-center p-8 sm:p-10">
                    <h2 className="mb-3 text-2xl font-bold text-[#345e7d]">
                      Speak To Us Directly
                    </h2>
                    <p className="mb-8 leading-relaxed text-gray-600">
                      We'd rather talk than trade forms. Give us a call or drop us an email and
                      you'll get a qualified accountant, not a queue. Tell us a little about your
                      situation and we'll come back to you with next steps and a clear price.
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button asChild size="lg" variant="destructive">
                        <a href={site.phoneHref}>
                          <Phone className="h-5 w-5" />
                          Call {site.phone}
                        </a>
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <a href={site.emailHref}>
                          <Mail className="h-5 w-5" />
                          Email Us
                        </a>
                      </Button>
                    </div>

                    <p className="mt-8 border-t border-gray-200 pt-6 text-sm text-gray-500">
                      Prefer to write? Email{" "}
                      <a href={site.emailHref} className="font-semibold text-[#345e7d] underline">
                        {site.email}
                      </a>{" "}
                      with a few details and we'll reply within one working day.
                    </p>
                  </CardContent>
                </Card>
              ) : (
              <Card>
                <CardContent className="p-8">
                  <h2 className="mb-2 text-2xl font-bold text-[#345e7d]">Send Us A Message</h2>
                  <p className="mb-6 text-sm text-gray-600">
                    Tell us a little about what you need and we'll come back to you with next
                    steps and a clear price.
                  </p>

                  <form onSubmit={handleSubmit} className="relative space-y-5">
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

                    {/* Honeypot: hidden from people, catnip for bots. */}
                    <div className="absolute left-[-9999px]" aria-hidden="true">
                      <label htmlFor="company">Company (leave blank)</label>
                      <input id="company" name="company" tabIndex={-1} autoComplete="off" />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      variant="destructive"
                      className="w-full sm:w-auto"
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? "Sending…" : "Send Enquiry"}
                    </Button>

                    <p aria-live="polite" className="sr-only">
                      {status === "sending" ? "Sending your enquiry" : ""}
                    </p>

                    {status === "sent" && (
                      <p
                        role="status"
                        className="rounded-md border border-[#345e7d]/20 bg-[#345e7d]/10 p-4 text-sm text-[#345e7d]"
                      >
                        <span className="font-semibold">Thank you — your enquiry is on its way.</span>{" "}
                        We'll be in touch within one working day.
                      </p>
                    )}

                    {status === "error" && (
                      <p
                        role="alert"
                        className="rounded-md border border-[#bc1823]/25 bg-[#bc1823]/5 p-4 text-sm text-[#bc1823]"
                      >
                        {error} You can also email us directly at{" "}
                        <a href={site.emailHref} className="font-semibold underline">
                          {site.email}
                        </a>
                        .
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
              )}
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
