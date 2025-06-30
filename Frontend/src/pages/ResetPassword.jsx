import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const ResetPassword = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(null);
  const [isTokenValidating, setIsTokenValidating] = useState(true);

  // Simulate token validation - in a real app, this would be an API call
  useEffect(() => {
    const validateToken = async () => {
      try {
        // Simulate API request to validate token
        setTimeout(() => {
          if (token && token.length > 10) {
            setIsTokenValid(true);
          } else {
            setIsTokenValid(false);
            setError(t('resetPassword.invalidToken'));
          }
          setIsTokenValidating(false);
        }, 1000);
      } catch (error) {
        setIsTokenValid(false);
        setError(t('resetPassword.tokenError'));
        setIsTokenValidating(false);
      }
    };

    validateToken();
  }, [token, t]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      setError(t('resetPassword.passwordsDoNotMatch'));
      return;
    }

    if (password.length < 8) {
      setError(t('resetPassword.passwordTooShort'));
      return;
    }

    setError('');
    setIsLoading(true);
    
    try {
      // Simulate API call to reset password
      setTimeout(() => {
        setIsLoading(false);
        setStatus('success');
        
        // Redirect to login after successful reset
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      setStatus('error');
      setError(t('resetPassword.errorMessage'));
    }
  };

  if (isTokenValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-black" />
          <p className="mt-4 text-gray-600">{t('resetPassword.validatingToken')}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('resetPassword.pageTitle')} | Kamal Iron Works</title>
        <meta name="description" content={t('resetPassword.pageDescription')} />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">            <img
              className="mx-auto h-20 w-auto"
              src="/images/kamal logo black and white.png"
              alt="Kamal Iron Works"
            />
            <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
              {t('resetPassword.title')}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {t('resetPassword.subtitle')}
            </p>
          </div>
          
          {!isTokenValid ? (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{t('resetPassword.invalidToken')}</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error || t('resetPassword.tokenExpired')}</p>
                  </div>
                  <div className="mt-4">
                    <div className="-mx-2 -my-1.5 flex">
                      <Link
                        to="/forgot-password"
                        className="px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100"
                      >
                        {t('resetPassword.requestNewLink')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : status === 'success' ? (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">{t('resetPassword.success')}</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>{t('resetPassword.passwordResetSuccess')}</p>
                  </div>
                  <div className="mt-4">
                    <div className="-mx-2 -my-1.5 flex">
                      <Link
                        to="/login"
                        className="px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100"
                      >
                        {t('resetPassword.backToLogin')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="password">{t('resetPassword.newPassword')}</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="mt-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">{t('resetPassword.confirmPassword')}</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="mt-1"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('resetPassword.resetting')}
                    </>
                  ) : (
                    t('resetPassword.resetPassword')
                  )}
                </Button>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-sm">
                  <Link to="/login" className="font-medium text-black hover:underline">
                    {t('resetPassword.backToLogin')}
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

export default ResetPassword;
