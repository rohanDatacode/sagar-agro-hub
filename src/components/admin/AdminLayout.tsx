import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { useAuth } from '@/context/AuthContext';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/config/api';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        // Fetch contacts
        const resContacts = await fetch(`${API_URL}/contact`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Fetch orders
        const resOrders = await fetch(`${API_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        let newCount = 0;
        if (resContacts.ok) {
          const contacts = await resContacts.json();
          newCount += contacts.filter((c: any) => c.status === 'new').length;
        }
        if (resOrders.ok) {
          const orders = await resOrders.json();
          newCount += orders.filter((o: any) => o.paymentStatus === 'Pending' || o.deliveryStatus === 'Processing').length;
        }
        setNotificationCount(newCount);
      } catch (e) {
        console.error("Failed to fetch notifications");
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // poll every 30s
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AdminSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header for Notifications */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-end px-6 shrink-0">
          <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/admin/dashboard')}>
            <Bell className="h-5 w-5 text-muted-foreground" />
            {notificationCount > 0 && (
              <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-card" />
            )}
          </Button>
        </header>
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
