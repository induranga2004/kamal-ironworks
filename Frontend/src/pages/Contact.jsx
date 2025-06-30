import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ContactForm from '../components/common/ContactForm';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

// Import animations
import { staggerContainer, fadeIn } from '../utils/animations';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <>      <Helmet>
        <title>Contact Us | Kamal Iron Works</title>
        <meta name="description" content="Get in touch with Kamal Iron Works for all your metal fabrication needs. Request a quote, schedule a consultation, or visit our workshop in Colombo." />
      </Helmet>

      {/* Contact Hero Section */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="bg-black text-white py-20"
      >
        <div className="container mx-auto px-4">          <motion.h1 
            variants={fadeIn('up', 'tween', 0.1, 0.6)}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Get In Touch With Us
          </motion.h1>
          <motion.p 
            variants={fadeIn('up', 'tween', 0.2, 0.6)}
            className="text-xl md:text-2xl max-w-2xl text-gray-300"
          >
            Have a project in mind? Contact us for a consultation or visit our workshop to discuss your custom metal fabrication needs.
          </motion.p>
        </div>
      </motion.div>

      {/* Contact Information and Form Section */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div 
            variants={fadeIn('right', 'tween', 0.1, 0.6)}
            className="space-y-10"
          >            <h2 className="text-4xl font-bold mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              <motion.div 
                variants={fadeIn('up', 'tween', 0.2, 0.5)}
                className="flex items-start"
              >
                <div className="bg-[#FF6A00] p-4 rounded-full mr-6">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Our Location</h3>
                  <p className="text-gray-700 text-lg">
                    45 Industrial Avenue,<br />
                    Ratmalana,<br />
                    Colombo 10250,<br />
                    Sri Lanka
                  </p>
                </div>
              </motion.div>

              <motion.div 
                variants={fadeIn('up', 'tween', 0.3, 0.5)}
                className="flex items-start"
              >
                <div className="bg-[#FF6A00] p-4 rounded-full mr-6">
                  <Phone className="h-6 w-6 text-white" />
                </div>                <div>
                  <h3 className="text-xl font-bold mb-3">Phone Numbers</h3>
                  <p className="text-gray-700 text-lg">
                    Main Office: +94 112 637 892<br />
                    Workshop: +94 112 638 145
                  </p>
                </div>
              </motion.div>

              <motion.div 
                variants={fadeIn('up', 'tween', 0.4, 0.5)}
                className="flex items-start"
              >
                <div className="bg-[#FF6A00] p-4 rounded-full mr-6">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Email Us</h3>
                  <p className="text-gray-700 text-lg">
                    inquiries@kamalironworks.com<br />
                    projects@kamalironworks.com
                  </p>
                </div>
              </motion.div>

              <motion.div 
                variants={fadeIn('up', 'tween', 0.5, 0.5)}
                className="flex items-start"
              >
                <div className="bg-[#FF6A00] p-4 rounded-full mr-6">
                  <Clock className="h-6 w-6 text-white" />
                </div>                <div>
                  <h3 className="text-xl font-bold mb-3">Business Hours</h3>
                  <p className="text-gray-700 text-lg">
                    Monday to Friday: 8:00 AM - 5:30 PM<br />
                    Saturday: 9:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Social Media Links */}
            <motion.div variants={fadeIn('up', 'tween', 0.6, 0.5)}>
              <h3 className="text-2xl font-bold mb-6">Follow Our Work</h3>
              <div className="flex space-x-6">
                <a href="#" className="bg-black text-white p-4 rounded-full hover:bg-[#FF6A00] transition-colors duration-300">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="bg-black text-white p-4 rounded-full hover:bg-[#FF6A00] transition-colors duration-300">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="bg-black text-white p-4 rounded-full hover:bg-[#FF6A00] transition-colors duration-300">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="bg-black text-white p-4 rounded-full hover:bg-[#FF6A00] transition-colors duration-300">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeIn('left', 'tween', 0.1, 0.6)}>
            <h2 className="text-4xl font-bold mb-8">{t('contact.sendMessage')}</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#FF6A00]">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Map Section */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="w-full h-96 mt-10"
      >
        <motion.div 
          variants={fadeIn('up', 'tween', 0.1, 0.6)}
          className="w-full h-full"
        >
          {/* Replace with actual Google Map integration */}
          <div className="w-full h-full bg-black flex items-center justify-center">
            <p className="text-2xl font-medium text-white">{t('contact.mapPlaceholder')}</p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Contact;
