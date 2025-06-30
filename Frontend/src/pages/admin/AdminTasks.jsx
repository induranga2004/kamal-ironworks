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
  CheckCircle,
  Clock, 
  Calendar,
  UserCheck,
  Clipboard,
  AlertCircle,
  MessageCircle
} from 'lucide-react';
import { format } from 'date-fns';

const AdminTasks = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  
  // Sample data - would come from API in production
  const tasks = [
    {
      id: 'TASK-001',
      title: 'Install security grills at Silva residence',
      description: 'Install 5 window grills and 1 door grill',
      status: 'assigned',
      priority: 'high',
      dueDate: '2025-06-28T17:00:00',
      createdDate: '2025-06-20T09:30:00',
      assignedTo: {
        id: 1,
        name: 'Kamal Perera',
        avatar: 'https://i.pravatar.cc/300?img=11',
        position: 'Senior Fabricator'
      },
      client: {
        name: 'Mrs. Silva',
        address: '45 Lake Road, Colombo 06',
        phone: '+94 77 234 5678'
      },
      progress: 0
    },
    {
      id: 'TASK-002',
      title: 'Repair gate motor at Fernando office',
      description: 'Fix automatic sliding gate motor that stopped working',
      status: 'in_progress',
      priority: 'urgent',
      dueDate: '2025-06-25T12:00:00',
      createdDate: '2025-06-19T14:00:00',
      assignedTo: {
        id: 2,
        name: 'Sunil Jayawardena',
        avatar: 'https://i.pravatar.cc/300?img=12',
        position: 'Technical Specialist'
      },
      client: {
        name: 'Fernando & Sons Ltd',
        address: '120 Main Street, Kandy',
        phone: '+94 77 345 6789'
      },
      progress: 50
    },
    {
      id: 'TASK-003',
      title: 'Fabricate custom steel table frame',
      description: 'Fabricate metal frame for glass-top dining table as per design',
      status: 'in_progress',
      priority: 'medium',
      dueDate: '2025-07-05T17:00:00',
      createdDate: '2025-06-15T11:45:00',
      assignedTo: {
        id: 3,
        name: 'Deepa Kumarasinghe',
        avatar: 'https://i.pravatar.cc/300?img=13',
        position: 'Metal Fabricator'
      },
      client: {
        name: 'Mr. Gunarathna',
        address: '78 Beach Road, Negombo',
        phone: '+94 77 456 7890'
      },
      progress: 30
    },
    {
      id: 'TASK-004',
      title: 'Install staircase railings at Hill Residences',
      description: 'Install pre-fabricated stainless steel railings for three floors',
      status: 'completed',
      priority: 'high',
      dueDate: '2025-06-18T17:00:00',
      createdDate: '2025-06-10T09:00:00',
      completedDate: '2025-06-17T16:00:00',
      assignedTo: {
        id: 4,
        name: 'Lakmal Dissanayake',
        avatar: 'https://i.pravatar.cc/300?img=14',
        position: 'Installation Specialist'
      },
      client: {
        name: 'Hill Residences',
        address: '23 Hill Street, Nuwara Eliya',
        phone: '+94 77 567 8901'
      },
      progress: 100
    },
    {
      id: 'TASK-005',
      title: 'Measure and quote for balcony railing',
      description: 'Visit site to take measurements and prepare quotation for balcony railing',
      status: 'pending',
      priority: 'medium',
      dueDate: '2025-06-27T10:00:00',
      createdDate: '2025-06-22T13:30:00',
      client: {
        name: 'Mrs. Jayanthi',
        address: '56 Palm Gardens, Galle',
        phone: '+94 77 678 9012'
      },
      progress: 0
    }
  ];

  // Filter tasks based on search term and tab
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.assignedTo?.name.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    if (activeTab === 'active') {
      return matchesSearch && ['pending', 'assigned', 'in_progress'].includes(task.status);
    } else if (activeTab === 'completed') {
      return matchesSearch && task.status === 'completed';
    } else if (activeTab === 'all') {
      return matchesSearch;
    }
  });

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-gray-500">{t('status.pending')}</Badge>;
      case 'assigned':
        return <Badge className="bg-blue-500 hover:bg-blue-600">{t('status.assigned')}</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">{t('status.inProgress')}</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">{t('status.completed')}</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="outline" className="border-red-500 text-red-500">{t('priority.urgent')}</Badge>;
      case 'high':
        return <Badge variant="outline" className="border-orange-500 text-orange-500">{t('priority.high')}</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">{t('priority.medium')}</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-green-500 text-green-500">{t('priority.low')}</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  // Calculate days left
  const getDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>{t('adminTasks.title')} | Kamal Iron Works</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('adminTasks.title')}</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t('adminTasks.newTask')}
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
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="active">{t('adminTasks.tabs.active')}</TabsTrigger>
                  <TabsTrigger value="completed">{t('adminTasks.tabs.completed')}</TabsTrigger>
                  <TabsTrigger value="all">{t('adminTasks.tabs.all')}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredTasks.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">{t('adminTasks.noTasks')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks.map((task) => (
            <Card key={task.id}>
              <CardHeader className="bg-gray-50 border-b pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      {getStatusBadge(task.status)}
                      {getPriorityBadge(task.priority)}
                    </div>
                    <CardDescription>{task.id}</CardDescription>
                  </div>
                  {task.status !== 'completed' && (
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        getDaysLeft(task.dueDate) < 0 ? 'text-red-600' : 
                        getDaysLeft(task.dueDate) <= 2 ? 'text-orange-600' : 
                        'text-gray-600'
                      }`}>
                        {getDaysLeft(task.dueDate) < 0 
                          ? t('adminTasks.overdue', { days: Math.abs(getDaysLeft(task.dueDate)) })
                          : getDaysLeft(task.dueDate) === 0 
                          ? t('adminTasks.dueToday')
                          : t('adminTasks.daysLeft', { days: getDaysLeft(task.dueDate) })
                        }
                      </div>
                      <p className="text-xs text-gray-500">
                        {format(new Date(task.dueDate), 'PP')}
                      </p>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Task details */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Clipboard className="h-4 w-4 mt-1 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">{t('adminTasks.description')}</p>
                        <p className="text-sm">{task.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 mt-1 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">{t('adminTasks.created')}</p>
                        <p className="text-sm">{format(new Date(task.createdDate), 'PP')}</p>
                      </div>
                    </div>
                    {task.status === 'completed' && task.completedDate && (
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-1 text-green-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">{t('adminTasks.completed')}</p>
                          <p className="text-sm">{format(new Date(task.completedDate), 'PP')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Assignment info */}
                  <div className="space-y-2">
                    {task.assignedTo ? (
                      <div className="flex items-start gap-2">
                        <UserCheck className="h-4 w-4 mt-1 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">{t('adminTasks.assignedTo')}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.assignedTo.avatar} />
                              <AvatarFallback>{task.assignedTo.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{task.assignedTo.name}</p>
                              <p className="text-xs text-gray-500">{task.assignedTo.position}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 mt-1 text-yellow-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">{t('adminTasks.unassigned')}</p>
                          <Button size="sm" variant="outline" className="mt-1">
                            {t('adminTasks.assign')}
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {task.status !== 'pending' && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-500 mb-1">{t('adminTasks.progress')}</p>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500" 
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-right mt-1 text-gray-500">{task.progress}%</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Client info */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">{t('adminTasks.clientInfo')}</p>
                    <p className="text-sm font-medium">{task.client.name}</p>
                    <p className="text-sm text-gray-600">{task.client.address}</p>
                    <p className="text-sm text-gray-600">{task.client.phone}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {t('common.message')}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    {t('common.edit')}
                  </Button>
                  {task.status !== 'completed' && (
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {task.status === 'in_progress' ? t('adminTasks.complete') : t('adminTasks.updateStatus')}
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

export default AdminTasks;
