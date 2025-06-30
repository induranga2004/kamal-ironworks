import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { 
  Package, 
  Search, 
  FileText, 
  Truck, 
  CheckCircle, 
  AlertCircle,
  Clock,
  ChevronRight,
  ShoppingBag,
  Calendar
} from 'lucide-react';

const Orders = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data - would come from API in production
  const orders = [
    {
      id: 'ORD-5421',
      date: '2025-06-15',
      status: 'completed',
      items: [
        { name: 'Custom Metal Gate', quantity: 1, price: 45000 }
      ],
      total: 45000,
      paymentMethod: 'card',
      shippingAddress: '123 Main Street, Colombo 07, Sri Lanka',
      trackingNumber: 'TRK4567890'
    },
    {
      id: 'ORD-5388',
      date: '2025-06-10',
      status: 'processing',
      items: [
        { name: 'Metal Railings (per meter)', quantity: 3, price: 8500 },
        { name: 'Installation Service', quantity: 1, price: 3500 }
      ],
      total: 29000,
      paymentMethod: 'bank_transfer',
      shippingAddress: '123 Main Street, Colombo 07, Sri Lanka',
      trackingNumber: null
    },
    {
      id: 'ORD-5372',
      date: '2025-05-28',
      status: 'shipped',
      items: [
        { name: 'Metal Coffee Table', quantity: 1, price: 18500 },
        { name: 'Metal Side Table', quantity: 2, price: 8200 }
      ],
      total: 34900,
      paymentMethod: 'card',
      shippingAddress: '123 Main Street, Colombo 07, Sri Lanka',
      trackingNumber: 'TRK1234567'
    },
    {
      id: 'ORD-5301',
      date: '2025-05-12',
      status: 'cancelled',
      items: [
        { name: 'Security Window Bars', quantity: 4, price: 5500 }
      ],
      total: 22000,
      paymentMethod: 'cash',
      shippingAddress: '123 Main Street, Colombo 07, Sri Lanka',
      trackingNumber: null
    },
    {
      id: 'ORD-5267',
      date: '2025-05-05',
      status: 'completed',
      items: [
        { name: 'Custom Metal Shelf', quantity: 2, price: 12000 }
      ],
      total: 24000,
      paymentMethod: 'card',
      shippingAddress: '123 Main Street, Colombo 07, Sri Lanka',
      trackingNumber: 'TRK7654321'
    }
  ];

  // Status options
  const allStatuses = ['all', 'processing', 'shipped', 'completed', 'cancelled'];
  const [activeStatus, setActiveStatus] = useState('all');
  
  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = activeStatus === 'all' || order.status === activeStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Get status badge based on order status
  const getStatusBadge = (status) => {
    switch(status) {
      case 'processing':
        return <Badge className="bg-yellow-500">{t('orders.status.processing')}</Badge>;
      case 'shipped':
        return <Badge className="bg-blue-500">{t('orders.status.shipped')}</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">{t('orders.status.completed')}</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">{t('orders.status.cancelled')}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Get status icon based on order status
  const getStatusIcon = (status) => {
    switch(status) {
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <Helmet>
        <title>{t('orders.pageTitle')} | Kamal Iron Works</title>
        <meta name="description" content={t('orders.pageDescription')} />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('orders.title')}</h1>
          <p className="text-muted-foreground">{t('orders.subtitle')}</p>
        </div>
        <Separator className="my-6" />
        
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder={t('orders.searchPlaceholder')}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue={activeStatus} onValueChange={setActiveStatus} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {allStatuses.map((status) => (
                  <TabsTrigger key={status} value={status} className="text-xs md:text-sm">
                    {t(`orders.status.${status}`)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between bg-gray-50 py-4">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <Package className="mr-2 h-5 w-5" />
                      {order.id}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(order.status)}
                      <span className="text-sm text-gray-500">
                        {formatDate(order.date)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Items Summary */}
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-500">{t('orders.items')}</Label>
                        <div>
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.name}</span>
                              <span>x{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-500">{t('orders.total')}</Label>
                        <p className="font-medium">
                          Rs. {order.total.toLocaleString()}
                        </p>
                      </div>
                      
                      {/* Payment Method */}
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-500">{t('orders.paymentMethod')}</Label>
                        <p>{t(`orders.paymentTypes.${order.paymentMethod}`)}</p>
                      </div>
                      
                      {/* Order Status */}
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-500">{t('orders.currentStatus')}</Label>
                        <div className="flex items-center">
                          {getStatusIcon(order.status)}
                          <span className="ml-2">{t(`orders.statusMessages.${order.status}`)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-6 pt-4 border-t">
                      {order.trackingNumber && (
                        <div className="text-sm">
                          <span className="text-gray-500">{t('orders.tracking')}: </span>
                          <span className="font-medium">{order.trackingNumber}</span>
                        </div>
                      )}
                      
                      <Button variant="outline" size="sm" className="ml-auto">
                        {t('orders.viewDetails')}
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">{t('orders.noOrders')}</h3>
                <p className="text-gray-500 mb-6">{t('orders.noOrdersMessage')}</p>
                <Button asChild>
                  <a href="/shop">{t('orders.shopNow')}</a>
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
