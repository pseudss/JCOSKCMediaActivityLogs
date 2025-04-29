import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
                <p className="text-2xl font-medium text-gray-600 mb-6">
                    Page Not Found
                </p>
                <p className="text-base text-gray-500 mb-8">
                    The page you're looking for doesn't exist or has been removed.
                </p>
                <Link
                    href="/blank"
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Go back home
                </Link>
            </div>
        </div>
    );
}