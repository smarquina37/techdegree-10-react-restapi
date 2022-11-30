import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = ({ context }) => {
  const location = useLocation;
  return context.authenticatedUser ? (
    <Outlet />
  ) : (
    <Navigate to={"/signin"} state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
