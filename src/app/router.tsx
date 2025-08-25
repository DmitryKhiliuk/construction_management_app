import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {ROUTES} from "../shared/routes.ts";
import AuthPage from "../pages/authPage.tsx";
import MainPage from "../pages/MainPage.tsx";
import {Require} from "./require.tsx";
import MachAndMechPage from "../pages/machAndMechPage.tsx";
import CarPage from "../pages/machAndMechPages/carPage.tsx";
import LayoffsPage from "../pages/layoffsPage.tsx";
import DressPage from "../pages/dressPage.tsx";
import ToolsPage from "../pages/toolsPage.tsx";
import DocumentationPage from "../pages/documentationPage.tsx";
import DocContentPage from "../pages/documentationPages/docContentPage.tsx";
import ConstructionPage from "../pages/constructionPage.tsx";
import SubcontractingPage from "../pages/constructionPages/subcontractingPage.tsx";
import {memo} from "react";

function ConstructionItemPage() {
    return null;
}

export const Router = createBrowserRouter([
    {
        path: ROUTES.AUTH,
        element: <AuthPage/>
    },
    {
        element: <Require/>,
        children: [
            {
                path: ROUTES.MAIN,
                element: <MainPage/>,
                children: [
                    {
                        index: true,
                        element: <Navigate to={ROUTES.MECH} replace/>
                    },
                    {
                        path: ROUTES.MECH,
                        element: <MachAndMechPage/>,
                        children: [
                            {
                                index: true,
                                element: <Navigate to={`${ROUTES.MECH}${ROUTES.CARS}`} replace/>
                            },
                            {
                                path: `${ROUTES.MECH}${ROUTES.CARS}`,
                                element: <CarPage type="cars"/>
                            },
                            {
                                path: `${ROUTES.MECH}${ROUTES.EQUI}`,
                                element: <CarPage type="equipment"/>
                            },
                            {
                                path: `${ROUTES.MECH}${ROUTES.MECHANISMS}`,
                                element: <CarPage type="mechanisms"/>
                            }
                        ]
                    },
                    {
                        path: ROUTES.LAYOFFS,
                        element: <LayoffsPage/>
                    },
                    {
                        path: ROUTES.TOOLS,
                        element: <ToolsPage/>
                    },
                    {
                        path: ROUTES.DRESS,
                        element: <DressPage/>
                    },
                    {
                        path: ROUTES.DOC,
                        element: <DocumentationPage/>,
                        children: [
                            {
                                index: true,
                                element: <Navigate to={`${ROUTES.DOC}${ROUTES.DOC_ENTER}`} replace/>
                            },
                            {
                                path: `${ROUTES.DOC}${ROUTES.DOC_ENTER}`,
                                element: <DocContentPage type="enter"/>
                            },
                            {
                                path: `${ROUTES.DOC}${ROUTES.DOC_EXIT}`,
                                element: <DocContentPage type="exit"/>
                            }
                        ]
                    },
                    {
                        path: ROUTES.CONSTRUCTION,
                        element: <ConstructionPage/>
                    },
                    {
                        path: `${ROUTES.CONSTRUCTION}/:id`,
                        element: <ConstructionItemPage/>,
                        children: [
                            {
                                index: true,
                                element: <Navigate to={ROUTES.SUB} replace/>
                            },
                            {
                                path: ROUTES.SUB,
                                element: <SubcontractingPage type="sub"/>
                            },

                        ]
                    }
                ]
            }
        ]
    }
]);

// Компонент-провайдер
export const RouterComponent = memo(() => {
    return <RouterProvider router={Router}/>;
});