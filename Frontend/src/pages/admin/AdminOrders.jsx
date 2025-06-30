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
  Truck, 
  Download, 
  Eye, 
  Mail, 
  Phone, 
  Calendar,
  Tag,
  MapPin,
  PackageCheck,
  FileText,
  Check,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';

const AdminOrders = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('processing');
  
  // Sample data - would come from API in production
  const orders = [
    {
      id: 'ORD-001',
      customerName: 'Rajith Mendis',
      customerEmail: 'rajith@example.com',
      customerPhone: '+94 77 123 4567',
      date: '2025-06-20T09:30:00',
      status: 'processing',
      total: 37500,
      items: [
        { id: 'PROD-001', name: 'Modern Stainless Steel Balcony Railing', quantity: 2, price: 15000 },
        { id: 'PROD-006', name: 'Metal Plant Stand Set', quantity: 1, price: 7500 }
      ],
      deliveryAddress: '45 Lake Road, Colombo 06',
      paymentMethod: 'bank_transfer',
      isPaid: true
    },
    {
      id: 'ORD-002',
      customerName: 'Anoma Silva',
      customerEmail: 'anoma@example.com',
      customerPhone: '+94 77 234 5678',
      date: '2025-06-19T14:00:00',
      status: 'shipped',
      shippedDate: '2025-06-21T10:15:00',
      estimatedDelivery: '2025-06-25T00:00:00',
      trackingNumber: 'KIW-TRK-12345',
      total: 8500,
      items: [
        { id: 'PROD-002', name: 'Black Metal Security Grill for Windows', quantity: 1, price: 8500 }
      ],
      deliveryAddress: '120 Main Street, Kandy',
      paymentMethod: 'cash_on_delivery',
      isPaid: false
    },
    {
      id: 'ORD-003',
      customerName: 'Lalith Perera',
      customerEmail: 'lalith@example.com',
      customerPhone: '+94 77 345 6789',
      date: '2025-06-15T11:45:00',
      status: 'delivered',
      shippedDate: '2025-06-16T13:30:00',
      deliveredDate: '2025-06-18T14:20:00',
      total: 24500,
      items: [
        { id: 'PROD-004', name: 'Decorative Metal Wall Art', quantity: 1, price: 18500 },
        { id: 'PROD-006', name: 'Metal Plant Stand Set', quantity: 1, price: 6000 }
      ],
      deliveryAddress: '78 Beach Road, Negombo',
      paymentMethod: 'card',
      isPaid: true
    },
    {
      id: 'ORD-004',
      customerName: 'Kumari Goonesekera',
      customerEmail: 'kumari@example.com',
      customerPhone: '+94 77 456 7890',
      date: '2025-06-22T16:30:00',
      status: 'pending',
      total: 125000,
      items: [
        { id: 'PROD-003', name: 'Sliding Metal Gate with Motor', quantity: 1, price: 125000 }
      ],
      deliveryAddress: '23 Hill Street, Nuwara Eliya',
      paymentMethod: 'bank_transfer',
      isPaid: false,
      specialInstructions: 'Custom size: 15 feet width, 7 feet height'
    },
    {
      id: 'ORD-005',
      customerName: 'Mohamed Imran',
      customerEmail: 'imran@example.com',
      customerPhone: '+94 77 567 8901',
      date: '2025-06-10T10:00:00',
      status: 'cancelled',
      cancelledDate: '2025-06-11T09:30:00',
      cancelReason: 'Customer requested cancellation',
      total: 18500,
      items: [
        { id: 'PROD-004', name: 'Decorative Metal Wall Art', quantity: 1, price: 18500 }
      ],
      deliveryAddress: '56 Palm Gardens, Galle',
      paymentMethod: 'card',
      isPaid: true,
      refunded: true
    }
  ];

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') {
      return matchesSearch;
    } else {
      return matchesSearch && order.status === activeTab;
    }
  });

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-gray-500">{t('orderStatus.pending')}</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500 hover:bg-blue-600">{t('orderStatus.processing')}</Badge>;
      case 'shipped':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">{t('orderStatus.shipped')}</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500 hover:bg-green-600">{t('orderStatus.delivered')}</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 hover:bg-red-600">{t('orderStatus.cancelled')}</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  // Get payment badge
  const getPaymentBadge = (isPaid) => {
    if (isPaid) {
      return <Badge variant="outline" className="border-green-500 text-green-500">{t('adminOrders.paid')}</Badge>;
    } else {
      return <Badge variant="outline" className="border-yellow-500 text-yellow-500">{t('adminOrders.unpaid')}</Badge>;
    }
  };

  // Format payment method
  const formatPaymentMethod = (method) => {
    switch (method) {
      case 'card':
        return t('paymentMethod.card');
      case 'bank_transfer':
        return t('paymentMethod.bankTransfer');
      case 'cash_on_delivery':
        return t('paymentMethod.cashOnDelivery');
      default:
        return method;
    }
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>{t('adminOrders.title')} | Kamal Iron Works</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('adminOrders.title')}</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          {t('adminOrders.exportOrders')}
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
                <TabsList className="grid grid-cols-5 lg:grid-cols-6">
                  <TabsTrigger value="pending">{t('orderStatus.pending')}</TabsTrigger>
                  <TabsTrigger value="processing">{t('orderStatus.processing')}</TabsTrigger>
                  <TabsTrigger value="shipped">{t('orderStatus.shipped')}</TabsTrigger>
                  <TabsTrigger value="delivered">{t('orderStatus.delivered')}</TabsTrigger>
                  <TabsTrigger value="cancelled">{t('orderStatus.cancelled')}</TabsTrigger>
                  <TabsTrigger value="all" className="hidden lg:inline-flex">{t('adminOrders.tabs.all')}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">{t('adminOrders.noOrders')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="bg-gray-50 border-b pb-3">
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      {getStatusBadge(order.status)}
                      {getPaymentBadge(order.isPaid)}
                    </div>
                    <CardDescription>
                      {format(new Date(order.date), 'PPp')}
                    </CardDescription>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <p className="text-lg font-bold">Rs. {order.total.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{order.items.length} {t('adminOrders.items')}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Customer info */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">{t('adminOrders.customer')}</p>
                    <p className="font-medium">{order.customerName}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-3.5 w-3.5 mr-1" />
                      <span>{order.customerEmail}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-3.5 w-3.5 mr-1" />
                      <span>{order.customerPhone}</span>
                    </div>
                  </div>
                  
                  {/* Shipping info */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">{t('adminOrders.shipping')}</p>
                    <div className="flex items-start">
                      <MapPin className="h-3.5 w-3.5 mt-0.5 mr-1 text-gray-500" />
                      <span className="text-sm">{order.deliveryAddress}</span>
                    </div>
                    
                    {order.status === 'shipped' && (
                      <>
                        <div className="flex items-center text-sm">
                          <Truck className="h-3.5 w-3.5 mr-1 text-gray-500" />
                          <span>{t('adminOrders.shippedOn')}: {format(new Date(order.shippedDate), 'PP')}</span>
                        </div>
                        {order.trackingNumber && (
                          <div className="flex items-center text-sm">
                            <PackageCheck className="h-3.5 w-3.5 mr-1 text-gray-500" />
                            <span>{t('adminOrders.tracking')}: {order.trackingNumber}</span>
                          </div>
                        )}
                        {order.estimatedDelivery && (
                          <div className="flex items-center text-sm">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                            <span>{t('adminOrders.eta')}: {format(new Date(order.estimatedDelivery), 'PP')}</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    {order.status === 'delivered' && (
                      <div className="flex items-center text-sm">
                        <Check className="h-3.5 w-3.5 mr-1 text-green-600" />
                        <span>{t('adminOrders.deliveredOn')}: {format(new Date(order.deliveredDate), 'PP')}</span>
                      </div>
                    )}
                    
                    {order.status === 'cancelled' && order.cancelReason && (
                      <div className="flex items-start">
                        <span className="text-sm text-red-600">{t('adminOrders.cancelReason')}: {order.cancelReason}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Payment info */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">{t('adminOrders.payment')}</p>
                    <div className="flex items-center">
                      <FileText className="h-3.5 w-3.5 mr-1 text-gray-500" />
                      <span className="text-sm">{formatPaymentMethod(order.paymentMethod)}</span>
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-3.5 w-3.5 mr-1 text-gray-500" />
                      <span className="text-sm">{order.isPaid ? t('adminOrders.paidStatus') : t('adminOrders.unpaidStatus')}</span>
                    </div>
                    {order.status === 'cancelled' && order.refunded && (
                      <div className="flex items-center">
                        <Check className="h-3.5 w-3.5 mr-1 text-green-600" />
                        <span className="text-sm text-green-600">{t('adminOrders.refunded')}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                {/* Order items */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">{t('adminOrders.items')}</p>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={`${order.id}-${item.id}-${index}`} className="flex justify-between py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.id} × {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                          <p className="text-sm text-gray-500">Rs. {item.price.toLocaleString()} {t('adminOrders.each')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {order.specialInstructions && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm font-medium text-gray-700">{t('adminOrders.specialInstructions')}</p>
                    <p className="text-sm mt-1">{order.specialInstructions}</p>
                  </div>
                )}
                
                <div className="mt-4 pt-3 border-t flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    {t('common.view')}
                  </Button>
                  
                  {order.status === 'pending' && (
                    <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Clock className="h-4 w-4 mr-1" />
                      {t('adminOrders.processOrder')}
                    </Button>
                  )}
                  
                  {order.status === 'processing' && (
                    <Button variant="default" size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                      <Truck className="h-4 w-4 mr-1" />
                      {t('adminOrders.markShipped')}
                    </Button>
                  )}
                  
                  {order.status === 'shipped' && (
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      <Check className="h-4 w-4 mr-1" />
                      {t('adminOrders.markDelivered')}
                    </Button>
                  )}
                  
                  {!order.isPaid && order.status !== 'cancelled' && (
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      <Tag className="h-4 w-4 mr-1" />
                      {t('adminOrders.markPaid')}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
