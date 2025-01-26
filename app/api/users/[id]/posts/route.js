import { connectToDB } from "@utils/database";
import Snippet from "@models/snippet";

export const GET = async (request, {params}) => {
    
    try {
        await connectToDB();
        const snippets = await Snippet.find({creator: params.id}).populate('creator');
        return new Response(JSON.stringify(snippets), {status: 200});    

    } catch (error) {
        return new Response("Failed to fetch snippets", {status: 500});
        
    }


}