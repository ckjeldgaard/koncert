requireAll((<any>require).context('./', true, /\.ts$/));
function requireAll(r: any): any {
    r.keys().forEach(r);
}
