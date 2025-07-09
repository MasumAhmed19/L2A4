import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { usePostBookMutation, type IBook } from "@/redux/api/bookApi";
import { SelectValue } from "@radix-ui/react-select";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";


const AddBook = () => {
  const navigate = useNavigate();

  const form = useForm<IBook>({
    mode: "onTouched",
  });

  const [postBook] = usePostBookMutation();

  const onSubmit: SubmitHandler<IBook> = async (data) => {
    console.log(data);
    try {
      const res = await postBook(data);
      console.log(res);
      toast.success("New Book added");
      navigate("/");
    } catch (err) {
      console.log("Error on adding book-->", err);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-[60px]">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-medium">Add New Book</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter book title"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="author"
                  rules={{ required: "Author name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter author name"
                          {...field}
                          value={field.value || ""}
                        />
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a book genre" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="FICTION">Fiction</SelectItem>
                          <SelectItem value="NON_FICTION">
                            Non Fiction
                          </SelectItem>
                          <SelectItem value="SCIENCE">Science</SelectItem>
                          <SelectItem value="HISTORY">History</SelectItem>
                          <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                          <SelectItem value="FANTASY">Fantasy</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isbn"
                  rules={{ required: "Please enter ISBN of the book" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ISBN*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter ISBN"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter book description"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="copies"
                  rules={{ required: "Number of copies is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Copies*</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1"
                          {...field}
                          value={field.value || 0}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === "" ? undefined : Number(value)
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="available"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <div className="flex items-center gap-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id="available"
                          />
                        </FormControl>
                        <FormLabel htmlFor="available" className="font-normal">
                          Mark as available for borrowing
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit">Add book</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AddBook;
