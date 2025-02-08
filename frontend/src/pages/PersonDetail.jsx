import { Box, Toolbar, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PersonMovieGrid from "../components/common/PersonMovieGrid";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container.jsx";
import personApi from "../api/modules/person.api";
//import { useDispatch } from "react-redux";

const PersonDetail = () => {
  const { personId } = useParams();
  const [person, setPerson] = useState();
  let biography = "";
  let backGroundImg = "";
  let birthToDeath = "";
  useEffect(() => {
    const getPerson = async (personId) => {
      try {
        const response = await personApi.getDetails(personId);
        if (response) setPerson(response);
        else {
          console.error(response.err);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getPerson(personId);
  }, [personId]);
  if (person) {
    if (person.biography) {
      biography = person.biography.substring(0, 2000);
      const index = biography.lastIndexOf(".");
      biography = biography.substring(0, index + 1);
    }
    backGroundImg = person.profile_path
      ? `https://image.tmdb.org/t/p/original${person.profile_path}`
      : "/actor.jpg";

    if (person.birthday) {
      birthToDeath = `(${person.birthday.split("-")[0]})`;
    }
    if (person.deathday) {
      birthToDeath = `${birthToDeath.slice(0, -1)}-${
        person.deathday.split("-")[0]
      })`;
    }
  }

  return (
    <>
      <Toolbar />
      {person && (
        <>
          <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "center", md: "flex-start" },
                transition: "all 0.3s ease",
              }}
            >
              <Box
                sx={{
                  width: { xs: "50%", md: "20%" },
                }}
              >
                <Box
                  sx={{
                    paddingTop: "160%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "darkgrey",
                    backgroundImage: `url(${backGroundImg})`,
                    transition: "all 0.3s ease",
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", md: "80%" },
                  padding: { xs: "1rem 0", md: "1rem 2rem" },
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight="700">
                    {`${person.name}${birthToDeath}`}
                  </Typography>
                  <Typography sx={{ ...uiConfigs.style.typoLines(15) }}>
                    {biography}
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Stack spacing={5} sx={{ marginTop: "5rem" }}>
              <Container header="Starred in">
                <PersonMovieGrid personId={personId} type="cast" />
              </Container>
              <Container header="Partook in">
                <PersonMovieGrid personId={personId} type="crew" />
              </Container>
            </Stack>
          </Box>
        </>
      )}
    </>
  );
};

export default PersonDetail;
