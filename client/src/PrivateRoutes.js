import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = ({ context }) => {
  const location = useLocation;
  return context.authenticatedUser ? (
    <Outlet />
  ) : (
    <Navigate to={"/signin"} replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
