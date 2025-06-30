import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ProjectGrid } from '../components/common/ProjectCard';
import { Button } from '../components/ui/button';

// Import animations
import { staggerContainer, fadeIn } from '../utils/animations';

const Portfolio = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');

  // Sample projects data - would come from API in production
  const projects = [
    {
      id: 1,
      title: 'Modern Metal Gate Design',
      category: 'gates',
      images: ['/assets/images/projects/gate1.jpg'],
      description: 'Custom-designed modern metal gate for residential property.',
      client: 'Residential Client',
      completionDate: '2023-05-15',
    },
    {
      id: 2,
      title: 'Industrial Staircase Installation',
      category: 'staircases',
      images: ['/assets/images/projects/staircase1.jpg'],
      description: 'Spiral staircase installation for a commercial building.',
      client: 'Commercial Building',
      completionDate: '2023-04-22',
    },
    {
      id: 3,
      title: 'Security Window Grills',
      category: 'window-grills',
      images: ['/assets/images/projects/window-grill1.jpg'],
      description: 'Decorative yet secure window grills for a new villa.',
      client: 'Villa Owner',
      completionDate: '2023-06-10',
    },
    {
      id: 4,
      title: 'Custom Metal Furniture Set',
      category: 'furniture',
      images: ['/assets/images/projects/furniture1.jpg'],
      description: 'Custom-designed metal dining table and chairs set.',
      client: 'Restaurant Owner',
      completionDate: '2023-03-15',
    },
    {
      id: 5,
      title: 'Balcony Railing Installation',
      category: 'railings',
      images: ['/assets/images/projects/railing1.jpg'],
      description: 'Modern balcony railing installation for an apartment complex.',
      client: 'Apartment Developer',
      completionDate: '2023-07-05',
    },
    {
      id: 6,
      title: 'Factory Steel Structure',
      category: 'structures',
      images: ['/assets/images/projects/structure1.jpg'],
      description: 'Steel structure framework for a new factory building.',
      client: 'Manufacturing Company',
      completionDate: '2023-02-28',
    },
  ];

  const categories = [
    { id: 'all', name: t('portfolio.filters.all') },
    { id: 'gates', name: t('portfolio.filters.gates') },
    { id: 'staircases', name: t('portfolio.filters.staircases') },
    { id: 'window-grills', name: t('portfolio.filters.windowGrills') },
    { id: 'furniture', name: t('portfolio.filters.furniture') },
    { id: 'railings', name: t('portfolio.filters.railings') },
    { id: 'structures', name: t('portfolio.filters.structures') },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <>
      <Helmet>
        <title>{t('portfolio.pageTitle')} | Kamal Iron Works</title>
        <meta name="description" content={t('portfolio.pageDescription')} />
      </Helmet>

      {/* Portfolio Hero Section */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="bg-black text-white py-20"
      >
        <div className="container mx-auto px-4">
          <motion.h1 
            variants={fadeIn('up', 'tween', 0.1, 0.6)}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            {t('portfolio.title')}
          </motion.h1>
          <motion.p 
            variants={fadeIn('up', 'tween', 0.2, 0.6)}
            className="text-xl md:text-2xl max-w-2xl text-gray-300"
          >
            {t('portfolio.subtitle')}
          </motion.p>
        </div>
      </motion.div>

      {/* Portfolio Filter Tabs */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container mx-auto px-4 py-16"
      >
        <motion.div 
          variants={fadeIn('down', 'tween', 0.1, 0.6)}
          className="flex flex-wrap gap-3 mb-12 justify-center"
        >
          {categories.map((category, index) => (
            <motion.div 
              key={category.id}
              variants={fadeIn('up', 'tween', 0.1 + index * 0.05, 0.5)}
            >
              <Button
                onClick={() => setFilter(category.id)}
                variant={filter === category.id ? "default" : "outline"}
                className={`mb-2 ${filter === category.id ? 'bg-[#FF6A00] hover:bg-[#FF6A00]/90 text-white' : 'border-2 hover:bg-black hover:text-white'}`}
              >
                {category.name}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <ProjectGrid projects={filteredProjects} columns={3} />

        {/* Load More Button */}
        <motion.div 
          variants={fadeIn('up', 'tween', 0.5, 0.6)}
          className="flex justify-center mt-14"
        >
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-black hover:bg-black hover:text-white transition-all duration-300"
          >
            {t('portfolio.loadMore')}
          </Button>
        </motion.div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="bg-gradient-to-r from-black to-gray-900 text-white py-20 mt-16"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            variants={fadeIn('up', 'tween', 0.1, 0.6)}
            className="text-4xl font-bold mb-6"
          >
            {t('portfolio.cta.title')}
          </motion.h2>
          <motion.p 
            variants={fadeIn('up', 'tween', 0.2, 0.6)}
            className="text-xl max-w-2xl mx-auto mb-10 text-gray-300"
          >
            {t('portfolio.cta.description')}
          </motion.p>
          <motion.div variants={fadeIn('up', 'tween', 0.3, 0.6)}>
            <Link to="/contact">
              <Button 
                className="bg-[#FF6A00] hover:bg-[#FF6A00]/90 text-white px-8 py-6 text-lg"
              >
                {t('portfolio.cta.button')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Portfolio;
