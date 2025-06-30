import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';

const Cart = () => {
  const { t } = useTranslation();
  const [couponCode, setCouponCode] = useState('');

  // Sample cart items - would come from context/state in production
  const [cartItems, setCartItems] = useState([
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
  ]);

  // Calculate cart summary
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 25;
  const tax = subtotal * 0.15; // 15% tax
  const total = subtotal + shipping + tax;

  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle remove item
  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Handle apply coupon
  const handleApplyCoupon = () => {
    // In a real app, this would validate the coupon with the backend
    alert(`Applying coupon: ${couponCode}`);
  };

  return (
    <>
      <Helmet>
        <title>{t('cart.pageTitle')} | Kamal Iron Works</title>
        <meta name="description" content={t('cart.pageDescription')} />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">{t('cart.title')}</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4">{t('cart.product')}</th>
                      <th className="text-center py-4">{t('cart.price')}</th>
                      <th className="text-center py-4">{t('cart.quantity')}</th>
                      <th className="text-right py-4">{t('cart.subtotal')}</th>
                      <th className="text-right py-4"><span className="sr-only">{t('cart.actions')}</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-4">
                          <div className="flex items-center">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td className="text-center py-4">${item.price.toFixed(2)}</td>
                        <td className="text-center py-4">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 border border-gray-300 rounded-l flex items-center justify-center hover:bg-gray-100"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                              className="w-12 h-8 border-t border-b border-gray-300 text-center"
                            />
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 border border-gray-300 rounded-r flex items-center justify-center hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-right py-4">${(item.price * item.quantity).toFixed(2)}</td>
                        <td className="text-right py-4">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-between items-center mt-8">
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder={t('cart.enterCoupon')}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-48"
                    />
                    <Button 
                      onClick={handleApplyCoupon}
                      disabled={!couponCode}
                      variant="outline"
                    >
                      {t('cart.applyCoupon')}
                    </Button>
                  </div>
                  <Button variant="outline">
                    {t('cart.updateCart')}
                  </Button>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">{t('cart.specialInstructions')}</h3>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  rows="4"
                  placeholder={t('cart.instructionsPlaceholder')}
                ></textarea>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">{t('cart.orderSummary')}</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>{t('cart.subtotal')}</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('cart.shipping')}</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('cart.tax')}</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>{t('cart.total')}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <Link to="/checkout">
                    <Button className="w-full mt-4">
                      {t('cart.proceedToCheckout')}
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-2">{t('cart.weAccept')}</h3>
                  <div className="flex space-x-2">
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-2xl font-bold mt-4">{t('cart.emptyCart')}</h2>
            <p className="text-gray-600 mt-2">{t('cart.emptyCartMessage')}</p>
            <Link to="/shop">
              <Button className="mt-6">
                {t('cart.continueShopping')}
              </Button>
            </Link>
          </div>
        )}

        {/* Continue Shopping Link */}
        {cartItems.length > 0 && (
          <div className="mt-12">
            <Link to="/shop" className="text-black font-medium hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('cart.continueShopping')}
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
