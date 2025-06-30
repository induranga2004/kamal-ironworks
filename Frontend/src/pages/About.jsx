import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/common/Hero';
import { TeamGrid } from '../components/common/TeamCard';

// Import icons
import { 
  Check, 
  Trophy,
  Clock, 
  Users, 
  Heart, 
  Gem
} from 'lucide-react';

const About = () => {
  const { t } = useTranslation();
  
  // Team members data
  const teamMembers = [
    {
      id: 1,      name: 'Chaminda Perera',
      position: 'Founder & CEO',
      image: '/assets/images/team/founder.jpg',
      bio: 'Chaminda founded Kamal Iron Works in 1995 after mastering his craft through years of apprenticeship. His vision and leadership have transformed a small workshop into the premier metal fabrication company it is today. He personally oversees quality control on all major projects.',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        facebook: 'https://facebook.com',
      }
    },    {
      id: 2,
      name: 'Roshan Silva',
      position: 'Senior Metal Fabricator',
      image: '/assets/images/team/fabricator.jpg',
      bio: 'With over 20 years of experience in metal fabrication, Roshan oversees our most complex custom projects. His expertise in working with stainless steel, aluminum, and iron has been crucial to our reputation for precision and quality.',
    },
    {
      id: 3,
      name: 'Priyanka Jayawardene',
      position: 'Operations Manager',
      image: '/assets/images/team/manager.jpg',
      bio: 'Priyanka manages our daily operations, client communications, and project scheduling. Her organizational skills and attention to detail ensure that every project runs smoothly from initial consultation to final installation.',
      socialLinks: {
        linkedin: 'https://linkedin.com',
      }
    },
    {
      id: 4,
      name: 'Nuwan Dissanayake',
      position: 'Head Welder',
      image: '/assets/images/team/welder.jpg',
      bio: 'Nuwan leads our welding department with his exceptional skill in MIG, TIG, and arc welding techniques. His craftsmanship is evident in every weld joint, ensuring structural integrity and aesthetic perfection in all our projects.',
    },
    {
      id: 5,
      name: 'Lalith Fernando',
      position: 'Design Specialist',
      image: '/assets/images/team/designer.jpg',      bio: 'Lalith brings creative vision to our technical expertise. With a background in industrial design, he works closely with clients to transform concepts into practical, beautiful metal creations. His innovative approaches have earned us recognition for both functional and artistic projects.',
      socialLinks: {
        instagram: 'https://instagram.com',
      }
    },
    {
      id: 6,
      name: 'Sachini Perera',
      position: 'Customer Relations Manager',
      image: '/assets/images/team/customer-service.jpg',
      bio: 'Sachini ensures that every client receives personalized attention throughout their project journey. Her commitment to excellent customer service has been key to our high rate of repeat business and referrals.',
    },
    {
      id: 7,
      name: 'Anura Gunathilake',
      position: 'Senior Installation Specialist',
      image: '/assets/images/team/installer.jpg',
      bio: 'Anura leads our installation team with 15 years of experience in safely and precisely installing metal structures. His expertise in both residential and commercial settings ensures that every project is completed to exact specifications.',
    },
    {
      id: 8,
      name: 'Kasun Bandara',
      position: 'Metal Fabrication Apprentice',
      image: '/assets/images/team/apprentice.jpg',
      bio: 'Kasun represents the next generation of metalworkers at Kamal Iron Works. Through our apprenticeship program, he is learning both traditional techniques and modern fabrication methods, bringing fresh energy and new ideas to our team.',
    }
  ];
  // Company stats
  const stats = [
    {
      value: '28+',
      label: 'Years of Experience',
      icon: Clock,
    },
    {
      value: '1,200+',
      label: 'Completed Projects',
      icon: Check,
    },
    {
      value: '350+',
      label: 'Satisfied Clients',
      icon: Users,
    },
    {
      value: '25',
      label: 'Team Members',
      icon: Heart,
    },
  ];
  // Company values
  const values = [
    {
      title: 'Excellence in Craftsmanship',
      description: 'We maintain the highest standards in every weld, cut, and finish. Our attention to detail ensures quality.',
      icon: Gem,
    },
    {
      title: 'Integrity & Reliability',
      description: 'We value honest communication and transparent business practices. Our clients can trust our commitment.',
      icon: Trophy,
    },
    {
      title: 'Innovation & Adaptation',
      description: 'Balancing traditional techniques with new technology to solve complex challenges with innovative solutions.',
      icon: Heart,
    },
  ];
  // Timeline/History events
  const historyEvents = [
    {
      year: '1995',
      title: 'Founding of Kamal Iron Works',
      description: 'Chaminda Perera establishes a small metal fabrication workshop in central Colombo.',
    },
    {
      year: '2003',
      title: 'Workshop Expansion',
      description: 'Growing demand leads to our first major expansion with specialized equipment.',
    },
    {
      year: '2011',
      title: 'Advanced Manufacturing Equipment',
      description: 'Investment in CNC plasma cutting technology for precision and larger projects.',
    },
    {
      year: '2018',
      title: 'Launch of Design Studio',
      description: 'Addition of in-house design studio with 3D modeling capabilities.',
    },
    {
      year: '2023',
      title: 'Sustainable Practices',
      description: 'Implementation of eco-friendly processes with solar power and recycling programs.',
    },
  ];

  return (
    <>      <Helmet>
        <title>About Us | Kamal Iron Works</title>
        <meta name="description" content="Learn about Kamal Iron Works' 28-year journey as a leading metal fabrication company, our team of skilled craftsmen, and our commitment to quality and innovation." />
      </Helmet>{/* Hero Section */}
      <Hero 
        title="About Our Workshop"
        subtitle="Building Excellence with Steel & Craftsmanship Since 1995"
        showButtons={false}
        backgroundImage="/assets/images/about-hero.jpg"
        height="h-[400px]"
      />
      
      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>              <h1 className="text-3xl font-bold mb-6">Our Story</h1>
              <p className="text-gray-600 mb-4">
                Established in 1995 by master craftsman Chaminda Perera, Kamal Iron Works began as a small workshop specializing in residential gates and railings. With a passion for metalwork and an unwavering commitment to quality, our business has grown into one of the region's most respected steel fabrication companies.
              </p>
              <p className="text-gray-600 mb-4">
                Over the past three decades, we've expanded our capabilities to include architectural metalwork, custom furniture, commercial projects, and specialized industrial fabrication. Our commitment to combining traditional craftsmanship with modern technology has helped us create distinctive metal solutions that stand the test of time.
              </p>
              <p className="text-gray-600">
                Today, our team of 25 skilled professionals continues to push the boundaries of metal fabrication, serving clients across residential, commercial, and industrial sectors. Every project, no matter the size, receives the same level of attention to detail and quality control that has become our hallmark.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="/assets/images/about/workshop.jpg" 
                alt="Kamal Iron Works Workshop" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Company Stats */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-10 w-10" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide every project we undertake and every relationship we build.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-md border border-gray-200 text-center"
              >
                <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-6">
                  <value.icon className="h-8 w-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('about.ourHistory')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('about.historySubtitle')}
            </p>
          </div>
          
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
            
            {/* Timeline events */}
            <div className="space-y-12">
              {historyEvents.map((event, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Event content */}
                  <div className="w-1/2"></div>
                  
                  {/* Year marker */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-900 border-4 border-white z-10"></div>
                    <div className="mt-2 bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-bold">
                      {event.year}
                    </div>
                  </div>
                  
                  {/* Event content */}
                  <div className={`w-1/2 p-4 ${
                    index % 2 === 0 ? 'pl-12' : 'pr-12 text-right'
                  }`}>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('about.ourTeam')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('about.teamSubtitle')}
            </p>
          </div>
          
          <TeamGrid members={teamMembers} />
        </div>
      </section>
    </>
  );
};

export default About;
