import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, X, ChevronRight, ChevronLeft, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { imageZoom, modalContent, modalBackdrop } from '../../utils/animations';

const ProjectCard = ({ 
  id,
  slug,
  title, 
  description, 
  category,
  images,
  client,
  completionDate,
  technologies = [],
}) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const mainImage = images && images.length > 0 ? images[0] : null;
  
  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <motion.div 
        className="relative overflow-hidden rounded-lg bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5, boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)' }}
      >
        {/* Project Image with overlay */}
        <div 
          className="h-72 overflow-hidden cursor-pointer relative group"
          onClick={() => setShowModal(true)}
        >
          <motion.div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center z-10">
            <motion.div 
              className="bg-primary text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <Plus className="h-6 w-6" />
            </motion.div>
          </motion.div>
          <motion.img 
            src={mainImage} 
            alt={title} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7 }}
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent w-full h-1/3 z-0"></div>
        </div>

        {/* Category tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded">
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
            <Link to={`/portfolio/${slug || id}`}>
              {title}
            </Link>
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          
          <div className="flex justify-between items-center">
            <Link
              to={`/portfolio/${slug || id}`}
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              {t('portfolio.viewProject')} <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
            
            {client && (
              <span className="text-sm text-gray-500">
                {client}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Image Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={modalBackdrop}
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              className="relative max-w-5xl w-full bg-white rounded-lg overflow-hidden"
              variants={modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                className="absolute top-4 right-4 z-10 bg-black/50 text-white p-1 rounded-full backdrop-blur-sm"
                onClick={() => setShowModal(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
              
              {/* Image */}
              <div className="relative h-[70vh] bg-black">
                <img
                  src={images[currentImageIndex]}
                  alt={`${title} - ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />
                
                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <motion.button
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full backdrop-blur-sm"
                      onClick={handlePrevImage}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </motion.button>
                    <motion.button
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full backdrop-blur-sm"
                      onClick={handleNextImage}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </motion.button>
                  </>
                )}
                
                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>
              
              {/* Project details */}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {client && (
                    <div>
                      <h4 className="font-medium text-gray-900">{t('portfolio.client')}:</h4>
                      <p className="text-gray-600">{client}</p>
                    </div>
                  )}
                  
                  {completionDate && (
                    <div>
                      <h4 className="font-medium text-gray-900">{t('portfolio.completed')}:</h4>
                      <p className="text-gray-600">{completionDate}</p>
                    </div>
                  )}
                </div>
                
                {technologies.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">{t('portfolio.technologies')}:</h4>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Link
                    to={`/portfolio/${slug || id}`}
                    className="inline-flex items-center"
                  >
                    <Button>
                      {t('portfolio.viewFullProject')}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Project Grid Component
export const ProjectGrid = ({ projects = [], limit, className = "" }) => {
  const displayProjects = limit ? projects.slice(0, limit) : projects;
  const { t } = useTranslation();

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{t('portfolio.noProjects')}</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      <AnimatePresence>
        {displayProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProjectCard;
