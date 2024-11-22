var $cbe41ff823ebe108$exports = {};
$cbe41ff823ebe108$exports = {
    "actions": `\xc5tg\xe4rder`,
    "actionsAvailable": `\xc5tg\xe4rder finns.`,
    "clearSelection": `Rensa markering`,
    "selected": (args, formatter)=>`${formatter.plural(args.count, {
            "=0": `Inga valda`,
            one: ()=>`${formatter.number(args.count)} vald`,
            other: ()=>`${formatter.number(args.count)} valda`
        })}`,
    "selectedAll": `Alla markerade`
};


export {$cbe41ff823ebe108$exports as default};
//# sourceMappingURL=sv-SE.module.js.map
