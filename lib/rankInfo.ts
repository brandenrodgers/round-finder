import SentimentVerySatisfiedOutlinedIcon from "@mui/icons-material/SentimentVerySatisfiedOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentNeutralOutlinedIcon from "@mui/icons-material/SentimentNeutralOutlined";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

export const getRankInfo = (rank: number) => {
  if (rank > 8) return { Icon: SentimentVerySatisfiedOutlinedIcon, label: "Top Pick", color: "#F59E0B" };
  if (rank > 6) return { Icon: SentimentVerySatisfiedIcon, label: "Great", color: "#10B981" };
  if (rank > 4) return { Icon: SentimentSatisfiedAltIcon, label: "Good", color: "#14B8A6" };
  if (rank > 2) return { Icon: SentimentNeutralOutlinedIcon, label: "Fair", color: "#F97316" };
  return { Icon: SentimentDissatisfiedIcon, label: "Avoid", color: "#94A3B8" };
};
