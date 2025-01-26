'use client';

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditSnippet = () => {
    const router = useRouter();
    
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        snippet: "",
        tag:"",
    });

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditSnippetContent 
                router={router} 
                submitting={submitting} 
                setSubmitting={setSubmitting} 
                post={post} 
                setPost={setPost} 
            />
        </Suspense>
    );
}

const EditSnippetContent = ({ router, submitting, setSubmitting, post, setPost }) => {
    const searchParams = useSearchParams();
    const snippetId = searchParams.get('id');

    const UpdateSnippet = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!snippetId) return alert("Snippet ID is missing");

        try {
            const response = await fetch(`api/snippet/${snippetId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    snippet: post.snippet,
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

    useEffect(() => {
        const getSnippetDetails = async () => {
            const response = await fetch(`/api/snippet/${snippetId}`);
            const data = await response.json();
            
            setPost({
                snippet: data.snippet,
                tag: data.tag,
            });
        }
        if(snippetId) getSnippetDetails();
    },[snippetId]);

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={UpdateSnippet}
        />
    )
}

export default EditSnippet