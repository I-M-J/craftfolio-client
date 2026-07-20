import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import { nextCookies } from "better-auth/next-js";
import { jwt } from "better-auth/plugins";

if (!process.env.MONGO_URI) {
    console.error("MONGO_URI environment variable is not set.");
}

const client = new MongoClient(process.env.MONGO_URI || "mongodb://localhost:27017");

export const auth = betterAuth({
    database: mongodbAdapter(client.db("craftfolio_db")),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
            },
        },
    },
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
    plugins: [jwt(), nextCookies()],
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
        },
    },
});
