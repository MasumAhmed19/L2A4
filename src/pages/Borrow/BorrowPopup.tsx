import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  type IBorrow,
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
import { Badge } from "@/components/ui/badge";
import { LiaBookReaderSolid } from "react-icons/lia";
import { useForm } from "react-hook-form";
import { addDays, format, startOfToday } from "date-fns";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { usePostBorrowMutation } from "@/redux/api/borrowApi";

type BorrowPopupProps = {
  id: string;
};

const BorrowPopup = ({ id }: BorrowPopupProps) => {
  const [open, setOpen] = React.useState(false);
  const [calendarOpen, setCalendarOpen] = React.useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data: book, isLoading } = useGetBookByIdQuery(id);
  const {refetch} = useGetAllBooksQuery(undefined);

  const [postBorrow] = usePostBorrowMutation();

  const form = useForm<IBorrow>({
    defaultValues: {
      quantity: 1,
      dueDate: new Date(),
    },
  });

  const onSubmit = async (data: IBorrow) => {
    
    try{
      data.book = id;
      const res = await postBorrow(data);
      refetch()
      console.log(res)

    }catch(err){
      console.log(err)
    }

  };

  const BookContent = () => {
    if (isLoading) return <p>Loading...</p>;
    if (!book) return <p>Book not found.</p>;

    return (
      <div className="flex flex-col md:flex-row gap-6 text-sm text-gray-700">
        <div className="flex flex-col gap-2 w-full p-5 shadow-2xl rounded-lg">
          <h3>
            <strong>Title:</strong> {book.title}
          </h3>
          <h3>
            <strong>Author:</strong> {book.author}
          </h3>
          <h3>
            <strong>Genre:</strong> <Badge>{book.genre}</Badge>
          </h3>
          <h3>
            <strong>ISBN:</strong> {book.isbn}
          </h3>
          <h3>
            <strong>Copies:</strong> {book.copies}
          </h3>
          <div>
            <strong>Status:</strong>{" "}
            <Badge variant={book.available ? "default" : "destructive"}>
              {book.available ? "Available" : "Unavailable"}
            </Badge>
          </div>
          <div>
            <strong>Description:</strong> {book.description}
          </div>
        </div>

        <div className="p-5 shadow-2xl rounded-lg w-full">
          <div>
            <h3>Borrowing Details</h3>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="quantity"
                rules={{
                  required: "Quantity is required",
                  min: { value: 1, message: "Must borrow at least one book" },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setCalendarOpen(false);
                          }}
                          disabled={{
                            before: startOfToday(),
                            after: addDays(startOfToday(), 14),
                          }}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your have to give back the book in upcoming 2 weeks.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </div>
      </div>
    );
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="cursor-pointer">
          <LiaBookReaderSolid size={20} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md md:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
            <DialogDescription>
              Details about the selected book.
            </DialogDescription>
          </DialogHeader>
          <BookContent />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        <LiaBookReaderSolid size={20} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Borrow Book</DrawerTitle>
          <DrawerDescription>
            Details about the selected book.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <BookContent />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default BorrowPopup;
