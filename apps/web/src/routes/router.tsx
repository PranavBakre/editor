import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Index from "./index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Index />,
      },
    ],
  },
]);
