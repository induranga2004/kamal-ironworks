import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { User, Mail, Phone, MapPin, Lock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const Profile = () => {
  const { t } = useTranslation();
  
  // Sample user data - would come from API/context in production
  const [user, setUser] = useState({
    id: '12345',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+94 112 345 678',
    address: '123 Main Street, Colombo 07, Sri Lanka',
    avatar: 'https://i.pravatar.cc/300?img=12',
    created_at: '2023-01-15',
  });

  const [personalInfo, setPersonalInfo] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isPersonalInfoSaving, setIsPersonalInfoSaving] = useState(false);
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);
  const [personalInfoStatus, setPersonalInfoStatus] = useState(null); // 'success', 'error', null
  const [passwordStatus, setPasswordStatus] = useState(null); // 'success', 'error', null
  const [passwordError, setPasswordError] = useState('');

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    setIsPersonalInfoSaving(true);
    setPersonalInfoStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user state
      setUser(prev => ({
        ...prev,
        name: personalInfo.name,
        email: personalInfo.email,
        phone: personalInfo.phone,
        address: personalInfo.address,
      }));
      
      setPersonalInfoStatus('success');
    } catch (error) {
      setPersonalInfoStatus('error');
    } finally {
      setIsPersonalInfoSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordStatus(null);
    
    // Basic validation
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      setPasswordError(t('profile.passwordMismatch'));
      return;
    }
    
    if (passwordInfo.newPassword.length < 8) {
      setPasswordError(t('profile.passwordTooShort'));
      return;
    }
    
    setIsPasswordSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPasswordStatus('success');
      setPasswordInfo({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      setPasswordStatus('error');
    } finally {
      setIsPasswordSaving(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('profile.pageTitle')} | Kamal Iron Works</title>
        <meta name="description" content={t('profile.pageDescription')} />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('profile.title')}</h1>
          <p className="text-muted-foreground">{t('profile.subtitle')}</p>
        </div>
        <Separator className="my-6" />
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* User Profile Card */}
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>
                {t('profile.memberSince', { date: new Date(user.created_at).toLocaleDateString() })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 opacity-70" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 opacity-70" />
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 opacity-70" />
                <span className="text-sm">{user.address}</span>
              </div>
            </CardContent>
          </Card>

          {/* Settings Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">{t('profile.tabs.personal')}</TabsTrigger>
                <TabsTrigger value="security">{t('profile.tabs.security')}</TabsTrigger>
              </TabsList>
              
              {/* Personal Information Tab */}
              <TabsContent value="personal" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('profile.personalInfo.title')}</CardTitle>
                    <CardDescription>{t('profile.personalInfo.description')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {personalInfoStatus === 'success' && (
                      <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <AlertDescription>{t('profile.personalInfo.saveSuccess')}</AlertDescription>
                      </Alert>
                    )}
                    
                    {personalInfoStatus === 'error' && (
                      <Alert className="mb-6" variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{t('profile.personalInfo.saveError')}</AlertDescription>
                      </Alert>
                    )}
                  
                    <form onSubmit={handlePersonalInfoSubmit}>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">{t('profile.personalInfo.name')}</Label>
                          <Input 
                            id="name"
                            name="name"
                            value={personalInfo.name}
                            onChange={handlePersonalInfoChange}
                            required
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="email">{t('profile.personalInfo.email')}</Label>
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            value={personalInfo.email}
                            onChange={handlePersonalInfoChange}
                            required
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="phone">{t('profile.personalInfo.phone')}</Label>
                          <Input 
                            id="phone"
                            name="phone"
                            type="tel"
                            value={personalInfo.phone}
                            onChange={handlePersonalInfoChange}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="address">{t('profile.personalInfo.address')}</Label>
                          <Input 
                            id="address"
                            name="address"
                            value={personalInfo.address}
                            onChange={handlePersonalInfoChange}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-6">
                        <Button type="submit" disabled={isPersonalInfoSaving}>
                          {isPersonalInfoSaving ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {t('profile.personalInfo.saving')}
                            </>
                          ) : (
                            t('profile.personalInfo.save')
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('profile.security.title')}</CardTitle>
                    <CardDescription>{t('profile.security.description')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {passwordStatus === 'success' && (
                      <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <AlertDescription>{t('profile.security.passwordChanged')}</AlertDescription>
                      </Alert>
                    )}
                    
                    {passwordStatus === 'error' && (
                      <Alert className="mb-6" variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{t('profile.security.passwordError')}</AlertDescription>
                      </Alert>
                    )}
                    
                    {passwordError && (
                      <Alert className="mb-6" variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{passwordError}</AlertDescription>
                      </Alert>
                    )}
                  
                    <form onSubmit={handlePasswordSubmit}>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="currentPassword">{t('profile.security.currentPassword')}</Label>
                          <Input 
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={passwordInfo.currentPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="newPassword">{t('profile.security.newPassword')}</Label>
                          <Input 
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={passwordInfo.newPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="confirmPassword">{t('profile.security.confirmPassword')}</Label>
                          <Input 
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={passwordInfo.confirmPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-6">
                        <Button type="submit" disabled={isPasswordSaving}>
                          {isPasswordSaving ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {t('profile.security.updating')}
                            </>
                          ) : (
                            t('profile.security.updatePassword')
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{t('profile.security.deleteAccount')}</CardTitle>
                    <CardDescription>{t('profile.security.deleteWarning')}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="destructive">
                      {t('profile.security.deleteButton')}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
