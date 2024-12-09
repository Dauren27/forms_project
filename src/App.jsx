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

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="*" element={<FormPage />} />
                <Route path="/send-application" element={<FormPage />} />
                <Route path="/list/print" element={<PrintPage />} />
                <Route path="/list" element={<TablePage />} />
                <Route path="/success-page" element={<SuccessPage />} />
            </Route>
        )
    );
    return <RouterProvider router={router} />;
};

export default App;
