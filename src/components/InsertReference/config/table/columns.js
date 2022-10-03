export function getTypes(references) {
    let types = [...new Set(references.map(reference => reference.type))];
    return Array.from(types, type => ({
        text: type,
        value: type
    }));
}

let data = [
    {
      author:
        "Zlatev, Roumen;Magnin, Jean-Pierre;Ozil, Patrick;Stoytcheva, Margarita",
      year: 2006,
      title:
        "Bacterial sensors based on Acidithiobacillus ferrooxidans: Part I. Fe2+ and S2O32− determination",
      journal: "Biosensors and Bioelectronics",
      type: "Journal Article"
    },
    {
      author:
        "Zlatev, Roumen;Magnin, Jean-Pierre;Ozil, Patrick;Stoytcheva, Margarita",
      year: 2006,
      title:
        "Bacterial sensors based on Acidithiobacillus ferrooxidans: Part I. Fe2+ and S2O32− determination",
      journal: "Biosensors and Bioelectronics",
      type: "Article"
    }
  ];

export const columns = [{
        label: "Author",
        prop: "authors",
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
        prop: "publisher",
        sortable: true
    },
    {
        label: "Type",
        prop: "type",
        filters: getTypes(data),
        filterMethod: (value, row, column) => {
            console.log(row);
            const property = column.property;
            return row[property] === value;
        }
    }
];