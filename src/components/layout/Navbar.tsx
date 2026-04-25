import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'Products' },
  { href: '/track', label: 'Track Order' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <Leaf className="h-6 w-6" />
          </div>
          <div className="hidden sm:block">
            <p className="font-serif text-lg font-semibold text-foreground leading-tight">
              Sagar Raj Green
            </p>
            <p className="text-xs text-muted-foreground">Agro Biotech</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                location.pathname === link.href
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/checkout" className="ml-2 relative flex items-center justify-center p-2 text-muted-foreground hover:text-primary transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-primary-foreground bg-primary rounded-full transform translate-x-1/4 -translate-y-1/4">
                {cartItemsCount}
              </span>
            )}
          </Link>
          <Link to="/admin/login" className="ml-2">
            <Button variant="outline" size="sm">
              Admin Login
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button & Cart */}
        <div className="flex items-center md:hidden gap-2">
          <Link to="/checkout" className="relative p-2 text-foreground">
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-primary-foreground bg-primary rounded-full transform translate-x-1/4 -translate-y-1/4">
                {cartItemsCount}
              </span>
            )}
          </Link>
          <button
            className="p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'px-4 py-3 text-sm font-medium rounded-md transition-colors',
                  location.pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="mt-2"
            >
              <Button variant="outline" className="w-full">
                Admin Login
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
