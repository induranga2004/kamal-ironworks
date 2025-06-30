import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';

const Checkout = () => {
  const { t } = useTranslation();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  // Sample cart items - would come from context/state in production
  const cartItems = [
    {
      id: 1,
      name: 'Modern Gate Design MG-101',
      price: 450,
      quantity: 1,
      image: 'https://via.placeholder.com/100x100?text=Metal+Gate',
    },
    {
      id: 2,
      name: 'Decorative Window Grill WG-205',
      price: 180,
      quantity: 2,
      image: 'https://via.placeholder.com/100x100?text=Window+Grill',
    },
    {
      id: 4,
      name: 'Metal Coffee Table MCT-405',
      price: 320,
      quantity: 1,
      image: 'https://via.placeholder.com/100x100?text=Coffee+Table',
    },
  ];

  // Calculate cart summary
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 25;
  const tax = subtotal * 0.15; // 15% tax
  const total = subtotal + shipping + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would submit the order to the backend
    alert('Order submitted successfully!');
  };

  return (
    <>
      <Helmet>
        <title>{t('checkout.pageTitle')} | Kamal Iron Works</title>
        <meta name="description" content={t('checkout.pageDescription')} />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">{t('checkout.title')}</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customer Information */}
            <div className="lg:col-span-2 space-y-8">
              {/* Billing Details */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">{t('checkout.billingDetails')}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">{t('checkout.firstName')} *</Label>
                    <Input id="firstName" className="mt-1" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">{t('checkout.lastName')} *</Label>
                    <Input id="lastName" className="mt-1" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">{t('checkout.email')} *</Label>
                    <Input id="email" type="email" className="mt-1" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">{t('checkout.phone')} *</Label>
                    <Input id="phone" type="tel" className="mt-1" required />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="company">{t('checkout.companyName')}</Label>
                    <Input id="company" className="mt-1" />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="address">{t('checkout.address')} *</Label>
                    <Input id="address" className="mt-1" required />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="apartment">{t('checkout.apartment')}</Label>
                    <Input id="apartment" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">{t('checkout.city')} *</Label>
                    <Input id="city" className="mt-1" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="postalCode">{t('checkout.postalCode')} *</Label>
                    <Input id="postalCode" className="mt-1" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">{t('checkout.state')}</Label>
                    <Input id="state" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="country">{t('checkout.country')} *</Label>
                    <select 
                      id="country" 
                      className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    >
                      <option value="">{t('checkout.selectCountry')}</option>
                      <option value="LK">Sri Lanka</option>
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="shipping-same" className="rounded border-gray-300 text-black focus:ring-black" />
                    <Label htmlFor="shipping-same">{t('checkout.shippingSameAsBilling')}</Label>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Label htmlFor="notes">{t('checkout.orderNotes')}</Label>
                  <textarea 
                    id="notes" 
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" 
                    rows="4"
                    placeholder={t('checkout.orderNotesPlaceholder')}
                  ></textarea>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">{t('checkout.payment')}</h2>
                
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 border rounded-md">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex-grow">
                        {t('checkout.paymentMethods.creditCard')}
                      </Label>
                      <div className="flex space-x-1">
                        <div className="w-8 h-6 bg-gray-200 rounded"></div>
                        <div className="w-8 h-6 bg-gray-200 rounded"></div>
                        <div className="w-8 h-6 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    
                    {paymentMethod === 'credit-card' && (
                      <div className="ml-7 p-4 border rounded-md space-y-4">
                        <div>
                          <Label htmlFor="card-number">{t('checkout.cardNumber')} *</Label>
                          <Input id="card-number" className="mt-1" placeholder="1234 5678 9012 3456" required />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">{t('checkout.expiryDate')} *</Label>
                            <Input id="expiry" className="mt-1" placeholder="MM/YY" required />
                          </div>
                          
                          <div>
                            <Label htmlFor="cvv">{t('checkout.cvv')} *</Label>
                            <Input id="cvv" className="mt-1" placeholder="123" required />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="name-on-card">{t('checkout.nameOnCard')} *</Label>
                          <Input id="name-on-card" className="mt-1" required />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-3 p-3 border rounded-md">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-grow">
                        {t('checkout.paymentMethods.paypal')}
                      </Label>
                      <div className="w-12 h-6 bg-gray-200 rounded"></div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 border rounded-md">
                      <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                      <Label htmlFor="bank-transfer">
                        {t('checkout.paymentMethods.bankTransfer')}
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 border rounded-md">
                      <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
                      <Label htmlFor="cash-on-delivery">
                        {t('checkout.paymentMethods.cashOnDelivery')}
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
                
                <div className="mt-6">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="terms" className="rounded border-gray-300 text-black focus:ring-black" required />
                    <Label htmlFor="terms">
                      {t('checkout.termsAgreement')} <a href="/terms" className="text-black underline hover:no-underline">{t('checkout.termsLink')}</a>
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-4">{t('checkout.orderSummary')}</h2>
                
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex items-center">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover mr-3" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span>{t('checkout.subtotal')}</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>{t('checkout.shipping')}</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>{t('checkout.tax')}</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>{t('checkout.total')}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <Button type="submit" className="w-full mt-4">
                    {t('checkout.placeOrder')}
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t text-center text-sm text-gray-600">
                  <p>{t('checkout.secureTransaction')}</p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <div className="w-8 h-6 bg-gray-200 rounded"></div>
                    <div className="w-8 h-6 bg-gray-200 rounded"></div>
                    <div className="w-8 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Back to Cart Link */}
        <div className="mt-12">
          <Link to="/cart" className="text-black font-medium hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('checkout.backToCart')}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Checkout;
