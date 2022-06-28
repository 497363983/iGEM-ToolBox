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

    }

    getReference(model = "{author:3}({year}).{title}.{publisher}.{volume}.{page}") {
        const regx = new RegExp("{*}");
        console.log(regx.exec(model));

        model.replace(regx,`$& `)
    }
}

function getReference(doi) {
    const url = `${base_url}${doi}`;
    request.get({
        url,
        success: (res) => {
            console.log(res);
            // return parseReferenceFromResToJSON(res.message)
            parseReferenceFromResToJSON(res.message).getReference();
            console.log(parseReferenceFromResToJSON(res.message));
        },
        failure: (err) => {
            console.log(err)
        }
    })
}

function parseReferenceFromResToJSON(JSONRes) {
    return new Reference(JSONRes);
}

export default getReference;