import React from "react";
import Box from "@mui/material/Box";
import Header from "./Header";
import SearchForm from "./SearchForm";

const Home: React.FC = () => {
  return (
    <Box>
      <Header />
      <SearchForm />
    </Box>
  );
};

export default Home;
