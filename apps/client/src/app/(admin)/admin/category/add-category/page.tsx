"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { addCategory } from "@/lib/api/category";

export default function Page() {
  const router = useRouter();
  const [category, setCategory] = useState("");

  const handleClick = async () => {
    const result = await addCategory(category);
    if (result) {
      router.push("/admin/category/all-category");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-black px-4 py-10">
      <Card
        className="
          w-full max-w-xl
          backdrop-blur-md bg-white/5 border border-white/10
          rounded-2xl shadow-lg p-6 sm:p-10
          text-white
        "
      >
        <CardHeader className="text-2xl sm:text-4xl font-semibold pb-4">
          Add New Category
        </CardHeader>

        <CardBody className="flex flex-col gap-6">
          <Input
            type="text"
            label="Category Name"
            variant="bordered"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-10"
            classNames={{
              inputWrapper: "bg-white/5 border-white/20 rounded-xl text-white",
              label: "text-white/80",
            }}
          />

          <button
            type="submit"
            className="
              w-full sm:w-48 self-center
              bg-[color:var(--color-amazon-primary)]
              hover:bg-[color:var(--color-amazon-secondary)]
              text-black font-semibold
              px-6 py-3 rounded-xl
              transition-all duration-300
              shadow-md hover:shadow-orange-500/30
            "
            onClick={handleClick}
          >
            Add Category
          </button>
        </CardBody>

        <CardFooter />
      </Card>
    </div>
  );
}
