import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube, 
  Clock,
  ArrowRight
} from 'lucide-react';

// Import logo from assets folder
import logoBW from '../../../images/kamal logo.png';
import { fadeIn, staggerContainer, staggerItem, scrollReveal } from '../../utils/animations';
import { WhatsAppButton } from './WhatsAppButton';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
      }
    }
  };

  const quickLinks = [
    { label: t('footer.about'), path: '/about' },
    { label: t('footer.services'), path: '/services' },
    { label: t('footer.portfolio'), path: '/portfolio' },
    { label: t('footer.blog'), path: '/blog' },
    { label: t('footer.contact'), path: '/contact' }
  ];

  const serviceLinks = [
    { label: t('footer.customFabrication'), path: '/services/custom-fabrication' },
    { label: t('footer.welding'), path: '/services/welding' },
    { label: t('footer.metalFurniture'), path: '/services/metal-furniture' },
    { label: t('footer.steelStructures'), path: '/services/steel-structures' },
    { label: t('footer.industrialSolutions'), path: '/services/industrial-solutions' }
  ];

  return (
    <motion.footer 
      className="bg-white text-black pt-16 pb-8 border-t border-gray-200 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Information */}
          <motion.div variants={itemVariants}>
            <Link to="/" className="flex items-center mb-6">
              <img 
                src={logoBW}
                alt="Kamal Iron Works" 
                className="h-16"
              />
            </Link>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('footer.companyDesc')}
            </p>
            <div className="flex space-x-5">
              <motion.a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 p-2 rounded-full text-gray-800 hover:bg-primary hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 p-2 rounded-full text-gray-800 hover:bg-primary hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 p-2 rounded-full text-gray-800 hover:bg-primary hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Youtube className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => {
                return (
                  <motion.li key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link 
                      to={link.path} 
                      className="text-gray-600 hover:text-primary transition-colors flex items-center"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6">{t('footer.services')}</h3>
            <ul className="space-y-4">
              {serviceLinks.map((link, index) => {
                return (
                  <motion.li key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link 
                      to={link.path} 
                      className="text-gray-600 hover:text-primary transition-colors flex items-center"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6">{t('footer.contactUs')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{t('footer.address')}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                <a href="tel:+94771234567" className="text-gray-600 hover:text-primary transition-colors">
                  +94 77 123 4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                <a href="mailto:info@kamaliron.com" className="text-gray-600 hover:text-primary transition-colors">
                  info@kamaliron.com
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-600">{t('footer.businessHours')}:</p>
                  <p className="text-gray-600">Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sat: 8:00 AM - 1:00 PM</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
        
        {/* Copyright Bar */}
        <motion.div 
          className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Kamal Iron Works. {t('footer.allRightsReserved')}
          </p>
          <div className="flex flex-wrap justify-center space-x-4 text-sm">
            <Link to="/terms" className="text-gray-500 hover:text-primary transition-colors">
              {t('footer.terms')}
            </Link>
            <Link to="/privacy" className="text-gray-500 hover:text-primary transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/sitemap" className="text-gray-500 hover:text-primary transition-colors">
              {t('footer.sitemap')}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </motion.footer>
  );
};

export default Footer;
