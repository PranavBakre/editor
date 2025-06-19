import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Index from "./index";
import Room from "./room";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/room/:roomId",
        element: <Room />,
      }
    ],
  },
]);
