import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Calendar, Phone, ArrowRight } from 'lucide-react';

const Hero = ({   title,
  subtitle,
  showButtons = true,
  backgroundImage = '/assets/images/hero-welding.jpg',
  height = 'h-[80vh]',
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className={`relative ${height} flex items-center overflow-hidden`}>
      {/* Background Image with Overlay */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center 25%',
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3 }}
      >
        <motion.div 
          className="absolute inset-0 bg-black/70"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.5 }}
        />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-white">
        <motion.div 
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            variants={itemVariants}
          >
            {title || "Kamal Iron Works"}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-100 mb-10 leading-relaxed"
            variants={itemVariants}
          >
            {subtitle || "Premium Steel Fabrication & Custom Metalwork Solutions"}
          </motion.p>
          
          {showButtons && (
            <motion.div 
              className="flex flex-col sm:flex-row gap-5"
              variants={itemVariants}
            >
              <Button 
                variant="accent"
                size="xl"
                className="gap-3 font-medium"
                onClick={() => navigate('/appointments')}
              >                <Calendar className="h-5 w-5" />
                Schedule Consultation
              </Button>
              
              <Button 
                variant="outline" 
                size="xl"
                className="gap-3 border-white text-white hover:bg-white hover:text-black font-medium group"
                onClick={() => navigate('/contact')}
              >
                <Phone className="h-5 w-5" />
                Contact Us
                <motion.div
                  className="transition-all duration-300 opacity-0 group-hover:opacity-100"
                  initial={{ x: -5, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Button>
            </motion.div>
          )}
          
          {/* Animated line */}
          <motion.div
            className="mt-16 h-1 bg-primary w-0"
            animate={{ width: '100px' }}
            transition={{ delay: 1.2, duration: 1 }}
          />
        </motion.div>
      </div>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </section>
  );
};

export default Hero;
