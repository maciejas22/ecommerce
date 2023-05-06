export function myJSONformatter(json) {
    let result = {};

    function recurse(cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            if (cur.length === 1) {
                result[prop] = cur[0];
            } else {
                result[prop] = cur.reduce((acc, val) => acc.concat(val), []);
            }
        } else {
            let isEmpty = true;
            for (let p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop + "." + p : p);
            }
            if (isEmpty && prop) {
                result[prop] = {};
            }
        }
    }

    recurse(json, "");

    return result;
}