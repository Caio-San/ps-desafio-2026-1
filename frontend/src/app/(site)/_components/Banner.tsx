'use client'; 

import Image from 'next/image';
import styles from './Banner.module.css';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function Banner() {
    const imagens = [
        "/assets/images/GingaSports.jpg",
        "/assets/images/bannerdois.jpg", 
        "/assets/images/bannertres.jpg"
    ];

    return (
        <div className={styles.banner}>
            <Swiper
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                effect="fade"
                speed={800}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                className={styles.mySwiper}
            >
                {imagens.map((src, index) => (
                    <SwiperSlide key={index}>
                        <div className={styles.container}>
                            <Image 
                                className={styles.bannerImage} 
                                src={src} 
                                alt={`Banner ${index + 1}`} 
                                fill 
                                quality={100} 
                                sizes="100vw" 
                                priority={index === 0}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}