import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Hero from '../components/common/Hero';
import { ServiceGrid } from '../components/common/ServiceCard';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

// Import animations
import { staggerContainer, fadeIn } from '../utils/animations';

// Import icons
import { 
  Hammer, 
  Sparkles, 
  Sofa, 
  Wrench, 
  Factory, 
  Shrub,
  Ruler,
  ToyBrick,
  GanttChart,
  Truck,
  Scissors
} from 'lucide-react';

const Services = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  
  // All services with their respective categories
  const allServices = [    {
      id: 'custom-fabrication',
      title: 'Custom Metal Fabrication',
      description: 'Tailored metal products designed and fabricated to your exact specifications.',
      fullDescription: 'Our custom fabrication service transforms your ideas into reality with precision engineering and skilled craftsmanship. From architectural features to industrial components, we work with a wide range of metals including steel, aluminum, stainless steel, and copper to create durable, functional, and aesthetically pleasing solutions.',
      icon: Hammer,
      imageUrl: '/assets/images/services/custom-fabrication.jpg',
      category: 'fabrication',
      features: [
        'Concept development and technical drawings',
        'Material selection consultation',
        'Precise cutting, forming, and assembly',
      ],
    },
    {
      id: 'welding',
      title: 'Professional Welding Services',
      description: 'Expert welding for both structural and decorative projects using various techniques.',
      fullDescription: 'Our team of certified welders delivers high-quality joints for everything from structural supports to intricate decorative elements. We utilize MIG, TIG, stick, and flux-cored welding processes, selecting the best method for your specific project requirements and metal types.',
      icon: Sparkles,
      imageUrl: '/assets/images/services/welding.jpg',
      category: 'fabrication',
      features: [
        'MIG, TIG, stick, and flux-cored welding',
        'Aluminum, stainless steel, and carbon steel welding',
        'On-site welding capabilities for larger structures',
      ],
    },    {
      id: 'metal-furniture',
      title: 'Designer Metal Furniture',
      description: 'Custom-designed furniture that combines durability with modern aesthetics.',
      fullDescription: 'Our metal furniture line blends artistry with functionality, creating statement pieces that stand the test of time. From industrial-style dining tables to sleek modern shelving units, we design and fabricate custom furniture that reflects your personal style while offering unmatched durability.',
      icon: Sofa,
      imageUrl: '/assets/images/services/metal-furniture.jpg',
      category: 'furniture',
      features: [
        'Custom tables, chairs, shelving, and decorative elements',
        'Mixed material designs incorporating wood, glass, or stone',
        'Finish options including powder coating, patination, and paint',
      ],
    },
    {
      id: 'repairs',
      title: 'Metal Repair & Restoration',
      description: 'Expert repair services for metal structures, equipment, and decorative pieces.',
      fullDescription: 'Our repair and restoration service breathes new life into damaged or worn metal items. Whether it\'s fixing structural issues, restoring historic metalwork, or repairing equipment components, our skilled technicians combine traditional techniques with modern technology to deliver lasting solutions.',
      icon: Wrench,
      imageUrl: '/assets/images/services/repairs.jpg',
      category: 'maintenance',
      features: [
        'Welding repairs for cracks, breaks, and structural damage',
        'Restoration of antique metal fixtures and furniture',
        'On-site repair capabilities for large or immovable items',
      ],
    },
    {
      id: 'structural-work',
      title: t('services.structuralWork'),
      description: t('services.structuralWorkDesc'),
      fullDescription: t('services.structuralWorkFull'),
      icon: Factory,
      imageUrl: '/assets/images/services/structural-work.jpg',
      category: 'construction',
      features: [
        t('services.structuralWorkFeature1'),
        t('services.structuralWorkFeature2'),
        t('services.structuralWorkFeature3'),
      ],
    },
    {
      id: 'landscaping-elements',
      title: t('services.landscapingElements'),
      description: t('services.landscapingElementsDesc'),
      fullDescription: t('services.landscapingElementsFull'),
      icon: Shrub,
      imageUrl: '/assets/images/services/landscaping-elements.jpg',
      category: 'outdoor',
      features: [
        t('services.landscapingElementsFeature1'),
        t('services.landscapingElementsFeature2'),
        t('services.landscapingElementsFeature3'),
      ],
    },
    {
      id: 'custom-gates',
      title: t('services.customGates'),
      description: t('services.customGatesDesc'),
      fullDescription: t('services.customGatesFull'),
      icon: GanttChart,
      imageUrl: '/assets/images/services/custom-gates.jpg',
      category: 'outdoor',
      features: [
        t('services.customGatesFeature1'),
        t('services.customGatesFeature2'),
        t('services.customGatesFeature3'),
      ],
    },
    {
      id: 'metal-art',
      title: t('services.metalArt'),
      description: t('services.metalArtDesc'),
      fullDescription: t('services.metalArtFull'),
      icon: Scissors,
      imageUrl: '/assets/images/services/metal-art.jpg',
      category: 'artistic',
      features: [
        t('services.metalArtFeature1'),
        t('services.metalArtFeature2'),
        t('services.metalArtFeature3'),
      ],
    },
    {
      id: 'architectural-elements',
      title: t('services.architecturalElements'),
      description: t('services.architecturalElementsDesc'),
      fullDescription: t('services.architecturalElementsFull'),
      icon: Ruler,
      imageUrl: '/assets/images/services/architectural-elements.jpg',
      category: 'construction',
      features: [
        t('services.architecturalElementsFeature1'),
        t('services.architecturalElementsFeature2'),
        t('services.architecturalElementsFeature3'),
      ],
    },
  ];
  
  // Categories
  const categories = [
    { id: 'all', name: t('services.allCategories') },
    { id: 'fabrication', name: t('services.fabrication') },
    { id: 'furniture', name: t('services.furniture') },
    { id: 'construction', name: t('services.construction') },
    { id: 'maintenance', name: t('services.maintenance') },
    { id: 'outdoor', name: t('services.outdoor') },
    { id: 'artistic', name: t('services.artistic') },
  ];
  
  // Filter services based on active filter
  const filteredServices = activeFilter === 'all' 
    ? allServices 
    : allServices.filter(service => service.category === activeFilter);
  
  return (
    <>      <Helmet>
        <title>Metal Fabrication Services | Kamal Iron Works</title>
        <meta name="description" content="Explore Kamal Iron Works' comprehensive metal fabrication services, including custom steel solutions, professional welding, metal furniture design, and structural metalwork." />
      </Helmet>{/* Hero Section */}
      <Hero 
        title="Our Metal Fabrication Services"
        subtitle="Precision Engineering & Quality Craftsmanship for All Your Steel Needs"
        showButtons={false}
        backgroundImage="/assets/images/services-hero.jpg"
        height="h-[400px]"
      />
      
      {/* Services Section */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeIn('up', 'tween', 0.1, 0.6)}
            className="text-center mb-14"
          >
            <h1 className="text-4xl font-bold mb-5">{t('services.ourServices')}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t('services.servicesDescription')}
            </p>
          </motion.div>
          
          {/* Category Filters */}
          <motion.div 
            variants={fadeIn('up', 'tween', 0.2, 0.6)}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category, index) => (
              <motion.div 
                key={category.id}
                variants={fadeIn('up', 'tween', 0.2 + index * 0.05, 0.5)}
              >
                <Button
                  variant={activeFilter === category.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(category.id)}
                  className={`mb-2 ${activeFilter === category.id ? 'bg-[#FF6A00] hover:bg-[#FF6A00]/90 text-white' : 'border-2 hover:bg-black hover:text-white'}`}
                >
                  {category.name}
                </Button>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Services Grid */}
          <ServiceGrid services={filteredServices} />
        </div>
      </motion.section>
      
      {/* Process Section */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="py-20 bg-black text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeIn('up', 'tween', 0.1, 0.6)}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-5">{t('services.ourProcess')}</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              {t('services.processDescription')}
            </p>
          </motion.div>
          
          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <motion.div 
              variants={fadeIn('up', 'tween', 0.2, 0.6)}
              className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#FF6A00] text-black hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#FF6A00] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">{t('services.processStep1Title')}</h3>
              <p className="text-gray-700 text-center">
                {t('services.processStep1Desc')}
              </p>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div 
              variants={fadeIn('up', 'tween', 0.3, 0.6)}
              className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#FF6A00] text-black hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#FF6A00] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">{t('services.processStep2Title')}</h3>
              <p className="text-gray-700 text-center">
                {t('services.processStep2Desc')}
              </p>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div 
              variants={fadeIn('up', 'tween', 0.4, 0.6)}
              className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#FF6A00] text-black hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#FF6A00] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">{t('services.processStep3Title')}</h3>
              <p className="text-gray-700 text-center">
                {t('services.processStep3Desc')}
              </p>
            </motion.div>
            
            {/* Step 4 */}
            <motion.div 
              variants={fadeIn('up', 'tween', 0.5, 0.6)}
              className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#FF6A00] text-black hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#FF6A00] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                4
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">{t('services.processStep4Title')}</h3>
              <p className="text-gray-700 text-center">
                {t('services.processStep4Desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Materials Section */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeIn('right', 'tween', 0.1, 0.6)}>
              <h2 className="text-4xl font-bold mb-6">{t('services.qualityMaterials')}</h2>
              <p className="text-gray-600 mb-6 text-lg">
                {t('services.materialsDesc1')}
              </p>
              <p className="text-gray-600 mb-8 text-lg">
                {t('services.materialsDesc2')}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  variants={fadeIn('up', 'tween', 0.3, 0.5)}
                  className="flex items-center"
                >
                  <div className="mr-4 text-[#FF6A00]">
                    <ToyBrick className="h-8 w-8" />
                  </div>
                  <span className="font-medium">{t('services.material1')}</span>
                </motion.div>
                <motion.div 
                  variants={fadeIn('up', 'tween', 0.4, 0.5)}
                  className="flex items-center"
                >
                  <div className="mr-4 text-[#FF6A00]">
                    <ToyBrick className="h-8 w-8" />
                  </div>
                  <span className="font-medium">{t('services.material2')}</span>
                </motion.div>
                <motion.div 
                  variants={fadeIn('up', 'tween', 0.5, 0.5)}
                  className="flex items-center"
                >
                  <div className="mr-4 text-[#FF6A00]">
                    <ToyBrick className="h-8 w-8" />
                  </div>
                  <span className="font-medium">{t('services.material3')}</span>
                </motion.div>
                <motion.div 
                  variants={fadeIn('up', 'tween', 0.6, 0.5)}
                  className="flex items-center"
                >
                  <div className="mr-4 text-[#FF6A00]">
                    <ToyBrick className="h-8 w-8" />
                  </div>
                  <span className="font-medium">{t('services.material4')}</span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              variants={fadeIn('left', 'tween', 0.3, 0.6)}
              className="grid grid-cols-2 gap-4"
            >
              <img 
                src="/assets/images/materials/material-1.jpg" 
                alt="Steel material" 
                className="rounded-lg h-48 w-full object-cover shadow-lg transform transition-transform hover:scale-105 duration-300"
              />
              <img 
                src="/assets/images/materials/material-2.jpg" 
                alt="Aluminum material" 
                className="rounded-lg h-48 w-full object-cover shadow-lg transform transition-transform hover:scale-105 duration-300"
              />
              <img 
                src="/assets/images/materials/material-3.jpg" 
                alt="Stainless steel material" 
                className="rounded-lg h-48 w-full object-cover shadow-lg transform transition-transform hover:scale-105 duration-300"
              />
              <img 
                src="/assets/images/materials/material-4.jpg" 
                alt="Corten steel material" 
                className="rounded-lg h-48 w-full object-cover shadow-lg transform transition-transform hover:scale-105 duration-300"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* CTA Section */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="py-16 bg-gradient-to-r from-black to-gray-900 text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeIn('up', 'tween', 0.1, 0.6)}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">{t('services.readyToDiscuss')}</h2>
            <p className="text-gray-300 mb-10 text-lg leading-relaxed">
              {t('services.ctaDescription')}
            </p>
            <motion.div 
              variants={fadeIn('up', 'tween', 0.3, 0.6)}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
              <Link to="/contact">
                <Button size="lg" className="bg-[#FF6A00] hover:bg-[#FF6A00]/90 text-white px-8 py-6 text-lg">
                  {t('services.getInTouch')}
                </Button>
              </Link>
              <Link to="/appointments">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  {t('services.bookAppointment')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default Services;
