import React, { useContext, useState, useEffect, useRef } from 'react';
import { ShopContext } from '../context/shop-context';
import { Link } from 'react-router-dom';


export default function Account() {

  const { setLoginModal, user } = useContext(ShopContext);
  const [selectCurrency, setSelectCurrency] = useState('usdt');
  const [openCurrency, setOpenCurrency] = useState(false);
  const [accountModal, setAccountModal] = useState(false);
  const accModal = useRef(null);
  const balModal = useRef(null);




  useEffect(() => {
    const handleOutsideClick = (event) => {

      if (accountModal && !accModal.current.contains(event.target)) {
        setAccountModal(false);
      }

      if (openCurrency && !balModal.current.contains(event.target)) {
        setOpenCurrency(false);
      }

    };


    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };

  }, [selectCurrency, openCurrency, accountModal, user])

  return (
    <div className="flex flex-col text-sm relative max-md:hidden">

      <div className="flex gap-1 self-center cursor-pointer shadow-[0_0px_5px_0.5px_rgba(0,0,0,0.06)] rounded-full items-center" onClick={() => setAccountModal(!accountModal)} >
        <img className="w-[24px]" src='\account-icon.png' />
      </div>


      {
        accountModal &&

        <div ref={accModal} className="absolute rounded shadow-lg flex flex-col justify-start gap-3 px-2 py-4 z-[999999999999] bg-[#fff] top-[150%] right-3 w-[200px]">
          <div className="flex gap-2 cursor-pointer w-full rounded hover:bg-[#f5f5f5] p-2">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
            </span>
            <Link to="/dashboard" className='font-medium'>My Account</Link>
          </div>

          <div className="flex gap-2 cursor-pointer w-full rounded hover:bg-[#f5f5f5] p-2">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M16.25 20h1v-4h-1v4Zm2.5 0h1v-4h-1v4ZM6 9h12V7H6v2Zm12 14q-2.075 0-3.538-1.463T13 18q0-2.075 1.463-3.538T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23ZM3 22V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v6.675q-.7-.35-1.463-.513T18 11H6v2h7.1q-.425.425-.787.925T11.675 15H6v2h5.075q-.05.25-.063.488T11 18q0 1.05.288 2.013t.862 1.837L12 22l-1.5-1.5L9 22l-1.5-1.5L6 22l-1.5-1.5L3 22Z" /></svg>
            </span>
            <Link to="/orders" className='font-medium'>My Orders</Link>
          </div>

          <div className="flex gap-2 cursor-pointer w-full rounded hover:bg-[#f5f5f5] p-2">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812Q2.775 11.5 2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.388 2.25t-1.362 2.412q-.975 1.313-2.625 2.963T13.45 19.7L12 21Z" /></svg>
            </span>
            <Link to="/saved" className='font-medium'>Saved Items</Link>
          </div>

          {user ?
            <div className="flex flex-col p-2 bg-slate-400/10 rounded">
              <div className='flex flex-row w-full items-center gap-3'>
                {
                  selectCurrency === "usdt" ?
                    <div className='flex flex-col justify-center items-center cursor-pointer hover:opacity-70' onClick={() => setOpenCurrency(!openCurrency)}>
                      <span class="relative flex h-5 w-5">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <div className="relative inline-flex rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="w-[20px] h-[20px]" viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#26A17B" /><path fill="#FFF" d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042c-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658c0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061c1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658c0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118c0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116c0-1.043-3.301-1.914-7.694-2.117" /></g></svg></div>
                      </span>
                    </div>
                    :
                    <div className='flex flex-col justify-center items-center cursor-pointer hover:opacity-70' onClick={() => setOpenCurrency(!openCurrency)}>
                      <span class="relative flex h-5 w-5">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <div className="relative inline-flex rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="w-[20px] h-[20px] " viewBox="0 0 32 32"><g fill="none"><circle cx="16" cy="16" r="16" fill="#3E73C4" /><g fill="#FFF"><path d="M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156c-1.828-.243-2.193-.728-2.193-1.578c0-.85.61-1.396 1.828-1.396c1.097 0 1.707.364 2.011 1.275a.458.458 0 0 0 .427.303h.975a.416.416 0 0 0 .427-.425v-.06a3.04 3.04 0 0 0-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974c0 2.002 1.218 2.791 3.778 3.095c1.707.303 2.255.668 2.255 1.639c0 .97-.853 1.638-2.011 1.638c-1.585 0-2.133-.667-2.316-1.578c-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 0 0-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z" /><path d="M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653c.914-2.55 2.925-4.491 5.424-5.402c.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485c-.061 0-.183 0-.244.06a10.895 10.895 0 0 0-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102c.244.121.488 0 .548-.243c.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242c-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607c4.754 1.7 7.192 6.98 5.424 11.653c-.914 2.55-2.925 4.491-5.424 5.402c-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485c.061 0 .183 0 .244-.06a10.895 10.895 0 0 0 7.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z" /></g></g></svg></div>
                      </span>
                    </div>
                }
                <div className='font-medium text-sm'>Balance</div>
              </div>
              <div className="relative">

                {
                  openCurrency &&
                  <div ref={balModal} className="absolute top-[30px] flex flex-col bg-[#fff] shadow-lg p-1 rounded border border-[#000]">
                    {

                      selectCurrency === "usdt" ?
                        <div
                          className='flex items-center cursor-pointer'
                          onClick={
                            () => {
                              setSelectCurrency('usdc')
                              setOpenCurrency(false)
                            }
                          }
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className='w-[15px] h-[15px]' viewBox="0 0 32 32"><g fill="none"><circle cx="16" cy="16" r="16" fill="#3E73C4" /><g fill="#FFF"><path d="M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156c-1.828-.243-2.193-.728-2.193-1.578c0-.85.61-1.396 1.828-1.396c1.097 0 1.707.364 2.011 1.275a.458.458 0 0 0 .427.303h.975a.416.416 0 0 0 .427-.425v-.06a3.04 3.04 0 0 0-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974c0 2.002 1.218 2.791 3.778 3.095c1.707.303 2.255.668 2.255 1.639c0 .97-.853 1.638-2.011 1.638c-1.585 0-2.133-.667-2.316-1.578c-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 0 0-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z" /><path d="M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653c.914-2.55 2.925-4.491 5.424-5.402c.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485c-.061 0-.183 0-.244.06a10.895 10.895 0 0 0-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102c.244.121.488 0 .548-.243c.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242c-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607c4.754 1.7 7.192 6.98 5.424 11.653c-.914 2.55-2.925 4.491-5.424 5.402c-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485c.061 0 .183 0 .244-.06a10.895 10.895 0 0 0 7.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z" /></g></g></svg>
                          <small>Usdc</small>
                        </div>
                        :
                        <div
                          className='flex items-center cursor-pointer'
                          onClick={
                            () => {
                              setSelectCurrency('usdt')
                              setOpenCurrency(false)
                            }
                          }
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className='w-[15px] h-[15px]' viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#26A17B" /><path fill="#FFF" d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042c-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658c0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061c1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658c0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118c0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116c0-1.043-3.301-1.914-7.694-2.117" /></g></svg>
                          <small>Usdt</small>
                        </div>
                    }
                  </div>
                }
              </div>
              <div className="pl-8 pt-1">
                <strong>$200</strong><small className='text-[9px] md:text-sm'>(@1132/{selectCurrency === "usdt" ? "usdt" : "usdc"})</small>
              </div>
            </div>
            :
            ""
          }

          {user ?
            <div className="flex gap-2 cursor-pointer w-full rounded hover:bg-[#f5f5f5] p-2">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path fill="currentColor" d="M160 256a16 16 0 0 1 16-16h144V136c0-32-33.79-56-64-56H104a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h160a56.06 56.06 0 0 0 56-56V272H176a16 16 0 0 1-16-16Zm299.31-11.31l-80-80a16 16 0 0 0-22.62 22.62L409.37 240H320v32h89.37l-52.68 52.69a16 16 0 1 0 22.62 22.62l80-80a16 16 0 0 0 0-22.62Z" /></svg>
              </span>
              <span className='font-medium'>Logout</span>
            </div>
            :
            <button onClick={
              () => {
                setLoginModal(1)
                setAccountModal(false)
              }
            } className='outline-none bg-[#FF0066] px-5 py-2 text-white rounded'>
              Login
            </button>
          }

        </div>
      }

    </div>
  )
}

