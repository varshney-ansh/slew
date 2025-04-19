const { Client } = require('@elastic/elasticsearch-serverless');

const client = new Client({
    node: process.env.ES_ENDPOINT, // Elasticsearch endpoint
    auth: {
        apiKey: process.env.ES_API_KEY, // API key
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
                "fields": ["cite", "title", "description", "siteName", "keywords", "url"],
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
