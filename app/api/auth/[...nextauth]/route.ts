// Import the handlers object from your auth config
import { handlers } from "@/auth";

// Export GET and POST methods from handlers
export const { GET, POST } = handlers;

// Explicitly set the runtime to Node.js to support bcryptjs
export const runtime = "nodejs";