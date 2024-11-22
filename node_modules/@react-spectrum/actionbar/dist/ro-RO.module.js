var $d0ef0a1cef9c2d6c$exports = {};
$d0ef0a1cef9c2d6c$exports = {
    "actions": `Ac\u{21B}iuni`,
    "actionsAvailable": `Ac\u{21B}iuni disponibile.`,
    "clearSelection": `Goli\u{21B}i selec\u{21B}ia`,
    "selected": (args, formatter)=>`${formatter.plural(args.count, {
            "=0": `Niciunul selectat`,
            one: ()=>` ${formatter.number(args.count)} selectat`,
            other: ()=>`${formatter.number(args.count)} selectate`
        })}`,
    "selectedAll": `Toate selectate`
};


export {$d0ef0a1cef9c2d6c$exports as default};
//# sourceMappingURL=ro-RO.module.js.map
