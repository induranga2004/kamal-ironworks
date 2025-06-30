import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  BarChart3, 
  CalendarClock,
  Users,
  Briefcase, 
  FileText, 
  MessageSquare, 
  Package, 
  ShoppingCart, 
  Tool, 
  TrendingUp,
  BarChart4,
  PieChart
} from 'lucide-react';

// Mock chart component - in a real app, use a chart library like Chart.js or Recharts
const ChartPlaceholder = ({ type, height = 300 }) => (
  <div 
    className="w-full bg-gray-100 rounded-md flex items-center justify-center"
    style={{ height: `${height}px` }}
  >
    {type === 'bar' && <BarChart4 className="h-16 w-16 text-gray-400" />}
    {type === 'line' && <TrendingUp className="h-16 w-16 text-gray-400" />}
    {type === 'pie' && <PieChart className="h-16 w-16 text-gray-400" />}
    <span className="ml-2 text-gray-500">Chart Placeholder ({type})</span>
  </div>
);

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState('week');
  
  // Sample data - would come from API in production
  const stats = [
    {
      title: t('adminDashboard.stats.orders'),
      value: '27',
      change: '+12%',
      trend: 'up',
      icon: <ShoppingCart className="h-8 w-8 text-green-600" />,
    },
    {
      title: t('adminDashboard.stats.revenue'),
      value: 'Rs. 324,500',
      change: '+8%',
      trend: 'up',
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    },
    {
      title: t('adminDashboard.stats.quotations'),
      value: '18',
      change: '+15%',
      trend: 'up',
      icon: <FileText className="h-8 w-8 text-yellow-600" />,
    },
    {
      title: t('adminDashboard.stats.appointments'),
      value: '32',
      change: '-3%',
      trend: 'down',
      icon: <CalendarClock className="h-8 w-8 text-pink-600" />,
    }
  ];

  // Recent activities data
  const recentActivities = [
    {
      id: 'act-1',
      type: 'order',
      title: 'New Order Received',
      description: 'Order #ORD-5421 for Custom Metal Gate',
      time: '30 minutes ago',
      icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
      id: 'act-2',
      type: 'quotation',
      title: 'Quotation Approved',
      description: 'Quote #QT-2354 for Metal Railings approved by client',
      time: '2 hours ago',
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: 'act-3',
      type: 'appointment',
      title: 'Appointment Scheduled',
      description: 'Site visit scheduled for tomorrow at 10:00 AM',
      time: '4 hours ago',
      icon: <CalendarClock className="h-4 w-4" />,
    },
    {
      id: 'act-4',
      type: 'task',
      title: 'Task Assigned',
      description: 'Metal welding task assigned to Sunil',
      time: '6 hours ago',
      icon: <Tool className="h-4 w-4" />,
    },
    {
      id: 'act-5',
      type: 'message',
      title: 'New Message',
      description: 'Client inquiry about custom metal furniture',
      time: 'Yesterday',
      icon: <MessageSquare className="h-4 w-4" />,
    }
  ];
  
  // Tasks data
  const tasks = [
    {
      id: 'task-1',
      title: 'Review and approve quotation requests',
      assignee: 'You',
      priority: 'high',
      dueDate: 'Today'
    },
    {
      id: 'task-2',
      title: 'Follow up with customers about delivered orders',
      assignee: 'Amal',
      priority: 'medium',
      dueDate: 'Today'
    },
    {
      id: 'task-3',
      title: 'Assign workers for the new project in Colombo',
      assignee: 'You',
      priority: 'high',
      dueDate: 'Tomorrow'
    },
    {
      id: 'task-4',
      title: 'Review inventory and place orders for materials',
      assignee: 'Nimal',
      priority: 'medium',
      dueDate: '24/06/2025'
    },
    {
      id: 'task-5',
      title: 'Prepare monthly performance report',
      assignee: 'You',
      priority: 'medium',
      dueDate: '30/06/2025'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('adminDashboard.pageTitle')} | Kamal Iron Works</title>
        <meta name="description" content={t('adminDashboard.pageDescription')} />
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('adminDashboard.title')}</h1>
            <p className="text-muted-foreground">{t('adminDashboard.subtitle')}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Tabs defaultValue={dateRange} onValueChange={setDateRange} className="w-[400px]">
              <TabsList>
                <TabsTrigger value="today">{t('adminDashboard.dateRanges.today')}</TabsTrigger>
                <TabsTrigger value="week">{t('adminDashboard.dateRanges.week')}</TabsTrigger>
                <TabsTrigger value="month">{t('adminDashboard.dateRanges.month')}</TabsTrigger>
                <TabsTrigger value="year">{t('adminDashboard.dateRanges.year')}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <Separator className="my-6" />
        
        {/* Stats Cards */}
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
                <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} {t('adminDashboard.fromLastPeriod')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Charts Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>{t('adminDashboard.salesOverview')}</CardTitle>
              <CardDescription>{t('adminDashboard.salesDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartPlaceholder type="bar" />
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>{t('adminDashboard.popularProducts')}</CardTitle>
              <CardDescription>{t('adminDashboard.popularProductsDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartPlaceholder type="pie" />
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activities and Tasks */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>{t('adminDashboard.recentActivities')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      {activity.icon}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="ghost" size="sm">
                  {t('adminDashboard.viewAll')}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>{t('adminDashboard.tasks')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">{task.title}</h4>
                        <span className={`rounded-full px-2 py-0.5 text-xs ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="mt-1 flex text-xs text-gray-500 gap-4">
                        <span>Assignee: {task.assignee}</span>
                        <span>Due: {task.dueDate}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      {t('adminDashboard.viewTask')}
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="ghost" size="sm">
                  {t('adminDashboard.viewAllTasks')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Access */}
        <Card>
          <CardHeader>
            <CardTitle>{t('adminDashboard.quickAccess')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-24 flex flex-col gap-2" asChild>
                <a href="/admin/orders">
                  <ShoppingCart className="h-5 w-5" />
                  {t('adminDashboard.manageOrders')}
                </a>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2" asChild>
                <a href="/admin/quotations">
                  <FileText className="h-5 w-5" />
                  {t('adminDashboard.manageQuotations')}
                </a>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2" asChild>
                <a href="/admin/employees">
                  <Briefcase className="h-5 w-5" />
                  {t('adminDashboard.manageEmployees')}
                </a>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2" asChild>
                <a href="/admin/users">
                  <Users className="h-5 w-5" />
                  {t('adminDashboard.manageUsers')}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminDashboard;
