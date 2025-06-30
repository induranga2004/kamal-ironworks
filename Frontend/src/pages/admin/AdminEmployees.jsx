import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Briefcase, 
  Calendar, 
  Clock,
  AlertCircle,
  MapPin
} from 'lucide-react';

const AdminEmployees = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  
  // Sample data - would come from API in production
  const employees = [
    {
      id: 1,
      name: 'Sunil Perera',
      email: 'sunil.perera@kamaliron.com',
      phone: '+94 77 123 4567',
      position: 'Senior Metal Fabricator',
      department: 'production',
      status: 'active',
      joinDate: '2020-05-15',
      avatar: 'https://i.pravatar.cc/300?img=11',
      currentTasks: 2,
      completedTasks: 254,
      address: 'No. 45, Main Street, Colombo 07'
    },
    {
      id: 2,
      name: 'Kamala Silva',
      email: 'kamala.silva@kamaliron.com',
      phone: '+94 77 234 5678',
      position: 'Sales Manager',
      department: 'sales',
      status: 'active',
      joinDate: '2021-02-20',
      avatar: 'https://i.pravatar.cc/300?img=5',
      currentTasks: 1,
      completedTasks: 185,
      address: 'No. 23, Lake Road, Colombo 05'
    },
    {
      id: 3,
      name: 'Malik Fernando',
      email: 'malik.fernando@kamaliron.com',
      phone: '+94 77 345 6789',
      position: 'Welder',
      department: 'production',
      status: 'active',
      joinDate: '2022-01-10',
      avatar: 'https://i.pravatar.cc/300?img=12',
      currentTasks: 3,
      completedTasks: 112,
      address: 'No. 7, Temple Lane, Colombo 10'
    },
    {
      id: 4,
      name: 'Priya Bandara',
      email: 'priya.bandara@kamaliron.com',
      phone: '+94 77 456 7890',
      position: 'Administrative Assistant',
      department: 'admin',
      status: 'active',
      joinDate: '2021-11-05',
      avatar: 'https://i.pravatar.cc/300?img=3',
      currentTasks: 0,
      completedTasks: 95,
      address: 'No. 12, Park Street, Colombo 03'
    },
    {
      id: 5,
      name: 'Raj Patel',
      email: 'raj.patel@kamaliron.com',
      phone: '+94 77 567 8901',
      position: 'Junior Designer',
      department: 'design',
      status: 'inactive',
      joinDate: '2023-03-15',
      avatar: 'https://i.pravatar.cc/300?img=15',
      currentTasks: 0,
      completedTasks: 45,
      address: 'No. 34, Hill Street, Colombo 06'
    },
    {
      id: 6,
      name: 'Anita Gomez',
      email: 'anita.gomez@kamaliron.com',
      phone: '+94 77 678 9012',
      position: 'Head of Design',
      department: 'design',
      status: 'active',
      joinDate: '2019-08-20',
      avatar: 'https://i.pravatar.cc/300?img=9',
      currentTasks: 1,
      completedTasks: 312,
      address: 'No. 56, Ocean View, Colombo 04'
    },
    {
      id: 7,
      name: 'David Kumar',
      email: 'david.kumar@kamaliron.com',
      phone: '+94 77 789 0123',
      position: 'Installation Specialist',
      department: 'installation',
      status: 'active',
      joinDate: '2021-05-12',
      avatar: 'https://i.pravatar.cc/300?img=13',
      currentTasks: 2,
      completedTasks: 167,
      address: 'No. 78, River Road, Colombo 08'
    }
  ];

  // Filter employees based on search term and selected department
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm);
    
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Calculate years of service
  const calculateYearsOfService = (joinDateString) => {
    const joinDate = new Date(joinDateString);
    const now = new Date();
    let years = now.getFullYear() - joinDate.getFullYear();
    
    // Adjust years if join date hasn't occurred this year yet
    if (now.getMonth() < joinDate.getMonth() || 
        (now.getMonth() === joinDate.getMonth() && now.getDate() < joinDate.getDate())) {
      years--;
    }
    
    return years;
  };

  // Get status badge based on employee status
  const getStatusBadge = (status) => {
    return status === 'active' ? (
      <Badge className="bg-green-500">{t('adminEmployees.statuses.active')}</Badge>
    ) : (
      <Badge variant="secondary">{t('adminEmployees.statuses.inactive')}</Badge>
    );
  };

  return (
    <>
      <Helmet>
        <title>{t('adminEmployees.pageTitle')} | Kamal Iron Works</title>
        <meta name="description" content={t('adminEmployees.pageDescription')} />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('adminEmployees.title')}</h1>
          <p className="text-muted-foreground">{t('adminEmployees.subtitle')}</p>
        </div>
        <Separator className="my-6" />
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder={t('adminEmployees.searchPlaceholder')}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Tabs defaultValue={selectedDepartment} onValueChange={setSelectedDepartment} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">{t('adminEmployees.departments.all')}</TabsTrigger>
                <TabsTrigger value="production">{t('adminEmployees.departments.production')}</TabsTrigger>
                <TabsTrigger value="design">{t('adminEmployees.departments.design')}</TabsTrigger>
                <TabsTrigger value="installation">{t('adminEmployees.departments.installation')}</TabsTrigger>
                <TabsTrigger value="sales">{t('adminEmployees.departments.sales')}</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" />
              {t('adminEmployees.addEmployee')}
            </Button>
          </div>
        </div>
        
        {/* Employees List */}
        <div className="bg-white rounded-md border">
          <div className="grid grid-cols-12 gap-2 p-4 font-medium text-gray-500 border-b">
            <div className="col-span-4 md:col-span-3">{t('adminEmployees.table.employee')}</div>
            <div className="col-span-4 md:col-span-3">{t('adminEmployees.table.position')}</div>
            <div className="hidden md:block md:col-span-2 text-center">{t('adminEmployees.table.tasks')}</div>
            <div className="col-span-2 text-center">{t('adminEmployees.table.service')}</div>
            <div className="col-span-2 text-center">{t('adminEmployees.table.actions')}</div>
          </div>
          
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <div key={employee.id} className="grid grid-cols-12 gap-2 p-4 border-b last:border-0 items-center hover:bg-gray-50">
                <div className="col-span-4 md:col-span-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={employee.avatar} alt={employee.name} />
                      <AvatarFallback>{employee.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{employee.name}</p>
                      <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                        <p className="text-xs text-gray-500 truncate max-w-[150px]">{employee.email}</p>
                        {getStatusBadge(employee.status)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-4 md:col-span-3">
                  <div className="space-y-1">
                    <p className="text-sm">{employee.position}</p>
                    <div className="flex items-center text-xs">
                      <Briefcase className="h-3 w-3 mr-1 text-gray-400" />
                      <span className="capitalize">{t(`adminEmployees.departments.${employee.department}`)}</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Phone className="h-3 w-3 mr-1 text-gray-400" />
                      <span>{employee.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:block md:col-span-2 text-center">
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{employee.currentTasks}</span> {t('adminEmployees.current')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {employee.completedTasks} {t('adminEmployees.completed')}
                    </p>
                  </div>
                </div>
                
                <div className="col-span-2 text-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {calculateYearsOfService(employee.joinDate)} {t('adminEmployees.years')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t('adminEmployees.since')} {formatDate(employee.joinDate)}
                    </p>
                  </div>
                </div>
                
                <div className="col-span-2 flex justify-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <AlertCircle className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <h3 className="text-lg font-medium mb-1">{t('adminEmployees.noEmployeesFound')}</h3>
              <p className="text-gray-500 text-sm">{t('adminEmployees.tryDifferentSearch')}</p>
            </div>
          )}
        </div>
        
        {/* Pagination (simplified version) */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {t('adminEmployees.showing')} {filteredEmployees.length} {t('adminEmployees.of')} {employees.length} {t('adminEmployees.employees')}
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              {t('adminEmployees.previous')}
            </Button>
            <Button variant="outline" size="sm" className="bg-black text-white">1</Button>
            <Button variant="outline" size="sm" disabled>
              {t('adminEmployees.next')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEmployees;
