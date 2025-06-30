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
  Download, 
  Trash2, 
  Edit, 
  Eye, 
  Mail, 
  Phone, 
  Calendar,
  FileText,
  Clock,
  Calculator,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { format } from 'date-fns';

const AdminQuotations = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  
  // Sample data - would come from API in production
  const quotations = [
    {
      id: 'QT-001',
      customerName: 'Nihal Jayakody',
      customerEmail: 'nihal@example.com',
      customerPhone: '+94 77 123 4567',
      date: '2025-06-20T14:30:00',
      projectType: 'Metal Staircase',
      status: 'pending',
      amount: 185000,
      validUntil: '2025-07-20T00:00:00',
      notes: 'Modern design with minimal ornamentation, black finish'
    },
    {
      id: 'QT-002',
      customerName: 'Kumari Wijesinghe',
      customerEmail: 'kumari@example.com',
      customerPhone: '+94 77 345 6789',
      date: '2025-06-18T11:00:00',
      projectType: 'Security Grills',
      status: 'approved',
      amount: 75000,
      validUntil: '2025-07-18T00:00:00',
      notes: 'For 4 windows and 1 balcony door'
    },
    {
      id: 'QT-003',
      customerName: 'Anton Perera',
      customerEmail: 'anton@example.com',
      customerPhone: '+94 77 456 7890',
      date: '2025-06-15T09:45:00',
      projectType: 'Metal Gate',
      status: 'approved',
      amount: 125000,
      validUntil: '2025-07-15T00:00:00',
      notes: 'Slide gate with motorized system, 15 feet width'
    },
    {
      id: 'QT-004',
      customerName: 'Samanthi Dias',
      customerEmail: 'samanthi@example.com',
      customerPhone: '+94 77 567 8901',
      date: '2025-06-22T13:15:00',
      projectType: 'Metal Furniture',
      status: 'pending',
      amount: 95000,
      validUntil: '2025-07-22T00:00:00',
      notes: 'Custom metal-framed dining table with 6 chairs'
    },
    {
      id: 'QT-005',
      customerName: 'Ramesh Kannangara',
      customerEmail: 'ramesh@example.com',
      customerPhone: '+94 77 678 9012',
      date: '2025-06-17T16:00:00',
      projectType: 'Roofing Structure',
      status: 'rejected',
      amount: 350000,
      validUntil: '2025-07-17T00:00:00',
      notes: 'Customer found cheaper alternative'
    }
  ];

  // Filter quotations based on search term and status
  const filteredQuotations = quotations.filter(quotation => {
    const matchesSearch = 
      quotation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quotation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quotation.projectType.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') {
      return matchesSearch;
    } else {
      return matchesSearch && quotation.status === activeTab;
    }
  });

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">{t('status.pending')}</Badge>;
      case 'approved':
        return <Badge className="bg-green-500 hover:bg-green-600">{t('status.approved')}</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 hover:bg-red-600">{t('status.rejected')}</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>{t('adminQuotations.title')} | Kamal Iron Works</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('adminQuotations.title')}</h1>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          {t('adminQuotations.newQuotation')}
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
                  <TabsTrigger value="pending">{t('adminQuotations.tabs.pending')}</TabsTrigger>
                  <TabsTrigger value="approved">{t('adminQuotations.tabs.approved')}</TabsTrigger>
                  <TabsTrigger value="rejected">{t('adminQuotations.tabs.rejected')}</TabsTrigger>
                  <TabsTrigger value="all">{t('adminQuotations.tabs.all')}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredQuotations.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">{t('adminQuotations.noQuotations')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredQuotations.map((quotation) => (
            <Card key={quotation.id}>
              <CardHeader className="bg-gray-50 border-b pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{quotation.projectType}</CardTitle>
                      {getStatusBadge(quotation.status)}
                    </div>
                    <CardDescription>{quotation.id} - {quotation.customerName}</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">Rs. {quotation.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">
                      {t('adminQuotations.validUntil')}: {format(new Date(quotation.validUntil), 'PP')}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">{t('adminQuotations.customerInfo')}</p>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{quotation.customerEmail}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{quotation.customerPhone}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">{t('adminQuotations.details')}</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{t('adminQuotations.created')}: {format(new Date(quotation.date), 'PP')}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t('adminQuotations.notes')}</p>
                    <p className="text-sm mt-1">{quotation.notes}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    {t('common.view')}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    {t('common.edit')}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    {t('common.download')}
                  </Button>
                  {quotation.status === 'pending' && (
                    <>
                      <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {t('adminQuotations.approve')}
                      </Button>
                      <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700">
                        <XCircle className="h-4 w-4 mr-1" />
                        {t('adminQuotations.reject')}
                      </Button>
                    </>
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

export default AdminQuotations;
