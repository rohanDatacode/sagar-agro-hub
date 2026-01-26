import { Link } from 'react-router-dom';
import { Package, Droplets, Sprout, Leaf, TrendingUp, PlusCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useProducts } from '@/context/ProductContext';
import { categoryLabels } from '@/lib/data';

export default function AdminDashboard() {
  const { products } = useProducts();

  const categoryStats = {
    'water-soluble': products.filter((p) => p.category === 'water-soluble').length,
    'growth-promoter': products.filter((p) => p.category === 'growth-promoter').length,
    'bio-fertilizer': products.filter((p) => p.category === 'bio-fertilizer').length,
  };

  const totalValue = products.reduce((sum, p) => sum + p.price, 0);

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'bg-primary/10 text-primary',
      href: '/admin/products',
    },
    {
      label: categoryLabels['water-soluble'],
      value: categoryStats['water-soluble'],
      icon: Droplets,
      color: 'bg-blue-100 text-blue-600',
      href: '/admin/products?category=water-soluble',
    },
    {
      label: categoryLabels['growth-promoter'],
      value: categoryStats['growth-promoter'],
      icon: Sprout,
      color: 'bg-green-100 text-green-600',
      href: '/admin/products?category=growth-promoter',
    },
    {
      label: categoryLabels['bio-fertilizer'],
      value: categoryStats['bio-fertilizer'],
      icon: Leaf,
      color: 'bg-amber-100 text-amber-600',
      href: '/admin/products?category=bio-fertilizer',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's an overview of your products.
            </p>
          </div>
          <Link to="/admin/products/new">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Link
              key={stat.label}
              to={stat.href}
              className="group p-6 rounded-xl bg-card border border-border hover-lift animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`h-12 w-12 rounded-lg flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </Link>
          ))}
        </div>

        {/* Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-card border border-border animate-fade-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-wheat/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-wheat" />
              </div>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                Inventory Value
              </h2>
            </div>
            <p className="text-4xl font-bold text-foreground">
              ₹{totalValue.toLocaleString()}
            </p>
            <p className="text-muted-foreground mt-1">
              Total value of all products in catalog
            </p>
          </div>

          <div className="p-6 rounded-xl bg-primary text-primary-foreground animate-fade-up" style={{ animationDelay: '100ms' }}>
            <h2 className="font-serif text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-3">
              <Link to="/admin/products/new" className="block">
                <Button variant="secondary" className="w-full justify-start gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Add New Product
                </Button>
              </Link>
              <Link to="/admin/products" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  <Package className="h-4 w-4" />
                  Manage Products
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Products */}
        <div className="p-6 rounded-xl bg-card border border-border animate-fade-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Recent Products
            </h2>
            <Link to="/admin/products">
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.slice(0, 5).map((product) => (
                  <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">
                      <Link
                        to={`/admin/products/${product.id}/edit`}
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {product.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {categoryLabels[product.category]}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-foreground">
                      ₹{product.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
