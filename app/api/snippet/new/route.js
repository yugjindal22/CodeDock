import { connectToDB } from "@utils/database";
import Snippet from "@models/snippet";


export const POST = async (req) => {

    const {userId, snippet, tag} = await req.json();

    try {
        await connectToDB();
        const newSnippet = await Snippet.create({
            creator: userId,
            snippet,
            tag,
        });

        await newSnippet.save();
        return new Response(JSON.stringify(newSnippet), {status: 201});
    } catch (error) {
        return new Response("Failed to create a new snippet", {status: 500});
    }

}