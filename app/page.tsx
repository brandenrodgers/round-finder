import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";

export default function HomePage() {
  return (
    <Box
      sx={{
        height: "100dvh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://i.imgur.com/qztJS54.jpg)",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Header />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          pb: { xs: 0, sm: 4 },
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "var(--font-display), serif",
            color: "rgba(255,255,255,0.9)",
            textShadow: "0 1px 8px rgba(0,0,0,0.5)",
            textAlign: "center",
            mb: { xs: 1, sm: 2 },
          }}
        >
          Boston area public golf tee times
        </Typography>
        <SearchForm />
      </Box>
    </Box>
  );
}
