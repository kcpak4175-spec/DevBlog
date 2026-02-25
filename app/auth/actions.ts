"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    redirect("/");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
        return { error: "비밀번호가 일치하지 않습니다." };
    }

    if (password.length < 6) {
        return { error: "비밀번호는 최소 6자 이상이어야 합니다." };
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
        },
    });

    if (error) {
        return { error: error.message };
    }

    return { success: "인증 이메일이 발송되었습니다. 이메일을 확인해 주세요." };
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
}

export async function resetPassword(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get("email") as string;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback?next=/update-password`,
    });

    if (error) {
        return { error: error.message };
    }

    return { success: "비밀번호 재설정 이메일이 발송되었습니다." };
}

export async function updatePassword(formData: FormData) {
    const supabase = await createClient();

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
        return { error: "비밀번호가 일치하지 않습니다." };
    }

    if (password.length < 6) {
        return { error: "비밀번호는 최소 6자 이상이어야 합니다." };
    }

    const { error } = await supabase.auth.updateUser({
        password,
    });

    if (error) {
        return { error: error.message };
    }

    redirect("/");
}
