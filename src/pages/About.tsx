import { Leaf, Target, Eye, Award, Users, TrendingUp, MapPin } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { MainLayout } from '@/components/layout/MainLayout';
import { companyInfo } from '@/lib/data';

export default function About() {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative py-20 md:py-28 hero-gradient text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-4 animate-fade-up">
            <h1 className="font-serif text-4xl md:text-5xl font-bold">About Us</h1>
            <p className="text-lg text-primary-foreground/80">
              Empowering farmers with quality agricultural solutions since {companyInfo.foundedYear}
            </p>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <Leaf className="h-4 w-4" />
                <span className="text-sm font-medium">Our Story</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                {companyInfo.name}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Established in 2017, Sagar Raj Green Agro Biotech Company has emerged as a
                  leading wholesaler and distributor of premium agricultural inputs in Madhya
                  Pradesh. Based in Indore, we serve farmers across the region with a
                  comprehensive range of fertilizers and growth promoters.
                </p>
                <p>
                  Our commitment to quality and sustainable agriculture has made us a trusted
                  partner for thousands of farmers. We believe in providing products that not
                  only enhance crop yields but also nurture the soil for future generations.
                </p>
                <p>
                  As a registered proprietorship with GST compliance since July 2017, we
                  maintain the highest standards of business ethics and transparency in all
                  our dealings.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
              {[
                { icon: Award, label: 'Years of Excellence', value: `${new Date().getFullYear() - 2017}+` },
                { icon: Users, label: 'Farmers Reached', value: companyInfo.stats.farmers },
                { icon: TrendingUp, label: 'Dealership Network', value: companyInfo.stats.dealers },
                { icon: MapPin, label: 'Location', value: 'Indore, MP' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-6 rounded-xl bg-card border border-border text-center hover-lift"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-serif text-2xl font-bold text-foreground">{item.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <SectionHeader
            title="Our Mission & Vision"
            subtitle="Guiding principles that drive everything we do"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-8 rounded-2xl bg-card border border-border hover-lift animate-fade-up">
              <div className="h-14 w-14 rounded-xl bg-primary flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower Indian farmers with access to high-quality, affordable agricultural
                inputs that enhance productivity while promoting sustainable farming practices.
                We strive to be the bridge between innovation and the fields, ensuring every
                farmer has the tools needed for success.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Provide quality products at fair prices',
                  'Offer expert guidance and support',
                  'Promote sustainable agriculture',
                  'Build lasting relationships with farmers',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Leaf className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div
              className="p-8 rounded-2xl bg-card border border-border hover-lift animate-fade-up"
              style={{ animationDelay: '100ms' }}
            >
              <div className="h-14 w-14 rounded-xl bg-wheat flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-forest" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become the most trusted name in agricultural inputs across Central India,
                recognized for our commitment to quality, innovation, and farmer welfare.
                We envision a future where every farm thrives through access to the best
                agricultural solutions.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Expand our reach across India',
                  'Introduce innovative bio-solutions',
                  'Support organic farming initiatives',
                  'Create a community of prosperous farmers',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Leaf className="h-4 w-4 text-wheat mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <SectionHeader
            title="Company Details"
            subtitle="Legal and business information"
          />

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="rounded-2xl bg-card border border-border overflow-hidden">
              <table className="w-full">
                <tbody className="divide-y divide-border">
                  {[
                    { label: 'Company Name', value: companyInfo.name },
                    { label: 'Nature of Business', value: companyInfo.natureOfBusiness },
                    { label: 'Legal Status', value: companyInfo.legalStatus },
                    { label: 'GST Registration Date', value: companyInfo.gstRegistrationDate },
                    { label: 'GST Number', value: companyInfo.gstNumber },
                    { label: 'Location', value: companyInfo.location },
                    { label: 'Full Address', value: companyInfo.address },
                  ].map((row) => (
                    <tr key={row.label}>
                      <td className="px-6 py-4 text-sm font-medium text-foreground bg-muted/30 w-1/3">
                        {row.label}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
