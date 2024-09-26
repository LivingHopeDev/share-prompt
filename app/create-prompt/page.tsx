"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Use the updated import from 'next/navigation'
import Form from "@components/Form";

// Define the post type
interface Post {
  prompt: string;
  tag: string;
}

// Define the component
const CreatePrompt: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession(); // Destructure the data from session
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/"); // Redirect to home page
      }
    } catch (error) {
      console.log("Error creating prompt:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
