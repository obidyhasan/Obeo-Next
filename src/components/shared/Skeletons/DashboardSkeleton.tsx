import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => {
    return (
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {/* SectionCards skeleton */}
                <div className="grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-4 lg:px-6">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-24 w-full" />
                    ))}
                </div>
                {/* Chart skeleton */}
                <div className="px-4 lg:px-6">
                    <Skeleton className="h-[400px] w-full" />
                </div>
                {/* Table skeleton */}
                <div className="px-4 lg:px-6">
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        </div>
    );
};
