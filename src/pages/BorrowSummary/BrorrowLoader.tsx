const BrorrowLoader = () => {
  return (
    <div className="space-y-6 container mx-auto animate-pulse p-4">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-slate-200 rounded"></div>
          <div className="h-4 w-72 bg-slate-200 rounded"></div>
        </div>
        <div className="h-10 w-40 bg-slate-200 rounded"></div>
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((_, idx) => (
          <div
            key={idx}
            className="border-0 shadow-lg p-4 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200"
          >
            <div className="space-y-4">
              <div className="h-4 w-40 bg-slate-200 rounded"></div>
              <div className="flex items-center justify-between">
                <div className="h-8 w-20 bg-slate-200 rounded"></div>
                <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Table Skeleton */}
      <div className="border-0 shadow-lg p-4 rounded-lg bg-white">
        <div className="space-y-2 mb-4">
          <div className="h-5 w-56 bg-slate-300 rounded"></div>
          <div className="h-4 w-72 bg-slate-200 rounded"></div>
        </div>

        {/* Table Skeleton */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="p-2">
                  <div className="h-4 w-24 bg-slate-200 rounded"></div>
                </th>
                <th className="p-2">
                  <div className="h-4 w-24 bg-slate-200 rounded"></div>
                </th>
                <th className="p-2 text-right">
                  <div className="h-4 w-32 bg-slate-200 rounded ml-auto"></div>
                </th>
                <th className="p-2 text-right">
                  <div className="h-4 w-24 bg-slate-200 rounded ml-auto"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((_, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="p-3">
                    <div className="h-4 w-32 bg-slate-200 rounded"></div>
                  </td>
                  <td className="p-3">
                    <div className="h-4 w-24 bg-slate-200 rounded"></div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="h-4 w-20 bg-slate-200 rounded ml-auto"></div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="h-8 w-16 bg-slate-300 rounded ml-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions Skeleton */}
      <div className="border-0 shadow-lg p-4 rounded-lg bg-white">
        <div className="h-5 w-40 bg-slate-300 rounded mb-4"></div>
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="h-10 w-40 bg-slate-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrorrowLoader;
