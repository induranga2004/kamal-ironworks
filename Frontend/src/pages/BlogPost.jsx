import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { CalendarIcon, Clock, Tag, MessageSquare, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

const BlogPost = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    // In a real application, this would be an API call to fetch the post by slug
    // For demonstration, we'll use a timeout to simulate an API call
    const fetchPost = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Demo post data
        const demoPost = {
          id: 1,
          title: 'Latest Trends in Metal Fabrication for 2025',
          slug: 'latest-trends-metal-fabrication-2025',
          content: `
            <p>Metal fabrication has come a long way in recent years, with advancements in technology bringing new possibilities and efficiencies to the industry. As we move further into 2025, several trends are shaping the future of metal fabrication.</p>
            
            <h2>1. Automation and Robotics</h2>
            <p>The integration of robotics and automation in metal fabrication processes has significantly increased productivity and precision. Automated systems can now handle complex tasks with minimal human intervention, reducing labor costs and improving consistency in production.</p>
            <p>Collaborative robots, or "cobots," are becoming increasingly popular in metal fabrication shops. These robots work alongside human operators, handling repetitive or physically demanding tasks while the skilled workforce focuses on more complex aspects of the fabrication process.</p>
            
            <h2>2. Sustainable Practices</h2>
            <p>Sustainability is no longer just a buzzword in the metal fabrication industry. Companies are actively seeking ways to reduce waste, minimize energy consumption, and implement eco-friendly practices throughout their operations.</p>
            <p>Recycling scrap metal, using energy-efficient equipment, and adopting water-based cooling systems are just a few examples of how metal fabrication businesses are becoming more environmentally conscious.</p>
            
            <h2>3. Advanced Materials</h2>
            <p>The development of new metal alloys and composite materials is expanding the possibilities in metal fabrication. These advanced materials offer improved strength-to-weight ratios, better corrosion resistance, and enhanced thermal properties, opening up new applications across various industries.</p>
            
            <h2>4. 3D Printing and Additive Manufacturing</h2>
            <p>Metal 3D printing, or additive manufacturing, has moved beyond prototyping and is now being used for production parts. This technology allows for the creation of complex geometries that would be difficult or impossible to achieve with traditional fabrication methods.</p>
            <p>The ability to produce parts with internal channels, lattice structures, and other intricate features is revolutionizing industries such as aerospace, automotive, and medical device manufacturing.</p>
            
            <h2>5. Digital Transformation</h2>
            <p>Digital tools and technologies are transforming every aspect of metal fabrication, from design and prototyping to production and quality control. Computer-aided design (CAD) software, simulation tools, and digital twins are enabling manufacturers to optimize designs and identify potential issues before production begins.</p>
            <p>Cloud-based platforms and Internet of Things (IoT) devices are facilitating real-time monitoring and data collection, allowing for predictive maintenance, process optimization, and improved decision-making.</p>
            
            <h2>Conclusion</h2>
            <p>The metal fabrication industry continues to evolve, driven by technological advancements, changing customer demands, and a growing focus on sustainability. Businesses that embrace these trends and adapt to the changing landscape will be well-positioned for success in the years to come.</p>
            <p>At Kamal Iron Works, we're committed to staying at the forefront of these developments, continuously improving our processes and capabilities to deliver the highest quality products and services to our customers.</p>
          `,
          excerpt: 'Discover the latest trends and innovations in metal fabrication that are shaping the industry in 2025.',
          image: 'https://via.placeholder.com/800x400?text=Metal+Fabrication+Trends',
          date: '2025-06-10',
          author: {
            name: 'John Smith',
            avatar: 'https://via.placeholder.com/40x40',
            title: 'Chief Fabricator'
          },
          category: 'Industry Trends',
          tags: ['trends', 'innovation', 'metal fabrication', 'technology'],
          comments: 5,
          readTime: '8 min read'
        };
        
        setPost(demoPost);
        
        // Demo related posts
        setRelatedPosts([
          {
            id: 2,
            title: 'How to Choose the Right Material for Your Metal Gate',
            slug: 'choose-right-material-metal-gate',
            image: 'https://via.placeholder.com/400x250?text=Metal+Gate+Materials',
            date: '2025-05-22',
            excerpt: 'A comprehensive guide to selecting the best materials for your metal gate based on durability, cost, and aesthetic preferences.'
          },
          {
            id: 3,
            title: 'The Benefits of Custom Metal Furniture in Modern Homes',
            slug: 'benefits-custom-metal-furniture-modern-homes',
            image: 'https://via.placeholder.com/400x250?text=Metal+Furniture',
            date: '2025-05-15',
            excerpt: 'Learn about the unique advantages of incorporating custom metal furniture into contemporary living spaces.'
          },
          {
            id: 4,
            title: 'Maintenance Tips for Wrought Iron Products',
            slug: 'maintenance-tips-wrought-iron-products',
            image: 'https://via.placeholder.com/400x250?text=Wrought+Iron+Maintenance',
            date: '2025-04-30',
            excerpt: 'Expert advice on maintaining and extending the life of your wrought iron products with proper care.'
          }
        ]);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">{t('blogPost.notFound')}</h1>
        <p className="mb-8">{t('blogPost.notFoundMessage')}</p>
        <Link to="/blog">
          <Button>{t('blogPost.backToBlog')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Kamal Iron Works</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      {/* Hero Section with Cover Image */}
      <div className="w-full h-80 md:h-96 relative">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Post Meta Info */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-black">{post.author.name}</p>
                  <p>{post.author.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>

              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span>{post.category}</span>
              </div>

              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{post.comments} {post.comments === 1 ? t('blogPost.comment') : t('blogPost.comments')}</span>
              </div>
            </div>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Tags */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold mb-2">{t('blogPost.tags')}</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Link 
                    key={index} 
                    to={`/blog?tag=${tag}`}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold mb-2">{t('blogPost.shareArticle')}</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator className="my-12" />

            {/* Author Bio */}
            <div className="bg-gray-50 p-6 rounded-lg flex items-start gap-4 mb-12">
              <Avatar className="h-16 w-16">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-lg">{post.author.name}</p>
                <p className="text-gray-600 mb-3">{post.author.title}</p>
                <p>
                  John is a metal fabrication expert with over 15 years of experience in the industry. 
                  He specializes in custom metal designs and innovative fabrication techniques.
                </p>
              </div>
            </div>

            {/* Comments Section - Placeholder */}
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('blogPost.comments')} ({post.comments})</h2>
              <div className="bg-gray-50 p-6 text-center rounded-lg">
                <p>{t('blogPost.commentsPlaceholder')}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Posts */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4">{t('blogPost.relatedPosts')}</h3>
              <div className="space-y-6">
                {relatedPosts.map(relatedPost => (
                  <div key={relatedPost.id} className="group">
                    <Link to={`/blog/${relatedPost.slug}`}>
                      <div className="mb-2 overflow-hidden rounded-lg">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-48 object-cover transition group-hover:scale-105" 
                        />
                      </div>
                      <h4 className="font-medium group-hover:text-gray-600 transition">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(relatedPost.date).toLocaleDateString()}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4">{t('blogPost.categories')}</h3>
              <div className="space-y-2">
                {['Industry Trends', 'Guides', 'Interior Design', 'Maintenance', 'History', 'Sustainability'].map((category, index) => (
                  <Link 
                    key={index} 
                    to={`/blog?category=${category.toLowerCase().replace(' ', '-')}`}
                    className="flex items-center justify-between py-2 border-b border-gray-200 hover:text-gray-600 transition"
                  >
                    <span>{category}</span>
                    <span className="text-gray-500">(12)</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4">{t('blogPost.popularTags')}</h3>
              <div className="flex flex-wrap gap-2">
                {['metal', 'fabrication', 'gates', 'furniture', 'design', 'security', 'custom', 'railings', 'staircases', 'trends', 'maintenance'].map((tag, index) => (
                  <Link 
                    key={index} 
                    to={`/blog?tag=${tag}`}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-black text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">{t('blogPost.newsletterTitle')}</h3>
              <p className="mb-4">{t('blogPost.newsletterText')}</p>
              <div className="flex flex-col space-y-2">
                <input 
                  type="email" 
                  placeholder={t('blogPost.emailPlaceholder')} 
                  className="w-full px-4 py-2 rounded-md text-black" 
                />
                <Button className="w-full">
                  {t('blogPost.subscribe')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
