'use client'

import { titleFont } from "@/config/fonts"
import { useCartStore, useUiStore } from "@/store"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"


export const TopMenu = () => {

  const [loaded, setLoaded] = useState(false)
  const { toggleSideMenu } = useUiStore((state) => state);
  const getTotalItemsInCart = useCartStore( state => state.getTotalItems() )

  useEffect(() => {
    setLoaded(true)
  }, []);


  return (
    <nav className="flex px-5 justify-between items-center w-full">
        <div className="">
            <Link
                href="/"
            >
                <span className={`${ titleFont.className } antialiased font-bold`}>Teslo</span>
                <span> | Shop</span>
            
            </Link>
        </div>

        <div className="hidden sm:block">
          <Link
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
            href="/gender/men"
          >
            Hombres
          </Link>
          <Link
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
            href="/gender/women"
          >
            Mujeres
          </Link>
          <Link
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
            href="/gender/kid"
          >
            Niños
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
          >
            <IoSearchOutline className="w-5 h-5"/>
          </Link>

          <Link
            href={
              (getTotalItemsInCart === 0 && loaded)
                ? '/empty'
                : "/cart"
            }
          >
            <div className="relative">
              {
                ( loaded && getTotalItemsInCart > 0 ) && (
                  <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                    {getTotalItemsInCart}
                  </span>
                )
              }
              <IoCartOutline className="w-5 h-5"/>
            </div>
          </Link>

          <button
            onClick={toggleSideMenu}
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          >
            Menu
          </button>
        </div>
    </nav>
  )
}
