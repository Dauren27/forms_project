import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import FormPage from "./pages/FormPage/FormPage";
import PrintPage from "./pages/PrintPage/PrintPage";
import TablePage from "./pages/TablePage/TablePage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import {useState} from "react";
import {Navigate} from "react-router-dom";
import {AuthProvider, useAuth} from "./context/AuthContext";

const PrivateRoute = ({element, isAuthenticated}) => {
    return isAuthenticated ? element : <Navigate to="/auth" />;
};

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                {/* Публичные маршруты */}
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/send-application" element={<FormPage />} />

                {/* Приватные маршруты */}
                <Route
                    path="/list"
                    element={
                        <PrivateRoute
                            element={<TablePage />}
                            isAuthenticated={sessionStorage.getItem("isAuth")}
                        />
                    }
                />
                <Route
                    path="/list/print"
                    element={
                        <PrivateRoute
                            element={<PrintPage />}
                            isAuthenticated={sessionStorage.getItem("isAuth")}
                        />
                    }
                />
                <Route path="/success-page" element={<SuccessPage />} />

                {/* Редирект для неизвестных маршрутов */}
                <Route path="*" element={<FormPage />} />
            </Route>
        )
    );
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default App;
