"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useParams } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
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
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "@/store/hooks";
import { getDate } from "@/store/selectors";
import { HIDDEN_HEADER_ID } from "@/lib/constants";
import SortMenu from "./SortMenu";
import FilterButton from "./FilterButton";

const Header: React.FC = () => {
  const [infoOpen, setInfoOpen] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);
  const date = useAppSelector(getDate);
  const params = useParams();
  const courseId = params?.courseId as string | undefined;
  const pathname = usePathname();
  const router = useRouter();

  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down("sm"));

  const shouldRenderFixedDate = date && pathname !== "/";


  // A hack to make fixed position work. Hide this behind the fixed toolbar
  const renderToolbar = (id?: string) => {
    return (
      <Toolbar id={id}>
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
            {compact ? (
              <IconButton
                size="small"
                color="primary"
                aria-label="Back"
                onClick={() => router.push("/tee-times")}
              >
                <ChevronLeftIcon />
              </IconButton>
            ) : (
              <Button
                variant="text"
                startIcon={<ChevronLeftIcon />}
                onClick={() => router.push("/tee-times")}
              >
                Back
              </Button>
            )}
          </Box>
          {renderDate()}
        </Box>
      );
    }
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
          {compact ? (
            <IconButton
              size="small"
              color="primary"
              aria-label="New Search"
              onClick={() => router.push("/")}
            >
              <ChevronLeftIcon />
            </IconButton>
          ) : (
            <Button
              variant="text"
              startIcon={<ChevronLeftIcon />}
              onClick={() => router.push("/")}
            >
              New Search
            </Button>
          )}
        </Box>
        {renderDate()}
        <Box
          sx={{
            position: "absolute",
            right: 8,
            display: "flex",
            alignItems: "center",
            height: "100%",
            gap: 0.5,
          }}
        >
          <FilterButton iconOnly={compact} />
          <SortMenu iconOnly={compact} />
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
    <Box>
      <AppBar
        position="fixed"
        elevation={0}
        sx={pathname === "/" ? { bgcolor: "transparent", boxShadow: "none" } : {}}
      >
        {renderToolbar()}
      </AppBar>
      <Box sx={pathname === "/" ? { visibility: "hidden" } : {}}>
        {renderToolbar(HIDDEN_HEADER_ID)}
      </Box>
      {renderSubToolbar()}

      <Dialog
        open={infoOpen}
        onClose={() => { setInfoOpen(false); setWhyOpen(false); }}
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
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Box
              component="button"
              onClick={() => {
                setInfoOpen(false);
                router.push("/courses");
              }}
              sx={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "primary.main",
                fontSize: "0.875rem",
                fontWeight: 500,
                p: 0,
                textDecoration: "underline",
                textUnderlineOffset: 2,
                "&:hover": { color: "primary.dark" },
              }}
            >
              View all supported courses
            </Box>
          </Box>
          <Divider sx={{ mt: 2.5 }} />
          <Box
            onClick={() => setWhyOpen((o) => !o)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 1.5,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <Typography variant="subtitle2" fontWeight={700}>
              Why not just use a booking app?
            </Typography>
            <ExpandMoreIcon
              fontSize="small"
              sx={{
                color: "text.secondary",
                transform: whyOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </Box>
          <Collapse in={whyOpen}>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
              Most tee time booking apps only list courses that have partnered
              with them, so you&apos;re only ever seeing a fraction of what&apos;s
              actually available nearby. They also charge a per-round convenience
              fee on top of the course rate. Round Finder skips all that. It
              searches across public courses in the area and links you directly
              to the course&apos;s own booking page, so you pay exactly what the
              course charges, nothing more.
            </Typography>
          </Collapse>
          <Divider sx={{ mt: 1 }} />
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
