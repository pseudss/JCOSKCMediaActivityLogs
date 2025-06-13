import Link from "next/link";
import { Button } from "@/components/ui/button"; // Import Button component

export default function NotFound() {
    return (
        // Adjusted styling to fit within the ProtectedLayout's main content area
        <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
            <div> {/* Removed redundant inner flex container, direct child of the main flex container */}
                <h1 className="text-8xl md:text-9xl font-extrabold text-foreground">404</h1>
                <p className="text-2xl font-medium text-muted-foreground mb-6">
                    Page Not Found
                </p>
                <p className="text-base text-muted-foreground mb-8">
                    The page you're looking for doesn't exist or has been removed.
                </p>
                <Button asChild>
                    <Link href="/"> {/* Changed href to a more generic protected home */}
                        Go back home
                    </Link>
                </Button>
            </div>
        </div>
    );
}