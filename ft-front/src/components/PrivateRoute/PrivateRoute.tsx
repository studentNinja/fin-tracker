import React, { ReactElement, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchUserProfile } from "../../features/user/userThunks";
import { fetchFixedExpenses } from "../../features/fixedExpenses/fixedExpensesThunks";

interface PrivateRouteProps {
  children?: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchFixedExpenses());
  }, [dispatch]);

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
