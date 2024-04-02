import React from "react";
import Box from "@mui/material/Box";
import Header from "../Header";
import SearchForm from "../SearchForm";

const HomeView: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100%",
        backgroundImage: "url(https://i.imgur.com/qztJS54.jpg)",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Header />
      <SearchForm />
    </Box>
  );
};

export default HomeView;
