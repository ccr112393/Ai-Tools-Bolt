var $087af352bd8a67a5$exports = {};
$087af352bd8a67a5$exports = {
    "actions": `Azioni`,
    "actionsAvailable": `Azioni disponibili.`,
    "clearSelection": `Annulla selezione`,
    "selected": (args, formatter)=>`${formatter.plural(args.count, {
            "=0": `Nessuno selezionato`,
            one: ()=>`${formatter.number(args.count)} selezionato`,
            other: ()=>`${formatter.number(args.count)} selezionati`
        })}`,
    "selectedAll": `Tutti selezionati`
};


export {$087af352bd8a67a5$exports as default};
//# sourceMappingURL=it-IT.module.js.map
