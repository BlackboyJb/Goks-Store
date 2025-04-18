// "use client";

// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { SignUpDefaultValues } from "@/lib/constants/index";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useActionState } from "react";
// import { useFormStatus } from 'react-dom'
// import { signUpUser } from '@/lib/actions/user.actions'
// import { useSearchParams } from "next/navigation";
// import { SECURITY_QUESTIONS } from '@/lib/constants/index'

// const CredentialSignUpPage = () => {
//     const [data, action] = useActionState(signUpUser, { success: false, message: "" });

//     const searchParams = useSearchParams()
//     const callbackUrl = searchParams.get('callbackUrl') || '/'




//     const SignUpButton = () => {
//         const { pending } = useFormStatus()
//         return (
//             <Button disabled={pending} className="w-full" variant='default' >{pending ? 'Submitting.....' : 'Sign Up'}</Button>
//         )
//     }
//     return (<form action={action}>
//         <input type="hidden" name="callbackUrl" value={callbackUrl} />
//         <div className="space-y-6">
//             <div>
//                 <Label htmlFor="name">Name</Label>
//                 <Input
//                     id="name"
//                     name="name"
//                     type="text"
//                     autoComplete="name"
//                     defaultValue={SignUpDefaultValues.name}
//                 />
//             </div>
//             <div>
//                 <Label htmlFor="email"> Email</Label>
//                 <Input
//                     id="email"
//                     name="email"
//                     type="text"
//                     autoComplete="email"
//                     defaultValue={SignUpDefaultValues.email}
//                 />
//             </div>
//             <div>
//                 <Label htmlFor="Password"> Password</Label>
//                 <Input
//                     id="password"
//                     name="password"
//                     type="password"
//                     autoComplete="password"
//                     required
//                     defaultValue={SignUpDefaultValues.password}
//                 />
//             </div>
//             <div>
//                 <Label htmlFor="confirmPassword"> Confirm Password</Label>
//                 <Input
//                     id="confrimPassword"
//                     name="confirmPassword"
//                     type="password"
//                     autoComplete="confirmPassword"
//                     required
//                     defaultValue={SignUpDefaultValues.confirmPassword}
//                 />
//             </div>
//             <div>
//                 <Label htmlFor="securityQuestion">Security Question</Label>
//                 <select
//                     id="securityQuestion"
//                     name="securityQuestion"
//                     className="w-full border rounded-md px-3 py-2"
//                     defaultValue=""
//                 >
//                     <option value="" disabled>Select a question</option>
//                     {SECURITY_QUESTIONS.map((q, idx) => (
//                         <option key={idx} value={q}>
//                             {q}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div>
//                 <Label htmlFor="securityAnswer">Security Answer</Label>
//                 <Input id="securityAnswer" name="securityAnswer" type="text" />
//             </div>
//             <div>
//                 <SignUpButton />
//             </div>

//             {data && !data.success && (<div className="text-center text-destructive">{data.message}</div>)}





//             <div className="text-sm text-center text-muted-foreground">
//                 Already  have an account? <Link href='/sign-in' target="self" className="link">Sign In</Link>

//             </div>
//         </div>
//     </form>);
// }

// export default CredentialSignUpPage;


"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SignUpDefaultValues } from "@/lib/constants/index";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUpUser } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";
import { SECURITY_QUESTIONS } from "@/lib/constants/index";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Importing eye icons
import { useState } from "react"; // Import useState

const CredentialSignUpPage = () => {
    const [data, action] = useActionState(signUpUser, { success: false, message: "" });
    const [showPassword, setShowPassword] = useState(false); // State for showing password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing confirm password

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const SignUpButton = () => {
        const { pending } = useFormStatus();
        return (
            <Button disabled={pending} className="w-full" variant="default">
                {pending ? "Submitting....." : "Sign Up"}
            </Button>
        );
    };

    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className="space-y-6">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        defaultValue={SignUpDefaultValues.name}
                    />
                </div>
                <div>
                    <Label htmlFor="email"> Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="text"
                        autoComplete="email"
                        defaultValue={SignUpDefaultValues.email}
                    />
                </div>
                <div>
                    <Label htmlFor="password"> Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            autoComplete="password"
                            required
                            defaultValue={SignUpDefaultValues.password}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                        </button>
                    </div>
                </div>
                <div>
                    <Label htmlFor="confirmPassword"> Confirm Password</Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                            autoComplete="confirmPassword"
                            required
                            defaultValue={SignUpDefaultValues.confirmPassword}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                        </button>
                    </div>
                </div>
                <div>
                    <Label htmlFor="securityQuestion">Security Question</Label>
                    <select
                        id="securityQuestion"
                        name="securityQuestion"
                        className="w-full border rounded-md px-3 py-2"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select a question
                        </option>
                        {SECURITY_QUESTIONS.map((q, idx) => (
                            <option key={idx} value={q}>
                                {q}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <Label htmlFor="securityAnswer">Security Answer</Label>
                    <Input id="securityAnswer" name="securityAnswer" type="text" />
                </div>
                <div>
                    <SignUpButton />
                </div>

                {data && !data.success && (
                    <div className="text-center text-destructive">{data.message}</div>
                )}

                <div className="text-sm text-center text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/sign-in" target="self" className="link">
                        Sign In
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default CredentialSignUpPage;
