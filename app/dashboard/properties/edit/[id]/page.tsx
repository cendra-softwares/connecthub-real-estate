"use client";

import { useEffect, useState } from "react";
import AddPropertyForm from "@/components/add-property-form";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function EditPropertyPage() {
    const router = useRouter();
    const params = useParams();
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const { data, error } = await supabase
                    .from("properties")
                    .select(`
            *,
            property_categories (name)
          `)
                    .eq("id", params.id)
                    .single();

                if (error) throw error;
                setProperty(data);
            } catch (err) {
                console.error("Error fetching property:", err);
                setError("Failed to load property details.");
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchProperty();
        }
    }, [params.id]);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading property details...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">{error}</div>;
    }

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
                <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
                <p className="text-gray-500 mt-1">Update property details.</p>
            </div>

            {property && (
                <AddPropertyForm
                    initialData={property}
                    onSuccess={() => {
                        router.push("/dashboard/properties");
                    }}
                />
            )}
        </div>
    );
}
