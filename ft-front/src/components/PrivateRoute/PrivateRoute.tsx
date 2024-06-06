import React, { ReactElement, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getTokenWithExpiry } from "../../utils/tokenUtils";
import { setAuthState } from "../../features/auth/authSlice";

interface PrivateRouteProps {
  children?: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  const token = getTokenWithExpiry("token");

  useEffect(() => {
    if (token) {
      dispatch(
        setAuthState({
          token,
        })
      );
    }
  }, [dispatch, token]);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
};

export default React.memo(PrivateRoute);
