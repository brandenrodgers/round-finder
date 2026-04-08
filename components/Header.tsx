"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useParams } from "next/navigation";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useAppSelector } from "@/store/hooks";
import { getDate } from "@/store/selectors";
import { HIDDEN_HEADER_ID } from "@/lib/constants";
import SortMenu from "./SortMenu";

const Header: React.FC = () => {
  const [infoOpen, setInfoOpen] = useState(false);
  const date = useAppSelector(getDate);
  const params = useParams();
  const courseId = params?.courseId as string | undefined;
  const pathname = usePathname();
  const router = useRouter();

  const shouldRenderFixedDate = date && pathname !== "/";

  const renderHomeIcon = () => {
    if (pathname.includes("tee-times")) {
      return (
        <Box
          sx={{
            position: "absolute",
            left: 8,
            display: "flex",
            height: "100%",
            alignItems: "center",
          }}
        >
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={() => router.push("/")}
          >
            <HomeOutlinedIcon sx={{ fontSize: 26 }} />
          </IconButton>
        </Box>
      );
    }
    return null;
  };

  // A hack to make fixed position work. Hide this behind the fixed toolbar
  const renderToolbar = (id?: string) => {
    return (
      <Toolbar id={id}>
        {renderHomeIcon()}
        <Typography
          variant="h4"
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            gap: 1,
            textAlign: "center",
            fontFamily: "var(--font-display), serif",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          Round
          <Box
            component="img"
            sx={{ height: 40, width: 40 }}
            alt="icon"
            src="/round-finder-icon.png"
          />
          Finder
        </Typography>
        {pathname === "/" && (
          <Box sx={{ position: "absolute", right: 16 }}>
            <IconButton
              color="inherit"
              aria-label="info"
              onClick={() => setInfoOpen(true)}
            >
              <InfoOutlinedIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    );
  };

  const renderDate = () => {
    return (
      <Box
        sx={{
          py: 1,
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            color: "text.secondary",
          }}
        >
          <Typography variant="body2" fontWeight={600} letterSpacing="0.02em">
            {dayjs(date).format("ddd, MMM D")}
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderSubToolbarContent = () => {
    if (courseId) {
      return (
        <Box sx={{ display: "flex", position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              left: 8,
              display: "flex",
              height: "100%",
            }}
          >
            <Button
              variant="text"
              startIcon={<ChevronLeftIcon />}
              onClick={() => router.push("/tee-times")}
            >
              Back
            </Button>
          </Box>
          {renderDate()}
        </Box>
      );
    }
    return (
      <Box sx={{ display: "flex", position: "relative" }}>
        {renderDate()}
        <Box
          sx={{
            position: "absolute",
            right: 16,
            display: "flex",
            height: "100%",
          }}
        >
          <SortMenu />
        </Box>
      </Box>
    );
  };

  const renderSubToolbar = () => {
    if (shouldRenderFixedDate) {
      return (
        <Box
          sx={{
            position: "relative",
            zIndex: (theme) => theme.zIndex.appBar - 1,
          }}
        >
          <Toolbar
            disableGutters
            sx={{ position: "fixed", width: "100%", alignItems: "flex-start" }}
          >
            <Paper square elevation={1} sx={{ width: "100%", height: "100%" }}>
              {renderSubToolbarContent()}
            </Paper>
          </Toolbar>
          <Paper component={Box} sx={{ visibility: "hidden" }}>
            {renderSubToolbarContent()}
          </Paper>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={0}>
        {renderToolbar()}
      </AppBar>
      {renderToolbar(HIDDEN_HEADER_ID)}
      {renderSubToolbar()}

      <Dialog
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, mx: 2 } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
            fontFamily: "var(--font-display), serif",
          }}
        >
          About Round Finder
          <IconButton
            size="small"
            onClick={() => setInfoOpen(false)}
            aria-label="close"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body1" gutterBottom>
            Round Finder helps you quickly see available tee times at public
            golf courses in and around the Boston area, all in one place.
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mt: 1.5 }}>
            To get started, select how many holes you want to play, pick a date,
            choose the number of players in your group, and set a time window.
            Hit <strong>Find tee times</strong> and you&apos;ll see which
            courses have openings that match.
          </Typography>
          <Typography variant="body1" sx={{ mt: 1.5 }}>
            Tap any course to see its available times, and tap a time to go
            directly to that course&apos;s booking page.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2.5, textAlign: "center" }}>
            Built for fun, not profit. If it helps you get out on the course,
            feel free to buy me a beer for my next round.
          </Typography>
          <Box sx={{ mt: 1.5, display: "flex", justifyContent: "center" }}>
            <Box
              component="a"
              href="https://www.buymeacoffee.com/brandenr"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2.5,
                py: 1,
                borderRadius: 2,
                bgcolor: "#FFDD00",
                color: "#000000",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "1rem",
                "&:hover": { bgcolor: "#f0cf00" },
              }}
            >
              🍺 Buy me a beer
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Header;
