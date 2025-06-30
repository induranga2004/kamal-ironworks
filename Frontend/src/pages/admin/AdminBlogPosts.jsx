import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { 
  Search, 
  Plus, 
  Trash2, 
  Edit,
  Eye, 
  Calendar,
  Clock,
  MessageSquare,
  BarChart2,
  Tag,
  FileText
} from 'lucide-react';
import { format } from 'date-fns';

const AdminBlogPosts = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('published');
  
  // Sample data - would come from API in production
  const blogPosts = [
    {
      id: 'BLOG-001',
      title: 'Modern Metal Staircase Designs for 2025',
      slug: 'modern-metal-staircase-designs-2025',
      excerpt: 'Explore the latest trends in metal staircase designs that combine functionality with stunning aesthetics.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis nisl aliquam aliquet. Fusce venenatis urna in tellus facilisis, vel tempus justo posuere.',
      coverImage: 'https://placehold.co/800x450?text=Staircase+Designs',
      status: 'published',
      publishedDate: '2025-06-15T09:00:00',
      author: {
        id: 1,
        name: 'Nimal Fernando',
        avatar: 'https://i.pravatar.cc/300?img=1',
        position: 'Design Specialist'
      },
      categories: ['design', 'staircases', 'trends'],
      tags: ['metal design', 'staircases', '2025 trends', 'interior design'],
      views: 456,
      comments: 12,
      featured: true
    },
    {
      id: 'BLOG-002',
      title: 'How to Choose the Right Security Grills for Your Home',
      slug: 'choose-right-security-grills-home',
      excerpt: 'Security without compromising aesthetics - learn how to select the perfect security grills for your property.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis nisl aliquam aliquet. Fusce venenatis urna in tellus facilisis, vel tempus justo posuere.',
      coverImage: 'https://placehold.co/800x450?text=Security+Grills',
      status: 'published',
      publishedDate: '2025-06-10T11:30:00',
      author: {
        id: 2,
        name: 'Amali Perera',
        avatar: 'https://i.pravatar.cc/300?img=2',
        position: 'Security Expert'
      },
      categories: ['security', 'home', 'grills'],
      tags: ['home security', 'grills', 'protection', 'design'],
      views: 328,
      comments: 8,
      featured: false
    },
    {
      id: 'BLOG-003',
      title: 'The Benefits of Automated Metal Gates',
      slug: 'benefits-automated-metal-gates',
      excerpt: "Discover how automated metal gates can enhance your property's security, convenience, and curb appeal.",
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis nisl aliquam aliquet. Fusce venenatis urna in tellus facilisis, vel tempus justo posuere.',
      coverImage: 'https://placehold.co/800x450?text=Automated+Gates',
      status: 'draft',
      lastEdited: '2025-06-19T14:45:00',
      author: {
        id: 1,
        name: 'Nimal Fernando',
        avatar: 'https://i.pravatar.cc/300?img=1',
        position: 'Design Specialist'
      },
      categories: ['gates', 'automation', 'security'],
      tags: ['automated gates', 'smart home', 'security', 'convenience'],
      views: 0,
      comments: 0,
      featured: false
    },
    {
      id: 'BLOG-004',
      title: 'Maintenance Tips for Metal Railings',
      slug: 'maintenance-tips-metal-railings',
      excerpt: 'Keep your metal railings looking new with these essential maintenance and care tips.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis nisl aliquam aliquet. Fusce venenatis urna in tellus facilisis, vel tempus justo posuere.',
      coverImage: 'https://placehold.co/800x450?text=Railing+Maintenance',
      status: 'published',
      publishedDate: '2025-05-28T10:15:00',
      author: {
        id: 3,
        name: 'Lakshman Silva',
        avatar: 'https://i.pravatar.cc/300?img=3',
        position: 'Maintenance Specialist'
      },
      categories: ['maintenance', 'railings', 'tips'],
      tags: ['metal care', 'railings', 'maintenance', 'longevity'],
      views: 245,
      comments: 5,
      featured: false
    },
    {
      id: 'BLOG-005',
      title: 'Custom Metal Art: Elevating Your Interior Design',
      slug: 'custom-metal-art-interior-design',
      excerpt: 'Explore how custom metal art pieces can transform your interior spaces and create unique focal points.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis nisl aliquam aliquet. Fusce venenatis urna in tellus facilisis, vel tempus justo posuere.',
      coverImage: 'https://placehold.co/800x450?text=Metal+Art',
      status: 'scheduled',
      scheduledDate: '2025-06-30T09:00:00',
      author: {
        id: 4,
        name: 'Priya Jayawardena',
        avatar: 'https://i.pravatar.cc/300?img=4',
        position: 'Art Director'
      },
      categories: ['art', 'interior', 'custom'],
      tags: ['metal art', 'interior design', 'custom pieces', 'décor'],
      views: 0,
      comments: 0,
      featured: false
    }
  ];

  // Filter blog posts based on search term and status
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === 'all') {
      return matchesSearch;
    } else {
      return matchesSearch && post.status === activeTab;
    }
  });

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500 hover:bg-green-600">{t('blogStatus.published')}</Badge>;
      case 'draft':
        return <Badge className="bg-gray-500 hover:bg-gray-600">{t('blogStatus.draft')}</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500 hover:bg-blue-600">{t('blogStatus.scheduled')}</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>{t('adminBlogPosts.title')} | Kamal Iron Works</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('adminBlogPosts.title')}</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t('adminBlogPosts.newPost')}
        </Button>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="md:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="published">{t('blogStatus.published')}</TabsTrigger>
                  <TabsTrigger value="draft">{t('blogStatus.draft')}</TabsTrigger>
                  <TabsTrigger value="scheduled">{t('blogStatus.scheduled')}</TabsTrigger>
                  <TabsTrigger value="all">{t('adminBlogPosts.tabs.all')}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredPosts.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">{t('adminBlogPosts.noPosts')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg line-clamp-1">{post.title}</CardTitle>
                      {post.featured && (
                        <Badge className="bg-purple-500 hover:bg-purple-600">{t('adminBlogPosts.featured')}</Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <span>{post.id}</span>
                      <span>•</span>
                      <span>{getStatusBadge(post.status)}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{post.excerpt}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="space-y-2">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>
                        {post.status === 'published' && (
                          <>
                            {t('adminBlogPosts.published')}: {format(new Date(post.publishedDate), 'PP')}
                          </>
                        )}
                        {post.status === 'draft' && (
                          <>
                            {t('adminBlogPosts.lastEdited')}: {format(new Date(post.lastEdited), 'PP')}
                          </>
                        )}
                        {post.status === 'scheduled' && (
                          <>
                            {t('adminBlogPosts.scheduled')}: {format(new Date(post.scheduledDate), 'PP')}
                          </>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <FileText className="h-3.5 w-3.5 mr-1" />
                      <span className="capitalize">{post.categories.join(', ')}</span>
                    </div>
                  </div>
                  
                  {post.status === 'published' && (
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-500">
                        <BarChart2 className="h-3.5 w-3.5 mr-1" />
                        <span>{post.views} {t('adminBlogPosts.views')}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <MessageSquare className="h-3.5 w-3.5 mr-1" />
                        <span>{post.comments} {t('adminBlogPosts.comments')}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center mb-4 flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={`${post.id}-tag-${index}`} variant="outline" className="text-xs mr-1">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between border-t pt-3">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs ml-2">{post.author.name}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      {t('common.view')}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      {t('common.edit')}
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogPosts;
