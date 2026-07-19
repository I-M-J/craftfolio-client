/**
 * Fetches a fresh JWT token from the Better-Auth /api/auth/token endpoint.
 * The `jwtClient` plugin exposes the token endpoint at /api/auth/token.
 * We hit this directly so we avoid the TypeScript type mismatch with authClient.getToken().
 */
export async function getJwtToken(): Promise<string | null> {
    try {
        const res = await fetch("/api/auth/token", {
            method: "GET",
            credentials: "include",
        });
        if (!res.ok) return null;
        const data = await res.json() as { token?: string };
        return data.token ?? null;
    } catch {
        return null;
    }
}
