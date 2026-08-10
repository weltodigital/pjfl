import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      {/* Utility bar */}
      <div className="hidden bg-[#345e7d] text-white md:block">
        <div className="container flex items-center justify-end gap-6 px-4 py-1.5 text-xs">
          <a href={site.phoneHref} className="flex items-center gap-1.5 hover:underline">
            <Phone className="h-3.5 w-3.5" />
            {site.phone}
          </a>
          <a href={site.emailHref} className="hover:underline">
            {site.email}
          </a>
        </div>
      </div>

      <nav className="container flex items-center justify-between px-4 py-3">
        <Link to="/" aria-label="PJFL Accountants — home">
          <Logo className="h-9 sm:h-11" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-[15px] font-medium text-gray-600 transition-colors hover:text-[#345e7d]",
                  isActive && "border-b-2 border-[#345e7d] pb-0.5 text-[#345e7d]"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Button asChild variant="destructive">
            <Link to="/contact">Get Quote</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-[#345e7d] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-gray-200 bg-white md:hidden">
          <div className="container flex flex-col gap-1 px-4 py-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-2 py-3 font-medium text-gray-700",
                    isActive && "bg-[#345e7d]/10 text-[#345e7d]"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button asChild variant="destructive" className="mt-2 w-full">
              <Link to="/contact">Get Quote</Link>
            </Button>
            <a
              href={site.phoneHref}
              className="mt-2 flex items-center justify-center gap-2 py-2 text-sm text-[#345e7d]"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
