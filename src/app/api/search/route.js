import { domExtract, extractHtml, extractResults, extraHtml, searchResults } from "@/actions/lib";
import { NextResponse } from "next/server";
import parse from "node-html-parser";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const url = `https://www.google.com/search?q=${query}&sca_esv=9022223ce295faef&sxsrf=ADLYWII5cILgMEzZEkkKtXnfzXu-R4RWYw%3A1725344890679&ei=eqzWZu-RKdiaseMP5IaduA8&ved=0ahUKEwjvtsvKkqaIAxVYTWwGHWRDB_cQ4dUDCBA&uact=5&oq=microsoft+al&gs_lp=Egxnd3Mtd2l6LXNlcnAiDG1pY3Jvc29mdCBhbDILEAAYgAQYkQIYigUyCxAAGIAEGJECGIoFMgoQABiABBgUGIcCMgsQABiABBiRAhiKBTIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEjcClCIBliyCHABeAGQAQCYAY4CoAHDBaoBAzItM7gBA8gBAPgBAZgCBKAC5gXCAgcQIxiwAxgnwgIKEAAYsAMY1gQYR8ICGRAuGIAEGLADGNEDGEMYxwEYyAMYigXYAQHCAhMQLhiABBiwAxhDGMgDGIoF2AEBwgINEAAYgAQYsQMYQxiKBcICEBAAGIAEGLEDGEMYgwEYigXCAgoQABiABBhDGIoFwgIKECMYgAQYJxiKBcICCBAAGIAEGLEDwgILEAAYgAQYsQMYgwHCAg0QABiABBixAxgUGIcCmAMAiAYBkAYNugYECAEYCJIHBTEuMC4zoAePEg&sclient=gws-wiz-serp`;
    
    const html = await extractHtml(url);
    const res = await extractResults(html);
    const result = JSON.parse(JSON.stringify(res));

    return NextResponse.json(result, {status: 200});
}

