var $57b680843fcbe09e$exports = {};
$57b680843fcbe09e$exports = {
    "actions": `Eylemler`,
    "actionsAvailable": `Eylemler mevcut.`,
    "clearSelection": `Se\xe7imi temizle`,
    "selected": (args, formatter)=>`${formatter.plural(args.count, {
            "=0": `Hi\xe7biri se\xe7ilmedi`,
            other: ()=>`${formatter.number(args.count)} se\xe7ildi`
        })}`,
    "selectedAll": `T\xfcm\xfc se\xe7ildi`
};


export {$57b680843fcbe09e$exports as default};
//# sourceMappingURL=tr-TR.module.js.map
