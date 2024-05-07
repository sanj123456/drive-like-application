import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "components/NotFound";
import FileExplorer from "components/FileExplorer";
import WebLayout from "layouts/WebLayout";
import FileExplorerDetailed from "components/FileExplorer/FileExplorerDetailed";

export const WebRoutes = () => {
  const routes = [
    { path: "*", layout: WebLayout, component: NotFound },
    { path: "/", layout: WebLayout, component: FileExplorer },
    {
      path: "/folder/:id/*",
      layout: WebLayout,
      component: FileExplorerDetailed,
    },
  ];

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <route.layout>
              <route.component />
            </route.layout>
          }
        />
      ))}
    </Routes>
  );
};
