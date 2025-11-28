"use client";

import AddPropertyForm from "@/components/add-property-form";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddPropertyPage() {
    const router = useRouter();

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/dashboard/properties"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Properties
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
                <p className="text-gray-500 mt-1">Fill in the details to list a new property.</p>
            </div>

            <AddPropertyForm
                onSuccess={() => {
                    router.push("/dashboard/properties");
                }}
            />
        </div>
    );
}
