import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, Truck, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/product-card';
import { SectionHeader } from '@/components/ui/section-header';
import { useProducts } from '@/context/ProductContext';
import { companyInfo } from '@/lib/data';
import { MainLayout } from '@/components/layout/MainLayout';

export default function Index() {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient text-primary-foreground">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
              <Leaf className="h-4 w-4 text-wheat" />
              <span className="text-sm font-medium">Since {companyInfo.foundedYear}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Growing Tomorrow,{' '}
              <span className="text-wheat">Naturally</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Your trusted partner for premium agricultural inputs. We provide quality
              fertilizers and growth promoters to help farmers achieve maximum yields.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto bg-wheat text-forest hover:bg-wheat/90 gap-2">
                  View Products
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 55C480 50 600 70 720 75C840 80 960 70 1080 65C1200 60 1320 60 1380 60L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="hsl(40 30% 98%)"
            />
          </svg>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <SectionHeader
            title="About Our Company"
            subtitle="A trusted name in agricultural solutions since 2017"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Nature of Business', value: companyInfo.natureOfBusiness, icon: Truck },
              { label: 'Legal Status', value: companyInfo.legalStatus, icon: Shield },
              { label: 'Annual Turnover', value: companyInfo.annualTurnover, icon: Award },
              { label: 'GST Registered', value: companyInfo.gstRegistrationDate, icon: CheckCircle },
            ].map((item, index) => (
              <div
                key={item.label}
                className="p-6 rounded-xl bg-card border border-border hover-lift animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-1 font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl bg-muted/50 border border-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">GST Number</p>
                <p className="font-mono font-semibold text-foreground">{companyInfo.gstNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold text-foreground">{companyInfo.location}</p>
              </div>
              <Link to="/about">
                <Button variant="outline" className="gap-2">
                  Learn More About Us
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <SectionHeader
            title="Featured Products"
            subtitle="Discover our range of high-quality agricultural products"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/products">
              <Button size="lg" className="gap-2">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">
            Ready to Grow Your Yield?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Get in touch with our team of agricultural experts to find the perfect
            products for your farming needs.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-wheat text-forest hover:bg-wheat/90 gap-2">
              Contact Us Today
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
