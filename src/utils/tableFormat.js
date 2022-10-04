/**
 * 
 * @param {Object} tablejson 
 * @returns {Object[]}
 */
export function transTableFormat(tablejson) {
    let tab = []
    for (let row in tablejson["content"]) {
        let tabrow = []
        for (let cell in tablejson["content"][row]["content"]) {
            let tabcell = []
            if (tablejson["content"][row]["content"][cell]["content"][0]["content"]) {
                // console.log(tablejson["content"][row]["content"][cell]["content"][0]["content"][0]["text"])
                // console.log(tablejson["content"][row]["content"][cell]["attrs"]["colspan"])
                // console.log(tablejson["content"][row]["content"][cell]["attrs"]["rowspan"])
                tabcell.push({
                    "content": tablejson["content"][row]["content"][cell]["content"][0]["content"][0]["text"],
                    "colspan": tablejson["content"][row]["content"][cell]["attrs"]["colspan"],
                    "rowspan": tablejson["content"][row]["content"][cell]["attrs"]["rowspan"],
                })
            }
            tabrow.push(tabcell)
        }
        tab.push(tabrow)
    }

    console.log(JSON.stringify(tab))
    return tab;
}

