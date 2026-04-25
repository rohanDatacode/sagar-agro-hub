import { Link } from 'react-router-dom';
import { Leaf, MapPin, Phone, Mail } from 'lucide-react';
import { companyInfo } from '@/lib/data';

export function Footer() {
  return (
    <footer className="bg-forest text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="Sagar Raj Green Logo" className="h-10 w-auto object-contain bg-white/10 rounded p-1" />
              <div>
                <p className="font-serif font-semibold">Sagar Raj Green</p>
                <p className="text-xs text-primary-foreground/70">Agro Biotech</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Leading wholesaler and distributor of quality agricultural inputs,
              committed to sustainable farming practices.
            </p>
            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-wheat/10 rounded-full border border-wheat/20">
              <span className="text-wheat text-xs font-medium tracking-wide">Trusted by 1L+ Farmers & 400+ Dealers across India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-primary-foreground/80 hover:text-wheat transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-sm text-primary-foreground/80 hover:text-wheat transition-colors">
                About Us
              </Link>
              <Link to="/products" className="text-sm text-primary-foreground/80 hover:text-wheat transition-colors">
                Products
              </Link>
              <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-wheat transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Products</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/products?category=water-soluble" className="text-sm text-primary-foreground/80 hover:text-wheat transition-colors">
                Water Soluble Fertilizers
              </Link>
              <Link to="/products?category=micronutrients" className="text-sm text-primary-foreground/80 hover:text-wheat transition-colors">
                Micronutrients
              </Link>
              <Link to="/products?category=organic" className="text-sm text-primary-foreground/80 hover:text-wheat transition-colors">
                Organic Products
              </Link>
              <Link to="/products?category=herbal" className="text-sm text-primary-foreground/80 hover:text-wheat transition-colors">
                Herbal Products
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-wheat shrink-0 mt-0.5" />
                <p className="text-sm text-primary-foreground/80">
                  {companyInfo.address}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-wheat shrink-0" />
                <p className="text-sm text-primary-foreground/80">{companyInfo.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-wheat shrink-0" />
                <p className="text-sm text-primary-foreground/80">{companyInfo.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/60">
              GST: {companyInfo.gstNumber}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
