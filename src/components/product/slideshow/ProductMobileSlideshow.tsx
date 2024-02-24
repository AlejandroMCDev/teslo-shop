'use client'

import Image from "next/image"
import { Swiper } from "swiper/react"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"
import { SwiperSlide } from "swiper/react"

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './slideshow.css';

interface Props {
  images:string[]
  title: string
  className?: string
}


export const ProductMobileSlideshow = ({ images,title,className }:Props) => {


  return (
    <div className={className}>
      <Swiper
        style={{ width: '100vw', height: '500px' }}
        pagination
        autoplay={{
          delay:2500
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {
          images.map((image) => (
            <SwiperSlide key={image}>
              <Image 
                width={600}
                height={500}
                src={`/products/${image}`}
                alt={title}
                className="object-cover"
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}
