import { Link } from "react-router-dom";
import { Calculator, FileText, Mail, MapPin, Phone, TrendingUp, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

const coreServices = [
  {
    icon: Calculator,
    title: "Tax Planning",
    description: "Strategic tax advice to minimise liabilities",
  },
  {
    icon: FileText,
    title: "Bookkeeping",
    description: "Accurate financial record management",
  },
  {
    icon: TrendingUp,
    title: "Business Advisory",
    description: "Growth strategies and financial planning",
  },
  {
    icon: Users,
    title: "Payroll Services",
    description: "Complete payroll management solutions",
  },
];

const reasons = [
  "20+ years of experience in Egham and Surrey",
  "Qualified chartered accountants",
  "Personalised service for every client",
  "Competitive and transparent pricing",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#fcfef1]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#345e7d] to-[#2a4c66] py-20 text-white">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
              Professional Accounting Services in Egham
            </h1>
            <p className="mb-8 text-lg opacity-90 sm:text-xl">
              Expert financial guidance and accounting solutions for individuals and businesses
              across Surrey and the UK
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="destructive">
                <Link to="/contact">Get Free Consultation</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#345e7d]"
              >
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#345e7d]">Our Core Services</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Comprehensive accounting and financial services tailored to your needs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {coreServices.map((service) => (
              <Card key={service.title} className="p-6 text-center transition-shadow hover:shadow-lg">
                <CardContent className="pt-6">
                  <service.icon className="mx-auto mb-4 h-12 w-12 text-[#345e7d]" />
                  <h3 className="mb-2 font-semibold text-[#345e7d]">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-white py-16">
        <div className="container px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#345e7d]">About PJFL Accountants</h2>
              <p className="mb-6 leading-relaxed text-gray-600">
                Based in the heart of Egham, Surrey, PJFL Accountants has been providing exceptional
                accounting services to individuals and businesses for over two decades. Our team
                of qualified professionals combines traditional expertise with modern technology
                to deliver comprehensive financial solutions.
              </p>
              <p className="mb-8 leading-relaxed text-gray-600">
                We pride ourselves on building long-term relationships with our clients, offering
                personalised service and proactive advice to help you achieve your financial
                goals.
              </p>
              <Button asChild>
                <Link to="/contact">Speak To Our Team</Link>
              </Button>
            </div>
            <div className="rounded-lg bg-[#345e7d] p-8 text-white">
              <h3 className="mb-6 text-2xl font-bold">Why Choose PJFL Accountants?</h3>
              <ul className="space-y-4">
                {reasons.map((reason) => (
                  <li key={reason} className="flex items-start">
                    <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#bc1823]" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-[#345e7d] py-16 text-white">
        <div className="container px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 text-lg opacity-90 sm:text-xl">
            Contact us today for a free consultation and see how we can help your business thrive
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href={site.phoneHref} className="flex items-center gap-2 hover:underline">
              <Phone className="h-5 w-5" />
              <span className="font-semibold">{site.phone}</span>
            </a>
            <a href={site.emailHref} className="flex items-center gap-2 hover:underline">
              <Mail className="h-5 w-5" />
              <span className="font-semibold">{site.email}</span>
            </a>
            <a
              href={site.mapsHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <MapPin className="h-5 w-5" />
              <span className="font-semibold">Egham, Surrey</span>
            </a>
          </div>
          <div className="mt-8">
            <Button asChild size="lg" variant="destructive">
              <Link to="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
