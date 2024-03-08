import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { fetchToken } from "../components/Auth/Auth";

export function RequireToken({ children }) {
  let auth = fetchToken();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

RequireToken.propTypes = {
  children: PropTypes.node.isRequired,
};
