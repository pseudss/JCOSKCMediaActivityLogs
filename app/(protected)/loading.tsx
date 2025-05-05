export default function Loading() {
    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">Loading page...</p>
            </div>
        </div>
    );
}