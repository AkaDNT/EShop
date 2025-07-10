import Image from "next/image";
import Link from "next/link";
import React from "react";

const footerLinks = [
  {
    title: "Make Money",
    links: [
      "Sell on ADNT",
      "Sell on ADNT Business",
      "Associates Programme",
      "Fulfilment by ADNT",
      "Advertise Your Products",
    ],
  },
  {
    title: "Payment Methods",
    links: [
      "ADNT Payment Methods",
      "ADNT Platinum Mastercard",
      "ADNT Money Store",
      "Gift Cards",
      "ADNT Currency Converter",
    ],
  },
  {
    title: "Support",
    links: [
      "Track Packages or View Orders",
      "Delivery Rates & Policies",
      "ADNT Prime",
      "Returns & Replacements",
    ],
  },
];

const Footer = () => (
  <footer
    className="
      bg-[color:var(--color-ADNT-dark)] text-white
      flex flex-wrap items-start
      gap-8 sm:gap-12 lg:gap-20
      px-4 sm:px-8 lg:px-20
      py-10
    "
  >
    {/* ---------- Logo ---------- */}
    <Link href="/" className="shrink-0 w-full sm:w-auto">
      <Image
        src="/logo.png"
        alt="logo"
        height={120}
        width={120}
        className="mx-auto sm:mx-0"
      />
    </Link>

    {/* ---------- Link Sections ---------- */}
    <div
      className="
        flex flex-wrap justify-between
        w-full sm:flex-1
      "
    >
      {footerLinks.map(({ title, links }) => (
        <div
          key={title}
          className="
            w-1/2 sm:w-auto lg:min-w-[180px]
            mb-6 sm:mb-0
          "
        >
          <h3 className="font-semibold text-sm mb-2">{title}</h3>

          <ul className="flex flex-col gap-1 text-sm font-light">
            {links.map((l) => (
              <li key={l} className="cursor-pointer hover:underline">
                {l}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </footer>
);

export default Footer;
