export default function Footer() {
  return (
    <footer id="about" className="w-full bg-brand-dark px-6 py-16 font-sans text-brand-light md:px-12 md:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-6 lg:gap-8">
          <div className="lg:col-span-2">
            <a
              href="/"
              className="font-heading mb-6 inline-block text-3xl font-bold tracking-tight text-white"
            >
              CLTH&deg;
            </a>
            <p className="max-w-xs text-[15px] leading-relaxed text-[#a8b8aa]">
              Apparel inspired by nature.
              <br />
              Made for everywhere.
            </p>
          </div>

          <FooterColumn
            title="Shop"
            links={["Men", "Women", "Outerwear", "Accessories", "Sale"]}
          />
          <FooterColumn
            title="Company"
            links={["About us", "Sustainability", "Journal", "Careers", "Contact us"]}
          />
          <FooterColumn
            title="Help"
            links={["Shipping", "Returns", "Size guide", "FAQ", "Track order"]}
          />

          <div>
            <h4 className="mb-6 text-xs font-semibold tracking-widest text-white uppercase">
              Follow us
            </h4>
            <div className="flex items-center space-x-5 text-white">
              {["Ig", "Fb", "P", "Yt"].map((social) => (
                <a
                  key={social}
                  href="#journal"
                  aria-label={social}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-xs font-semibold transition-colors hover:border-[#a8b8aa] hover:text-[#a8b8aa]"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-[#3f5043] pt-8 md:flex-row">
          <p className="text-sm text-[#a8b8aa]">&copy; 2026 CLTH&deg;. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#a8b8aa] md:gap-8">
            <a href="#about" className="transition-colors hover:text-white">
              Terms of Service
            </a>
            <a href="#about" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#about" className="transition-colors hover:text-white">
              Accessibility
            </a>

            <div className="ml-2 flex items-center border-l border-[#3f5043] pl-6">
              <select className="cursor-pointer appearance-none border-none bg-transparent pr-4 text-[#a8b8aa] focus:ring-0 focus:outline-none">
                <option value="idr">IDR</option>
                <option value="usd">USD</option>
                <option value="gbp">GBP</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="mb-6 text-xs font-semibold tracking-widest text-white uppercase">{title}</h4>
      <ul className="space-y-4 text-[14px] text-[#a8b8aa]">
        {links.map((link) => (
          <li key={link}>
            <a href="#shop" className="transition-colors hover:text-white">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
