"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SignInDefaultValues } from "@/lib/constants/index";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from 'react-icons/fc'
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // Import NextAuth's signIn method

const CredentialsSignInPage = () => {
    const [data, action] = useActionState(signInWithCredentials, { success: false, message: "" });

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const router = useRouter(); // ADD this inside your component

    const error = searchParams.get("error"); // <--- This will catch ?error=... from URL

    useEffect(() => {
        if (error) {
            if (error === "OAuthAccountNotLinked") {
                toast.error("An account already exists with this email. Please sign in with the original method.");
            } else if (error === "CredentialsSignin") {
                toast.error("Invalid email or password. Please try again.");
            } else {
                toast.error("Something went wrong. Please try again.");
            }

            // After showing toast, clean the URL (remove the ?error=...)
            router.replace("/sign-in");
        }
    }, [error, router]);

    const SignInButton = () => {
        const { pending } = useFormStatus();
        return (
            <Button disabled={pending} className="w-full" variant="default">
                {pending ? "Signing In..." : "Sign In"}
            </Button>
        );
    };

    // Google Sign-In handler
    const handleGoogleSignIn = async () => {
        const result = await signIn("google", { callbackUrl: '/sign-in', redirect: false }); // Important: redirect: false


        if (result?.error) {
            toast.error("An account already exists. Try signing in a different way.");
        }
    };

    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className="space-y-6">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        defaultValue={SignInDefaultValues.email}
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            autoComplete="current-password"
                            defaultValue={SignInDefaultValues.password}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-2.5"
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                    <div className="mt-3 text-sm text-right">
                        <Link href="/forgot-password" className="text-primary hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                </div>
                <div>
                    <SignInButton />
                </div>

                {/* Google Sign-In Button */}
                <Button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-2"
                    variant="outline"
                >
                    <FcGoogle size={20} />
                    <span>Sign in with Google</span>
                </Button>
                {data && !data.success && (
                    <div className="text-center text-destructive">{data.message}</div>
                )}

                <div className="text-sm text-center text-muted-foreground">
                    Don&apos;t have an account? <Link href="/sign-up" target="self" className="link">Sign Up</Link>
                </div>
            </div>
        </form>
    );
};

export default CredentialsSignInPage;





















































// "use client";

// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { SignInDefaultValues } from "@/lib/constants/index";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useActionState } from "react";
// import { useFormStatus } from 'react-dom'
// import { signInWithCredentials } from '@/lib/actions/user.actions'
// import { useSearchParams } from "next/navigation";




// const CredentialsSignInPage = () => {
//     const [data, action] = useActionState(signInWithCredentials, { success: false, message: "" });

//     const searchParams = useSearchParams()
//     const callbackUrl = searchParams.get('callbackUrl') || '/'




//     const SignInButton = () => {
//         const { pending } = useFormStatus()
//         return (
//             <Button disabled={pending} className="w-full" variant='default' >{pending ? 'Signing In...' : 'Sign In'}</Button>
//         )
//     }

//     return (
//         <form action={action}>
//             <input type="hidden" name="callbackUrl" value={callbackUrl} />
//             <div className="space-y-6">
//                 <div>
//                     <Label htmlFor="email"> Email</Label>
//                     <Input
//                         id="email"
//                         name="email"
//                         type="email"
//                         required
//                         autoComplete="email"
//                         defaultValue={SignInDefaultValues.email}
//                     />
//                 </div>
//                 <div>
//                     <Label htmlFor="Password"> Password</Label>
//                     <Input
//                         id="password"
//                         name="password"
//                         type="password"
//                         required
//                         autoComplete="password"
//                         defaultValue={SignInDefaultValues.password}
//                     />
//                 </div>
//                 <div>
//                     <SignInButton />
//                 </div>

//                 {data && !data.success && (<div className="text-center text-destructive">{data.message}</div>)}





//                 <div className="text-sm text-center text-muted-foreground">
//                     Don&apos;t have an account? <Link href='/sign-up' target="self" className="link">Sign Up</Link>

//                 </div>
//             </div>
//         </form>
//     );
// };

// export default CredentialsSignInPage;

