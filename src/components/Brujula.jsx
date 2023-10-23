import NavigationIcon from "@mui/icons-material/Navigation";
import PropTypes from "prop-types";

const Brujula = ({ cardinalP }) => {
  const rotationClass = `rotate-${cardinalP.toLowerCase()}`;
  return (
    <div className="brujula-container">
      <button id="brujula" className={`brujula ${rotationClass}`} type="button">
        <NavigationIcon sx={{ color: "#E7E7EB" }} />
      </button>
      <span id="cardinalP">{cardinalP}</span>
    </div>
  );
};

export default Brujula;

Brujula.propTypes = {
  cardinalP: PropTypes.string.isRequired,
};
