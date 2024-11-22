var $3cfd427955fee95c$exports = {};
$3cfd427955fee95c$exports = {
    "actions": `Acties`,
    "actionsAvailable": `Acties beschikbaar.`,
    "clearSelection": `Selectie wissen`,
    "selected": (args, formatter)=>`${formatter.plural(args.count, {
            "=0": `Niets geselecteerd`,
            other: ()=>`${formatter.number(args.count)} geselecteerd`
        })}`,
    "selectedAll": `Alles geselecteerd`
};


export {$3cfd427955fee95c$exports as default};
//# sourceMappingURL=nl-NL.module.js.map
