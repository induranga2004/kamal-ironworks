import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('notFound.pageTitle')} | Kamal Iron Works</title>
        <meta name="description" content={t('notFound.pageDescription')} />
      </Helmet>

      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-9xl font-extrabold text-black">404</h1>
        <div className="w-16 h-1 bg-black my-6"></div>
        <h2 className="text-3xl font-semibold mb-4">{t('notFound.title')}</h2>
        <p className="text-lg text-gray-600 max-w-md mb-8">{t('notFound.message')}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link to="/">{t('notFound.goHome')}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">{t('notFound.contactUs')}</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
