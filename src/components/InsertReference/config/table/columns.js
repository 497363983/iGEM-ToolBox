/* jshint esversion: 6 */

const getTypes = references => {
    let types = [...new Set(references.map(reference => reference.type))];
    return Array.from(types, type => ({
        text: type,
        value: type
    }));
};

const columns = [{
        label: "Author",
        prop: "author",
        sortable: true
    },
    {
        label: "Year",
        prop: "year",
        sortable: true
    },
    {
        label: "Title",
        prop: "title",
        sortable: true
    },
    {
        label: "Journal",
        prop: "journal",
        sortable: true
    },
    {
        label: "Type",
        prop: "type",
        filters: getTypes(data),
        filterMethod: (value, row, column) => {
            console.log(row);
            const property = column["property"];
            return row[property] === value;
        }
    }
];