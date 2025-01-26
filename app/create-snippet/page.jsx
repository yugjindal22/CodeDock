'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";



const CreateSnippet = () => {

    const { data: session } = useSession(); 
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        snippet: "",
        tag:"",
    });

    const createSnippet = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch("api/snippet/new", {
                method: "POST",
                body: JSON.stringify({
                    snippet: post.snippet,
                    userId: session?.user.id,
                    tag: post.tag,
                    
                }),
            })
            if(response.ok){
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setSubmitting(false);
        }
    }

  return (
    <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createSnippet}
    />
  )
}

export default CreateSnippet