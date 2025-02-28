
import React from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css';

import bannerImage_1 from "../../assets/banners/airpods.jpeg";
import bannerImage_2 from "../../assets/banners/tab.jpeg";
import bannerImage_3 from "../../assets/banners/rolex.jpeg";
import bannerImage_4 from "../../assets/banners/imac.jpg";
import bannerImage_5 from "../../assets/banners/xps laptop.jpeg";
import bannerImage_6 from "../../assets/banners/iphone.jpeg";









const SlideBanner = () => {
    const images = [
      { src: bannerImage_1, alt: "banner_1" },
      { src: bannerImage_2, alt: "Banner_2" },
      { src: bannerImage_3, alt: "Banner_3" },
      { src: bannerImage_4, alt: "Banner_4" },
      { src: bannerImage_5, alt: "Banner_5" },
      { src: bannerImage_6, alt: "Banner_6" }
    ];
const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  prevArrow: (
    <button style={buttonStyle} className="slick-prev">
      <i className="fas fa-chevron-left" />
    </button>
  ),
  nextArrow: (
    <button style={buttonStyle} className="slick-next">
      <i className="fas fa-chevron-right" />
    </button>
  ),
};
  return (
  <div className=''>
  <div className="banner mb-3 mt-1">
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img 
            src={image.src} 
            alt={image.alt} 
            style={{
              width: "100%",
              height: "400px",
              maxHeight:"370px",
              objectFit: "fit"
            }} 
            loading="lazy"
            
          />
        </div>
      ))}
    </Slider>
  </div>
</div>
  );
};
export default SlideBanner;
