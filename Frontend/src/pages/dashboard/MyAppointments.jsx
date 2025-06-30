import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Calendar, Clock, AlertCircle, CheckCircle, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const MyAppointments = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewAppointmentForm, setShowNewAppointmentForm] = useState(false);
  const [appointmentType, setAppointmentType] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [description, setDescription] = useState('');
  
  // Sample appointments data - would come from API in production
  const appointments = [
    {
      id: 1,
      title: 'Site Measurement for Metal Gate',
      date: '2023-09-15',
      time: '10:00 AM',
      status: 'upcoming',
      type: 'site-visit',
      location: 'Client Location',
      notes: 'Measuring for a custom entrance gate installation',
    },
    {
      id: 2,
      title: 'Installation of Window Grills',
      date: '2023-09-18',
      time: '2:00 PM',
      status: 'upcoming',
      type: 'installation',
      location: 'Client Location',
      notes: 'Installing security grills on all front-facing windows',
    },
    {
      id: 3,
      title: 'Design Consultation',
      date: '2023-08-25',
      time: '11:00 AM',
      status: 'completed',
      type: 'consultation',
      location: 'Kamal Iron Works Office',
      notes: 'Initial consultation for full home security solutions',
    },
    {
      id: 4,
      title: 'Maintenance Service',
      date: '2023-08-30',
      time: '9:30 AM',
      status: 'completed',
      type: 'maintenance',
      location: 'Client Location',
      notes: 'Yearly maintenance of gate automation system',
    },
    {
      id: 5,
      title: 'Product Showcase',
      date: '2023-09-02',
      time: '3:00 PM',
      status: 'cancelled',
      type: 'consultation',
      location: 'Kamal Iron Works Showroom',
      notes: 'Showcase of new security door designs',
    }
  ];

  // Filter appointments based on tab and search
  const getFilteredAppointments = (status) => {
    return appointments
      .filter(appointment => appointment.status === status)
      .filter(appointment => 
        searchTerm === '' || 
        appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  const upcomingAppointments = getFilteredAppointments('upcoming');
  const completedAppointments = getFilteredAppointments('completed');
  const cancelledAppointments = getFilteredAppointments('cancelled');

  const handleNewAppointment = (e) => {
    e.preventDefault();
    // In a real app, this would send the new appointment request to the backend
    alert('Appointment request submitted successfully!');
    setShowNewAppointmentForm(false);
    setDate(null);
    setAppointmentType('');
    setAppointmentTime('');
    setDescription('');
  };

  // Function to get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return <Calendar className="h-5 w-5 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  // Render appointment card
  const renderAppointmentCard = (appointment) => (
    <Card key={appointment.id} className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="rounded-full bg-gray-100 p-2">
              {getStatusIcon(appointment.status)}
            </div>
            <div>
              <h3 className="font-medium">{appointment.title}</h3>
              <div className="text-sm text-gray-500">
                <p>{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</p>
                <p>Type: {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1).replace('-', ' ')}</p>
                <p>Location: {appointment.location}</p>
                {appointment.notes && <p className="mt-1">Notes: {appointment.notes}</p>}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(appointment.status)}`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
            {appointment.status === 'upcoming' && (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-50">
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>{t('dashboard.appointments.pageTitle')} | Kamal Iron Works</title>
      </Helmet>

      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.appointments.title')}</h1>
            <p className="text-muted-foreground">
              {t('dashboard.appointments.description')}
            </p>
          </div>
          <Button onClick={() => setShowNewAppointmentForm(!showNewAppointmentForm)}>
            {showNewAppointmentForm ? t('dashboard.appointments.cancel') : t('dashboard.appointments.schedule')}
          </Button>
        </div>

        {/* New Appointment Form */}
        {showNewAppointmentForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t('dashboard.appointments.newAppointment')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNewAppointment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="appointmentType">{t('dashboard.appointments.type')}</Label>
                    <Select value={appointmentType} onValueChange={setAppointmentType} required>
                      <SelectTrigger id="appointmentType">
                        <SelectValue placeholder={t('dashboard.appointments.selectType')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="site-visit">Site Visit</SelectItem>
                        <SelectItem value="installation">Installation</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">{t('dashboard.appointments.date')}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="date"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : t('dashboard.appointments.pickDate')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">{t('dashboard.appointments.time')}</Label>
                    <Select value={appointmentTime} onValueChange={setAppointmentTime} required>
                      <SelectTrigger id="time">
                        <SelectValue placeholder={t('dashboard.appointments.selectTime')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                        <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                        <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                        <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                        <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                        <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                        <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                        <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                        <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">{t('dashboard.appointments.preferredLocation')}</Label>
                    <Select>
                      <SelectTrigger id="location">
                        <SelectValue placeholder={t('dashboard.appointments.selectLocation')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office">Kamal Iron Works Office</SelectItem>
                        <SelectItem value="client">My Location</SelectItem>
                        <SelectItem value="showroom">Showroom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">{t('dashboard.appointments.description')}</Label>
                  <textarea
                    id="description"
                    className="min-h-[100px] w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder={t('dashboard.appointments.descriptionPlaceholder')}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowNewAppointmentForm(false)}>
                    {t('dashboard.appointments.cancel')}
                  </Button>
                  <Button type="submit">
                    {t('dashboard.appointments.submit')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Search Bar */}
        <div className="flex justify-between items-center">
          <Input
            placeholder={t('dashboard.appointments.search')}
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Appointments Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="upcoming">
              {t('dashboard.appointments.upcoming')} ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              {t('dashboard.appointments.completed')} ({completedAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              {t('dashboard.appointments.cancelled')} ({cancelledAppointments.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => renderAppointmentCard(appointment))
            ) : (
              <div className="text-center py-10">
                <Calendar className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-semibold">{t('dashboard.appointments.noUpcoming')}</h3>
                <p className="text-gray-500 mt-1">{t('dashboard.appointments.scheduleNew')}</p>
                <Button className="mt-4" onClick={() => setShowNewAppointmentForm(true)}>
                  {t('dashboard.appointments.schedule')}
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedAppointments.length > 0 ? (
              completedAppointments.map(appointment => renderAppointmentCard(appointment))
            ) : (
              <div className="text-center py-10">
                <CheckCircle className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-semibold">{t('dashboard.appointments.noCompleted')}</h3>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {cancelledAppointments.length > 0 ? (
              cancelledAppointments.map(appointment => renderAppointmentCard(appointment))
            ) : (
              <div className="text-center py-10">
                <AlertCircle className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-semibold">{t('dashboard.appointments.noCancelled')}</h3>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MyAppointments;
