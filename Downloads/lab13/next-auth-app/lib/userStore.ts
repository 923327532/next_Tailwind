// Simple in-memory user store for credentials authentication
// In production, use a real database

export interface User {
    id: string;
    name: string;
    email: string;
    password: string; // hashed with bcrypt
    loginAttempts: number;
    lockedUntil: Date | null;
    createdAt: Date;
}

// In-memory store (replace with database in production)
const users: Map<string, User> = new Map();

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION_MINUTES = 15;

export function findUserByEmail(email: string): User | undefined {
    return users.get(email.toLowerCase());
}

export function createUser(name: string, email: string, hashedPassword: string): User {
    const user: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        loginAttempts: 0,
        lockedUntil: null,
        createdAt: new Date(),
    };
    users.set(email.toLowerCase(), user);
    return user;
}

export function recordFailedLogin(email: string): void {
    const user = users.get(email.toLowerCase());
    if (user) {
        user.loginAttempts += 1;
        if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
            user.lockedUntil = new Date(Date.now() + LOCK_DURATION_MINUTES * 60 * 1000);
        }
    }
}

export function resetLoginAttempts(email: string): void {
    const user = users.get(email.toLowerCase());
    if (user) {
        user.loginAttempts = 0;
        user.lockedUntil = null;
    }
}

export function isAccountLocked(email: string): { locked: boolean; remainingMinutes?: number } {
    const user = users.get(email.toLowerCase());
    if (!user || !user.lockedUntil) {
        return { locked: false };
    }
    
    const now = new Date();
    if (user.lockedUntil > now) {
        const remainingMs = user.lockedUntil.getTime() - now.getTime();
        const remainingMinutes = Math.ceil(remainingMs / 60000);
        return { locked: true, remainingMinutes };
    }
    
    // Lock expired, reset
    user.lockedUntil = null;
    user.loginAttempts = 0;
    return { locked: false };
}

export function getRemainingAttempts(email: string): number {
    const user = users.get(email.toLowerCase());
    if (!user) return MAX_LOGIN_ATTEMPTS;
    return Math.max(0, MAX_LOGIN_ATTEMPTS - user.loginAttempts);
}
