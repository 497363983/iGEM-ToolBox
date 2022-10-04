import { DOMcreateElement } from "@/TiptapEditor/utils/useTemplate";

/**
 * 
 * @param {Object} tablejson 
 * @returns {Object[]}
 */
export function transTableFormat(tablejson) {
    let tab = []
    console.log(tablejson)
    // console.log(tablejson["content"])
    for (let row in tablejson["content"]) {
        // console.log(Number(row))
        let tabrow = []
        for (let cell in tablejson["content"][row]["content"]) {
            let tabcell = []
            let content = ""
            if(tablejson["content"][row]["content"][cell]["content"].length == 1){
                console.log(tablejson["content"][row]["content"][cell]["content"])
                console.log(tablejson["content"][row]["content"][cell]["content"][0]["content"])
                if(tablejson["content"][row]["content"][cell]["content"][0]["content"]){
                    content = tablejson["content"][row]["content"][cell]["content"][0]["content"][0]["text"]
                }else{
                    content=""
                }
            }else{
                tablejson["content"][row]["content"][cell]["content"].forEach((each) =>{
                    content += DOMcreateElement(each)
                })
            }
            if (tablejson["content"][row]["content"][cell]["content"][0]["content"]) {
                tabcell.push({
                    "content": content,
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

