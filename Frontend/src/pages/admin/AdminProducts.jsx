import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  ShoppingBag,
  Package,
  Tag,
  Layers,
  AlertTriangle
} from 'lucide-react';

const AdminProducts = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Sample data - would come from API in production
  const products = [
    {
      id: 'PROD-001',
      name: 'Modern Stainless Steel Balcony Railing',
      description: 'Modern and elegant balcony railings made from high-quality stainless steel',
      price: 15000,
      category: 'railings',
      image: 'https://placehold.co/800x600?text=Balcony+Railing',
      status: 'in_stock',
      stockQuantity: 5,
      featured: true,
      dimensions: '100cm x 5cm x 90cm',
      materials: 'Stainless Steel 304',
      customizable: true
    },
    {
      id: 'PROD-002',
      name: 'Black Metal Security Grill for Windows',
      description: 'Sturdy window security grills with elegant pattern design',
      price: 8500,
      category: 'security',
      image: 'https://placehold.co/800x600?text=Window+Grill',
      status: 'in_stock',
      stockQuantity: 12,
      featured: false,
      dimensions: '120cm x 3cm x 150cm',
      materials: 'Mild Steel, Powder Coated',
      customizable: true
    },
    {
      id: 'PROD-003',
      name: 'Sliding Metal Gate with Motor',
      description: 'Automated sliding gate with remote control, perfect for driveways',
      price: 125000,
      category: 'gates',
      image: 'https://placehold.co/800x600?text=Sliding+Gate',
      status: 'made_to_order',
      stockQuantity: 0,
      featured: true,
      dimensions: 'Custom Size',
      materials: 'Mild Steel, Powder Coated, Motor System',
      customizable: true
    },
    {
      id: 'PROD-004',
      name: 'Decorative Metal Wall Art',
      description: 'Modern metal wall art with geometric patterns',
      price: 18500,
      category: 'decor',
      image: 'https://placehold.co/800x600?text=Wall+Art',
      status: 'in_stock',
      stockQuantity: 3,
      featured: false,
      dimensions: '150cm x 2cm x 90cm',
      materials: 'Mild Steel, Powder Coated',
      customizable: false
    },
    {
      id: 'PROD-005',
      name: 'Industrial Style Metal Staircase',
      description: 'Contemporary industrial-style metal staircase with wooden steps',
      price: 250000,
      category: 'stairs',
      image: 'https://placehold.co/800x600?text=Metal+Staircase',
      status: 'made_to_order',
      stockQuantity: 0,
      featured: true,
      dimensions: 'Custom Size',
      materials: 'Mild Steel, Timber, Powder Coated',
      customizable: true
    },
    {
      id: 'PROD-006',
      name: 'Metal Plant Stand Set',
      description: 'Set of 3 metal plant stands with different heights',
      price: 6500,
      category: 'decor',
      image: 'https://placehold.co/800x600?text=Plant+Stands',
      status: 'low_stock',
      stockQuantity: 2,
      featured: false,
      dimensions: 'Varies',
      materials: 'Mild Steel, Powder Coated',
      customizable: false
    }
  ];

  const categories = [
    { value: 'all', label: t('adminProducts.categories.all') },
    { value: 'railings', label: t('adminProducts.categories.railings') },
    { value: 'security', label: t('adminProducts.categories.security') },
    { value: 'gates', label: t('adminProducts.categories.gates') },
    { value: 'stairs', label: t('adminProducts.categories.stairs') },
    { value: 'decor', label: t('adminProducts.categories.decor') }
  ];

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeCategory === 'all') {
      return matchesSearch;
    } else {
      return matchesSearch && product.category === activeCategory;
    }
  });

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'in_stock':
        return <Badge className="bg-green-500 hover:bg-green-600">{t('productStatus.inStock')}</Badge>;
      case 'low_stock':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">{t('productStatus.lowStock')}</Badge>;
      case 'out_of_stock':
        return <Badge className="bg-red-500 hover:bg-red-600">{t('productStatus.outOfStock')}</Badge>;
      case 'made_to_order':
        return <Badge className="bg-blue-500 hover:bg-blue-600">{t('productStatus.madeToOrder')}</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>{t('adminProducts.title')} | Kamal Iron Works</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('adminProducts.title')}</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t('adminProducts.addProduct')}
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
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                <TabsList className="grid grid-cols-6">
                  {categories.map(category => (
                    <TabsTrigger key={category.value} value={category.value}>
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">{t('adminProducts.noProducts')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.id}</CardDescription>
                  </div>
                  <div>
                    {getStatusBadge(product.status)}
                    {product.featured && (
                      <Badge className="ml-2 bg-purple-500 hover:bg-purple-600">
                        {t('adminProducts.featured')}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Tag className="h-3.5 w-3.5 mr-1" />
                      <span className="font-medium">Rs. {product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Package className="h-3.5 w-3.5 mr-1" />
                      <span>
                        {product.status === 'made_to_order' 
                          ? t('adminProducts.madeToOrder')
                          : t('adminProducts.inStock', { count: product.stockQuantity })
                        }
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Layers className="h-3.5 w-3.5 mr-1" />
                      <span>{product.materials}</span>
                    </div>
                    {product.stockQuantity <= 2 && product.status !== 'made_to_order' && (
                      <div className="flex items-center text-sm text-yellow-600">
                        <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                        <span>{t('adminProducts.lowStock')}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator className="my-3" />
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>
                
                <div className="flex justify-end space-x-2">
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
                    {t('common.delete')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
