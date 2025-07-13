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
    <div className="w-full p-5 py-[60px]">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Copies</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.map((el: IBook, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{el.title}</TableCell>
                  <TableCell>{el.author}</TableCell>
                  <TableCell>{el.genre}</TableCell>
                  <TableCell>{el.isbn}</TableCell>
                  <TableCell>{el.copies}</TableCell>
                  <TableCell>
                    {el.available ? "Avaiable" : "Unavaiable"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Borrow book */}
                      <BorrowPopup id={el._id}></BorrowPopup>

                      
                      {/* Detail Book */}
                      <DetailPopup id={el._id}></DetailPopup>
                      
                      {/* Edit Book */}
                      <EditBookPopup  id={el._id}></EditBookPopup>

                      {/* DELETE Book */}
                      <AlertDialog>
                        <AlertDialogTrigger  className="cursor-pointer">
                          {/* Trigger element, e.g. a button or icon */}
                          <AiOutlineDelete size={20} />
                        </AlertDialogTrigger>

                        <AlertDialogPortal>
                          <AlertDialogOverlay />
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete this book?
                                <br />
                                <span className="text-blue-500 font-medium">
                                  {el.title}
                                </span>
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. The selected book
                                will be permanently removed from the system, and
                                all its associated information will be lost.
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
