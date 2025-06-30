import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { FileText, Download, XCircle, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';

const Quotations = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewQuotationForm, setShowNewQuotationForm] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  
  // Sample quotations data - would come from API in production
  const quotations = [
    {
      id: 101,
      title: 'Custom Metal Gate Installation',
      date: '2023-09-10',
      amount: 450.00,
      status: 'pending',
      description: 'Installation of a custom metal gate at the main entrance',
      items: [
        { name: 'Metal Gate Design MG-101', price: 350.00, quantity: 1 },
        { name: 'Installation Service', price: 100.00, quantity: 1 },
      ],
      expiry: '2023-10-10',
      notes: 'Price includes standard installation. Additional charges may apply for special requirements.',
    },
    {
      id: 102,
      title: 'Balcony Railing Project',
      date: '2023-09-05',
      amount: 280.00,
      status: 'approved',
      description: 'Installation of custom balcony railings for a 2nd floor apartment',
      items: [
        { name: 'Balcony Railing BR-502', price: 220.00, quantity: 1 },
        { name: 'Installation Service', price: 60.00, quantity: 1 },
      ],
      expiry: '2023-10-05',
      notes: 'Client requested black powder coating finish. Price includes all materials and labor.',
    },
    {
      id: 103,
      title: 'Security Grills for Windows',
      date: '2023-08-28',
      amount: 180.00,
      status: 'pending',
      description: 'Installation of security grills for 3 windows',
      items: [
        { name: 'Window Grill WG-205', price: 50.00, quantity: 3 },
        { name: 'Installation Service', price: 30.00, quantity: 1 },
      ],
      expiry: '2023-09-28',
      notes: 'Price may vary depending on actual window measurements.',
    },
    {
      id: 104,
      title: 'Custom Staircase Design',
      date: '2023-08-15',
      amount: 850.00,
      status: 'rejected',
      description: 'Design and installation of a custom spiral staircase',
      items: [
        { name: 'Spiral Staircase SS-301', price: 750.00, quantity: 1 },
        { name: 'Installation Service', price: 100.00, quantity: 1 },
      ],
      expiry: '2023-09-15',
      notes: 'Rejected due to budget constraints. Client requested a more economical option.',
    },
    {
      id: 105,
      title: 'Outdoor Metal Furniture Set',
      date: '2023-09-12',
      amount: 520.00,
      status: 'expired',
      description: 'Custom outdoor metal furniture set including table and chairs',
      items: [
        { name: 'Metal Table MT-505', price: 280.00, quantity: 1 },
        { name: 'Metal Chair MC-606', price: 60.00, quantity: 4 },
      ],
      expiry: '2023-09-12',
      notes: 'No response received from client before expiry date.',
    }
  ];

  // Filter quotations based on tab and search
  const getFilteredQuotations = (status) => {
    return quotations
      .filter(quotation => status === 'all' || quotation.status === status)
      .filter(quotation => 
        searchTerm === '' || 
        quotation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quotation.id.toString().includes(searchTerm)
      );
  };

  const pendingQuotations = getFilteredQuotations('pending');
  const approvedQuotations = getFilteredQuotations('approved');
  const rejectedOrExpiredQuotations = quotations.filter(q => q.status === 'rejected' || q.status === 'expired');
  const allQuotations = getFilteredQuotations('all');

  const handleNewQuotationRequest = (e) => {
    e.preventDefault();
    // In a real app, this would send the new quotation request to the backend
    alert('Quotation request submitted successfully!');
    setShowNewQuotationForm(false);
  };

  // Function to get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'expired':
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  // Render quotation card
  const renderQuotationCard = (quotation) => (
    <Card key={quotation.id} className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="rounded-full bg-gray-100 p-2">
              {getStatusIcon(quotation.status)}
            </div>
            <div>
              <div className="flex items-center mb-1">
                <h3 className="font-medium">{quotation.title}</h3>
                <span className="text-sm text-gray-500 ml-2">#{quotation.id}</span>
              </div>
              <div className="text-sm text-gray-500">
                <p>Date: {new Date(quotation.date).toLocaleDateString()}</p>
                <p>Amount: ${quotation.amount.toFixed(2)}</p>
                <p>Expiry: {new Date(quotation.expiry).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(quotation.status)}`}>
              {quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}
            </span>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setSelectedQuotation(quotation)}
              >
                <FileText className="h-4 w-4" />
                View
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>{t('dashboard.quotations.pageTitle')} | Kamal Iron Works</title>
      </Helmet>

      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.quotations.title')}</h1>
            <p className="text-muted-foreground">
              {t('dashboard.quotations.description')}
            </p>
          </div>
          <Button onClick={() => setShowNewQuotationForm(!showNewQuotationForm)}>
            {showNewQuotationForm ? t('dashboard.quotations.cancel') : t('dashboard.quotations.request')}
          </Button>
        </div>

        {/* New Quotation Form */}
        {showNewQuotationForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t('dashboard.quotations.newRequest')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNewQuotationRequest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="projectTitle">{t('dashboard.quotations.projectTitle')}</Label>
                  <Input id="projectTitle" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="projectType">{t('dashboard.quotations.projectType')}</Label>
                  <select 
                    id="projectType" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  >
                    <option value="">{t('dashboard.quotations.selectType')}</option>
                    <option value="gate">Metal Gate</option>
                    <option value="fence">Fencing</option>
                    <option value="railing">Railings</option>
                    <option value="grill">Window Grills</option>
                    <option value="staircase">Staircase</option>
                    <option value="furniture">Metal Furniture</option>
                    <option value="door">Security Door</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="projectDescription">{t('dashboard.quotations.description')}</Label>
                  <textarea
                    id="projectDescription"
                    className="min-h-[100px] w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder={t('dashboard.quotations.descriptionPlaceholder')}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="attachment">{t('dashboard.quotations.attachments')}</Label>
                  <Input id="attachment" type="file" multiple />
                  <p className="text-xs text-gray-500 mt-1">
                    {t('dashboard.quotations.attachmentHelp')}
                  </p>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowNewQuotationForm(false)}>
                    {t('dashboard.quotations.cancel')}
                  </Button>
                  <Button type="submit">
                    {t('dashboard.quotations.submit')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Search Bar */}
        <div className="flex justify-between items-center">
          <Input
            placeholder={t('dashboard.quotations.search')}
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Quotations Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">
              {t('dashboard.quotations.all')} ({allQuotations.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              {t('dashboard.quotations.pending')} ({pendingQuotations.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              {t('dashboard.quotations.approved')} ({approvedQuotations.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              {t('dashboard.quotations.rejectedExpired')} ({rejectedOrExpiredQuotations.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {allQuotations.length > 0 ? (
              allQuotations.map(quotation => renderQuotationCard(quotation))
            ) : (
              <div className="text-center py-10">
                <FileText className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-semibold">{t('dashboard.quotations.noQuotations')}</h3>
                <p className="text-gray-500 mt-1">{t('dashboard.quotations.requestNew')}</p>
                <Button className="mt-4" onClick={() => setShowNewQuotationForm(true)}>
                  {t('dashboard.quotations.request')}
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingQuotations.length > 0 ? (
              pendingQuotations.map(quotation => renderQuotationCard(quotation))
            ) : (
              <div className="text-center py-10">
                <Clock className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-semibold">{t('dashboard.quotations.noPending')}</h3>
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {approvedQuotations.length > 0 ? (
              approvedQuotations.map(quotation => renderQuotationCard(quotation))
            ) : (
              <div className="text-center py-10">
                <CheckCircle className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-semibold">{t('dashboard.quotations.noApproved')}</h3>
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejectedOrExpiredQuotations.length > 0 ? (
              rejectedOrExpiredQuotations.map(quotation => renderQuotationCard(quotation))
            ) : (
              <div className="text-center py-10">
                <XCircle className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-semibold">{t('dashboard.quotations.noRejected')}</h3>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Quotation Details Dialog */}
        {selectedQuotation && (
          <Dialog open={!!selectedQuotation} onOpenChange={() => setSelectedQuotation(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-xl flex items-center justify-between">
                  <div>Quotation #{selectedQuotation.id}</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(selectedQuotation.status)}`}>
                    {selectedQuotation.status.charAt(0).toUpperCase() + selectedQuotation.status.slice(1)}
                  </span>
                </DialogTitle>
                <DialogDescription className="text-base font-medium">
                  {selectedQuotation.title}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Date Requested:</p>
                    <p className="font-medium">{new Date(selectedQuotation.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Valid Until:</p>
                    <p className="font-medium">{new Date(selectedQuotation.expiry).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Project Description</h3>
                  <p className="text-gray-700">{selectedQuotation.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Items</h3>
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedQuotation.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.price.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td colSpan="3" className="px-6 py-3 text-right font-medium">Total:</td>
                          <td className="px-6 py-3 text-sm font-bold">${selectedQuotation.amount.toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                
                {selectedQuotation.notes && (
                  <div>
                    <h3 className="font-semibold mb-2">Notes</h3>
                    <p className="text-gray-700">{selectedQuotation.notes}</p>
                  </div>
                )}
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setSelectedQuotation(null)}>
                    Close
                  </Button>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                  {selectedQuotation.status === 'pending' && (
                    <Button>
                      Accept Quotation
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default Quotations;
