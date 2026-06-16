import { InstagramLogo, FacebookLogo, PinterestLogo, YoutubeLogo } from '@phosphor-icons/react';

export default function Footer() {
  return (
    <footer className="bg-[#2A362D] text-[#E7EDDF] py-16 md:py-20 px-6 md:px-12 w-full font-sans">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-block text-3xl font-bold font-heading tracking-tight text-white mb-6">
              CLTH&deg;
            </a>
            <p className="text-[#a8b8aa] text-[15px] max-w-xs leading-relaxed">
              Apparel inspired by nature.<br />
              Made for everywhere.
            </p>
          </div>
          
          {/* Shop Col */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-6">Shop</h4>
            <ul className="space-y-4 text-[14px] text-[#a8b8aa]">
              <li><a href="#" className="hover:text-white transition-colors">Men</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Women</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Outerwear</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
            </ul>
          </div>
          
          {/* Company Col */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-6">Company</h4>
            <ul className="space-y-4 text-[14px] text-[#a8b8aa]">
              <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Journal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact us</a></li>
            </ul>
          </div>
          
          {/* Help Col */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-6">Help</h4>
            <ul className="space-y-4 text-[14px] text-[#a8b8aa]">
              <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track order</a></li>
            </ul>
          </div>
          
          {/* Social */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-6">Follow us</h4>
            <div className="flex items-center space-x-5 text-white">
              <a href="#" className="hover:text-[#a8b8aa] transition-colors"><InstagramLogo size={24} weight="regular" /></a>
              <a href="#" className="hover:text-[#a8b8aa] transition-colors"><FacebookLogo size={24} weight="regular" /></a>
              <a href="#" className="hover:text-[#a8b8aa] transition-colors"><PinterestLogo size={24} weight="regular" /></a>
              <a href="#" className="hover:text-[#a8b8aa] transition-colors"><YoutubeLogo size={24} weight="regular" /></a>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#3f5043] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#a8b8aa] text-sm">
            &copy; 2024 CLTH&deg;. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-sm text-[#a8b8aa]">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            
            <div className="flex items-center ml-2 border-l border-[#3f5043] pl-6">
              <select className="bg-transparent border-none text-[#a8b8aa] focus:outline-none focus:ring-0 cursor-pointer appearance-none pr-4 relative">
                <option value="idr">IDR</option>
                <option value="usd">USD</option>
                <option value="gbp">GBP</option>
              </select>
              {/* Custom select arrow overlay would go here if not using appearance-none completely */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
