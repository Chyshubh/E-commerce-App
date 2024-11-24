import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='md:mx-10'>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

       {/*------ Left-Side ------*/}
       <div>
       <Link to='/'><img className='mb-5 w-32' src={assets.logo} alt=""/></Link>
        <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
       </div>

       {/*------ Middle-Side ------*/}
        <div >
            <p className='texl-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
              <Link to='/'><li>Home</li></Link>
              <Link to='/about'><li>About us</li></Link>
              <Link to='/contact'><li>Delivery</li></Link>
              <Link to='/privacy-policy'><li>Privacy policy</li></Link>
            </ul>
        </div>
       
       {/*------ Right-Side ------*/} 
       <div>
            <p className='texl-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+91-98765-43210</li>
                <li>Shubh.parasar@gmail.com</li>
            </ul>
       </div>
       {/*------ Copyright ------*/} 
      
    </div>
    <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024 @ Shubham Parasar - All Right Reserved.</p>
    </div>
</div>
  )
}

export default Footer