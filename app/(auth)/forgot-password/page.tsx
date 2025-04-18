"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { verifySecurityAndResetPassword } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [step, setStep] = useState<"start" | "verify">("start");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for showing password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing confirm password

    const router = useRouter();

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await fetch(`/api/forgot-password/security-question?email=${email}`);
        setIsLoading(false);

        if (!res.ok) {
            const error = await res.json();
            setMessage(error.message);
            return;
        }

        const data = await res.json();
        setSecurityQuestion(data.securityQuestion);
        setStep("verify");
    };

    const handleResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await verifySecurityAndResetPassword({
            email,
            securityAnswer,
            newPassword,
            confirmPassword,
        });

        setIsLoading(false);

        if (res.success) {
            toast.success("Password reset successfully.");
            router.push('/sign-in');
        } else {
            setMessage(res.message);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <Card>
                <CardHeader className="space-y-4">
                    <Link href="/" className="flex justify-center">
                        <Image
                            src="/images/logo.jpg"
                            width={100}
                            height={100}
                            alt="App Logo"
                            className="dark:invert"
                            priority={true}
                        />
                    </Link>
                    <CardTitle className="text-center text-2xl font-semibold">Forgot Password</CardTitle>
                    <CardDescription className="text-center text-sm text-gray-500">
                        Enter your email to receive a security question, then reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {message && (
                        <p className="text-center text-sm text-red-500 font-medium">{message}</p>
                    )}

                    {step === "start" ? (
                        <form onSubmit={handleEmailSubmit} className="space-y-6">
                            <div>
                                <Label>Email Address</Label>
                                <Input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full mt-4 py-3"
                                disabled={isLoading}
                            >
                                {isLoading ? "Loading..." : "Get Security Question"}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetSubmit} className="space-y-6">
                            <p className="text-sm font-medium">{securityQuestion}</p>
                            <div>
                                <Label>Answer</Label>
                                <Input
                                    type="text"
                                    required
                                    value={securityAnswer}
                                    onChange={(e) => setSecurityAnswer(e.target.value)}
                                    className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <Label>New Password</Label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    >
                                        {showPassword ? (
                                            <AiOutlineEyeInvisible size={20} />
                                        ) : (
                                            <AiOutlineEye size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <Label>Confirm Password</Label>
                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    >
                                        {showConfirmPassword ? (
                                            <AiOutlineEyeInvisible size={20} />
                                        ) : (
                                            <AiOutlineEye size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full mt-4 py-3"
                                disabled={isLoading}
                            >
                                {isLoading ? "Resetting..." : "Reset Password"}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ForgotPasswordPage;
