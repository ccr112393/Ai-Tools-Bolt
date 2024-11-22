var $44fd3a75baaf9937$exports = {};
$44fd3a75baaf9937$exports = {
    "actions": `Handlinger`,
    "actionsAvailable": `Tilg\xe6ngelige handlinger.`,
    "clearSelection": `Ryd markering`,
    "selected": (args, formatter)=>`${formatter.plural(args.count, {
            "=0": `Ingen valgt`,
            other: ()=>`${formatter.number(args.count)} valgt`
        })}`,
    "selectedAll": `Alle valgt`
};


export {$44fd3a75baaf9937$exports as default};
//# sourceMappingURL=da-DK.module.js.map
