import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Calendar, 
  Download, 
  DollarSign,
  ShoppingCart,
  Users,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';

// Placeholder components for charts - in a real app, use a chart library like Chart.js or Recharts
const ChartPlaceholder = ({ type, height = 300, title, description }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent>
      <div 
        className="w-full bg-gray-100 rounded-md flex items-center justify-center"
        style={{ height: `${height}px` }}
      >
        {type === 'bar' && <BarChart3 className="h-16 w-16 text-gray-400" />}
        {type === 'line' && <TrendingUp className="h-16 w-16 text-gray-400" />}
        {type === 'pie' && <PieChart className="h-16 w-16 text-gray-400" />}
        <span className="ml-2 text-gray-500">{title} ({type} chart)</span>
      </div>
    </CardContent>
  </Card>
);

const StatCard = ({ title, value, change, icon, description }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline">
            <h3 className="text-2xl font-bold">{value}</h3>
            {change && (
              <span className={`ml-2 text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {change}
              </span>
            )}
          </div>
          {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        </div>
        <div className="p-2 bg-gray-100 rounded-full">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const AdminAnalytics = () => {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('month');
  
  // Sample data - would come from API in production
  const todayDate = new Date();
  const stats = {
    revenue: {
      value: 'Rs. 875,450',
      change: '+12.5%',
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      description: `${t('adminAnalytics.comparedTo')} ${format(new Date(todayDate.setMonth(todayDate.getMonth() - 1)), 'MMMM')}`
    },
    orders: {
      value: '152',
      change: '+8.2%',
      icon: <ShoppingCart className="h-5 w-5 text-green-600" />,
      description: `${t('adminAnalytics.comparedTo')} ${format(new Date(todayDate.setMonth(todayDate.getMonth())), 'MMMM')}`
    },
    customers: {
      value: '48',
      change: '+15.3%',
      icon: <Users className="h-5 w-5 text-green-600" />,
      description: `${t('adminAnalytics.newCustomers')}`
    },
    averageTime: {
      value: '3.5 days',
      change: '-0.5 days',
      icon: <Clock className="h-5 w-5 text-green-600" />,
      description: t('adminAnalytics.fulfillmentTime')
    }
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>{t('adminAnalytics.title')} | Kamal Iron Works</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('adminAnalytics.title')}</h1>
        <div className="flex space-x-2">
          <div>
            <Tabs value={timeRange} onValueChange={setTimeRange}>
              <TabsList className="grid grid-cols-3 w-[300px]">
                <TabsTrigger value="week">{t('adminAnalytics.timeRanges.week')}</TabsTrigger>
                <TabsTrigger value="month">{t('adminAnalytics.timeRanges.month')}</TabsTrigger>
                <TabsTrigger value="year">{t('adminAnalytics.timeRanges.year')}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            {t('adminAnalytics.customRange')}
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            {t('adminAnalytics.exportReport')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title={t('adminAnalytics.revenue')} 
          value={stats.revenue.value} 
          change={stats.revenue.change} 
          icon={stats.revenue.icon}
          description={stats.revenue.description}
        />
        <StatCard 
          title={t('adminAnalytics.orders')} 
          value={stats.orders.value} 
          change={stats.orders.change} 
          icon={stats.orders.icon}
          description={stats.orders.description}
        />
        <StatCard 
          title={t('adminAnalytics.customers')} 
          value={stats.customers.value} 
          change={stats.customers.change} 
          icon={stats.customers.icon}
          description={stats.customers.description}
        />
        <StatCard 
          title={t('adminAnalytics.averageFulfillmentTime')} 
          value={stats.averageTime.value} 
          change={stats.averageTime.change} 
          icon={stats.averageTime.icon}
          description={stats.averageTime.description}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartPlaceholder 
          type="line" 
          title={t('adminAnalytics.revenueOverTime')}
          description={t('adminAnalytics.revenueDescription')}
        />
        <ChartPlaceholder 
          type="bar" 
          title={t('adminAnalytics.ordersOverTime')}
          description={t('adminAnalytics.ordersDescription')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartPlaceholder 
          type="pie" 
          title={t('adminAnalytics.productCategories')}
          description={t('adminAnalytics.categoriesDescription')}
          height={250}
        />
        <ChartPlaceholder 
          type="pie" 
          title={t('adminAnalytics.customerSegments')}
          description={t('adminAnalytics.segmentsDescription')}
          height={250}
        />
        <ChartPlaceholder 
          type="bar" 
          title={t('adminAnalytics.topPerformingProducts')}
          description={t('adminAnalytics.topProductsDescription')}
          height={250}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder 
          type="line" 
          title={t('adminAnalytics.websiteTraffic')}
          description={t('adminAnalytics.trafficDescription')}
        />
        <Card>
          <CardHeader>
            <CardTitle>{t('adminAnalytics.conversionMetrics')}</CardTitle>
            <CardDescription>{t('adminAnalytics.conversionDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['websiteVisitors', 'addToCart', 'checkoutStarted', 'purchases'].map((metric, index) => (
                <div key={metric} className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{t(`adminAnalytics.${metric}`)}</p>
                    <p className="text-sm font-medium">
                      {['1240', '310', '148', '92'][index]}
                      {index > 0 && (
                        <span className="ml-1 text-xs text-gray-500">
                          ({Math.round((['310', '148', '92'][index - 1] / ['1240', '310', '148'][index - 1]) * 100)}%)
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-black h-2 rounded-full" 
                      style={{ width: `${[100, 25, 12, 7.4][index]}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
