import React, { useEffect, useRef, useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { MdOutlineShoppingCart } from "react-icons/md";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { FaChevronDown } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'
import NavbarMobile from './NavbarMobile'
import useOnClickOutside from '../../hooks/useOnClickOutside'

const Nav = () => {

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  // for catalog drop down 
  const fetchSublinks = async () => {
    (async () => {
      setLoading(true);
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        // console.log("Printing Sublinks result", result)
        if (result) {
          setSubLinks(result.data.data)
        }
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })();
  }

  useEffect(() => {
    fetchSublinks();
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div className={`md:fixed flex sm:relative bg-richblack-900 w-screen relative z-50 h-14 items-center justify-center border-b-[1px] border-b-richblack-700 translate-y-  transition-all duration-500`}
    >
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        <Link to="/">
          <img src={logo} width={160} alt='Study Notion' height={42} />
        </Link>

        <nav className='lg:inline-block hidden'>
          <ul className="flex gap-x-6 text-richblack-25 hover:cursor-pointer">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className=' group relative cursor-pointer flex items-center gap-1 '>
                    <p>{link.title}</p>
                    <FaChevronDown className='text-yellow-25' />
                    <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>
                      <div className='absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5'>
                      </div>

                      {loading ? (
                        <div>
                          <Skeleton
                            count={5}
                            className='w-[90%] m-5 h-[15px]'
                            baseColor='#C5C7D4'
                            highlightColor='#AFB2BF'
                          />
                        </div>
                      ) : subLinks.length ?
                        (
                          <>
                            {subLinks
                              ?.filter((subLink) => subLink?.courses?.length > 0)
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))
                            }
                          </>
                        ) : (<div className='text-center'>No Course Found</div>)
                      }

                    </div>

                  </div>

                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${matchRoute(link?.path)
                        ? "text-yellow-25"
                        : "text-richblack-25"
                        }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className='flex gap-3 items-center'>
          <div className='flex gap-2 md:flex items-cente '>
            {user && user?.accountType !== "Instructor" && (
              <Link
                to="/dashboard/cart"
                className='relative px-4'>
                <div className='z-50'>
                  <MdOutlineShoppingCart
                    className="fill-richblack-25 w-7 h-7" />
                </div>
                {totalItems > 0 && (
                  <span className="shadow-sm shadow-black text-[10px] font-bold bg-yellow-100 text-richblack-900 rounded-full px-1 absolute -top-[2px] right-[8px]">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {token === null && (
              <Link to="/login">
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[7px]
                             text-richblack-100 rounded-md'>
                  Login
                </button>
              </Link>
            )}
            {token === null && (
              <Link to="/signup">
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[7px]
                              text-richblack-100 rounded-md'>
                  Signup
                </button>
              </Link>
            )}
            {token !== null &&
              <ProfileDropDown />}
          </div>

          {/* Mobile navbar */}
          <nav
            className={`inline-block lg:hidden `}
            ref={ref}
          >
            <NavbarMobile
              loading={loading}
              subLinks={subLinks}
              matchRoute={matchRoute}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </nav>
        </div>

      </div>
    </div>
  )
}

export default Nav