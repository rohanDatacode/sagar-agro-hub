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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-wheat text-forest">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <p className="font-serif font-semibold">Sagar Raj Green</p>
                <p className="text-xs text-primary-foreground/70">Agro Biotech</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Leading wholesaler and distributor of quality agricultural inputs,
              committed to sustainable farming practices.
            </p>
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
              <Link to="/products?category=growth-promoter" className="text-sm text-primary-foreground/80 hover:text-wheat transition-colors">
                Growth Promoters
              </Link>
              <Link to="/products?category=bio-fertilizer" className="text-sm text-primary-foreground/80 hover:text-wheat transition-colors">
                Bio Fertilizers
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
