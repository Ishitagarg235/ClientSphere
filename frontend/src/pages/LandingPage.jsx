import Navbar from '../components/shared/Navbar';
import Hero from '../components/Landing/Hero';
import OurProjects from '../components/Landing/OurProjects';
import HappyClients from '../components/Landing/HappyClients';
import ContactForm from '../components/Landing/ContactForm';
import Newsletter from '../components/Landing/Newsletter';
import Footer from '../components/shared/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <OurProjects />
      <HappyClients />
      <ContactForm />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default LandingPage;