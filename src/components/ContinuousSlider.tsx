import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";

export interface SliderProps {
  value: number;
  handleChange: (event: Event, value: number | number[]) => void;
}

export default function ContinuousSlider({ value, handleChange }: SliderProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2} direction="row" sx={{ alignItems: "center", mb: 1 }}>
        <LightbulbIcon className="text-[var(--white-muted)]" />
        <Slider
          aria-label="Volume"
          value={value}
          onChange={handleChange}
          min={0}
          max={100}
          sx={{
            color: "var(--white-muted)",
          }}
        />
        <OnlinePredictionIcon className="!text-[35px] text-[var(--white-muted)]" />
      </Stack>
      <span className="text-sm w-10 text-right text-[var(--white-muted)]">
        {value}%
      </span>
    </Box>
  );
}
