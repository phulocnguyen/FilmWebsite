import Container from "../components/common/Container.jsx";
import FilterBox from "../components/common/FilterBox.jsx";

import { Box, Button } from "@mui/material";
import { useState } from "react";

function FormRow({ title, type, name, options, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        gap: "0.5em",
        width: "20em",
      }}
    >
      {type === "text" && (
        <>
          <span style={{ fontSize: "1em", textTransform: "capitalize" }}>
            {title}
          </span>
          <input
            style={{
              borderRadius: "0.4em",
              border: "0.1em solid black",
              fontSize: "1em",
              width: "20em",
              height: "2.3em",
              paddingLeft: "1em",
            }}
            type={type}
            name={name}
            onChange={onChange}
          ></input>
        </>
      )}
      {type === "select" && (
        <FilterBox
          title={title}
          options={options}
          onOptionChange={onChange}
        ></FilterBox>
      )}
    </div>
  );
}

function ProfileSettings() {
  const [formData, setFormData] = useState({
    displayName: "",
    gender: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      displayName: formData.displayName,
      gender: formData.gender,
    };
    console.log(formData);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        gap: "1em",
        width: "20em",
      }}
      onSubmit={handleSubmit}
    >
      <FormRow
        title="Display name"
        type="text"
        name="displayName"
        onChange={handleChange}
      />
      <FormRow
        title="gender"
        type="text"
        name="gender"
        onChange={handleChange}
        options={["Male", "Female", "Other"]}
      />

      <Button type="submit" variant="contained" sx={{backgroundColor: "rgb(25, 118, 210)", width: "13em", alignSelf: "center" }}>
        Save changes
      </Button>
    </form>
  );
}

export default function AccountSettings() {
  return (
    <>
      <Box sx={{ margin: "1.2em 2em 2em 2em" }}>
        <Container header="Account Settings">
          <Box
            sx={{
              marginTop: "1em",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "2em",
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: "2em",
                textTransform: "uppercase",
                fontWeight: "550",
              }}
            >
              <div>profile</div>
              <div>auth</div>
            </div>
            <ProfileSettings />
          </Box>
        </Container>
      </Box>
    </>
  );
}
