import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SectionHeader } from '@/components/ui/section-header';
import { MainLayout } from '@/components/layout/MainLayout';
import { companyInfo } from '@/lib/data';
import { toast } from 'sonner';
import { API_URL } from '@/config/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!', {
          description: 'We will get back to you within 24 hours.',
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message', {
        description: 'Please try again later.',
      });
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    {
      icon: MapPin,
      label: 'Address',
      value: companyInfo.address,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: companyInfo.phone,
    },
    {
      icon: Mail,
      label: 'Email',
      value: companyInfo.email,
    },
    {
      icon: Clock,
      label: 'Business Hours',
      value: 'Mon - Sat: 9:00 AM - 6:00 PM',
    },
  ];

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative py-16 md:py-24 hero-gradient text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-4 animate-fade-up">
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Contact Us</h1>
            <p className="text-lg text-primary-foreground/80">
              Get in touch with our team for inquiries, orders, or support
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-up">
              <div className="p-8 rounded-2xl bg-card border border-border">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 12345 67890"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground">
                  We're here to help you with all your agricultural needs. Reach out to
                  us through any of the following channels.
                </p>
              </div>

              <div className="space-y-4">
                {contactDetails.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border"
                  >
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Why Choose Us */}
              <div className="p-6 rounded-xl bg-primary text-primary-foreground">
                <h3 className="font-serif text-xl font-semibold mb-4">Why Contact Us?</h3>
                <ul className="space-y-3">
                  {[
                    'Expert product recommendations',
                    'Bulk order inquiries',
                    'Technical support',
                    'Dealer partnership opportunities',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-wheat shrink-0" />
                      <span className="text-primary-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
