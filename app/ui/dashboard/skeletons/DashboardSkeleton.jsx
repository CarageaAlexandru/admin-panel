export default function DashboardSkeleton() {
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col gap-4 w-64">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        </div>
    )
}