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
import { CalendarIcon, BookOpen, User, Hash, Copy } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { usePostBorrowMutation } from "@/redux/api/borrowApi";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

type BorrowPopupProps = {
  id: string;
  BooktableRetch: () => void;
};

const BorrowPopup = ({ id, BooktableRetch }: BorrowPopupProps) => {
  const [open, setOpen] = React.useState(false);
  const [calendarOpen, setCalendarOpen] = React.useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data: book, isLoading } = useGetBookByIdQuery(id);

  const [postBorrow, { isLoading: isSubmitting }] = usePostBorrowMutation();

  const form = useForm<IBorrow>({
    defaultValues: {
      quantity: 1,
      dueDate: new Date(),
    },
  });

  const onSubmit = async (data: IBorrow) => {
    try {
      console.log(data)
      data.book = id;
      console.log(data)
      await postBorrow(data).unwrap();
      BooktableRetch()
      setOpen(false);
      form.reset();
      toast.success("Book borrowed successfully")
    } catch (err:any) {
      console.error(err);
      toast.error(err.data.message)

    }
  };

  const BookContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
        </div>
      );
    }

    if (!book) {
      return (
        <div className="text-center py-12 text-gray-500">
          <p>Book not found.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Book Information Card */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              by {book.author}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">Genre:</span>
              <Badge variant="secondary" className="">
                {book.genre}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">ISBN:</span>
              <span className="font-mono text-xs">{book.isbn}</span>
            </div>
            <div className="flex items-center gap-2">
              <Copy className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">Copies:</span>
              <span className=" font-semibold">{book.copies}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-400">Status:</span>
              <Badge
                variant={book.available ? "default" : "destructive"}
                className=""
              >
                {book.available ? "Available" : "Unavailable"}
              </Badge>
            </div>
          </div>

          {book.description && (
            <div className="pt-2">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {book.description}
              </p>
            </div>
          )}
        </div>

        <Separator />

        {/* Borrowing Form */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
            Borrowing Details
          </h4>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="quantity"
                rules={{
                  required: "Quantity is required",
                  min: { value: 1, message: "Must borrow at least one book" },
                  max: {
                    value: book.copies,
                    message: `Only ${book.copies} copies available`,
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={book.copies}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Maximum {book.copies} copies available
                    </FormDescription>
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
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
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
                      Return within 14 days from today
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={!book.available || isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Borrow Book"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    );
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Borrow book"
          >
            <LiaBookReaderSolid size={20} />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
            <DialogDescription>
              Review book details and set your borrowing preferences
            </DialogDescription>
          </DialogHeader>
          <BookContent />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Borrow book"
        >
          <LiaBookReaderSolid size={20} />
        </button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Borrow Book</DrawerTitle>
          <DrawerDescription>
            Review book details and set your borrowing preferences
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4 overflow-y-auto">
          <BookContent />
        </div>
        <DrawerFooter className="pt-2 border-t">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default BorrowPopup;