import React, { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Placeorder = () => {
  const { navigate, backendUrl, token, setKartItems, kartItems, getKartAmount, delivery_fee, products } = useContext(ShopContext);
  const [method, setMethod] = useState('cod');

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: ""
  })

  const OnChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = []

      for (const items in kartItems) {
        console.log("Checking item ID:", items);
        for (const item in kartItems[items]) {
          if (kartItems[items][item] > 0) {
            // Ensure 'items' is a valid value and corresponds to an existing product _id
            if (items) {
              const product = products.find(product => product._id === items);

              if (product) {
                const itemInfo = structuredClone(product); // Clone the product information
                itemInfo.size = item;
                itemInfo.quantity = kartItems[items][item];
                orderItems.push(itemInfo);
              } else {
                console.error(`Product with _id ${items} not found in products array.`);
              }
            } else {
              console.error("Invalid product ID:", items);
            }
          }
        }
      }
      console.log(orderItems);

      //Create Order Data
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getKartAmount() + delivery_fee
      }

      switch (method) {

        //API Calls for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setKartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const {session_url} = responseStripe.data;
            window.location.replace(session_url)
          } else{
            toast.error(responseStripe.data.message)
          }
          
          break;

        default:
          toast.error("Unsupported payment method.");
          break;
      }

    } catch (error) {
      console.error("Order submission failed:", error);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* -----------Left-Side-----------*/}
      <div className="flex flex-col gap-4 sm:w-full sm:max-w-[480px]">

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input required onChange={OnChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
          <input required onChange={OnChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
        </div>
        <input required onChange={OnChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
        <input required onChange={OnChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5' type="text" placeholder='Street' />
        <div className="flex gap-3">
          <input required onChange={OnChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required onChange={OnChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className="flex gap-3">
          <input required onChange={OnChangeHandler} name='pincode' value={formData.pincode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Pincode' />
          <input required onChange={OnChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input required onChange={OnChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone number' />
      </div>
      {/* -----------Right-Side-----------*/}
      <div className='mt-8'>

        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* -----------Payment Method Selection-----------*/}
          <div className='flex gap-3 flex-col sm:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-blue-800' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-blue-800' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-blue-800' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white text-sm my-8 px-8 py-3'>PLACE ORDER</button>

          </div>
        </div>
      </div>
    </form>
  )
}

export default Placeorder