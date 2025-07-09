// import { useMediaQuery } from "@/hooks/use-media-query"
// import { useGetBookByIdQuery, useUpdateBookMutation } from "@/redux/api/bookApi"
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer"
// import { Badge } from "@/components/ui/badge"
// import { Edit, Eye } from "lucide-react"
// import { useState } from "react"

// type DetailPopupProps = {
//   id: string
// }

// const EditBookPopup = ({ id }: DetailPopupProps) => {
//   const [open, setOpen] = useState(false)
//   const isDesktop = useMediaQuery("(min-width: 768px)")
//   const { data: book, isLoading } = useGetBookByIdQuery(id)

//   const [updateBook] = useUpdateBookMutation();

//   const BookContent = () => {
//     if (isLoading) return <p>Loading...</p>
//     if (!book) return <p>Book not found.</p>

//     return (
//       <div className="space-y-4 text-sm text-gray-700">
//         <div>
//           <strong>Title:</strong> {book.title}
//         </div>
//         <div>
//           <strong>Author:</strong> {book.author}
//         </div>
//         <div>
//           <strong>Genre:</strong> <Badge>{book.genre}</Badge>
//         </div>
//         <div>
//           <strong>ISBN:</strong> {book.isbn}
//         </div>
//         <div>
//           <strong>Status:</strong>{" "}
//           <Badge variant={book.available ? "default" : "destructive"}>
//             {book.available ? "Available" : "Unavailable"}
//           </Badge>
//         </div>
//         <div>
//           <strong>Description:</strong> {book.description}
//         </div>
//       </div>
//     )
//   }

//   if (isDesktop) {
//     return (
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild className="cursor-pointer">
//           <Edit size={20} />
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Edit Book Detail</DialogTitle>
//             <DialogDescription>
//               Details about the selected book.
//             </DialogDescription>
//           </DialogHeader>
//           <BookContent />
//         </DialogContent>
//       </Dialog>
//     )
//   }

//   return (
//     <Drawer open={open} onOpenChange={setOpen}>
//       <DrawerTrigger asChild className="cursor-pointer">
//         <Edit size={20} />
//       </DrawerTrigger>
//       <DrawerContent>
//         <DrawerHeader className="text-left">
//           <DrawerTitle>Book Detail</DrawerTitle>
//           <DrawerDescription>
//             Details about the selected book.
//           </DrawerDescription>
//         </DrawerHeader>
//         <div className="px-4 pb-4">
//           <BookContent />
//         </div>
//         <DrawerFooter className="pt-2">
//           <DrawerClose asChild>
//             <Button variant="outline">Close</Button>
//           </DrawerClose>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   )
// }

// export default EditBookPopup

import { useMediaQuery } from "@/hooks/use-media-query";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
  type IBook,
} from "@/redux/api/bookApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EditBookPopupProps = {
  id: string;
};

const EditBookPopup = ({ id }: EditBookPopupProps) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { data: book, isLoading } = useGetBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();

  const form = useForm<IBook>();

  useEffect(() => {
    if (book) {
      form.reset(book);
    }
  }, [book, form]);

  const onSubmit = async (data: IBook) => {
    try {
      await updateBook({ id, body: data });
      toast.success("Book updated successfully");
      setOpen(false);
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update book");
    }
  };

  const BookForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isbn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISBN</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          rules={{ required: "Please select a genre" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre*</FormLabel>
              <FormControl className="w-full">
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a book genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FICTION">Fiction</SelectItem>
                    <SelectItem value="NON_FICTION">Non Fiction</SelectItem>
                    <SelectItem value="SCIENCE">Science</SelectItem>
                    <SelectItem value="HISTORY">History</SelectItem>
                    <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                    <SelectItem value="FANTASY">Fantasy</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="copies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Copies</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Edit size={20} className="cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Update book information below.
            </DialogDescription>
          </DialogHeader>
          <BookForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Edit size={20} className="cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Book</DrawerTitle>
          <DrawerDescription>Update book information below.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <BookForm />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EditBookPopup;
