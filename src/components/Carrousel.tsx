"use client"
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import {useTranslations} from 'next-intl';

export default function Carousel() {

  const t = useTranslations("carousel")

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
	autoplay: true,
	autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const images = [
    {
      src: "/images/carrousel/carrousel1.jpg",
      title: t('1.t'),
      subtitle: t('1.st'),
    },
    {
      src: "/images/carrousel/carrousel2.webp",
      title: t('2.t'),
      subtitle: t('2.st'),
    },
    {
      src: "/images/carrousel/carrousel3.jpg",
      title: t('3.t'),
      subtitle: t('3.st'),
    },
    {
      src: "/images/carrousel/carrousel4.webp",
      title: t('4.t'),
      subtitle: t('4.st'),
	  },
	  {
		  src: "/images/carrousel/carrousel5.jpg",
      title: t('5.t'),
      subtitle: t('5.st'),
	  },
	  {
		  src: "/images/carrousel/carrousel6.jpg",
      title: t('6.t'),
      subtitle: t('6.st'),
	  },
  ];

  return (
	<div className="flex justify-center">
		<div className="w-full max-w-4xl border-4 border-spacing-1 rounded-xl flex-grow px-2 py-0.5 border-(--fern-green) mt-3">
		<Slider {...settings}>
			{images.map((image, index) => (
			<div key={index} className="relative hover:scale-105 transition-transform duration-300">
				<Image
				src={image.src}
				alt={image.title}
				priority={false}
				width={1920}
				height={1080}
				className="object-cover w-full h-64 md:h-96  border rounded-lg border-white"
				/>
				<div className="absolute bottom-5 left-6 bg-black bg-opacity-50 text-white p-4 rounded">
          <h2 className="text-lg font-bold">{image.title}</h2>
          <p className="text-sm">{image.subtitle}</p>
				</div>
			</div>
			))}
		</Slider>
		</div>
	</div>
  );
}