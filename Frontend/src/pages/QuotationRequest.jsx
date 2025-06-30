import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { Alert, AlertDescription } from '../components/ui/alert';
import { CheckCircle, Upload, AlertTriangle, Info } from 'lucide-react';

const QuotationRequest = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    projectType: '',
    budget: '',
    timeline: '',
    details: '',
  });
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const projectTypes = [
    'metalGates', 
    'railings', 
    'furniture',
    'securityBars', 
    'structuralSteel', 
    'customFabrication',
    'other'
  ];

  const timelines = [
    'urgent',
    'within1Week',
    'within1Month',
    'within3Months',
    'flexible'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Check file size (max 5MB per file)
    const oversizedFiles = selectedFiles.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError(t('quotationRequest.fileSizeError'));
      return;
    }
    
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    const invalidFiles = selectedFiles.filter(file => !validTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      setError(t('quotationRequest.fileTypeError'));
      return;
    }

    setError('');
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
        // In a real app, you would submit the form data and files to your backend
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      setError(t('quotationRequest.submissionError'));
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>{t('quotationRequest.pageTitle')} | Kamal Iron Works</title>
          <meta name="description" content={t('quotationRequest.pageDescription')} />
        </Helmet>

        <div className="bg-black text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('quotationRequest.title')}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl">
              {t('quotationRequest.subtitle')}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">{t('quotationRequest.thankYou')}</h2>
            <p className="text-gray-600 text-lg mb-6">
              {t('quotationRequest.confirmationMessage')}
            </p>
            <p className="text-gray-600 mb-8">
              {t('quotationRequest.responseTimeMessage')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild>
                <a href="/">{t('quotationRequest.backToHome')}</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/portfolio">{t('quotationRequest.viewPortfolio')}</a>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('quotationRequest.pageTitle')} | Kamal Iron Works</title>
        <meta name="description" content={t('quotationRequest.pageDescription')} />
      </Helmet>

      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('quotationRequest.title')}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            {t('quotationRequest.subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <form onSubmit={handleSubmit}>
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Personal Information */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">{t('quotationRequest.personalInfo')}</h3>
                  </div>

                  {/* Name */}
                  <div>
                    <Label htmlFor="name">{t('quotationRequest.name')}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">{t('quotationRequest.email')}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone">{t('quotationRequest.phone')}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <Label htmlFor="address">{t('quotationRequest.address')}</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  {/* Project Information */}
                  <div className="md:col-span-2 mt-4">
                    <Separator className="my-4" />
                    <h3 className="text-lg font-semibold mb-4">{t('quotationRequest.projectInfo')}</h3>
                  </div>

                  {/* Project Type */}
                  <div>
                    <Label>{t('quotationRequest.projectType')}</Label>
                    <Select 
                      value={formData.projectType} 
                      onValueChange={(value) => handleSelectChange('projectType', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={t('quotationRequest.selectProjectType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {t(`quotationRequest.projectTypes.${type}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <Label htmlFor="budget">{t('quotationRequest.budget')}</Label>
                    <Input
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder={t('quotationRequest.budgetPlaceholder')}
                    />
                  </div>

                  {/* Timeline */}
                  <div>
                    <Label>{t('quotationRequest.timeline')}</Label>
                    <Select 
                      value={formData.timeline} 
                      onValueChange={(value) => handleSelectChange('timeline', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={t('quotationRequest.selectTimeline')} />
                      </SelectTrigger>
                      <SelectContent>
                        {timelines.map((timeline) => (
                          <SelectItem key={timeline} value={timeline}>
                            {t(`quotationRequest.timelines.${timeline}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Project Details */}
                  <div className="md:col-span-2">
                    <Label htmlFor="details">{t('quotationRequest.projectDetails')}</Label>
                    <Textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      className="mt-1 h-32"
                      placeholder={t('quotationRequest.projectDetailsPlaceholder')}
                      required
                    />
                  </div>

                  {/* File Uploads */}
                  <div className="md:col-span-2">
                    <Label>{t('quotationRequest.uploadFiles')}</Label>
                    <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <Input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          multiple
                          accept=".jpg,.jpeg,.png,.pdf"
                        />
                        <Label 
                          htmlFor="file-upload" 
                          className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          {t('quotationRequest.selectFiles')}
                        </Label>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        {t('quotationRequest.fileUploadHelp')}
                      </p>
                    </div>

                    {/* File List */}
                    {files.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium">{t('quotationRequest.selectedFiles')}</h4>
                        <ul className="mt-2 divide-y divide-gray-200">
                          {files.map((file, index) => (
                            <li key={index} className="py-2 flex justify-between items-center">
                              <div className="flex items-center">
                                <span className="text-sm text-gray-500">{file.name}</span>
                                <span className="ml-2 text-xs text-gray-400">
                                  ({Math.round(file.size / 1024)} KB)
                                </span>
                              </div>
                              <Button 
                                type="button"
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeFile(index)}
                              >
                                {t('quotationRequest.remove')}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? t('quotationRequest.submitting') : t('quotationRequest.submit')}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Info Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold mb-4">{t('quotationRequest.howItWorks')}</h3>
              <ol className="space-y-4 list-decimal list-inside mb-8">
                <li className="pl-2">{t('quotationRequest.step1')}</li>
                <li className="pl-2">{t('quotationRequest.step2')}</li>
                <li className="pl-2">{t('quotationRequest.step3')}</li>
                <li className="pl-2">{t('quotationRequest.step4')}</li>
              </ol>

              <Separator className="my-6" />

              <div className="mb-6">
                <div className="flex items-start">
                  <Info className="h-5 w-5 mt-0.5 mr-2 text-black" />
                  <h4 className="text-md font-semibold">{t('quotationRequest.tips.title')}</h4>
                </div>
                <ul className="mt-2 space-y-2 text-sm">
                  <li>{t('quotationRequest.tips.tip1')}</li>
                  <li>{t('quotationRequest.tips.tip2')}</li>
                  <li>{t('quotationRequest.tips.tip3')}</li>
                </ul>
              </div>

              <Separator className="my-6" />

              <div>
                <h4 className="font-semibold mb-2">{t('quotationRequest.questions')}</h4>
                <p className="text-sm text-gray-600 mb-4">{t('quotationRequest.contactInfo')}</p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <a href="/contact">
                    {t('quotationRequest.contactButton')}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuotationRequest;
