import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, Sprout, Leaf, Package } from 'lucide-react';
import { Product, categoryLabels } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  className?: string;
}

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

export function ProductCard({ product, className }: ProductCardProps) {
  const Icon = categoryIcons[product.category as keyof typeof categoryIcons] || Package;
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div
      className={cn(
        'group relative bg-card rounded-xl border border-border overflow-hidden hover-lift',
        className
      )}
    >
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <Badge
          variant="outline"
          className={cn('gap-1.5', categoryColors[product.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-700 border-gray-200')}
        >
          <Icon className="h-3 w-3" />
          {categoryLabels[product.category as keyof typeof categoryLabels] || product.category}
        </Badge>
      </div>

      {/* Product Image Area */}
      <div className={cn(
        "h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative",
        product.status && product.status !== 'Available' && "grayscale opacity-70"
      )}>
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-10 w-10 text-primary" />
        </div>
        {product.status && product.status !== 'Available' && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px]">
            <Badge variant="destructive" className="text-sm font-semibold uppercase tracking-widest px-3 py-1 shadow-md">
              {product.status}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="font-semibold text-lg text-primary">
            {typeof product.price === 'number' ? `₹${product.price.toLocaleString()}` : product.price}
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleAddToCart} 
              title="Add to Cart"
              disabled={product.status && product.status !== 'Available'}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Link to={`/products/${product.id}`}>
              <Button variant="ghost" size="sm" className="gap-1 group/btn">
                Details
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
