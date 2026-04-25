import { Link } from 'react-router-dom';
import { Package, Droplets, Sprout, Leaf, TrendingUp, PlusCircle, ArrowRight, MessageSquare, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useProducts } from '@/context/ProductContext';
import { categoryLabels } from '@/lib/data';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { API_URL } from '@/config/api';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { products } = useProducts();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) return;

      try {
        const res = await fetch(`${API_URL}/contact`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setContacts(data);
        }
      } catch (err) {
        console.error('Failed to fetch contacts', err);
        toast.error('Failed to load contact submissions');
      }
    };
    fetchContacts();
  }, []);

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
      label: 'New Messages',
      value: contacts.filter(c => c.status === 'new').length,
      icon: MessageSquare,
      color: 'bg-purple-100 text-purple-600',
      href: '#messages',
    },
    {
      label: 'Total Messages',
      value: contacts.length,
      icon: Mail,
      color: 'bg-amber-100 text-amber-600',
      href: '#messages',
    },
    {
      label: 'Pending Orders', // Placeholder
      value: 0,
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
      href: '#',
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
              Welcome back! Here's an overview of your store.
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

        {/* Recent Messages Section */}
        <div id="messages" className="p-6 rounded-xl bg-card border border-border animate-fade-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Recent Inquiries
            </h2>
          </div>
          <div className="overflow-x-auto">
            {contacts.length === 0 ? (
              <p className="text-muted-foreground py-4">No inquiries yet.</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Subject</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {contacts.slice(0, 5).map((contact) => (
                    <tr key={contact.id} className="hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-medium text-foreground">
                        {contact.name}
                        <div className="text-xs text-muted-foreground">{contact.email}</div>
                        {contact.phone && <div className="text-xs text-muted-foreground">{contact.phone}</div>}
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">
                        {contact.subject}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${contact.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                          {contact.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recent Products (Existing) */}
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
