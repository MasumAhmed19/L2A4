import { Link } from 'react-router';
import { BarChart3, BookOpen, Plus, Home } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGetSummaryQuery } from '@/redux/api/borrowApi';
import BrorrowLoader from './BrorrowLoader';

const BorrowSummary = () => {
  const { data: borrowSummary, isLoading } = useGetSummaryQuery(undefined);

  if (isLoading) {
    return <BrorrowLoader />;
  }

  // Calculate total books borrowed (sum of all quantities)
  const totalQuantityBorrowed = borrowSummary?.reduce(
    (sum, item) => sum + item.totalQuantity, 
    0
  ) || 0;

  // Total unique books borrowed
  const totalUniqueBooksCount = borrowSummary?.length || 0;

  return (
    <div className="min-h-screen  dark:bg-gray-900">
      <div className="container mx-auto py-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Borrow Summary
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Overview of all borrowed books
            </p>
          </div>
          <Button asChild size="sm">
            <Link to="/">
              <BookOpen className="h-4 w-4 mr-2" />
              Browse Books
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Borrowed
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {totalQuantityBorrowed}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Unique Books
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {totalUniqueBooksCount}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Borrowed Books List */}
        <Card>
          <CardHeader>
            <CardTitle>Borrowed Books</CardTitle>
            <CardDescription>
              List of all books currently borrowed from the library
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!borrowSummary || borrowSummary.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No borrowed books yet
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                  Start borrowing books from the library to see them here
                </p>
                <Button asChild>
                  <Link to="/">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Books
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Table Header (Desktop) */}
                <div className="hidden sm:grid sm:grid-cols-12 gap-4 pb-3 border-b text-sm font-medium text-gray-600 dark:text-gray-400">
                  <div className="col-span-5">Book Title</div>
                  <div className="col-span-4">ISBN</div>
                  <div className="col-span-3 text-right">Quantity</div>
                </div>
                
                {/* Table Rows */}
                {borrowSummary.map((item, index) => (
                  <div 
                    key={index} 
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 py-3 border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    {/* Book Title */}
                    <div className="sm:col-span-5">
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {item.book.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 sm:hidden mt-1">
                        ISBN: {item.book.isbn}
                      </div>
                    </div>
                    
                    {/* ISBN (Desktop only) */}
                    <div className="hidden sm:block sm:col-span-4 font-mono text-sm text-gray-600 dark:text-gray-400 self-center">
                      {item.book.isbn}
                    </div>
                    
                    {/* Quantity */}
                    <div className="sm:col-span-3 flex sm:justify-end items-center">
                      <Badge 
                        variant="secondary" 
                        className="font-semibold"
                      >
                        {item.totalQuantity} {item.totalQuantity === 1 ? 'copy' : 'copies'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link to="/books">
                  <BookOpen className="h-4 w-4 mr-2" />
                  All Books
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link to="/add-book">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Book
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BorrowSummary;