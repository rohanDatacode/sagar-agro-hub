import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Droplets, Sprout, Leaf, CheckCircle, Package, Beaker, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MainLayout } from '@/components/layout/MainLayout';
import { useProducts } from '@/context/ProductContext';
import { categoryLabels, Product } from '@/lib/data';
import { cn } from '@/lib/utils';

const categoryIcons = {
  'water-soluble': Droplets,
  'growth-promoter': Sprout,
  'bio-fertilizer': Leaf,
};

const categoryColors = {
  'water-soluble': 'bg-blue-100 text-blue-700 border-blue-200',
  'growth-promoter': 'bg-green-100 text-green-700 border-green-200',
  'bio-fertilizer': 'bg-amber-100 text-amber-700 border-amber-200',
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct, products } = useProducts();

  const product = id ? getProduct(id) : undefined;

  if (!product) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/products">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const Icon = categoryIcons[product.category];
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
              Products
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="animate-fade-up">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border border-border">
                <div className="h-40 w-40 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-20 w-20 text-primary" />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
              <div>
                <Badge
                  variant="outline"
                  className={cn('gap-1.5 mb-4', categoryColors[product.category])}
                >
                  <Icon className="h-3 w-3" />
                  {categoryLabels[product.category]}
                </Badge>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  {product.name}
                </h1>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-muted-foreground">per unit</span>
              </div>

              {/* Usage */}
              <div className="p-6 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Beaker className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">How to Use</h3>
                </div>
                <p className="text-muted-foreground">{product.usage}</p>
              </div>

              {/* Benefits */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-wheat/20 flex items-center justify-center">
                    <Star className="h-5 w-5 text-wheat" />
                  </div>
                  <h3 className="font-semibold text-foreground">Key Benefits</h3>
                </div>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="flex-1 gap-2">
                  <Package className="h-4 w-4" />
                  Contact for Order
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const RelatedIcon = categoryIcons[relatedProduct.category];
                return (
                  <Link
                    key={relatedProduct.id}
                    to={`/products/${relatedProduct.id}`}
                    className="group p-6 rounded-xl bg-card border border-border hover-lift"
                  >
                    <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <RelatedIcon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {relatedProduct.description}
                    </p>
                    <p className="font-semibold text-primary mt-3">
                      ₹{relatedProduct.price.toLocaleString()}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
}
