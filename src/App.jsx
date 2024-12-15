import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
} from "react-router-dom";
import FormPage from "./pages/FormPage/FormPage";
import PrintPage from "./pages/PrintPage/PrintPage";
import TablePage from "./pages/TablePage/TablePage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ExpertTablePage from "./pages/ExpertTablePage/ExpertTablePage";
import ExpertFormPage from "./pages/ExpertFormPage/ExpertFormPage";
import {useSelector} from "react-redux";

const App = () => {
    const {isAuth} = useSelector((state) => state.auth);

    const publicRoutes = (
        <Route>
            <Route path="*" element={<Navigate to="/auth" />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/send-application" element={<FormPage />} />
            <Route path="/success-page" element={<SuccessPage />} />
        </Route>
    );

    const privateRoutes = (
        <Route>
            <Route path="/list" element={<TablePage />} />
            <Route path="/list/print" element={<PrintPage />} />
            <Route path="/expert/list" element={<ExpertTablePage />} />
            <Route path="/expert/form/:id" element={<ExpertFormPage />} />
            <Route path="*" element={<Navigate to="/auth" />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/send-application" element={<FormPage />} />
            <Route path="/list" element={<TablePage />} />
            <Route path="/list/print" element={<PrintPage />} />
            <Route path="/success-page" element={<SuccessPage />} />
        </Route>
    );

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>{isAuth ? privateRoutes : publicRoutes}</Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default App;
