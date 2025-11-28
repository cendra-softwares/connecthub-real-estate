"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface AddPropertyFormProps {
  onSuccess?: () => void;
}

export default function AddPropertyForm({ onSuccess }: AddPropertyFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [beds, setBeds] = useState(1);
  const [area, setArea] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Fetch categories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("property_categories")
          .select("id, name");

        if (error) {
          console.error("Error fetching categories:", error);
          setError("Failed to load categories. Please refresh the page.");
        } else {
          setCategories(data || []);
          if (data && data.length > 0) {
            setCategory(data[0].name); // Set default to first category
          } else {
            // If no categories exist, set an empty array and clear the selection
            setCategories([]);
            setCategory("");
          }
        }
      } catch (err) {
        console.error("Error in fetchCategories:", err);
        setError("An error occurred while loading categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate that categories are loaded and a category is selected
    if (categories.length === 0) {
      setError("Categories are not loaded. Please refresh the page.");
      setLoading(false);
      return;
    }

    try {
      // Get the authenticated user
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      // Get the category ID based on the selected category name
      if (!category) {
        throw new Error("Please select a category");
      }

      const { data: categoryData, error: categoryError } = await supabase
        .from("property_categories")
        .select("id")
        .eq("name", category)
        .single();

      if (categoryError || !categoryData) {
        console.error("Error fetching category ID:", categoryError);
        throw new Error(
          "Failed to find the selected category. Please try again."
        );
      }

      const categoryId = categoryData.id;

      const { error } = await supabase.from("properties").insert([
        {
          title,
          description,
          price: parseFloat(price) || 0,
          location,
          user_id: userId,
          category_id: categoryId,
          beds: parseInt(beds.toString()),
          area: parseFloat(area) || 0,
        },
      ]);

      if (error) {
        throw error;
      }

      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setLocation("");
      setCategory(categories.length > 0 ? categories[0].name : "");
      setBeds(1);
      setArea("");

      if (onSuccess) {
        onSuccess();
      }

      // Refresh the page to update the dashboard
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred while adding the property");
      console.error("Error adding property:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Add New Property
      </h2>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
            placeholder="Property title"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Property description"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Price"
              step="0.01"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Location"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={categories.length === 0}
              key="category-select"
            >
              {categories.length === 0 ? (
                <option value="" disabled>
                  Loading categories...
                </option>
              ) : (
                <>
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          <div>
            <label
              htmlFor="beds"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bedrooms
            </label>
            <input
              type="number"
              id="beds"
              min="0"
              value={beds}
              onChange={(e) => setBeds(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="area"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Area (sq ft)
          </label>
          <input
            type="number"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Area in square feet"
            step="0.01"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Property"}
          </button>
        </div>
      </form>
    </div>
  );
}
