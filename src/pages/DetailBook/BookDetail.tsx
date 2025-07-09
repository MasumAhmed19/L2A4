import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDelBookMutation, useGetBookByIdQuery } from "@/redux/api/bookApi";
import { useParams, Link } from "react-router";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";
import { BookOpen, Download, Edit, User } from "lucide-react";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading } = useGetBookByIdQuery(id ?? "");
  const [delBook] = useDelBookMutation();

  const handleDelete = async () => {
    try {
      await delBook(book?._id);
      toast.success("Book deleted successfully");
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  const handleBorrow = () => {
    // Borrow logic here
  };

  if (isLoading) return <p className="text-center py-10">Loading book...</p>;
  if (!book) return <p className="text-center py-10">Book not found.</p>;

  return (
    <div className="w-full min-h-screen px-4 py-10 md:px-8 bg-white">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{book.isbn}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button disabled={!book.available} onClick={handleBorrow}>
              <Download className="h-4 w-4 mr-2" />
              Borrow Book
            </Button>

            <Button variant="outline" asChild>
              <Link to={`/edit-book/${book.id}`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex items-center gap-2">
                  <AiOutlineDelete className="h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>

              <AlertDialogPortal>
                <AlertDialogOverlay />
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Book</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Are you sure you want to
                      delete <span className="font-semibold">{book.title}</span>?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogPortal>
            </AlertDialog>
          </div>
        </div>

        {/* Availability */}
        <div>
          <Badge variant={book.available ? "default" : "destructive"}>
            {book.available ? "Available" : "Unavailable"}
          </Badge>
        </div>

        {/* Detail Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base font-medium">Book Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800">
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">Author</p>
                  <p className="text-gray-700">{book.author}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-900">Genre</p>
                  <Badge variant="secondary">{book.genre}</Badge>
                </div>

                <div>
                  <p className="font-medium text-gray-900">Copies Available</p>
                  <p>{book.copies}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">Created</p>
                  <p>{new Date(book.createdAt).toLocaleDateString()}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-900">Last Updated</p>
                  <p>{new Date(book.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-medium text-gray-900 mb-1">Description</p>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookDetail;
