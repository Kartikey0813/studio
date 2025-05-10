
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { AboutUsSection } from '@/components/home/AboutUsSection';
import { ContactForm } from '@/components/shared/ContactForm';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <AboutUsSection />
      <section id="contact-home" className="bg-card/50">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">Get In Touch</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or just want to say hi? We'd love to hear from you.
            </p>
          </div>
          <ContactForm showAnimatedGraphic={true} />
        </div>
      </section>
      <TestimonialsSection />
    </>
  );
}
