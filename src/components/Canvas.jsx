import React, { useState } from "react";
import styled from "styled-components";

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
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [selectedImage, setSelectedImage] = useState(null);

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
          <label style={labelStyle}>Background Color:</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </div>
      </EditorContainer>
      <CanvasContainer></CanvasContainer>
    </Container>
  );
};

export default Canvas;

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
  height: 1080px;
  width: 1080px;
  border: 1px solid red;
`;
