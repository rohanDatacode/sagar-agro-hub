import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShieldCheck, ArrowRight } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { API_URL } from '@/config/api';

export default function Checkout() {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        ...formData,
        items: cart.map(item => ({ productId: item.id, quantity: item.quantity }))
      };

      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to place order');
      }

      clearCart();
      setIsSuccess(true);
      toast.success('Order placed successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Server error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <MainLayout>
        <div className="container py-24 text-center max-w-lg mx-auto">
          <div className="mx-auto w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for shopping with Sagar Raj Green. Your order has been placed and is currently being processed. You will be contacted shortly for delivery.
          </p>
          <Button onClick={() => navigate('/')} size="lg">Return to Home</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Order Summary */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-muted/30 border border-border rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold mb-6 flex items-center justify-between">
                Order Summary
                <span className="text-sm font-normal text-muted-foreground">{cart.length} Items</span>
              </h2>

              {cart.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Your cart is empty.
                  <Button variant="link" onClick={() => navigate('/products')} className="block mx-auto mt-2">
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-border/50 pb-4 last:border-0">
                      <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center shrink-0">
                        <span className="text-xs text-muted-foreground">{item.category}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">₹{item.price}</p>
                        
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-border rounded-md">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-0.5 hover:bg-muted text-sm">-</button>
                            <span className="px-2 text-xs font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-0.5 hover:bg-muted text-sm">+</button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-destructive hover:opacity-80">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right font-medium">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Payment Method: <strong>Cash on Delivery</strong>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Form */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Full Name</Label>
                    <Input id="customerName" name="customerName" value={formData.customerName} onChange={handleInputChange} required placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">Phone Number</Label>
                    <Input id="customerPhone" name="customerPhone" value={formData.customerPhone} onChange={handleInputChange} required placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <Label htmlFor="customerEmail">Email Address</Label>
                  <Input type="email" id="customerEmail" name="customerEmail" value={formData.customerEmail} onChange={handleInputChange} required placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shippingAddress">Delivery Address</Label>
                  <Textarea id="shippingAddress" name="shippingAddress" value={formData.shippingAddress} onChange={handleInputChange} required placeholder="Full address including ZIP code..." className="min-h-[120px]" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={isSubmitting || cart.length === 0} className="w-full md:w-auto px-8">
                  {isSubmitting ? 'Processing...' : 'Place Order (COD)'}
                  {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
