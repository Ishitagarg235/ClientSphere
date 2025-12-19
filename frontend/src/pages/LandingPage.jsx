import Navbar from '../components/shared/Navbar';
import Hero from '../components/Landing/Hero';
import OurProjects from '../components/Landing/OurProjects';
import HappyClients from '../components/Landing/HappyClients';
import ContactForm from '../components/Landing/ContactForm';
import Newsletter from '../components/Landing/Newsletter';
import Footer from '../components/shared/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main>
        <Hero />
      </main>

      {/* Our Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <OurProjects />
        </div>
      </section>

      {/* Happy Clients */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <HappyClients />
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <ContactForm />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <Newsletter />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
