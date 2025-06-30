import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
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
  Calendar, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

const AdminUsers = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  
  // Sample data - would come from API in production
  const users = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+94 77 123 4567',
      role: 'customer',
      status: 'active',
      lastLogin: '2025-06-20T10:30:00',
      registeredDate: '2024-03-15T14:20:00',
      avatar: 'https://i.pravatar.cc/300?img=1',
      orders: 5
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+94 77 234 5678',
      role: 'customer',
      status: 'active',
      lastLogin: '2025-06-22T08:45:00',
      registeredDate: '2023-11-20T09:15:00',
      avatar: 'https://i.pravatar.cc/300?img=5',
      orders: 12
    },
    {
      id: 3,
      name: 'Amal Perera',
      email: 'amal.perera@kamaliron.com',
      phone: '+94 77 345 6789',
      role: 'admin',
      status: 'active',
      lastLogin: '2025-06-23T09:15:00',
      registeredDate: '2022-05-10T10:00:00',
      avatar: 'https://i.pravatar.cc/300?img=12',
      orders: 0
    },
    {
      id: 4,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      phone: '+94 77 456 7890',
      role: 'customer',
      status: 'inactive',
      lastLogin: '2025-05-15T14:20:00',
      registeredDate: '2023-08-25T16:30:00',
      avatar: 'https://i.pravatar.cc/300?img=3',
      orders: 1
    },
    {
      id: 5,
      name: 'Nimal Silva',
      email: 'nimal.silva@kamaliron.com',
      phone: '+94 77 567 8901',
      role: 'staff',
      status: 'active',
      lastLogin: '2025-06-23T08:00:00',
      registeredDate: '2022-09-12T11:45:00',
      avatar: 'https://i.pravatar.cc/300?img=11',
      orders: 0
    },
    {
      id: 6,
      name: 'Emily Wilson',
      email: 'emily.wilson@example.com',
      phone: '+94 77 678 9012',
      role: 'customer',
      status: 'active',
      lastLogin: '2025-06-21T16:30:00',
      registeredDate: '2024-01-08T13:20:00',
      avatar: 'https://i.pravatar.cc/300?img=9',
      orders: 3
    },
    {
      id: 7,
      name: 'David Clark',
      email: 'david.clark@example.com',
      phone: '+94 77 789 0123',
      role: 'customer',
      status: 'inactive',
      lastLogin: '2025-04-10T11:45:00',
      registeredDate: '2023-12-15T15:10:00',
      avatar: 'https://i.pravatar.cc/300?img=4',
      orders: 2
    }
  ];

  // Filter users based on search term and selected role
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Format time since last login
  const formatLastLogin = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return t('adminUsers.today');
    } else if (diffDays === 1) {
      return t('adminUsers.yesterday');
    } else {
      return t('adminUsers.daysAgo', { days: diffDays });
    }
  };

  // Get status badge based on user status
  const getStatusBadge = (status) => {
    return status === 'active' ? (
      <Badge className="bg-green-500">{t('adminUsers.statuses.active')}</Badge>
    ) : (
      <Badge variant="secondary">{t('adminUsers.statuses.inactive')}</Badge>
    );
  };

  return (
    <>
      <Helmet>
        <title>{t('adminUsers.pageTitle')} | Kamal Iron Works</title>
        <meta name="description" content={t('adminUsers.pageDescription')} />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('adminUsers.title')}</h1>
          <p className="text-muted-foreground">{t('adminUsers.subtitle')}</p>
        </div>
        <Separator className="my-6" />
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder={t('adminUsers.searchPlaceholder')}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Tabs defaultValue={selectedRole} onValueChange={setSelectedRole} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">{t('adminUsers.roles.all')}</TabsTrigger>
                <TabsTrigger value="customer">{t('adminUsers.roles.customer')}</TabsTrigger>
                <TabsTrigger value="staff">{t('adminUsers.roles.staff')}</TabsTrigger>
                <TabsTrigger value="admin">{t('adminUsers.roles.admin')}</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" />
              {t('adminUsers.addUser')}
            </Button>
          </div>
        </div>
        
        {/* Users List */}
        <div className="bg-white rounded-md border">
          <div className="grid grid-cols-12 gap-2 p-4 font-medium text-gray-500 border-b">
            <div className="col-span-6 sm:col-span-3">{t('adminUsers.table.user')}</div>
            <div className="hidden sm:block sm:col-span-3">{t('adminUsers.table.contact')}</div>
            <div className="col-span-3 sm:col-span-2 text-center">{t('adminUsers.table.role')}</div>
            <div className="hidden sm:block sm:col-span-2 text-center">{t('adminUsers.table.lastLogin')}</div>
            <div className="col-span-3 sm:col-span-2 text-center">{t('adminUsers.table.actions')}</div>
          </div>
          
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="grid grid-cols-12 gap-2 p-4 border-b last:border-0 items-center">
                <div className="col-span-6 sm:col-span-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500">{user.email}</p>
                        {getStatusBadge(user.status)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="hidden sm:block sm:col-span-3">
                  <div className="space-y-1">
                    <div className="flex items-center text-xs">
                      <Phone className="h-3 w-3 mr-1 text-gray-400" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                      <span>{t('adminUsers.registered')}: {formatDate(user.registeredDate)}</span>
                    </div>
                    {user.role === 'customer' && (
                      <div className="flex items-center text-xs">
                        <CheckCircle className="h-3 w-3 mr-1 text-gray-400" />
                        <span>{user.orders} {t('adminUsers.orders')}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="col-span-3 sm:col-span-2 text-center">
                  <Badge variant="outline" className="capitalize">
                    {t(`adminUsers.roles.${user.role}`)}
                  </Badge>
                </div>
                
                <div className="hidden sm:block sm:col-span-2 text-center">
                  <span className="text-xs">
                    {formatLastLogin(user.lastLogin)}
                  </span>
                </div>
                
                <div className="col-span-3 sm:col-span-2 flex justify-center space-x-2">
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
              <XCircle className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <h3 className="text-lg font-medium mb-1">{t('adminUsers.noUsersFound')}</h3>
              <p className="text-gray-500 text-sm">{t('adminUsers.tryDifferentSearch')}</p>
            </div>
          )}
        </div>
        
        {/* Pagination (simplified version) */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {t('adminUsers.showing')} {filteredUsers.length} {t('adminUsers.of')} {users.length} {t('adminUsers.users')}
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              {t('adminUsers.previous')}
            </Button>
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm" disabled>
              {t('adminUsers.next')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
