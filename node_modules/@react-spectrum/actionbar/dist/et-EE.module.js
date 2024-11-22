var $5530e5c9f2623025$exports = {};
$5530e5c9f2623025$exports = {
    "actions": `Toimingud`,
    "actionsAvailable": `Toimingud saadaval.`,
    "clearSelection": `Puhasta valik`,
    "selected": (args, formatter)=>`${formatter.plural(args.count, {
            "=0": `Pole valitud`,
            other: ()=>`${formatter.number(args.count)} valitud`
        })}`,
    "selectedAll": `K\xf5ik valitud`
};


export {$5530e5c9f2623025$exports as default};
//# sourceMappingURL=et-EE.module.js.map
