import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStatus('success');
      // In a real app, this would be an API call to request a password reset
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>{t('forgotPassword.pageTitle')} | Kamal Iron Works</title>
        <meta name="description" content={t('forgotPassword.pageDescription')} />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">            <img
              className="mx-auto h-20 w-auto"
              src="/images/kamal logo black and white.png"
              alt="Kamal Iron Works"
            />
            <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
              {t('forgotPassword.title')}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {t('forgotPassword.subtitle')}
            </p>
          </div>
          
          {status === 'success' ? (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">{t('forgotPassword.emailSent')}</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>{t('forgotPassword.checkInbox')}</p>
                  </div>
                  <div className="mt-4">
                    <div className="-mx-2 -my-1.5 flex">
                      <Link
                        to="/login"
                        className="px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100"
                      >
                        {t('forgotPassword.backToLogin')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <Label htmlFor="email" className="sr-only">
                    {t('forgotPassword.emailAddress')}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="rounded-md"
                    placeholder={t('forgotPassword.emailAddress')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? t('forgotPassword.sending') : t('forgotPassword.resetPassword')}
                </Button>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-sm">
                  <Link to="/login" className="font-medium text-black hover:underline">
                    {t('forgotPassword.backToLogin')}
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
