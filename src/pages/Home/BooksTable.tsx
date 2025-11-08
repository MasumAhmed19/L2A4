import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDelBookMutation,
  useGetAllBooksQuery,
  type IBook,
} from "@/redux/api/bookApi";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DetailPopup from "../DetailBook/DetailPopup";
import EditBookPopup from "../EditBook/EditBookPopup";
import BorrowPopup from "../Borrow/BorrowPopup";
import { Link } from "react-router";

const GENRE = {
  FICTION: "Fiction",
  NON_FICTION: "Non Fiction",
  SCIENCE: "Scienece",
  HISTORY: "History",
  BIOGRAPHY: "Biography",
  FANTASY: "Fantasy",
};

const BooksTable = () => {
  const { data, isLoading, refetch:BooktableRetch } = useGetAllBooksQuery(undefined);
  const [delBook] = useDelBookMutation();
  // console.log({ data, isLoading });

  const handleDelete = async (id: string) => {
    try {
      await delBook(id);
      toast.success("Book Deleted Successfully");
    } catch (err) {
      console.log("Error in deleting book-->", err);
    }
  };

  return (
    <div className="w-full py-[80px] md:-mt-40 ">
      <div className="container mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            All Listed Books
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of books. Browse through
            various genres, check availability, and borrow books with just a few
            clicks.
          </p>
        </div>
        <div className="">
          <Table>
            <TableHeader className="bg-gray-200">
              <TableRow>
                {/* Always visible on mobile */}
                <TableHead className="max-w-[200px] truncate font-bold">
                  Title
                </TableHead>

                {/* Hidden on mobile, visible on md+ */}
                <TableHead className="hidden md:table-cell font-bold">
                  Author
                </TableHead>
                <TableHead className="hidden md:table-cell font-bold">
                  Genre
                </TableHead>
                <TableHead className="hidden md:table-cell font-bold">
                  ISBN
                </TableHead>
                <TableHead className="hidden md:table-cell font-bold">
                  Copies
                </TableHead>
                <TableHead className="hidden md:table-cell font-bold">
                  Status
                </TableHead>

                {/* Always visible */}
                <TableHead className="text-right font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {!isLoading && data?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-gray-500 text-sm md:text-base space-x-3"
                  >
                    No books found.{" "}
                    <span className="font-medium">
                      Please add some books to get started.
                    </span>
                      <Link to="/add-book" className="text-blue-500">Add Books</Link>
                  </TableCell>
                </TableRow>
              )}

              {isLoading && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-gray-500 text-sm md:text-base"
                  >
                    Loading books...
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                data?.length! > 0 &&
                data?.map((el: IBook, idx: number) => (
                  <TableRow key={idx}>
                    {/* Always visible */}
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {el.title}
                    </TableCell>

                    {/* Hidden on mobile */}
                    <TableCell className="hidden md:table-cell">
                      {el.author}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {GENRE[el.genre]}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {el.isbn}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {el.copies}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {el.available ? (
                        <span className="bg-green-100 px-2 rounded-md">
                          Available
                        </span>
                      ) : (
                        <span className="bg-red-100 px-2 rounded-md">
                          Unavailable
                        </span>
                      )}
                    </TableCell>

                    {/* Always visible */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <BorrowPopup BooktableRetch={BooktableRetch} id={el._id} />
                        <DetailPopup id={el._id} />
                        <EditBookPopup id={el._id} />

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="cursor-pointer">
                              <AiOutlineDelete size={20} />
                            </button>
                          </AlertDialogTrigger>

                          <AlertDialogPortal>
                            <AlertDialogOverlay className="bg-black/50" />
                            <AlertDialogContent className="max-w-sm rounded-2xl p-6 shadow-lg border border-gray-200 bg-white dark:bg-neutral-900">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                  Delete Book
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                  Are you sure you want to delete{" "}
                                  <span className="font-medium text-blue-600 dark:text-blue-400">
                                    {el.title.length > 20
                                      ? el.title.slice(0, 20) + "..."
                                      : el.title}
                                  </span>
                                  ? <br />
                                  This action is permanent and cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter className="mt-6 flex justify-end gap-2">
                                <AlertDialogCancel className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(el._id)}
                                  className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialogPortal>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BooksTable;
