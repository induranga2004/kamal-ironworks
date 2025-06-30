import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';

const Shop = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [view, setView] = useState('grid');

  // Sample products data - would come from API in production
  const products = [
    {
      id: 1,
      name: 'Modern Gate Design MG-101',
      category: 'gates',
      price: 450,
      rating: 4.5,
      image: 'https://via.placeholder.com/300x300?text=Metal+Gate',
      inStock: true,
      discount: 0
    },
    {
      id: 2,
      name: 'Decorative Window Grill WG-205',
      category: 'window-grills',
      price: 180,
      rating: 4.8,
      image: 'https://via.placeholder.com/300x300?text=Window+Grill',
      inStock: true,
      discount: 10
    },
    {
      id: 3,
      name: 'Spiral Staircase Model SS-301',
      category: 'staircases',
      price: 850,
      rating: 4.7,
      image: 'https://via.placeholder.com/300x300?text=Spiral+Staircase',
      inStock: false,
      discount: 0
    },
    {
      id: 4,
      name: 'Metal Coffee Table MCT-405',
      category: 'furniture',
      price: 320,
      rating: 4.2,
      image: 'https://via.placeholder.com/300x300?text=Coffee+Table',
      inStock: true,
      discount: 15
    },
    {
      id: 5,
      name: 'Modern Balcony Railing BR-502',
      category: 'railings',
      price: 240,
      rating: 4.6,
      image: 'https://via.placeholder.com/300x300?text=Balcony+Railing',
      inStock: true,
      discount: 0
    },
    {
      id: 6,
      name: 'Decorative Metal Fence MF-601',
      category: 'fences',
      price: 380,
      rating: 4.3,
      image: 'https://via.placeholder.com/300x300?text=Metal+Fence',
      inStock: true,
      discount: 0
    },
    {
      id: 7,
      name: 'Metal Bed Frame MBF-701',
      category: 'furniture',
      price: 520,
      rating: 4.4,
      image: 'https://via.placeholder.com/300x300?text=Bed+Frame',
      inStock: true,
      discount: 5
    },
    {
      id: 8,
      name: 'Ornamental Iron Door ID-801',
      category: 'doors',
      price: 650,
      rating: 4.9,
      image: 'https://via.placeholder.com/300x300?text=Iron+Door',
      inStock: true,
      discount: 0
    },
  ];

  const categories = [
    { id: 'gates', name: t('shop.categories.gates'), count: 12 },
    { id: 'window-grills', name: t('shop.categories.windowGrills'), count: 8 },
    { id: 'staircases', name: t('shop.categories.staircases'), count: 5 },
    { id: 'furniture', name: t('shop.categories.furniture'), count: 15 },
    { id: 'railings', name: t('shop.categories.railings'), count: 7 },
    { id: 'fences', name: t('shop.categories.fences'), count: 6 },
    { id: 'doors', name: t('shop.categories.doors'), count: 9 },
  ];

  // Filter products based on search term and price range
  const filteredProducts = products.filter(product =>
    (searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (product.price >= priceRange[0] && product.price <= priceRange[1])
  );

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-yellow-500">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-500">★</span>);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    return stars;
  };

  return (
    <>
      <Helmet>
        <title>{t('shop.pageTitle')} | Kamal Iron Works</title>
        <meta name="description" content={t('shop.pageDescription')} />
      </Helmet>

      {/* Shop Hero Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('shop.title')}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            {t('shop.subtitle')}
          </p>
        </div>
      </div>

      {/* Shop Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-8">
            {/* Search */}
            <div>
              <h3 className="text-lg font-medium mb-3">{t('shop.search')}</h3>
              <Input
                type="text"
                placeholder={t('shop.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-medium mb-3">{t('shop.categories.title')}</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox id={`category-${category.id}`} />
                      <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                    </div>
                    <span className="text-sm text-gray-500">({category.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-medium mb-3">{t('shop.priceRange')}</h3>
              <div className="px-2">
                <Slider 
                  defaultValue={[0, 1000]} 
                  min={0} 
                  max={1000} 
                  step={10} 
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 className="text-lg font-medium mb-3">{t('shop.availability')}</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="in-stock" />
                  <Label htmlFor="in-stock">{t('shop.inStock')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="out-of-stock" />
                  <Label htmlFor="out-of-stock">{t('shop.outOfStock')}</Label>
                </div>
              </div>
            </div>

            {/* Sale Items */}
            <div>
              <h3 className="text-lg font-medium mb-3">{t('shop.saleItems')}</h3>
              <div className="flex items-center space-x-2">
                <Checkbox id="on-sale" />
                <Label htmlFor="on-sale">{t('shop.onSale')}</Label>
              </div>
            </div>

            {/* Apply Filters Button */}
            <Button className="w-full">{t('shop.applyFilters')}</Button>
          </div>

          {/* Product Listings */}
          <div className="lg:col-span-3">
            {/* Sort and View Options */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="mb-4 md:mb-0">
                <span className="font-medium">{filteredProducts.length} {t('shop.products')}</span>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <span>{t('shop.sortBy')}: </span>
                  <select className="p-1 border rounded">
                    <option value="latest">{t('shop.sortOptions.latest')}</option>
                    <option value="price-low">{t('shop.sortOptions.priceLowHigh')}</option>
                    <option value="price-high">{t('shop.sortOptions.priceHighLow')}</option>
                    <option value="popular">{t('shop.sortOptions.popularity')}</option>
                  </select>
                </label>
                
                <div className="flex border rounded">
                  <button 
                    className={`px-3 py-1 ${view === 'grid' ? 'bg-black text-white' : 'bg-white'}`}
                    onClick={() => setView('grid')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                    </svg>
                  </button>
                  <button 
                    className={`px-3 py-1 ${view === 'list' ? 'bg-black text-white' : 'bg-white'}`}
                    onClick={() => setView('list')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                      {product.discount > 0 && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-1 text-sm font-bold">
                          -{product.discount}%
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-medium text-lg">{t('shop.outOfStock')}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                      <div className="text-sm mb-2">{renderStars(product.rating)} ({product.rating})</div>
                      <div className="flex justify-between items-center">
                        {product.discount > 0 ? (
                          <div>
                            <span className="text-xl font-bold">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                            <span className="text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      <Button className="w-full mt-4" disabled={!product.inStock}>
                        {product.inStock ? t('shop.addToCart') : t('shop.outOfStock')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex">
                    <div className="relative w-1/3">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      {product.discount > 0 && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white rounded-full px-2 py-1 text-sm font-bold">
                          -{product.discount}%
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-medium">{t('shop.outOfStock')}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 w-2/3">
                      <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                      <div className="text-sm mb-2">{renderStars(product.rating)} ({product.rating})</div>
                      <p className="text-gray-600 mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. 
                        Vestibulum augue risus, gravida non augue quis, accumsan facilisis ex.
                      </p>
                      <div className="flex justify-between items-center">
                        {product.discount > 0 ? (
                          <div>
                            <span className="text-xl font-bold">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                            <span className="text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                        )}
                        <Button disabled={!product.inStock}>
                          {product.inStock ? t('shop.addToCart') : t('shop.outOfStock')}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="inline-flex">
                <Button variant="outline" className="rounded-r-none">
                  &laquo; {t('shop.previous')}
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
                  {t('shop.next')} &raquo;
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
