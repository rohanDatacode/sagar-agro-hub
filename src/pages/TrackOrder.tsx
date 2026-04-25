import { useState } from 'react';
import { Search, Package, Truck, CheckCircle2, RotateCcw } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { API_URL } from '@/config/api';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !email) {
      toast.error('Please enter both Order ID and Email');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/orders/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, email })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to track order');
      }

      const data = await res.json();
      setOrderDetails(data);
      toast.success('Order details found');
    } catch (err: any) {
      toast.error(err.message || 'Server error occurred');
      setOrderDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing': return <Package className="w-6 h-6 text-blue-500" />;
      case 'Shipped': return <Truck className="w-6 h-6 text-amber-500" />;
      case 'Delivered': return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'Cancelled': return <RotateCcw className="w-6 h-6 text-red-500" />;
      default: return <Package className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-amber-100 text-amber-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="container py-12 max-w-4xl min-h-[60vh]">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Track Your Order</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Instantly view the status of your shipment and the estimated delivery date below.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="space-y-2 flex-1 w-full">
              <Label htmlFor="orderId">Order ID</Label>
              <Input 
                id="orderId" 
                placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 flex-1 w-full">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email"
                placeholder="The email used during checkout" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full md:w-auto px-8 gap-2" disabled={loading}>
              <Search className="w-4 h-4" />
              {loading ? 'Searching...' : 'Track'}
            </Button>
          </form>
        </div>

        {orderDetails && (
          <div className="mt-8 bg-card border border-border rounded-xl overflow-hidden shadow-sm animate-fade-up">
            
            {/* Status Header */}
            <div className={`p-6 md:p-8 flex items-center gap-6 border-b border-border bg-slate-50/50`}>
              <div className="p-4 bg-white rounded-full shadow-sm">
                {getStatusIcon(orderDetails.deliveryStatus)}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  Status: <span className={`px-3 py-1 text-sm font-semibold rounded-full uppercase tracking-wider ${getStatusColor(orderDetails.deliveryStatus)}`}>
                    {orderDetails.deliveryStatus}
                  </span>
                </h2>
                <p className="text-muted-foreground text-sm">
                  {orderDetails.estimatedDeliveryDate ? (
                    <>Estimated Delivery: <strong>{new Date(orderDetails.estimatedDeliveryDate).toLocaleDateString()}</strong></>
                  ) : (
                    'Waiting for delivery estimate...'
                  )}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
              <div>
                <h3 className="font-semibold mb-4 text-foreground border-b border-border pb-2">Order Information</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><strong className="text-foreground">Order ID:</strong> {orderDetails.id}</p>
                  <p><strong className="text-foreground">Placed On:</strong> {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
                  <p><strong className="text-foreground">Payment:</strong> {orderDetails.paymentMethod} ({orderDetails.paymentStatus})</p>
                  <div className="pt-2">
                    <strong className="text-foreground block mb-1">Shipping Address:</strong> 
                    <div className="bg-muted p-3 rounded-md mt-1 font-mono text-xs">
                      {orderDetails.shippingAddress}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-foreground border-b border-border pb-2">Purchased Items</h3>
                <div className="space-y-4">
                  {orderDetails.items?.map((item: any) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded items-center justify-center flex text-primary font-bold">
                        {item.quantity}x
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.Product?.name || 'Unknown Item'}</p>
                        <p className="text-muted-foreground text-xs">{item.Product?.category || 'General'}</p>
                        <p className="text-sm font-semibold mt-1">₹{item.priceAtPurchase}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-6 border-t border-border pt-4 flex justify-between items-center text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-primary">₹{orderDetails.totalAmount?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </MainLayout>
  );
}
