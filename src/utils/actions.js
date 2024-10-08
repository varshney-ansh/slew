import { Client } from "@elastic/elasticsearch";

const client = new Client({
    node: process.env.ES_ENDPOINT, // Elasticsearch endpoint
    auth: {
        apiKey: { // API key ID and secret
            id: process.env.ES_API_ID,
            api_key: process.env.ES_API_KEY,
        }
    }
})


export const getResults = async ({q, page}) => {
    const res = await client.search({
        "from": page * 20,
        "size": 20,
        query: {
            "multi_match": {
                "query": q,
                "type": "most_fields",
                "fields": ["cite", "title", "desc", "siteName", "keywords", "url"],
                "operator": "and"
            }
        },
        // allow_partial_search_results: true,
        request_cache: true,
    })

    const results = res.hits.hits;
    if(results.length == 0){
        return {error: "fail"};
        
    }
    return results;
}

export const linksOpen = [];
