import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Loader2, Upload, Check, X, Send } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import axios from '../../api/axios';
import { formFieldFocus } from '../../utils/animations';

const ContactForm = ({ variant = 'default' }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: '',
  });
  
  const [file, setFile] = useState(null);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focused, setFocused] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: t('contact.fileTooLarge'),
          description: t('contact.fileSizeLimit'),
          variant: 'destructive',
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };
  
  const removeFile = () => {
    setFile(null);
    setFileUploadProgress(0);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const contactData = new FormData();
    
    // Append form fields
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        contactData.append(key, formData[key]);
      }
    });
    
    // Append file if exists
    if (file) {
      contactData.append('attachment', file);
    }
    
    try {
      const response = await axios.post('/api/contact', contactData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setFileUploadProgress(percentCompleted);
        }
      });
      
      toast({
        title: t('contact.messageSent'),
        description: t('contact.thankYouMessage'),
        variant: 'default',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        serviceType: '',
      });
      setFile(null);
      setFileUploadProgress(0);
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: t('contact.errorTitle'),
        description: t('contact.errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const inputVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const serviceOptions = [
    { value: '', label: t('contact.selectService') },
    { value: 'custom-fabrication', label: t('services.customFabrication') },
    { value: 'welding', label: t('services.welding') },
    { value: 'metal-furniture', label: t('services.metalFurniture') },
    { value: 'structural-work', label: t('services.steelStructures') },
    { value: 'repairs', label: t('services.repairs') },
    { value: 'consultation', label: t('services.consultation') },
    { value: 'other', label: t('common.other') },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={formVariants}
      className={`w-full ${variant === 'compact' ? 'max-w-md' : 'max-w-2xl'} mx-auto`}
    >
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name Field */}
        <motion.div variants={inputVariants} className="relative">
          <Label 
            htmlFor="name" 
            className={`absolute left-3 transition-all duration-200 ${
              formData.name || focused === 'name'
                ? 'transform -translate-y-[1.3rem] text-xs text-primary'
                : 'transform translate-y-2'
            }`}
          >
            {t('contact.name')} *
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            className={`pt-6 pb-2 border-gray-300 focus:border-primary ${focused === 'name' ? 'border-primary' : ''}`}
            required
          />
        </motion.div>

        {/* Email & Phone in Grid */}
        <motion.div variants={inputVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Label 
              htmlFor="email" 
              className={`absolute left-3 transition-all duration-200 ${
                formData.email || focused === 'email'
                  ? 'transform -translate-y-[1.3rem] text-xs text-primary'
                  : 'transform translate-y-2'
              }`}
            >
              {t('contact.email')} *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              className={`pt-6 pb-2 border-gray-300 focus:border-primary ${focused === 'email' ? 'border-primary' : ''}`}
              required
            />
          </div>
          
          <div className="relative">
            <Label 
              htmlFor="phone" 
              className={`absolute left-3 transition-all duration-200 ${
                formData.phone || focused === 'phone'
                  ? 'transform -translate-y-[1.3rem] text-xs text-primary'
                  : 'transform translate-y-2'
              }`}
            >
              {t('contact.phone')}
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => setFocused('phone')}
              onBlur={() => setFocused(null)}
              className={`pt-6 pb-2 border-gray-300 focus:border-primary ${focused === 'phone' ? 'border-primary' : ''}`}
            />
          </div>
        </motion.div>

        {/* Subject Field */}
        <motion.div variants={inputVariants} className="relative">
          <Label 
            htmlFor="subject" 
            className={`absolute left-3 transition-all duration-200 ${
              formData.subject || focused === 'subject'
                ? 'transform -translate-y-[1.3rem] text-xs text-primary'
                : 'transform translate-y-2'
            }`}
          >
            {t('contact.subject')} *
          </Label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onFocus={() => setFocused('subject')}
            onBlur={() => setFocused(null)}
            className={`pt-6 pb-2 border-gray-300 focus:border-primary ${focused === 'subject' ? 'border-primary' : ''}`}
            required
          />
        </motion.div>

        {/* Service Type Select */}
        <motion.div variants={inputVariants} className="relative">
          <Label 
            htmlFor="serviceType" 
            className={`absolute left-3 transition-all duration-200 ${
              formData.serviceType || focused === 'serviceType'
                ? 'transform -translate-y-[1.3rem] text-xs text-primary'
                : 'transform translate-y-2'
            }`}
          >
            {t('contact.serviceInterest')}
          </Label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            onFocus={() => setFocused('serviceType')}
            onBlur={() => setFocused(null)}
            className={`w-full pt-6 pb-2 px-3 h-12 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
              focused === 'serviceType' ? 'border-primary' : ''
            }`}
          >
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Message Textarea */}
        <motion.div variants={inputVariants} className="relative">
          <Label 
            htmlFor="message" 
            className={`absolute left-3 transition-all duration-200 ${
              formData.message || focused === 'message'
                ? 'transform -translate-y-[1.3rem] text-xs text-primary'
                : 'transform translate-y-2'
            }`}
          >
            {t('contact.message')} *
          </Label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused(null)}
            rows="5"
            className={`w-full pt-6 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all duration-200 ${
              focused === 'message' ? 'border-primary' : ''
            }`}
            required
          />
        </motion.div>

        {/* File Upload */}
        <motion.div variants={inputVariants}>
          <Label htmlFor="file" className="block mb-2">{t('contact.attachments')}</Label>
          
          <div className="flex flex-col space-y-2">
            {file ? (
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-gray-50">
                <div className="flex items-center space-x-2 truncate">
                  <div className="flex-shrink-0">
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="text-sm font-medium truncate">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={removeFile}
                  className="flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <label className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-primary transition-colors">
                <input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="sr-only"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <div className="flex flex-col items-center text-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700">
                    {t('contact.dragDropFile')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {t('contact.fileSizeNote')}
                  </p>
                </div>
              </label>
            )}
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={inputVariants} className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            variant="accent"
            size="lg"
            className="relative overflow-hidden group"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t('common.submitting')}
              </>
            ) : (
              <>
                {t('contact.sendMessage')}
                <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
            
            {/* Animated submit progress indicator */}
            {isSubmitting && fileUploadProgress > 0 && (
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${fileUploadProgress}%` }}
              />
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
