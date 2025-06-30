import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { 
  BarChart, 
  Calendar,
  Clock,
  DollarSign, 
  FileText, 
  MessageSquare, 
  Package, 
  ShoppingCart, 
  Tool, 
  User,
} from 'lucide-react';

const DashboardHome = () => {
  const { t } = useTranslation();
  
  // Sample data - would come from API in production
  const stats = [
    {
      title: t('dashboard.stats.appointments'),
      value: '5',
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      change: '+20%',
      trend: 'up',
    },
    {
      title: t('dashboard.stats.quotations'),
      value: '3',
      icon: <FileText className="h-8 w-8 text-green-600" />,
      change: '+15%',
      trend: 'up',
    },
    {
      title: t('dashboard.stats.orders'),
      value: '2',
      icon: <ShoppingCart className="h-8 w-8 text-purple-600" />,
      change: '0%',
      trend: 'neutral',
    },
    {
      title: t('dashboard.stats.messages'),
      value: '8',
      icon: <MessageSquare className="h-8 w-8 text-yellow-600" />,
      change: '+3',
      trend: 'up',
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      title: 'Site Measurement for Metal Gate',
      date: '2023-09-15',
      time: '10:00 AM',
      status: 'confirmed',
    },
    {
      id: 2,
      title: 'Installation of Window Grills',
      date: '2023-09-18',
      time: '2:00 PM',
      status: 'pending',
    },
    {
      id: 3,
      title: 'Follow-up Consultation',
      date: '2023-09-22',
      time: '11:30 AM',
      status: 'confirmed',
    },
  ];

  const recentQuotations = [
    {
      id: 101,
      title: 'Custom Metal Gate Installation',
      date: '2023-09-10',
      amount: 450.00,
      status: 'pending',
    },
    {
      id: 102,
      title: 'Balcony Railing Project',
      date: '2023-09-05',
      amount: 280.00,
      status: 'approved',
    },
    {
      id: 103,
      title: 'Security Grills for Windows',
      date: '2023-08-28',
      amount: 180.00,
      status: 'pending',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-2023-001',
      product: 'Decorative Metal Fence',
      date: '2023-09-08',
      amount: 320.00,
      status: 'processing',
    },
    {
      id: 'ORD-2023-002',
      product: 'Custom Coffee Table',
      date: '2023-09-01',
      amount: 250.00,
      status: 'shipped',
    },
  ];

  // Function to get status badge class
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'approved':
      case 'completed':
      case 'shipped':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('dashboard.home.pageTitle')} | Kamal Iron Works</title>
      </Helmet>

      <div className="space-y-6">
        {/* Dashboard Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.home.welcome')}</h1>
          <p className="text-muted-foreground">
            {t('dashboard.home.summary')}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${
                  stat.trend === 'up' 
                    ? 'text-green-500' 
                    : stat.trend === 'down' 
                    ? 'text-red-500' 
                    : 'text-gray-500'
                }`}>
                  {stat.change} {t('dashboard.stats.fromLastMonth')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.quickActions.title')}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {t('dashboard.quickActions.scheduleAppointment')}
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {t('dashboard.quickActions.requestQuote')}
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              {t('dashboard.quickActions.browseProducts')}
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              {t('dashboard.quickActions.contactSupport')}
            </Button>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Upcoming Appointments */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t('dashboard.appointments.upcoming')}</CardTitle>
              <Button variant="link" size="sm" className="text-sm">
                {t('dashboard.viewAll')}
              </Button>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-start space-x-4">
                      <div className="rounded-full bg-gray-100 p-2">
                        <Clock className="h-5 w-5 text-gray-700" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{appointment.title}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  {t('dashboard.appointments.none')}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent Quotations */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t('dashboard.quotations.recent')}</CardTitle>
              <Button variant="link" size="sm" className="text-sm">
                {t('dashboard.viewAll')}
              </Button>
            </CardHeader>
            <CardContent>
              {recentQuotations.length > 0 ? (
                <div className="space-y-4">
                  {recentQuotations.map((quotation) => (
                    <div key={quotation.id} className="flex items-start space-x-4">
                      <div className="rounded-full bg-gray-100 p-2">
                        <FileText className="h-5 w-5 text-gray-700" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{quotation.title}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(quotation.status)}`}>
                            {quotation.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">
                            {new Date(quotation.date).toLocaleDateString()}
                          </span>
                          <span className="font-medium">
                            ${quotation.amount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  {t('dashboard.quotations.none')}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t('dashboard.orders.recent')}</CardTitle>
              <Button variant="link" size="sm" className="text-sm">
                {t('dashboard.viewAll')}
              </Button>
            </CardHeader>
            <CardContent>
              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-start space-x-4">
                      <div className="rounded-full bg-gray-100 p-2">
                        <Package className="h-5 w-5 text-gray-700" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{order.product}</p>
                            <p className="text-xs text-gray-500">{order.id}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">
                            {new Date(order.date).toLocaleDateString()}
                          </span>
                          <span className="font-medium">
                            ${order.amount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  {t('dashboard.orders.none')}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t('dashboard.messages.recent')}</CardTitle>
              <Button variant="link" size="sm" className="text-sm">
                {t('dashboard.viewAll')}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-gray-100 p-2">
                    <MessageSquare className="h-5 w-5 text-gray-700" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">Customer Support</p>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      Thank you for your recent inquiry. Your quotation has been processed and is now ready for review...
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date().toLocaleDateString()} at 2:30 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-gray-100 p-2">
                    <MessageSquare className="h-5 w-5 text-gray-700" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">Order Department</p>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      Your order #ORD-2023-002 has been shipped. You can track your package using the following tracking number...
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date().toLocaleDateString()} at 10:15 AM
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative ml-3">
              <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-gray-200" />
              <div className="space-y-6">
                <div className="relative flex items-start">
                  <div className="absolute left-0 mt-1 -ml-3.5 bg-white">
                    <div className="h-7 w-7 flex items-center justify-center rounded-full border border-gray-200 bg-white">
                      <FileText className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <p className="font-medium">Quotation Approved</p>
                    <p className="text-sm text-gray-500">Your quotation #102 for the Balcony Railing Project has been approved.</p>
                    <p className="text-xs text-gray-400 mt-1">Today at 11:32 AM</p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="absolute left-0 mt-1 -ml-3.5 bg-white">
                    <div className="h-7 w-7 flex items-center justify-center rounded-full border border-gray-200 bg-white">
                      <Package className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <p className="font-medium">Order Shipped</p>
                    <p className="text-sm text-gray-500">Your order #ORD-2023-002 for the Custom Coffee Table has been shipped.</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday at 3:45 PM</p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="absolute left-0 mt-1 -ml-3.5 bg-white">
                    <div className="h-7 w-7 flex items-center justify-center rounded-full border border-gray-200 bg-white">
                      <Calendar className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <p className="font-medium">Appointment Confirmed</p>
                    <p className="text-sm text-gray-500">Your appointment for Site Measurement has been confirmed for September 15.</p>
                    <p className="text-xs text-gray-400 mt-1">2 days ago at 9:20 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardHome;
