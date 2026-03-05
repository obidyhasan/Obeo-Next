import { Skeleton } from "@/components/ui/skeleton";

export const DataTableSkeleton = () => {
    return (
        <div className="flex flex-1 flex-col py-4 px-4 lg:px-6">
            <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-10 w-32" />
            </div>
            <div className="rounded-md border">
                <div className="h-12 border-b px-4 flex items-center gap-4 bg-muted/50">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-8 ml-auto" />
                </div>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-14 border-b px-4 flex items-center gap-4">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-8 ml-auto" />
                    </div>
                ))}
            </div>
        </div>
    );
};
