import {
    request
} from "../request";

const base_url = "http://api.crossref.org/works/";

class Reference {
    constructor(JSONInformation) {
        this.doi = JSONInformation.DOI;
        this.url = JSONInformation.URL;
        this.authors = JSONInformation.author;
        this.year = JSONInformation.issued["date-parts"][0][0];
        this.date = JSONInformation.issued["date-parts"][0];
        this.language = JSONInformation.language;
        this.issn = JSONInformation.ISSN[0];
        this.issue = JSONInformation.issue;
        this.title = JSONInformation.title;
        this.type = JSONInformation.type;
        this.publisher = JSONInformation.publisher;
        this.volume = JSONInformation.volume;

        this.abstract = JSONInformation.abstract;
        this.page = JSONInformation.page;
        this.subject = JSONInformation.subject;

    }

    getReference(model = "{author:3}({year}).{title}.{publisher}.{volume}.{page}") {
        const regx = /{*}/
        model.replace(regx, `$& `);
    }
    getAuthorString() {

    }
}


export function getReference({ doi, success, failure }) {
    const url = `${base_url}${doi}`;
    request.get({
        url,
        success: async (res) => {
            const reference = await parseReferenceFromResToJSON(res.message);
            if (success && typeof success === "function") {
                // console.log('success');
                success({ reference, res });
            }
        },
        failure: (err) => {
            if (failure && typeof failure === "function") {
                failure({ err });
            }
        }
    });
}

function parseReferenceFromResToJSON(JSONRes) {
    return new Promise((resolve) => resolve(new Reference(JSONRes)));
}
