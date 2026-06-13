import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { findUserByEmail, createUser, recordFailedLogin, resetLoginAttempts, isAccountLocked, getRemainingAttempts } from "@/lib/userStore";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string
        }),
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string
        }),
        DiscordProvider({
            clientId: process.env.AUTH_DISCORD_ID as string,
            clientSecret: process.env.AUTH_DISCORD_SECRET as string
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                name: { label: "Name", type: "text", placeholder: "Your name" },
                email: { label: "Email", type: "email", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                // Check if account is locked
                const lockStatus = isAccountLocked(credentials.email);
                if (lockStatus.locked) {
                    throw new Error(`Account locked. Try again in ${lockStatus.remainingMinutes} minutes.`);
                }

                const user = findUserByEmail(credentials.email);

                if (!user) {
                    throw new Error("No user found with this email. Please register first.");
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    recordFailedLogin(credentials.email);
                    const remaining = getRemainingAttempts(credentials.email);
                    throw new Error(`Invalid password. ${remaining} attempts remaining.`);
                }

                // Successful login - reset attempts
                resetLoginAttempts(credentials.email);

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
            }
        }),
    ],
    pages: {
        signIn: "/signIn",
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };