import { Box } from "@mui/material";

function FooterMessage({ children }) {
  return (
    <p
      style={{
        textAlign: "center",
        fontFamily: '"Roboto", sans-serif',
        fontSize: "18px",
        fontWeight: "400",
        color: "white",
      }}
    >
      {children}
    </p>
  );
}

export default function Footer() {
  return (
    <footer>
      <Box
        sx={{
          marginTop: "3em",
          backgroundColor: "#000000",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "5em",
          justifyContent: "center",
        }}
      >
        <FooterMessage
        style={
          {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }
        }>
          {/* All copyrighted content (i.e. film posters)
          <br />
          are owned by their respective owners.
          <br />
          Data is provided by TMDB. */}
         
          
          {/* TODO: Link backend */}
          <a href="https://github.com/Khoi1905/AI_SYSTEM" >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg"
              alt="Link to the repo"
              style={{
                width: "2em",
                backgroundColor: "white",
                borderRadius: "60px",
                marginTop: "0.6em"
              }}
            ></img>
          </a>
          <p>© 2024 BMOVIE. All rights reserved.</p>
        </FooterMessage>
      </Box>
    </footer>
  );
}
