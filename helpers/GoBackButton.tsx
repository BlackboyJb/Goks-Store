"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const GoBackButton = () => {
    const router = useRouter();

    return (
        <Button variant="outline" onClick={() => router.back()} className="mb-4">
            Go Back
        </Button>
    );
};

export default GoBackButton;
