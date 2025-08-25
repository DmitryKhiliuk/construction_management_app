import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {ROUTES} from "../shared/routes.ts";
import {useAccountStore} from "../features/auth/store/accountStore.ts";

export const Require = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const {isAuthenticated, loading, refresh} = useAccountStore()
    useEffect(() => {
        if (/*!loading &&*/ !isAuthenticated && !isRefreshing) {
            setIsRefreshing(true);
            const tryRefresh = async () => {
                const refreshed = await refresh();
                if (!refreshed) {
                    navigate(ROUTES.AUTH, { state: { from: location }, replace: true });
                }
                setIsRefreshing(false);
            };
            tryRefresh();
        }
    }, [isAuthenticated, loading, navigate, refresh, location, isRefreshing]);

    if (/*loading ||*/ isRefreshing) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.AUTH} state={{ from: location }} replace />;
};
