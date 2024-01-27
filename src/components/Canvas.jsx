import React, { useState } from "react";
import styled from "styled-components";
import EditPart from "./EditPart";

let data = {
  caption: {
    text: "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs",
    position: { x: 50, y: 50 },
    max_characters_per_line: 31,
    font_size: 44,
    alignment: "left",
    text_color: "#FFFFFF",
  },
  cta: {
    text: "Shop Now",
    position: { x: 190, y: 320 },
    text_color: "#FFFFFF",
    background_color: "#000000",
  },
  image_mask: { x: 56, y: 442, width: 970, height: 600 },
  urls: {
    mask: "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png",
    stroke:
      "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png",
    design_pattern:
      "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png",
  },
};

const Canvas = () => {
  const [caption, setCaption] = useState(data.caption.text);
  const [cta, setCta] = useState(data.cta.text);
  const [backgroundColor, setBackgroundColor] = useState("#0369A1");
  const [selectedImage, setSelectedImage] = useState(null);
  const [allColors, setColors] = useState([]);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  // breaking statement to 31 words
  const breakStatement = (text, maxCharPerLine) => {
    let lines = [];
    let currLine = "";
    let words = text.split(" ");

    for (let i = 0; i < words.length; i++) {
      let word = words[i];

      if (currLine.length + word.length <= maxCharPerLine) {
        currLine += (currLine.length > 0 ? " " : "") + word;
      } else {
        lines.push(currLine);
        currLine = word;
      }
    }

    if (currLine.length > 0) {
      lines.push(currLine);
    }

    return lines;
    // console.log(lines);
  };

  const lines = breakStatement(caption, data.caption.max_characters_per_line);

  const handlers = {
    handleCaption: (event) => {
      // console.log(event);
      setCaption(event);
    },
    handleCTA: (event) => {
      setCta(event);
    },
    handleImageChange: (event) => {
      const file = event;
      // console.log(event, ">>>>>>");
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedImage(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    handleColorPickerToShow: (prev) => {
      setDisplayColorPicker(!prev);
    },
    handleBackgroundColor: (prev) => {
      // console.log(prev, ">>>>>>>");
      setBackgroundColor(prev);
    },
    saveAndChangeColor: (color, event) => {
      let currColor = color.hex;

      // console.log(currColor);
      // setBackgroundColor(currColor);
      // setDisplayColorPicker(false);

      if (allColors.length < 5) {
        setColors((prevColors) => [...prevColors, currColor]);
      } else {
        setColors((prevColors) => [...prevColors.splice(1), currColor]);
      }
    },
    caption: caption,
    cta: cta,
    allColors: allColors,
    displayColorPicker: displayColorPicker,
    backgroundColor: backgroundColor,
  };

  return (
    <Container>
      <EditPart handlers={handlers} />
      <CanvasContainer style={{ backgroundColor: `${backgroundColor}` }}>
        <DesignPattern />
        {/* <Img src={selectedImage ? selectedImage : data.urls.mask} alt="" /> */}
        <MaskLayer
          style={{
            backgroundImage: `url(${
              selectedImage ? selectedImage : data.urls.mask
            })`,
          }}
        />
        <StrokeLayer />
        {lines?.map((line, index) => (
          <TextLayer
            key={index}
            style={{
              top: `${
                data.caption.position.y + index * data.caption.font_size
              }px`,
            }}
          >
            {line}
          </TextLayer>
        ))}
        <CTA>{cta}</CTA>
      </CanvasContainer>
    </Container>
  );
};

const CTA = styled.button`
  position: absolute;
  top: ${data.cta.position.y}px;
  left: ${data.cta.position.x}px;
  background-color: ${data.cta.background_color};
  color: ${data.cta.text_color};
  padding: 15px;
  border-radius: 15px;
  font-size: ${data.cta.font_size || 30}px;
  min-width: 20px;
  text-align: center;
  vertical-align: middle;

  &:hover {
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

const CanvasContainer = styled.div`
  position: relative;
  height: 1080px;
  width: 1080px;
  margin: 50px 0;
`;

const DesignPattern = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${data.urls.design_pattern});
  background-repeat: no-repeat;
  background-size: cover;
`;

// const Img = styled.img`
//   position: absolute;
//   height: 594px;
//   width: 968px;
//   top: 440px;
//   left: 58px;
//   object-fit: cover;
// `;

const MaskLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center bottom;
  mask-image: url(${data.urls.mask});
  mask-size: cover;
`;

const StrokeLayer = styled.div`
  position: absolute;
  top: -2px;
  left: 2px;
  width: 100%;
  height: 100%;
  background-image: url(${data.urls.stroke});
  background-repeat: no-repeat;
  background-size: cover;
`;

const TextLayer = styled.div`
  position: absolute;
  top: ${data.caption.position.y}px;
  left: ${data.caption.position.x}px;
  font-size: ${data.caption.font_size}px;
  color: ${data.caption.text_color};
`;

export default Canvas;
