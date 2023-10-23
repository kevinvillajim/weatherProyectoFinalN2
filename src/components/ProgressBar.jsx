import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#E7E7EB",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#FFEC65",
  },
}));

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-container">
      <div className="number-container">
        <div>0</div>
        <div>50</div>
        <div>100</div>
      </div>
      <div className="bar-container">
        <BorderLinearProgress
          variant="determinate"
          value={progress}
          sx={{ color: "#FFEC65" }}
        />
      </div>
      <div className="sign-container">%</div>
    </div>
  );
};

export default ProgressBar;

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};
