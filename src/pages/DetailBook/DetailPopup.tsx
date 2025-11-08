import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useGetBookByIdQuery } from "@/redux/api/bookApi"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"

type DetailPopupProps = {
  id: string
}


const GENRE = {
  FICTION: "Fiction",
  NON_FICTION: "Non Fiction",
  SCIENCE: "Scienece",
  HISTORY: "History",
  BIOGRAPHY: "Biography",
  FANTASY: "Fantasy",
};

const DetailPopup = ({ id }: DetailPopupProps) => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { data: book, isLoading } = useGetBookByIdQuery(id)

const BookContent = () => {
  if (isLoading)
    return <p className="text-center text-gray-500 text-sm">Loading...</p>
  if (!book)
    return <p className="text-center text-red-500 text-sm">Book not found.</p>

  return (
    <div className="space-y-4 text-sm text-gray-700">
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
        <Badge
          variant={book.available ? "default" : "destructive"}
          className="uppercase"
        >
          {book.available ? "Available" : "Unavailable"}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        <div>
          <p className="text-gray-600 text-xs uppercase">Author</p>
          <p className="font-semibold">{book.author}</p>
        </div>

        <div>
          <p className="text-gray-600 text-xs uppercase">Genre</p>
          <Badge variant="secondary" className="capitalize mt-1 font-semibold">
            {GENRE[book.genre]}
          </Badge>
        </div>

        <div>
          <p className="text-gray-600 text-xs uppercase">ISBN</p>
          <p className="font-semibold">{book.isbn}</p>
        </div>

        <div>
          <p className="text-gray-600 text-xs uppercase">Copies</p>
          <p className="font-semibold">{book.copies}</p>
        </div>
      </div>

      {book.description && (
        <div className="pt-3 border-t">
          <p className="text-gray-500 text-xs uppercase mb-1">Description</p>
          <p className="leading-relaxed text-gray-700">{book.description}</p>
        </div>
      )}
    </div>
  )
}


  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="cursor-pointer">
          <Eye size={20} />
        </DialogTrigger>
        <DialogContent className="min-w-3xl">
          <DialogHeader>
            <DialogTitle>Book Detail</DialogTitle>
            <DialogDescription>
              Details about the selected book.
            </DialogDescription>
          </DialogHeader>
          <BookContent />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        <Eye size={20} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Book Detail</DrawerTitle>
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
  )
}

export default DetailPopup
