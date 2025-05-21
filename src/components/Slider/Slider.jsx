import  { useState } from "react";


// import { useState } from "react";
// import styles from "./Slider.module.css";

// const SliderDot = ({ text, onClick, isSelected }) => {
//   return (
//     <div
//       onClick={onClick}
//       className={styles.sliderDot}
//       style={{ backgroundColor: isSelected ? "green" : "gray" }}
//     >
//       {text}
//     </div>
//   );
// };

// const Slider = ({ images }) => {
//   const [selected, setSelected] = useState(0);
//   // const [slider, setSlider] = useState(0);
//   const [open, setOpen] = useState(false);

//   const handleOnBefore = () => {
//     if (selected > 0) {
//       setSelected(selected - 3);
//     }
//   };

//   const handleOnAfter = () => {
//     if (selected + 3 < images.length) {
//       setSelected(selected + 3);
//     }
//   };

//   return (
//     <div className={styles.root}>
//       {open && (
//         <div className={styles.gallery}>
//           <div onClick={() => setOpen(false)} style={{ cursor: "pointer" }}>
//             X
//           </div>

//           <div>{images[selected]}</div>

//           <div className={styles.galleryFooter}>
//             {images.map((image, index) => (
//               <div
//                 key={index}
//                 style={{
//                   color: index === selected ? "green" : "white",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => setSelected(index)}
//               >
//                 {image}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className={styles.selectedImage} onClick={() => setOpen(true)}>
//         {images[selected]}
//       </div>

//       <div className={styles.sliderDots}>
//         <SliderDot onClick={handleOnBefore} text={"<"} />
//         <div className={styles.sliderDotsContainer}>
//           {images.slice(selected, selected + 3).map((image, index) => (
//             <SliderDot
//               key={index}
//               onClick={() => setSelected(selected + index)}
//               text={selected + index + 1}
//               isSelected={selected === selected + index}
//             />
//           ))}
//         </div>
//         <SliderDot onClick={handleOnAfter} text={">"} />
//       </div>
//     </div>
//   );
// };

// export default Slider;

const ImageSlider = ({ images }) => {
  const chunkSize = 3; // تعداد آیتم‌ها در هر اسلاید
  const [currentIndex, setCurrentIndex] = useState(0); // وضعیت اسلاید فعلی

  const totalChunks = Math.ceil(images.length / chunkSize); // تعداد کل اسلایدها

  const getCurrentImages = () => {
    const start = currentIndex * chunkSize;
    return images.slice(start, start + chunkSize); // گرفتن تصاویر اسلاید فعلی
  };

  const handleNext = () => {
    // رفتن به اسلاید بعدی
    if (currentIndex < totalChunks - 1) {
      setCurrentIndex(currentIndex + 1); // اسلاید بعدی
    } else {
      setCurrentIndex(0); // برگشت به اولین اسلاید
    }
  };

  const handlePrev = () => {
    // رفتن به اسلاید قبلی
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // اسلاید قبلی
    } else {
      setCurrentIndex(totalChunks - 1); // برگشت به آخرین اسلاید
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>اسلایدر تصاویر</h2>

      <button onClick={handlePrev} style={{ marginRight: "10px" }}>⬅️</button>

      {/* نمایش اعداد به عنوان "تصاویر" */}
      <div style={{ display: "inline-block" }}>
        {getCurrentImages().map((image, index) => (
          <span
            key={index}
            style={{
              margin: "0 15px",
              padding: "10px 20px",
              border: "2px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f3f3f3",
            }}
          >
            {image} {/* نمایش عدد به جای تصویر */}
          </span>
        ))}
      </div>

      <button onClick={handleNext} style={{ marginLeft: "10px" }}>➡️</button>
    </div>
  );
};




export default ImageSlider;