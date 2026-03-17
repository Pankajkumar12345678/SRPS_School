import React from "react";
import GalleryHeroCarousel from "../components/GalleryHeroCarousel";

const photoFiles = [
  
  "IMG.jpg",
  "IMG1.jpg",
  "IMG3.jpg",
  "IMG4.jpg",
  "IMG5.JPEG",
  "IMG6.jpg",
  "IMG_10.JPEG",
  "IMG_11.JPG",
  "IMG_12.JPEG",
  "IMG_13.JPG",
  "IMG_14.JPEG",
  "IMG_15.JPEG",
  "IMG_16.JPEG",
  "IMG_17.JPEG",
  "IMG_24.JPEG",
  "IMG_25.JPEG",
  "IMG_26.JPEG",
  "IMG_28.JPG",
  "IMG_31.JPG",
  "IMG_32.JPG",
  "IMG_33.JPG",
  "IMG_34.JPG",
  "IMG_38.JPG",
  "IMG_8.JPG",
  "IMG_Army_33.JPG",
  "IMG_Doctor_34.JPG",
  "NCC-Pic_39.JPG",
  "NCC_1.jpg",
  "NCC_Pic2.jpg",
  "NCC_Pic_10.JPEG",
  "NCC_Pic_12.JPEG",
  "NCC_Pic_14.JPG",
  "NCC_Pic_18.JPG",
  "NCC_Pic_19.JPG",
  "NCC_Pic_20.JPG",
  "NCC_Pic_21.JPG",
  "NCC_Pic_22.JPG",
  "NCC_Pic_23.JPG",
  "NCC_Pic_24.JPG",
  "NCC_Pic_25.JPG",
  "NCC_Pic_27.JPG",
  "NCC_Pic_31.JPG",
  "NCC_Pic_35.JPEG",
  "NCC_Pic_36.JPEG",
  "NCC_Pic_37.JPG",
  "NCC_Pic_38.JPG",
  "NCC_Pic_Primenester_30.JPG",
  "NCC_Pic_Primnester_29.JPEG",
  "NCC_pic_26.JPG",
];

const photos = photoFiles.map((file) => ({
  src: `/School_pic/${file}`,
  alt: file.replace(/\.[A-Za-z0-9]+$/, ""),
}));

const videos = [
  {
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "Annual Function",
  },
  {
    src: "https://www.youtube.com/embed/3tmd-ClpJxA",
    title: "Sports Day Highlights",
  },
  {
    src: "/School_pic/aafdd964-816c-44b5-bce4-0878f0382ea5.MP4",
    title: "School Event Video",
  },
];

const galleryCss = `
.gallery-root { font-family: 'DM Sans', sans-serif; background: #f7fafc; color: #134F5C; min-height: 100vh; }
.gallery-header { text-align: center; padding: 3rem 1rem 2rem; }
.gallery-header h1 { font-size: 2.4rem; font-family: 'Cormorant Garamond', serif; margin-bottom: 0.7rem; }
.gallery-header p { color: #6b8f96; font-size: 1.1rem; }
.gallery-section { max-width: 1100px; margin: 0 auto 2.5rem; }
.gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
.gallery-img { width: 100%; border-radius: 1rem; box-shadow: 0 4px 24px rgba(19,79,92,.07); object-fit: cover; height: 180px; }
.gallery-video { width: 100%; aspect-ratio: 16/9; border-radius: 1rem; box-shadow: 0 4px 24px rgba(19,79,92,.07); margin-bottom: 1.5rem; }
`;

export default function GalleryPage() {
  return (
    <>
      <style>{galleryCss}</style>
      <GalleryHeroCarousel photos={photos} videos={videos} interval={5000} />
      <div className="gallery-root">
        <div className="gallery-header">
          <h1>School Gallery</h1>
          <p>
            Explore photos and videos from our school events, campus, and
            activities.
          </p>
        </div>
        <div className="gallery-section">
          <h2>Photos</h2>
          <div className="gallery-grid">
            {photos.map((photo, idx) => (
              <img
                key={idx}
                src={photo.src}
                alt={photo.alt}
                className="gallery-img"
              />
            ))}
          </div>
        </div>
        <div className="gallery-section">
          <h2>Videos</h2>
          <div className="gallery-grid">
            {videos.map((video, idx) => (
              <iframe
                key={idx}
                src={video.src}
                title={video.title}
                className="gallery-video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
