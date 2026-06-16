import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Categories from './components/Categories';
import BestSellers from './components/BestSellers';
import Sustainability from './components/Sustainability';
import NewsletterAndSocial from './components/NewsletterAndSocial';
import Footer from './components/Footer';
import CartSheet from './components/CartSheet';
import { CartProvider } from './contexts/CartContext';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col font-sans bg-[#F8F8F8] text-[#1A1A1A]">
        <div className="w-full bg-white flex-grow">
          <Navbar />
          <Hero />
          <Features />
          <Categories />
          <BestSellers />
          <Sustainability />
          <NewsletterAndSocial />
        </div>
        <Footer />
        <CartSheet />
      </div>
    </CartProvider>
  );
}
