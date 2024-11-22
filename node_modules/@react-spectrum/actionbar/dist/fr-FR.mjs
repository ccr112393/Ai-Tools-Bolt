var $e0c3da022513542b$exports = {};
$e0c3da022513542b$exports = {
    "actions": `Actions`,
    "actionsAvailable": `Actions disponibles.`,
    "clearSelection": `Supprimer la s\xe9lection`,
    "selected": (args, formatter)=>`${formatter.plural(args.count, {
            "=0": `Aucun \xe9l\xe9ment s\xe9lectionn\xe9`,
            one: ()=>`${formatter.number(args.count)} s\xe9lectionn\xe9`,
            other: ()=>`${formatter.number(args.count)} s\xe9lectionn\xe9s`
        })}`,
    "selectedAll": `Toute la s\xe9lection`
};


export {$e0c3da022513542b$exports as default};
//# sourceMappingURL=fr-FR.module.js.map
