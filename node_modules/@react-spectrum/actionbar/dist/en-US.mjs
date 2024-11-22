var $117deeeb64547dc7$exports = {};
$117deeeb64547dc7$exports = {
    "clearSelection": `Clear selection`,
    "selected": (args, formatter)=>`${formatter.plural(args.count, {
            "=0": `None selected`,
            other: ()=>`${formatter.number(args.count)} selected`
        })}`,
    "selectedAll": `All selected`,
    "actions": `Actions`,
    "actionsAvailable": `Actions available.`
};


export {$117deeeb64547dc7$exports as default};
//# sourceMappingURL=en-US.module.js.map
