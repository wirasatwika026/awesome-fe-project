function SkeletonBlock({ className }: { className: string }) {
  return <div className={`skeleton rounded ${className}`} />;
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4">
      {/* header: avatar + name */}
      <div className="flex items-center gap-3">
        <SkeletonBlock className="w-10 h-10 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <SkeletonBlock className="h-3 w-1/3" />
          <SkeletonBlock className="h-2.5 w-1/4" />
        </div>
        <SkeletonBlock className="h-6 w-14 rounded-full shrink-0" />
      </div>

      {/* image placeholder */}
      <SkeletonBlock className="h-36 w-full rounded-lg" />

      {/* text lines */}
      <div className="space-y-2">
        <SkeletonBlock className="h-3 w-full" />
        <SkeletonBlock className="h-3 w-5/6" />
        <SkeletonBlock className="h-3 w-4/6" />
      </div>

      {/* footer actions */}
      <div className="flex gap-2 pt-1">
        <SkeletonBlock className="h-8 w-20 rounded-full" />
        <SkeletonBlock className="h-8 w-16 rounded-full" />
      </div>
    </div>
  );
}

export default function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
