
import { ContactForm } from '@/components/shared/ContactForm';
import { MapEmbed } from '@/components/contact/MapEmbed';
import { Mail, Phone, MapPinIcon } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | PixelsFlow',
  description: 'Get in touch with PixelsFlow for your design and development needs.',
};

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text">Contact PixelsFlow</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          We're excited to hear about your project or answer any questions you may have. Reach out to us through the form below or using our contact details.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">Send us a Message</h2>
          <ContactForm />
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">Our Location & Details</h2>
          <div className="h-80 md:h-[450px] w-full rounded-xl overflow-hidden shadow-xl">
            <MapEmbed />
          </div>
          <div className="space-y-4 text-foreground/90">
            <div className="flex items-start">
              <MapPinIcon className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Address</h4>
                <p>Sector 36, Noida, Uttar Pradesh, India</p>
                <p> (Near City Center Metro)</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
              <a href="mailto:hello@pixelsflow.com" className="hover:text-primary">hello@pixelsflow.com</a>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
              <a href="tel:+911234567890" className="hover:text-primary">+91 123 456 7890</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
