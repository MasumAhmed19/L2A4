import App from "@/App";
import AddBook from "@/pages/AddBook/AddBook";
import BorrowSummary from "@/pages/BorrowSummary/BorrowSummary";
import BookDetail from "@/pages/DetailBook/BookDetail";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/add-book',
        Component: AddBook,
      },{
        path: '/borrow-summary',
        Component: BorrowSummary
      },{
        path: '/book/:id',
        Component: BookDetail
      }
    ],
  },
]);

export default router;
