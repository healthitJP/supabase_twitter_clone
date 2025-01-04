"use client";

import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthButton() {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {

        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
        };
        getSession();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
        router.refresh();
    };

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: "http://localhost:3000/auth/callback",
            },
        });
    };

    return session ? (<button onClick={handleSignOut}>Logout</button>) : (
        <button onClick={handleSignIn}>Login</button>);
}

