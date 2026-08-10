import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

import Logo from "@/components/Logo";
import { site } from "@/lib/site";

const services = [
  "Tax Planning & Preparation",
  "Making Tax Digital (MTD)",
  "Bookkeeping Services",
  "Payroll Services",
  "Year-End Accounts",
];

const Footer = () => (
  <footer className="bg-[#2a4c66] text-white">
    <div className="container grid gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <Logo variant="light" className="h-11" />
        <p className="mt-5 text-sm leading-relaxed text-white/75">
          Chartered accountants based in Egham, Surrey, providing clear, practical financial
          advice to individuals and businesses across the UK.
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-base font-semibold">Quick Links</h3>
        <ul className="space-y-2.5 text-sm text-white/75">
          <li>
            <Link to="/" className="hover:text-white hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-white hover:underline">
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-white hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-base font-semibold">Our Services</h3>
        <ul className="space-y-2.5 text-sm text-white/75">
          {services.map((service) => (
            <li key={service}>
              <Link to="/services" className="hover:text-white hover:underline">
                {service}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-base font-semibold">Get In Touch</h3>
        <ul className="space-y-3.5 text-sm text-white/75">
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#bc1823]" />
            <a href={site.mapsHref} target="_blank" rel="noreferrer" className="hover:text-white">
              {site.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Phone className="h-4 w-4 flex-shrink-0 text-[#bc1823]" />
            <a href={site.phoneHref} className="hover:text-white">
              {site.phone}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Mail className="h-4 w-4 flex-shrink-0 text-[#bc1823]" />
            <a href={site.emailHref} className="hover:text-white">
              {site.email}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-white/15">
      <div className="container flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p>{site.addressShort}</p>
      </div>
    </div>
  </footer>
);

export default Footer;
