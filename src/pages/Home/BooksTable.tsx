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

const GENRE = {
  FICTION: "Fiction",
  NON_FICTION: "Non Fiction",
  SCIENCE: "Scienece",
  HISTORY: "History",
  BIOGRAPHY: "Biography",
  FANTASY: "Fantasy",
};

const BooksTable = () => {
  const { data, isLoading } = useGetAllBooksQuery(undefined);
  const [delBook] = useDelBookMutation();
  console.log({ data, isLoading });

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
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">All Listed Books</h2>
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
              {data?.map((el: IBook, idx: number) => (
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
                      <BorrowPopup id={el._id} />
                      <DetailPopup id={el._id} />
                      <EditBookPopup id={el._id} />

                      <AlertDialog>
                        <AlertDialogTrigger className="cursor-pointer">
                          <AiOutlineDelete size={20} />
                        </AlertDialogTrigger>

                        <AlertDialogPortal>
                          <AlertDialogOverlay />
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete this book?{" "}
                                <br />
                                <span className="text-blue-500 font-medium">
                                  {el.title}
                                </span>
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. The selected book
                                will be permanently removed from the system.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(el._id)}
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
