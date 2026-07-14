import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import { nextCookies } from "better-auth/next-js";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_URI as string);

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

// Seed admin and demo users on startup
const seedAuthUsers = async () => {
    try {
        const db = client.db("craftfolio_db");

        const adminEmail = process.env.ADMIN_EMAIL || "admin@craftfolio.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "Admin@1234";
        const demoEmail = "demo@craftfolio.com";
        const demoPassword = "Demo@1234";

        // Seed admin
        const existingAdmin = await db.collection("user").findOne({ email: adminEmail });
        if (!existingAdmin) {
            await auth.api.signUpEmail({
                body: {
                    email: adminEmail,
                    password: adminPassword,
                    name: "Craftfolio Admin",
                },
            });
        }
        await db.collection("user").updateOne({ email: adminEmail }, { $set: { role: "admin" } });
        await db.collection("users").updateOne(
            { email: adminEmail },
            { $set: { name: "Craftfolio Admin", role: "admin", createdAt: new Date() } },
            { upsert: true }
        );

        // Seed demo user
        const existingDemo = await db.collection("user").findOne({ email: demoEmail });
        if (!existingDemo) {
            await auth.api.signUpEmail({
                body: {
                    email: demoEmail,
                    password: demoPassword,
                    name: "Demo Seller",
                },
            });
        }
        await db.collection("users").updateOne(
            { email: demoEmail },
            { $set: { name: "Demo Seller", role: "user", createdAt: new Date() } },
            { upsert: true }
        );

        console.log("Auth users seeded successfully.");
    } catch (err) {
        console.error("Auth seeding error:", (err as Error).message);
    }
};

seedAuthUsers();
