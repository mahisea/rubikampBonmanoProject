import { useState } from "react";
import styles from "./Slider.module.css";

const SliderDot = ({ text, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={styles.sliderDot}
      style={{ backgroundColor: isSelected ? "green" : "gray" }}
    >
      {text}
    </div>
  );
};

const Slider = ({ images }) => {
  const [selected, setSelected] = useState(0);
  // const [slider, setSlider] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOnBefore = () => {
    if (selected > 0) {
      setSelected(selected - 3);
    }
  };

  const handleOnAfter = () => {
    if (selected + 3 < images.length) {
      setSelected(selected + 3);
    }
  };

  return (
    <div className={styles.root}>
      {open && (
        <div className={styles.gallery}>
          <div onClick={() => setOpen(false)} style={{ cursor: "pointer" }}>
            X
          </div>

          <div>{images[selected]}</div>

          <div className={styles.galleryFooter}>
            {images.map((image, index) => (
              <div
                key={index}
                style={{
                  color: index === selected ? "green" : "white",
                  cursor: "pointer",
                }}
                onClick={() => setSelected(index)}
              >
                {image}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.selectedImage} onClick={() => setOpen(true)}>
        {images[selected]}
      </div>

      <div className={styles.sliderDots}>
        <SliderDot onClick={handleOnBefore} text={"<"} />
        <div className={styles.sliderDotsContainer}>
          {images.slice(selected, selected + 3).map((image, index) => (
            <SliderDot
              key={index}
              onClick={() => setSelected(selected + index)}
              text={selected + index + 1}
              isSelected={selected === selected + index}
            />
          ))}
        </div>
        <SliderDot onClick={handleOnAfter} text={">"} />
      </div>
    </div>
  );
};

export default Slider;