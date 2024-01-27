import React from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";

function EditPart({ handlers }) {
  const {
    handleImageChange,
    saveAndChangeColor,
    handleCaption,
    handleCTA,
    caption,
    allColors,
    cta,
    displayColorPicker,
    backgroundColor,
    handleColorPickerToShow,
    handleBackgroundColor,
  } = handlers;

  const labelStyle = {
    fontSize: "0.875rem",
    fontWeight: "medium",
    marginBottom: "5px",
    display: "block",
  };

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

  //   console.log(handlers, ">>");

  return (
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
          onChange={(event) => handleImageChange(event.target.files[0])}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Caption:</label>
        <InputField
          type="text"
          value={caption}
          onChange={(e) => handleCaption(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Call to Action:</label>
        <InputField
          type="text"
          value={cta}
          onChange={(e) => handleCTA(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Choose your color:</label>

        <div style={{ display: "flex", gap: "10px" }}>
          {allColors?.map((color, index) => (
            <div
              style={{
                border:
                  index === allColors.length - 1 ? "1px solid red" : "none",
                padding: index === allColors.length - 1 ? "1px" : "0",
                borderRadius: "50%",
              }}
              key={index}
            >
              <Colors
                style={{
                  backgroundColor: `${color}`,
                }}
                isLast={index === allColors.length - 1}
              />
            </div>
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
            onClick={() => handleColorPickerToShow(displayColorPicker)}
            // onClick={() => document.getElementById("colorInput").click()}
          >
            +
          </button>
          {displayColorPicker ? (
            <div
              style={popover}
              onClick={() => handleColorPickerToShow(displayColorPicker)}
            >
              <div style={cover}>
                <SketchPicker
                  color={backgroundColor}
                  onChange={saveAndChangeColor}
                  onChangeComplete={(color) => handleBackgroundColor(color.hex)}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </EditorContainer>
  );
}

export default EditPart;

const Colors = styled.div`
  width: 20px;
  border-radius: 50%;
  height: 20px;
  /* box-sizing: border-box; */
`;

const InputField = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  width: 98%;
  margin-bottom: 10px;
`;

const EditorContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  margin-top: 50px;
`;
