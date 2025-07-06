import App from "@/App";
import AddBook from "@/pages/AddBook/AddBook";
import BorrowSummary from "@/pages/BorrowSummary/BorrowSummary";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: '/',
        // index: true, //by defaul tasks show krbe
        Component: Home,
      },
      {
        path: '/add-book',
        Component: AddBook,
      },{
        path: '/borrow-summary',
        Component: BorrowSummary
      }
    ],
  },
]);

export default router;
