"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SignUpDefaultValues } from "@/lib/constants/index";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from 'react-dom'
import { signUpUser } from '@/lib/actions/user.actions'
import { useSearchParams } from "next/navigation";

const CredentialSignUpPage = () => {
    const [data, action] = useActionState(signUpUser, { success: false, message: "" });

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'




    const SignUpButton = () => {
        const { pending } = useFormStatus()
        return (
            <Button disabled={pending} className="w-full" variant='default' >{pending ? 'Submitting.....' : 'Sign Up'}</Button>
        )
    }
    return (<form action={action}>
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
                <Label htmlFor="Password"> Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    defaultValue={SignUpDefaultValues.password}
                />
            </div>
            <div>
                <Label htmlFor="confirmPassword"> Confirm Password</Label>
                <Input
                    id="confrimPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="confirmPassword"
                    required
                    defaultValue={SignUpDefaultValues.confirmPassword}
                />
            </div>
            <div>
                <SignUpButton />
            </div>

            {data && !data.success && (<div className="text-center text-destructive">{data.message}</div>)}





            <div className="text-sm text-center text-muted-foreground">
                Already  have an account? <Link href='/sign-in' target="self" className="link">Sign In</Link>

            </div>
        </div>
    </form>);
}

export default CredentialSignUpPage;