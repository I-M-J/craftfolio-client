export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Handler = (req: Request) => Promise<Response>;

const notConfigured: Handler = async () =>
    new Response(JSON.stringify({ error: "Auth not configured" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
    });

let GET: Handler = notConfigured;
let POST: Handler = notConfigured;

if (process.env.MONGO_URI) {
    const { auth } = await import("@/lib/auth");
    const { toNextJsHandler } = await import("better-auth/next-js");
    const handler = toNextJsHandler(auth);
    GET = handler.GET as Handler;
    POST = handler.POST as Handler;
}

export { GET, POST };
