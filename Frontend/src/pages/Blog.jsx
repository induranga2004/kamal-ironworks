import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import BlogPostCard from '../components/common/BlogPostCard';

const Blog = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample blog posts data - would come from API in production
  const blogPosts = [
    {
      id: 1,
      title: 'Latest Trends in Metal Fabrication for 2023',
      excerpt: 'Discover the latest trends and innovations in metal fabrication that are shaping the industry in 2023.',
      image: 'https://via.placeholder.com/600x400?text=Metal+Fabrication+Trends',
      date: '2023-08-15',
      author: 'John Smith',
      category: 'Industry Trends',
      tags: ['trends', 'innovation', 'metal fabrication']
    },
    {
      id: 2,
      title: 'How to Choose the Right Material for Your Metal Gate',
      excerpt: 'A comprehensive guide to selecting the best materials for your metal gate based on durability, cost, and aesthetic preferences.',
      image: 'https://via.placeholder.com/600x400?text=Metal+Gate+Materials',
      date: '2023-07-22',
      author: 'Sarah Johnson',
      category: 'Guides',
      tags: ['gates', 'materials', 'guide']
    },
    {
      id: 3,
      title: 'The Benefits of Custom Metal Furniture in Modern Homes',
      excerpt: 'Learn about the unique advantages of incorporating custom metal furniture into contemporary living spaces.',
      image: 'https://via.placeholder.com/600x400?text=Metal+Furniture',
      date: '2023-06-10',
      author: 'Michael Brown',
      category: 'Interior Design',
      tags: ['furniture', 'interior design', 'custom']
    },
    {
      id: 4,
      title: 'Maintenance Tips for Wrought Iron Products',
      excerpt: 'Expert advice on maintaining and extending the life of your wrought iron products with proper care.',
      image: 'https://via.placeholder.com/600x400?text=Wrought+Iron+Maintenance',
      date: '2023-05-05',
      author: 'Emily Wilson',
      category: 'Maintenance',
      tags: ['maintenance', 'wrought iron', 'tips']
    },
    {
      id: 5,
      title: 'The History of Metalworking in Sri Lanka',
      excerpt: 'Exploring the rich heritage and tradition of metalworking in Sri Lanka through the ages.',
      image: 'https://via.placeholder.com/600x400?text=Sri+Lankan+Metalwork',
      date: '2023-04-18',
      author: 'Amal Perera',
      category: 'History',
      tags: ['history', 'Sri Lanka', 'tradition']
    },
    {
      id: 6,
      title: 'Sustainable Practices in Modern Metal Fabrication',
      excerpt: 'How the metal fabrication industry is adopting sustainable practices to reduce environmental impact.',
      image: 'https://via.placeholder.com/600x400?text=Sustainable+Fabrication',
      date: '2023-03-27',
      author: 'David Clark',
      category: 'Sustainability',
      tags: ['sustainability', 'environment', 'green practices']
    }
  ];

  const categories = [
    'All Categories',
    'Industry Trends',
    'Guides',
    'Interior Design',
    'Maintenance',
    'History',
    'Sustainability'
  ];

  // Filter blog posts based on search term
  const filteredPosts = searchTerm 
    ? blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : blogPosts;

  return (
    <>
      <Helmet>
        <title>{t('blog.pageTitle')} | Kamal Iron Works</title>
        <meta name="description" content={t('blog.pageDescription')} />
      </Helmet>

      {/* Blog Hero Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            {t('blog.subtitle')}
          </p>
        </div>
      </div>

      {/* Blog Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Input
              type="text"
              placeholder={t('blog.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <select className="w-full p-2 border rounded-md focus:ring-2 focus:ring-black focus:border-black">
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        {filteredPosts.length > 0 ? (
          <div className="flex justify-center mt-12">
            <nav className="inline-flex">
              <Button variant="outline" className="rounded-r-none">
                &laquo; {t('blog.previous')}
              </Button>
              <Button variant="outline" className="rounded-none bg-black text-white">
                1
              </Button>
              <Button variant="outline" className="rounded-none">
                2
              </Button>
              <Button variant="outline" className="rounded-none">
                3
              </Button>
              <Button variant="outline" className="rounded-l-none">
                {t('blog.next')} &raquo;
              </Button>
            </nav>
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium">{t('blog.noResults')}</h3>
            <p className="mt-2 text-gray-600">{t('blog.tryDifferentSearch')}</p>
          </div>
        )}
      </div>

      {/* Subscribe Section */}
      <div className="bg-gray-100 py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('blog.subscribe.title')}</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">{t('blog.subscribe.description')}</p>
          <div className="max-w-md mx-auto flex">
            <Input
              type="email"
              placeholder={t('blog.subscribe.placeholder')}
              className="rounded-r-none"
            />
            <Button className="rounded-l-none">
              {t('blog.subscribe.button')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
