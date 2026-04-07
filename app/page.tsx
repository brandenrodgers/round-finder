import Box from "@mui/material/Box";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(https://i.imgur.com/qztJS54.jpg)",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Header />
      <SearchForm />
    </Box>
  );
}
