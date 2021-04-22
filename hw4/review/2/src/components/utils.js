export function parseCellIndex(s) {
    var Pattern = /\d+/g;
    s = s.toUpperCase();
    var row = s.match(Pattern);
    if (row) {
        row = parseInt(row[0]);
        var tmp = s.split(row)[0];
        var col = 0;
        for(var i = 0; i < tmp.length; i++){
            col += Math.pow(26,tmp.length-1-i) * (tmp[i].charCodeAt(0)-65+1)
        }
        console.log(row+"_"+col)
        return row+"_"+col;
    } 
    else {
        return "none";
    }
}