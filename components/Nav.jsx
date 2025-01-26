"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { set } from "mongoose";

const Nav = () => {

  const [providers, setProviders] = useState(null);

  const { data: session } = useSession(); 

  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getProviders();
      setProviders(response);
    })();
  }, []);

  const handleSignOut = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);  // Scroll to top before signing out
    await signOut();
  };

  const handleSignIn = async (providerId) => {
    window.scrollTo(0, 0);  // Scroll to top before signing in
    await signIn(providerId);
  };

  return (
    <nav className='flex-between w-full mb-16 pt-3 sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-lg'>
      <Link href='/' className='flex gap-0.5 items-center group'>  {/* Changed gap-1 to gap-0.5 and added items-center */}
        <Image
          src='/assets/images/logo.png'
          alt='logo'
          width={45}    // Increased from 40 to 45
          height={45}   // Increased from 40 to 45
          className='object-contain group-hover:rotate-12 transition-transform duration-200 invert'
        />
        <p className='logo_text font-bold tracking-wider'>
          <span className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent text-xl">Code</span>
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-xl">Dock</span>
        </p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-snippet' className='black_btn'>
              Create Post
            </Link>

            <button type='button' onClick={handleSignOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src= {session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => handleSignIn(provider.id)}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown bg-gray-800 border border-gray-700'>
                <Link
                  href='/profile'
                  className='dropdown_link text-gray-300 hover:text-gray-100'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-snippet'
                  className='dropdown_link text-gray-300 hover:text-gray-100'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Snippet
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    handleSignOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => handleSignIn(provider.id)}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;