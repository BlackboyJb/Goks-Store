"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SignUpDefaultValues } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signUpUser } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";
import { SECURITY_QUESTIONS } from "@/lib/constants";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema } from "@/lib/validators"; // make sure you have this

type SignUpFormData = z.infer<typeof signUpSchema>;

const CredentialSignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [serverError, setServerError] = useState("");

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        mode: "onChange",
        defaultValues: SignUpDefaultValues,
    });

    const onSubmit = async (formDataObj: SignUpFormData) => {
        setServerError("");

        const formData = new FormData();
        for (const key in formDataObj) {
            formData.append(key, formDataObj[key as keyof SignUpFormData]);
        }

        const result = await signUpUser(undefined, formData);

        if (!result.success) {
            setServerError(result.message);
        } else {
            reset();
            // redirect or toast here
        }
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />

            <div className="space-y-6">
                {/* Name */}
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" {...register("name")} />
                    {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            {...register("password")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            {...register("confirmPassword")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword.message}</p>}
                </div>

                {/* Security Question */}
                <div>
                    <Label htmlFor="securityQuestion">Security Question</Label>
                    <select
                        id="securityQuestion"
                        className="w-full border rounded-md px-3 py-2"
                        {...register("securityQuestion")}
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
                    {errors.securityQuestion && <p className="text-destructive text-sm mt-1">{errors.securityQuestion.message}</p>}
                </div>

                {/* Security Answer */}
                <div>
                    <Label htmlFor="securityAnswer">Security Answer</Label>
                    <Input id="securityAnswer" {...register("securityAnswer")} />
                    {errors.securityAnswer && <p className="text-destructive text-sm mt-1">{errors.securityAnswer.message}</p>}
                </div>

                {/* Submit */}
                <div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Sign Up"}
                    </Button>
                </div>

                {/* Server Error */}
                {serverError && <div className="text-center text-destructive">{serverError}</div>}

                <div className="text-sm text-center text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/sign-in" className="link">
                        Sign In
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default CredentialSignUpPage;










































































































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


