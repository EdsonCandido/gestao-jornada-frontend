import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { userStore } from "../store/usersStore";
import { Spinner } from "../components/spinner";

const LazyLoginPage = lazy(() => import("../pages/login"));
const LazyDashboardPage = lazy(() => import("../pages/dashboard"));

export const RoutesApp = () => {
  const user = userStore((store) => store.user);

  function Auth({ children }: { children: JSX.Element }) {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense fallback={<Spinner />}>
            <LazyLoginPage />
          </Suspense>
        }
        key={Math.random()}
      ></Route>
      <Route
        path="/dashboard"
        element={
          <Auth>
             <Suspense fallback={<Spinner />}>
            <LazyDashboardPage />
             </Suspense>
          </Auth>
        }
        key={Math.random()}
      ></Route>
    </Routes>
  );
};
