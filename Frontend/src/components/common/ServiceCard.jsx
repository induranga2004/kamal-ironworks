import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { cardHover } from '../../utils/animations';

const ServiceCard = ({ 
  id,
  title, 
  description, 
  icon: Icon, 
  imageUrl,
  linkTo
}) => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="flex flex-col h-full overflow-hidden rounded-lg bg-white border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -5, boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)' }}
    >
      {/* Image at the top if available */}
      {imageUrl && (
        <div className="h-56 w-full overflow-hidden">
          <motion.img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}

      <div className="p-8 flex-grow flex flex-col">
        {/* Icon with background */}
        {Icon && (
          <motion.div 
            className="mb-6 text-primary bg-gray-50 w-14 h-14 rounded-lg flex items-center justify-center"
            whileHover={{ rotate: 5, scale: 1.05 }}
          >
            <Icon className="h-7 w-7" />
          </motion.div>
        )}

        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{description}</p>

        <Link
          to={linkTo || `/services/${id}`}
          className="group inline-flex items-center font-medium text-black hover:text-primary transition-colors mt-auto"
        >
          <span className="mr-2">{t('services.learnMore')}</span>
          <motion.div
            className="bg-primary text-white p-2 rounded-full"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

// A grid of service cards
export const ServiceGrid = ({ services }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          {...service}
        />
      ))}
    </div>
  );
};

export default ServiceCard;
