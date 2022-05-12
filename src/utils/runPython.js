import {
    PythonShell
} from 'python-shell'
// PythonShell.defaultOptions({
//     script: `${__dirname}/py`
// })
export default function runPython(src, options, callback) {
    PythonShell.run(src, options,  (err, results) => {
        console.log(err, results);
        if (callback && typeof callback === "function") {
            callback(err, results);
        }
    });
}