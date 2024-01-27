import React, { useState } from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const labelStyle = {
    fontSize: "0.875rem",
    fontWeight: "medium",
    marginBottom: "5px",
    display: "block",
  };

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

  const saveAndChangeColor = (color, event) => {
    let currColor = color.hex;

    // console.log(currColor);
    // setBackgroundColor(currColor);
    // setDisplayColorPicker(false);

    if (allColors.length < 5) {
      setColors((prevColors) => [...prevColors, currColor]);
    } else {
      setColors((prevColors) => [...prevColors.splice(1), currColor]);
    }
  };

  // console.log(displayColorPicker, ">>>>>>>");
  const popover = {
    position: "absolute",
    zIndex: "2",
  };

  const cover = {
    position: "relative",
    top: "40px",
    // right: "0px",
    // bottom: "-20px",
    // left: "0px",
  };

  return (
    <Container>
      <EditorContainer>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Canvas Editor
        </h1>
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Select Image:</label>
          <InputField
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Caption:</label>
          <InputField
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Call to Action:</label>
          <InputField
            type="text"
            value={cta}
            onChange={(e) => setCta(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Choose your color:</label>

          <div style={{ display: "flex", gap: "10px" }}>
            {allColors?.map((color, index) => (
              <Colors key={index} style={{ backgroundColor: `${color}` }} />
            ))}

            {/* <input
              id="colorInput"
              style={{ display: "none" }}
              type="color"
              value={backgroundColor}
              onChange={saveAndChangeColor}
            /> */}
            <button
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "100%",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "transparent",
              }}
              onClick={() => setDisplayColorPicker((prev) => !prev)}
              // onClick={() => document.getElementById("colorInput").click()}
            >
              +
            </button>
            {displayColorPicker ? (
              <div style={popover} onClick={() => setDisplayColorPicker(false)}>
                <div style={cover}>
                  <SketchPicker
                    color={backgroundColor}
                    onChange={saveAndChangeColor}
                    onChangeComplete={(color) => setBackgroundColor(color.hex)}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </EditorContainer>
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

const Colors = styled.div`
  width: 20px;
  border-radius: 100%;
  height: 20px;
`;

const CTA = styled.button`
  position: absolute;
  /* margin-top: 200px; */
  top: ${data.cta.position.y}px;
  left: ${data.cta.position.x}px;
  background-color: ${data.cta.background_color};
  color: ${data.cta.text_color};
  padding: 15px;
  border-radius: 15px;
  font-size: 30px;
  min-width: 20px;

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

const EditorContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
`;

const InputField = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  width: 98%;
  margin-bottom: 10px;
`;

const CanvasContainer = styled.div`
  position: relative;
  height: 1080px;
  width: 1080px;
`;

const DesignPattern = styled.div`
  position: absolute;
  /* top: 0; */
  /* left: 0; */
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
  /* background-size: 100% auto; */
  /* background-size: contain; */
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
  /* top: ${data.caption.position.y}px; */
  left: ${data.caption.position.x}px;
  font-size: ${data.caption.font_size}px;
  color: ${data.caption.text_color};
`;

export default Canvas;
