import {
    PythonShell
} from 'python-shell'
// PythonShell.defaultOptions({
//     script: `${__dirname}/py`
// })
/**
 * 
 * @param {String} src 
 * @param {PythonShell.options} options 
 * @param {Function} callback 
 */
export default function runPython(src, options, callback) {
    PythonShell.run(src, options, (err, results) => {
        console.log(err, results);
        if (callback && typeof callback === "function") {
            callback(err, results);
        }
    });
}