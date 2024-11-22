var $3281990be7bd78f6$exports = {};
$3281990be7bd78f6$exports = {
    "actions": `Aktionen`,
    "actionsAvailable": `Aktionen verf\xfcgbar.`,
    "clearSelection": `Auswahl l\xf6schen`,
    "selected": (args, formatter)=>`${formatter.plural(args.count, {
            "=0": `Nichts ausgew\xe4hlt`,
            one: ()=>`${formatter.number(args.count)} ausgew\xe4hlt`,
            other: ()=>`${formatter.number(args.count)} ausgew\xe4hlt`
        })}`,
    "selectedAll": `Alles ausgew\xe4hlt`
};


export {$3281990be7bd78f6$exports as default};
//# sourceMappingURL=de-DE.module.js.map
