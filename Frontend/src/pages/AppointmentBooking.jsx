import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Textarea } from '../components/ui/textarea';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { CalendarIcon, Clock, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const AppointmentBooking = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const serviceTypes = [
    'metalGates', 'metalFurniture', 'railings',
    'securityBars', 'structuralSteel', 'customFabrication',
    'other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // In a real app, here you would submit the form data to your backend
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>{t('appointmentBooking.pageTitle')} | Kamal Iron Works</title>
          <meta name="description" content={t('appointmentBooking.pageDescription')} />
        </Helmet>

        <div className="bg-black text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('appointmentBooking.title')}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl">
              {t('appointmentBooking.subtitle')}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">{t('appointmentBooking.thankYou')}</h2>
            <p className="text-gray-600 text-lg mb-6">
              {t('appointmentBooking.confirmationMessage')}
            </p>
            <p className="text-gray-600 mb-8">
              {t('appointmentBooking.emailConfirmation')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild>
                <a href="/">{t('appointmentBooking.backToHome')}</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/services">{t('appointmentBooking.exploreServices')}</a>
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
        <title>{t('appointmentBooking.pageTitle')} | Kamal Iron Works</title>
        <meta name="description" content={t('appointmentBooking.pageDescription')} />
      </Helmet>

      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('appointmentBooking.title')}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            {t('appointmentBooking.subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">{t('appointmentBooking.bookingDetails')}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Date Selection */}
                <div>
                  <Label>{t('appointmentBooking.date')}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal mt-1"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : t('appointmentBooking.selectDate')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => 
                          date < new Date() || 
                          date.getDay() === 0 || // Sundays
                          date.getDay() === 6    // Saturdays
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Selection */}
                <div>
                  <Label>{t('appointmentBooking.time')}</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={t('appointmentBooking.selectTime')} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map((timeSlot) => (
                        <SelectItem key={timeSlot} value={timeSlot}>
                          {timeSlot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Name */}
                <div>
                  <Label htmlFor="name">{t('appointmentBooking.name')}</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">{t('appointmentBooking.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone">{t('appointmentBooking.phone')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                {/* Service Type */}
                <div>
                  <Label>{t('appointmentBooking.serviceType')}</Label>
                  <Select value={serviceType} onValueChange={setServiceType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={t('appointmentBooking.selectService')} />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {t(`appointmentBooking.serviceTypes.${type}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <Label htmlFor="message">{t('appointmentBooking.message')}</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 h-32"
                  placeholder={t('appointmentBooking.messagePlaceholder')}
                />
              </div>

              {/* Preferred Contact Method */}
              <div className="mb-6">
                <Label>{t('appointmentBooking.preferredContact')}</Label>
                <RadioGroup defaultValue="email" className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email-contact" />
                    <Label htmlFor="email-contact">{t('appointmentBooking.emailContact')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="phone-contact" />
                    <Label htmlFor="phone-contact">{t('appointmentBooking.phoneContact')}</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                {isLoading ? t('appointmentBooking.submitting') : t('appointmentBooking.submit')}
              </Button>
            </form>
          </div>

          {/* Info Section */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{t('appointmentBooking.ourLocation')}</h3>
              <div className="flex items-start mb-4">
                <MapPin className="h-5 w-5 mt-1 mr-3" />
                <p>123 Main Street, Colombo 07, Sri Lanka</p>
              </div>
              <div className="aspect-video w-full">
                <iframe
                  title="Kamal Iron Works Location"
                  className="w-full h-full border-0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80385598893!2d79.82118615!3d6.9218374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1615721530718!5m2!1sen!2sus"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-xl font-bold mb-4">{t('appointmentBooking.contactInfo')}</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3" />
                  <p>+94 112 345 678</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3" />
                  <p>appointments@kamaliron.com</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3" />
                  <div>
                    <p>{t('appointmentBooking.businessHours.weekdays')}</p>
                    <p>{t('appointmentBooking.businessHours.saturday')}</p>
                    <p>{t('appointmentBooking.businessHours.sunday')}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-xl font-bold mb-4">{t('appointmentBooking.whatToExpect')}</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>{t('appointmentBooking.expectationsList.item1')}</li>
                <li>{t('appointmentBooking.expectationsList.item2')}</li>
                <li>{t('appointmentBooking.expectationsList.item3')}</li>
                <li>{t('appointmentBooking.expectationsList.item4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentBooking;
