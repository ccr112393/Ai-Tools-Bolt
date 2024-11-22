var $7a405d1dfc563131$exports = {};
$7a405d1dfc563131$exports = {
    "actions": `Toiminnot`,
    "actionsAvailable": `Toiminnot k\xe4ytett\xe4viss\xe4.`,
    "clearSelection": `Poista valinta`,
    "selected": (args, formatter)=>`${formatter.plural(args.count, {
            "=0": `Ei mit\xe4\xe4n valittu`,
            other: ()=>`${formatter.number(args.count)} valittu`
        })}`,
    "selectedAll": `Kaikki valittu`
};


export {$7a405d1dfc563131$exports as default};
//# sourceMappingURL=fi-FI.module.js.map
