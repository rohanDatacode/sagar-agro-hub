import { useState, useEffect } from 'react';
import { Package, Truck, Check, X } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { API_URL } from '@/config/api';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (res.ok) {
        setOrders(await res.json());
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, deliveryStatus: string) => {
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ deliveryStatus })
      });

      if (res.ok) {
        fetchOrders();
        toast.success(`Order marked as ${deliveryStatus}`);
      }
    } catch (err) {
      toast.error('Status update failed');
    }
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: string) => {
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ paymentStatus })
      });

      if (res.ok) {
        fetchOrders();
        toast.success(`Payment marked as ${paymentStatus}`);
      }
    } catch (err) {
      toast.error('Payment status update failed');
    }
  };

  if (loading) return <AdminLayout><div className="p-8">Loading orders...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Order Management</h1>
          <p className="text-muted-foreground mt-1">Review and process customer orders</p>
        </div>
      </div>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground">
            No orders found.
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              {/* Order Header */}
              <div className="bg-muted/50 p-4 border-b border-border flex flex-wrap justify-between items-center gap-4">
                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-1">ID: {order.id}</div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-foreground">{order.customerName}</h3>
                    <Badge variant={order.deliveryStatus === 'Delivered' ? 'default' : 'secondary'}>
                      {order.deliveryStatus}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Total: ₹{order.totalAmount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-6 grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-semibold mb-3 border-b border-border pb-2">Customer Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Email:</span> {order.customerEmail}</p>
                    <p><span className="text-muted-foreground">Phone:</span> {order.customerPhone}</p>
                    <p><span className="text-muted-foreground">Address:</span> {order.shippingAddress}</p>
                    <p className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                      Payment: {order.paymentMethod} ({order.paymentStatus})
                      {order.paymentStatus === 'Pending' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-6 text-[10px] px-2 ml-2" 
                          onClick={() => updatePaymentStatus(order.id, 'Paid')}
                        >
                          Mark Paid
                        </Button>
                      )}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-3 border-b border-border pb-2">Order Items</h4>
                  <div className="space-y-3">
                    {order.items?.map((item: any) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.quantity}x</span>
                          <span className="text-muted-foreground">{item.Product?.name || 'Unknown Product'}</span>
                        </div>
                        <span>₹{item.priceAtPurchase * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-border flex gap-2">
                    {order.deliveryStatus === 'Processing' && (
                      <Button size="sm" onClick={() => updateStatus(order.id, 'Shipped')} className="gap-1 flex-1">
                        <Truck className="w-4 h-4" /> Mark as Shipped
                      </Button>
                    )}
                    {order.deliveryStatus === 'Shipped' && (
                      <Button size="sm" onClick={() => updateStatus(order.id, 'Delivered')} className="gap-1 flex-1 bg-green-600 hover:bg-green-700 text-white">
                        <Check className="w-4 h-4" /> Mark as Delivered
                      </Button>
                    )}
                    {['Processing', 'Shipped'].includes(order.deliveryStatus) && (
                      <Button variant="destructive" size="sm" onClick={() => updateStatus(order.id, 'Cancelled')} className="gap-1 flex-1">
                        <X className="w-4 h-4" /> Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
