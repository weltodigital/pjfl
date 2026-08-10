/** Single source of truth for PJFL's contact details. */
export const site = {
  name: "PJFL Accountants",
  phone: "07976 481921",
  phoneHref: "tel:+447976481921",
  email: "info@pjfl.co.uk",
  emailHref: "mailto:info@pjfl.co.uk",
  addressLines: ["38 Rusham Rd", "Egham", "Surrey TW20 9LP"],
  addressShort: "38 Rusham Rd, Surrey TW20 9LP",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=38+Rusham+Rd+Egham+Surrey+TW20+9LP",
} as const;
