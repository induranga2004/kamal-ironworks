import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Hero from '../components/common/Hero';
import { ServiceGrid } from '../components/common/ServiceCard';
import { TeamGrid } from '../components/common/TeamCard';
import { ProjectGrid } from '../components/common/ProjectCard';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

// Import icons
import { 
  Hammer, 
  Sparkles, 
  Sofa, 
  Wrench, 
  Factory, 
  Shrub 
} from 'lucide-react';

// Import animations
import { staggerContainer, fadeIn } from '../utils/animations';

const HomePage = () => {
  const { t } = useTranslation();
  
  // Sample featured services
  const featuredServices = [    {
      id: 'custom-fabrication',
      title: 'Custom Metal Fabrication',
      description: 'Tailored metal solutions designed to your exact specifications, from architectural elements to industrial components.',
      icon: Hammer,
      imageUrl: '/assets/images/custom-fabrication.jpg',
    },
    {
      id: 'welding',
      title: 'Professional Welding',
      description: 'Expert welding services using MIG, TIG, and stick welding techniques for both structural and decorative projects.',
      icon: Sparkles,
      imageUrl: '/assets/images/welding.jpg',
    },
    {
      id: 'metal-furniture',
      title: 'Designer Metal Furniture',
      description: 'Custom-designed metal furniture that combines durability with modern aesthetics for residential and commercial spaces.',
      icon: Sofa,
      imageUrl: '/assets/images/metal-furniture.jpg',
    },
  ];
  
  // Sample team members
  const teamMembers = [
    {      id: 1,
      name: 'Chaminda Perera',
      position: 'Founder & CEO',
      image: '/assets/images/team/founder.jpg',
      socialLinks: {
        linkedin: 'https://linkedin.com',
      }
    },
    {
      id: 2,
      name: 'Roshan Silva',
      position: 'Senior Metal Fabricator',
      image: '/assets/images/team/fabricator.jpg',
    },
    {
      id: 3,
      name: 'Priyanka Jayawardene',
      position: 'Office Manager',
      image: '/assets/images/team/manager.jpg',
    },
    {
      id: 4,
      name: 'Nuwan Dissanayake',
      position: 'Head Welder',
      image: '/assets/images/team/welder.jpg',
    },
  ];
  
  // Sample featured projects
  const featuredProjects = [
    {
      id: 'commercial-railing',
      title: t('projects.commercialRailing'),
      description: t('projects.commercialRailingDesc'),
      category: t('projects.commercial'),
      images: ['/assets/images/projects/railing1.jpg', '/assets/images/projects/railing2.jpg'],
      client: 'Cinnamon Grand Hotel',
      completionDate: '2025-04-15',
    },
    {
      id: 'custom-gate',
      title: t('projects.customGate'),
      description: t('projects.customGateDesc'),
      category: t('projects.residential'),
      images: ['/assets/images/projects/gate1.jpg', '/assets/images/projects/gate2.jpg'],
      client: 'Private Residence',
      completionDate: '2025-05-20',
    },
    {
      id: 'garden-sculpture',
      title: t('projects.gardenSculpture'),
      description: t('projects.gardenSculptureDesc'),
      category: t('projects.artistic'),
      images: ['/assets/images/projects/sculpture1.jpg'],
      client: 'Colombo City Park',
      completionDate: '2025-03-10',
    },
  ];
  
  // Testimonials
  const testimonials = [
    {
      id: 1,      name: 'Asanka Fernando',
      role: 'Property Developer',
      content: 'Kamal Iron Works delivered exceptional quality on our custom stair railings and balcony features. Their attention to detail and craftsmanship exceeded our expectations, and they completed the project ahead of schedule.',
      avatar: '/assets/images/testimonials/testimonial1.jpg',
    },
    {
      id: 2,
      name: 'Dilini Gunasekera',
      role: 'Architect',
      content: 'I\'ve worked with many metal fabricators over my 15-year career, but Kamal Iron Works stands out for their precision and ability to bring complex designs to life. Their team understood our unique vision and executed it flawlessly.',
      avatar: '/assets/images/testimonials/testimonial2.jpg',
    },
    {
      id: 3,
      name: 'Ravi Bandara',
      role: 'Hotel Owner',
      content: 'The custom metal furniture and decorative elements that Kamal Iron Works created for our hotel lobby have become a talking point for our guests. Their team was professional from design to installation, and the quality is built to last.',
      avatar: '/assets/images/testimonials/testimonial3.jpg',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('home.pageTitle')} | Kamal Iron Works</title>
        <meta name="description" content={t('home.metaDescription')} />
      </Helmet>      {/* Hero Section */}
      <Hero 
        title="Kamal Iron Works"
        subtitle="Expert Steel Fabrication & Metalwork Since 1995"
      />
      
      {/* Services Section */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">          <motion.div 
            variants={fadeIn('up', 'tween', 0.1, 0.6)} 
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-5 text-black">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Premium steel fabrication and metal work solutions for residential and commercial projects.</p>
          </motion.div>
          
          <ServiceGrid services={featuredServices} />
          
          <motion.div 
            variants={fadeIn('up', 'tween', 0.5, 0.6)}
            className="mt-14 text-center"
          >
            <Link to="/services">              <Button variant="outline" size="lg" className="border-2 hover:bg-black hover:text-white transition-all duration-300">
                View All Services
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
      
      {/* About Section */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="py-20 bg-black text-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">            <motion.div variants={fadeIn('right', 'tween', 0.1, 0.6)}>
              <h2 className="text-4xl font-bold mb-6">About Kamal Iron Works</h2>
              <p className="text-gray-300 mb-6 text-lg">
                Founded in 1995, Kamal Iron Works has established itself as a premier provider of custom steel fabrication and metalwork solutions. With over 25 years of industry experience, we've built a reputation for exceptional craftsmanship and reliable service.
              </p>
              <p className="text-gray-300 mb-8 text-lg">
                Our skilled team of metalworkers combines traditional techniques with modern technology to create durable, functional, and aesthetically pleasing metal products for residential, commercial, and industrial clients throughout the region.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <div className="bg-[#FF6A00] p-3 rounded-full mr-4">
                    <Wrench className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-gray-100">Quality Workmanship</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#FF6A00] p-3 rounded-full mr-4">
                    <Factory className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-gray-100">Custom Solutions</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#FF6A00] p-3 rounded-full mr-4">
                    <Shrub className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-gray-100">On-Time Delivery</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#FF6A00] p-3 rounded-full mr-4">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-gray-100">{t('home.experienced')}</span>
                </div>
              </div>
              <Link to="/about">
                <Button size="lg" className="bg-[#FF6A00] hover:bg-[#FF6A00]/90 text-white">
                  {t('home.learnMoreAbout')}
                </Button>
              </Link>
            </motion.div>
            <motion.div 
              variants={fadeIn('left', 'tween', 0.3, 0.6)}
              className="grid grid-cols-2 gap-4"
            >
              <img 
                src="/assets/images/about/about-1.jpg" 
                alt="Workshop" 
                className="rounded-lg h-64 w-full object-cover shadow-lg transform transition-transform hover:scale-105 duration-300"
              />
              <img 
                src="/assets/images/about/about-2.jpg" 
                alt="Metal work" 
                className="rounded-lg h-64 w-full object-cover mt-8 shadow-lg transform transition-transform hover:scale-105 duration-300"
              />
              <img 
                src="/assets/images/about/about-3.jpg" 
                alt="Team" 
                className="rounded-lg h-64 w-full object-cover shadow-lg transform transition-transform hover:scale-105 duration-300"
              />
              <img 
                src="/assets/images/about/about-4.jpg" 
                alt="Finished project" 
                className="rounded-lg h-64 w-full object-cover mt-8 shadow-lg transform transition-transform hover:scale-105 duration-300"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Portfolio Section */}
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-5 text-black">{t('home.featuredProjects')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">{t('home.projectsSubtitle')}</p>
          </motion.div>
          
          <ProjectGrid projects={featuredProjects} columns={3} />
          
          <motion.div 
            variants={fadeIn('up', 'tween', 0.5, 0.6)}
            className="mt-14 text-center"
          >
            <Link to="/portfolio">
              <Button variant="outline" size="lg" className="border-2 hover:bg-black hover:text-white transition-all duration-300">
                {t('home.viewAllProjects')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Testimonials */}
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
          >            <h2 className="text-4xl font-bold mb-5">What Our Clients Say</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">Hear from customers who have experienced our dedication to quality and service</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                variants={fadeIn('up', 'tween', 0.2 + index * 0.1, 0.6)}
                key={testimonial.id}
                className="bg-white p-8 rounded-lg shadow-lg border-b-4 border-[#FF6A00] text-black hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="h-16 w-16 rounded-full object-cover mr-4 border-2 border-[#FF6A00]"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"
                  {testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Team Section */}
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-5 text-black">{t('home.ourTeam')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">{t('home.teamSubtitle')}</p>
          </motion.div>
          
          <TeamGrid members={teamMembers} />
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
            <h2 className="text-4xl font-bold mb-6">{t('home.readyToStart')}</h2>
            <p className="text-gray-300 mb-10 text-lg leading-relaxed">
              {t('home.ctaDescription')}
            </p>
            <motion.div 
              variants={fadeIn('up', 'tween', 0.3, 0.6)}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
              <Link to="/contact">
                <Button size="lg" className="bg-[#FF6A00] hover:bg-[#FF6A00]/90 text-white px-8 py-6 text-lg">
                  {t('home.contactUs')}
                </Button>
              </Link>
              <Link to="/appointments">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  {t('home.scheduleVisit')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default HomePage;
