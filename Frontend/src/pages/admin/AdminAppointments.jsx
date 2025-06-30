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
  MoreHorizontal, 
  Mail, 
  Phone, 
  Calendar, 
  Clock,
  MapPin,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { format } from 'date-fns';

const AdminAppointments = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Sample data - would come from API in production
  const appointments = [
    {
      id: 'APT-001',
      customerName: 'Rajiv Perera',
      customerEmail: 'rajiv.perera@example.com',
      customerPhone: '+94 77 123 4567',
      date: '2025-06-25T10:00:00',
      duration: 60,
      service: 'Site Inspection',
      status: 'confirmed',
      notes: 'Customer needs metal gate installation assessment',
      location: 'Colombo 5, Main Street 123'
    },
    {
      id: 'APT-002',
      customerName: 'Amali Fernando',
      customerEmail: 'amali@example.com',
      customerPhone: '+94 77 234 5678',
      date: '2025-06-26T14:30:00',
      duration: 45,
      service: 'Design Consultation',
      status: 'confirmed',
      notes: 'Interior staircase railing design discussion',
      location: 'Office Location'
    },
    {
      id: 'APT-003',
      customerName: 'Mohamed Imran',
      customerEmail: 'imran@example.com',
      customerPhone: '+94 77 345 6789',
      date: '2025-06-24T09:15:00',
      duration: 30,
      service: 'Follow-up Meeting',
      status: 'completed',
      notes: 'Project completion verification',
      location: 'Kandy, Hill Street 45'
    },
    {
      id: 'APT-004',
      customerName: 'Nilanthi Silva',
      customerEmail: 'nilanthi@example.com',
      customerPhone: '+94 77 456 7890',
      date: '2025-06-30T11:30:00',
      duration: 90,
      service: 'Project Planning',
      status: 'confirmed',
      notes: 'Balcony railings and security grills installation planning',
      location: 'Negombo, Beach Road 78'
    },
    {
      id: 'APT-005',
      customerName: 'Tharindu Bandara',
      customerEmail: 'tharindu@example.com',
      customerPhone: '+94 77 567 8901',
      date: '2025-06-28T16:00:00',
      duration: 60,
      service: 'Quotation Discussion',
      status: 'pending',
      notes: 'Review quotation for metal staircase',
      location: 'Online Meeting'
    }
  ];

  // Filter appointments based on search term and status
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    
    if (activeTab === 'upcoming') {
      return matchesSearch && appointmentDate >= today && appointment.status !== 'cancelled';
    } else if (activeTab === 'completed') {
      return matchesSearch && appointment.status === 'completed';
    } else if (activeTab === 'cancelled') {
      return matchesSearch && appointment.status === 'cancelled';
    } else if (activeTab === 'all') {
      return matchesSearch;
    }
  });

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500 hover:bg-green-600">{t('status.confirmed')}</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">{t('status.pending')}</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500 hover:bg-blue-600">{t('status.completed')}</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 hover:bg-red-600">{t('status.cancelled')}</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>{t('adminAppointments.title')} | Kamal Iron Works</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('adminAppointments.title')}</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t('adminAppointments.newAppointment')}
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
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="upcoming">{t('adminAppointments.tabs.upcoming')}</TabsTrigger>
                  <TabsTrigger value="completed">{t('adminAppointments.tabs.completed')}</TabsTrigger>
                  <TabsTrigger value="cancelled">{t('adminAppointments.tabs.cancelled')}</TabsTrigger>
                  <TabsTrigger value="all">{t('adminAppointments.tabs.all')}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredAppointments.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">{t('adminAppointments.noAppointments')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 border-b pb-3">
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-lg">{appointment.service}</CardTitle>
                    <CardDescription>{appointment.id}</CardDescription>
                  </div>
                  <div>{getStatusBadge(appointment.status)}</div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{format(new Date(appointment.date), 'PPP')}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{format(new Date(appointment.date), 'p')} ({appointment.duration} mins)</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{appointment.location}</span>
                  </div>
                  <Separator />
                  <div className="pt-2">
                    <p className="font-semibold">{appointment.customerName}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="h-3 w-3 mr-1" />
                      <span>{appointment.customerEmail}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-3 w-3 mr-1" />
                      <span>{appointment.customerPhone}</span>
                    </div>
                  </div>
                  {appointment.notes && (
                    <>
                      <Separator />
                      <div className="pt-2">
                        <p className="text-sm text-gray-600">{appointment.notes}</p>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="mt-4 pt-3 border-t flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    {t('common.edit')}
                  </Button>
                  {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {t('common.complete')}
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

export default AdminAppointments;
