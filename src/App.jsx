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
import ExpertTablePage from "./pages/ExpertTablePage/ExpertTablePage";

const PrivateRoute = ({element, isAuthenticated}) => {
    return isAuthenticated ? element : <Navigate to="/auth" />;
};

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                {/* Публичные маршруты */}
                <Route path="*" element={<FormPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/send-application" element={<FormPage />} />
                <Route path="/expert-table" element={<ExpertTablePage />} />
                {/* Приватные маршруты */}
                <Route path="/list" element={<TablePage />} />
                <Route path="/list/print" element={<PrintPage />} />
                <Route path="/success-page" element={<SuccessPage />} />
                {/* Редирект для неизвестных маршрутов */}
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
