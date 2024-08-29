import { useNavigate, useLocation } from "react-router-dom";

const withNavigate = (WrappedComponent) => (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  return <WrappedComponent {...props} {...{ navigate, location }} />;
};

export { withNavigate };
