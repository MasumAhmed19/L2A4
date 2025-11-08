import { Link } from 'react-router';
import { BarChart3, BookOpen, ArrowLeft, Loader } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

import { useGetSummaryQuery } from '@/redux/api/borrowApi';
import BrorrowLoader from './BrorrowLoader';

const  BorrowSummary=()=> {
  const { data: borrowSummary, error, isLoading, refetch } = useGetSummaryQuery(undefined);

  if (isLoading) {
    return (
      <BrorrowLoader />
    );
  }

  return (
    <div className="space-y-6 container mx-auto p-4">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Borrow Summary</h1>
          <p className="text-slate-600 mt-1">
            Overview of all borrowed books and lending statistics
          </p>
        </div>
        <Button asChild>
          <Link to="/">
            <BookOpen className="h-4 w-4 mr-2" />
            Browse Books
          </Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="">
            <CardTitle className="text-sm font-medium text-blue-700">Total Books Borrowed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-blue-900">{borrowSummary?.length}</div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
          <CardHeader className="">
            <CardTitle className="text-sm font-medium text-emerald-700">Unique Titles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-emerald-900">{borrowSummary?.length}</div>
              <BookOpen className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Borrowed Books Summary</CardTitle>
          <CardDescription>
            Aggregated data of all books that have been borrowed
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!borrowSummary || borrowSummary.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No borrowing activity yet</h3>
              <p className="text-slate-600 mb-4">
                Once books are borrowed, you'll see the summary here.
              </p>
              <Button asChild>
                <Link to="/books">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Books to Borrow
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead className="text-right">Total Quantity Borrowed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {borrowSummary.map((item, index) => (
                    <TableRow key={index} className="hover:bg-slate-50">
                      <TableCell className="font-medium">title</TableCell>
                      <TableCell className="font-mono text-sm">isbn</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary" className="font-semibold">
                          quantity
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/books">
                            <BookOpen className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="outline">
              <Link to="/books">
                <BookOpen className="h-4 w-4 mr-2" />
                View All Books
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/create-book">
                <BookOpen className="h-4 w-4 mr-2" />
                Add New Book
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default BorrowSummary;