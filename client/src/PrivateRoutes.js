import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ context }) => {
  //uselocation to direct user to correct location - add state in Navigate element
  // look into replace
  return context.authenticatedUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
