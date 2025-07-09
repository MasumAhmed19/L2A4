"use client"

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

const DetailPopup = ({ id }: DetailPopupProps) => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { data: book, isLoading } = useGetBookByIdQuery(id)

  const BookContent = () => {
    if (isLoading) return <p>Loading...</p>
    if (!book) return <p>Book not found.</p>

    return (
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <strong>Title:</strong> {book.title}
        </div>
        <div>
          <strong>Author:</strong> {book.author}
        </div>
        <div>
          <strong>Genre:</strong> <Badge>{book.genre}</Badge>
        </div>
        <div>
          <strong>ISBN:</strong> {book.isbn}
        </div>
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
    )
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="cursor-pointer">
          <Eye size={20} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
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
