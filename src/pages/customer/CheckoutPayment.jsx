import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiInfo } from 'react-icons/fi';
import { selectCartItems, selectCartTotal, clearCart } from '../../store/slices/cartSlice';
import api from '../../services/api';
import toast from 'react-hot-toast';

/* ---------- Payment method icons (SVG / emoji fallback) ---------- */
const EasypaisaIcon = () => (
  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold">
    <img src="/others/easypasaCart.png" alt="Easypaisa" />
  </div>
);
const JazzCashIcon = () => (
  <div className="w-10 h-10 rounded-full flex items-center justify-center">
    <img src="/others/jazzcashCart.webp" alt="JazzCash" />
  </div>
);
const CreditCardIcon = () => (
  <div className="w-10 h-10 flex items-center justify-center">
    <img src="/others/credit_debitCart.png" alt="Credit Card" />
  </div>
);
const HBLIcon = () => (
  <div className="w-10 h-10 flex items-center justify-center">
    <img src="/others/hblCart.png" alt="HBL" />
  </div>
);
const CODIcon = () => (
  <div className="w-10 h-10 opacity-60 grayscale flex items-center justify-center">
    <img src="/others/COD.png" alt="COD" />
  </div>
);
const InstalmentIcon = () => (
  <div className="w-10 h-10 opacity-60 grayscale flex items-center justify-center">
    <img src="/others/installment.png" alt="Instalment" />
  </div>
);


const paymentMethods = [
  { id: 'easypaisa', label: 'Easypaisa', icon: <EasypaisaIcon /> },
  { id: 'jazzcash', label: 'JazzCash', icon: <JazzCashIcon /> },
  { id: 'card', label: 'Credit/Debit Card', sub: 'Credit/Debit Card', icon: <CreditCardIcon /> },
  { id: 'hbl', label: 'HBL Bank Account', icon: <HBLIcon /> },
  { id: 'cod', label: 'Cash on Delivery', sub: 'Cash on Delivery', icon: <CODIcon /> },
  { id: 'instalment', label: 'Instalment', sub: 'Instalment', icon: <InstalmentIcon />, disabled: true },
];

/* ---------------------------------------------------------------- */
const CheckoutPayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  const { user } = useSelector((state) => state.auth);

  const shippingFee = 140;
  const platformFee = 10;
  const total = subtotal + shippingFee + platformFee;

  const [activeMethod, setActiveMethod] = useState('easypaisa');
  const [placing, setPlacing] = useState(false);

  /* form states */
  const [epAccount, setEpAccount] = useState('');
  const [jcAccount, setJcAccount] = useState('');
  const [jcSave, setJcSave] = useState(true);
  const [cardNum, setCardNum] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardSave, setCardSave] = useState(true);
  const [hblAccount, setHblAccount] = useState('');
  const [hblCnic, setHblCnic] = useState('');

  const handlePlaceOrder = async () => {
    if (!items.length) { toast.error('Your cart is empty!'); return; }
    setPlacing(true);
    try {
      const payload = {
        paymentMethod: activeMethod === 'cod' ? 'cod' : activeMethod,
        shippingAddress: {
          firstName: user?.name?.split(' ')[0] || 'Customer',
          lastName: user?.name?.split(' ').slice(1).join(' ') || '',
          address: 'Jodia Bazar, Karachi',
          phone: '03000000000',
        },
        shippingFee,
        platformFee,
      };
      const { data } = await api.post('/orders', payload);
      await dispatch(clearCart()).unwrap();
      toast.success('Order placed successfully!');
      navigate(`/profile/order/${data.order._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  /* ---- Per-method form panels ---- */
  const renderForm = () => {
    switch (activeMethod) {
      case 'easypaisa':
        return (
          <div className="p-6 space-y-4 text-sm text-gray-700">
            <p>Experience easy payments – save your Easypaisa account as default method to pay!<br />
              Please ensure your Easypaisa account is Active and has sufficient balance.</p>
            <p className="font-medium mt-2">To confirm your payment after providing OTP:</p>
            <p className="text-[#0F68C9]">- USSD prompt for Telenor Customers Only</p>
            <p className="ml-2 text-gray-600">• Unlock your phone and enter 5 digit PIN in the prompt to pay</p>
            <p className="mt-1">OR</p>
            <p className="text-[#0F68C9]">- Approve Payment in your Easypaisa App (Telenor and Other Networks)</p>
            <p className="ml-2 text-gray-600">• Login to Easypaisa App and tap on payment notification to approve</p>
            <p className="ml-2 text-gray-600">• If you miss the notification, go to My Approvals in side menu to confirm</p>
            <div className="mt-4">
              <label className="block text-xs text-gray-500 mb-1">Easypaisa Account Number</label>
              <input value={epAccount} onChange={e => setEpAccount(e.target.value)}
                className="border border-gray-300 px-3 py-2.5 w-72 focus:outline-none focus:border-primary text-sm rounded-sm" />
            </div>
            <button onClick={handlePlaceOrder} disabled={placing}
              className="mt-4 bg-primary text-white px-16 py-3 rounded-sm hover:bg-primary-dark transition-colors font-medium text-sm">
              {placing ? 'Placing...' : 'Pay Now'}
            </button>
          </div>
        );

      case 'jazzcash':
        return (
          <div className="p-6 space-y-4 text-sm text-gray-700">
            <p className="font-medium text-gray-800">❶ FOR JAZZ/WARID</p>
            <p className="text-[#0F68C9] ml-2">↳ Unlock your phone and you will receive a MPIN Input Prompt</p>
            <p className="font-medium text-gray-800 mt-2">❷ FOR OTHER NETWORKS</p>
            <p className="text-[#0F68C9] ml-2">↳ Log-in to your JazzCash App and enter your MPIN</p>
            <p className="mt-2">Note: Ensure your JazzCash account is Active and has sufficient balance.</p>
            <div className="mt-3">
              <label className="block text-xs text-gray-500 mb-1">JazzCash Account Number</label>
              <input value={jcAccount} onChange={e => setJcAccount(e.target.value)}
                className="border border-gray-300 px-3 py-2.5 w-72 focus:outline-none focus:border-primary text-sm rounded-sm" />
            </div>
            <label className="flex items-start gap-2 mt-3 cursor-pointer">
              <input type="checkbox" checked={jcSave} onChange={e => setJcSave(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-primary" />
              <span className="text-xs text-gray-500">
                We will save this account for your convenience. If required, you can remove the account in the
                "Payment Options" section in the "Account" Menu.
              </span>
            </label>
            <button onClick={handlePlaceOrder} disabled={placing}
              className="mt-4 bg-primary text-white px-16 py-3 rounded-sm hover:bg-primary-dark transition-colors font-medium text-sm">
              {placing ? 'Placing...' : 'Pay Now'}
            </button>
          </div>
        );

      case 'card':
        return (
          <div className="p-6 space-y-4 text-sm text-gray-700">
            {/* Card logos */}
            <div className="flex items-center gap-3 mb-2">
              <img src="/others/master.png" alt="Mastercard" className="w-7 h-7 object-contain" />
              <img src="/others/visa.png" alt="Visa" className="w-7 h-7 object-contain" />
              <img src="/others/union.png" alt="UnionPay" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <label className="block text-xs text-red-500 mb-1">* Card number</label>
              <input value={cardNum} onChange={e => setCardNum(e.target.value)} placeholder="Card number"
                className="border border-gray-300 px-3 py-2.5 w-full max-w-sm focus:outline-none focus:border-primary text-sm rounded-sm" />
            </div>
            <div>
              <label className="block text-xs text-red-500 mb-1">* Name on card</label>
              <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Name on card"
                className="border border-gray-300 px-3 py-2.5 w-full max-w-sm focus:outline-none focus:border-primary text-sm rounded-sm" />
            </div>
            <div className="flex gap-4">
              <div>
                <label className="block text-xs text-red-500 mb-1">* Expiry date</label>
                <input value={cardExp} onChange={e => setCardExp(e.target.value)} placeholder="MM/YY"
                  className="border border-gray-300 px-3 py-2.5 w-36 focus:outline-none focus:border-primary text-sm rounded-sm" />
              </div>
              <div>
                <label className="block text-xs text-red-500 mb-1 flex items-center gap-1">* CVV <FiInfo className="text-[#0F68C9]" /></label>
                <input value={cardCvv} onChange={e => setCardCvv(e.target.value)} placeholder="CVV"
                  className="border border-gray-300 px-3 py-2.5 w-28 focus:outline-none focus:border-primary text-sm rounded-sm" />
              </div>
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={cardSave} onChange={e => setCardSave(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-primary" />
              <div>
                <span className="text-sm font-medium text-gray-700">Save Card</span>
                <p className="text-xs text-gray-500">We will save this card for your convenience. If required, you can remove the card in the "Payment Options" section in the "Account" menu.</p>
              </div>
            </label>
            <button onClick={handlePlaceOrder} disabled={placing}
              className="mt-4 bg-primary text-white px-16 py-3 rounded-sm hover:bg-primary-dark transition-colors font-medium text-sm">
              {placing ? 'Placing...' : 'Pay Now'}
            </button>
          </div>
        );

      case 'hbl':
        return (
          <div className="p-6 space-y-4 text-sm text-gray-700">
            <div>
              <label className="block text-xs text-[#0F68C9] mb-1">HBL Account Number</label>
              <input value={hblAccount} onChange={e => setHblAccount(e.target.value)}
                className="border border-gray-300 px-3 py-2.5 w-72 focus:outline-none focus:border-primary text-sm rounded-sm" />
            </div>
            <div>
              <label className="block text-xs text-[#0F68C9] mb-1">CNIC NO.</label>
              <input value={hblCnic} onChange={e => setHblCnic(e.target.value)}
                className="border border-gray-300 px-3 py-2.5 w-72 focus:outline-none focus:border-primary text-sm rounded-sm" />
            </div>
            <button onClick={handlePlaceOrder} disabled={placing}
              className="mt-4 bg-primary text-white px-16 py-3 rounded-sm hover:bg-primary-dark transition-colors font-medium text-sm">
              {placing ? 'Placing...' : 'Pay Now'}
            </button>
          </div>
        );

      case 'cod':
        return (
          <div className="p-6 space-y-3 text-sm text-gray-700">
            <p>● You may pay in cash upon receiving your parcel.</p>
            <p>● Cash Payment Fee (7%), with a maximum cap of Rs.100 applies only to Cash on Delivery payment method. There is no extra fee when using other payment methods.</p>
            <p>● In case you have opted for cash on delivery (doorstep or collection point), you are requested keep the exact change amount required for the payment.</p>
            <p>● Before agreeing to receive the parcel, check if your delivery status has been updated to 'Out for Delivery' on Daraz App.</p>
            <p>● Before receiving, confirm that the airway bill shows that the parcel is from Daraz.</p>
            <p>● Before you make your payment, confirm your order number, sender information, and tracking number on the parcel.</p>
            <button onClick={handlePlaceOrder} disabled={placing}
              className="mt-4 bg-primary text-white px-16 py-3 rounded-sm hover:bg-primary-dark transition-colors font-medium text-sm">
              {placing ? 'Placing Order...' : 'Confirm Order'}
            </button>
          </div>
        );

      default:
        return (
          <div className="p-6 text-gray-400 text-sm">This payment method is not available yet.</div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="container mx-auto px-4 py-6">

        {/* Bank voucher notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-sm px-4 py-3 mb-6 flex items-center gap-2 text-sm text-yellow-800">
          <FiInfo className="text-yellow-500 flex-shrink-0" />
          Please collect bank vouchers to avail bank discounts and mega deals/flash sales.
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Left: Payment Selection */}
          <div className="flex-1">
            <h1 className="text-xl font-normal text-gray-800 mb-4">Select Payment Method</h1>

            <div className="bg-white shadow-sm border border-gray-100">
              {/* Tabs Row */}
              <div className="flex border-b border-gray-200 overflow-x-auto">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    disabled={method.disabled}
                    onClick={() => !method.disabled && setActiveMethod(method.id)}
                    className={`flex flex-col items-center justify-center gap-1.5 px-5 py-4 border-r border-gray-200 flex-shrink-0 min-w-[100px] transition-colors
                      ${method.disabled ? 'opacity-40 cursor-not-allowed bg-gray-50' : 'cursor-pointer hover:bg-gray-50'}
                      ${activeMethod === method.id ? 'bg-white border-b-2 border-b-primary' : 'bg-gray-50'}
                    `}
                  >
                    {method.icon}
                    <span className={`text-xs font-medium mt-1 ${activeMethod === method.id ? 'text-gray-800' : 'text-gray-500'}`}>
                      {method.label}
                    </span>
                    {method.sub && (
                      <span className={`text-[10px] ${activeMethod === method.id ? 'text-gray-600' : 'text-gray-400'}`}>
                        {method.sub}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Dynamic Form Panel */}
              {renderForm()}

            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white shadow-sm border border-gray-100 p-5">
              <h3 className="text-base font-medium text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal({items.length} items and shipping fee included)</span>
                  <span className="text-gray-800">Rs. {total.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-medium">
                  <span className="text-gray-800">Total Amount</span>
                  <span className="text-primary text-base font-semibold">Rs. {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPayment;
