var $5b8605d86a9af2ee$exports = {};
$5b8605d86a9af2ee$exports = {
    "actions": `Acciones`,
    "actionsAvailable": `Acciones disponibles.`,
    "clearSelection": `Borrar selecci\xf3n`,
    "selected": (args, formatter)=>`${formatter.plural(args.count, {
            "=0": `Nada seleccionado`,
            one: ()=>`${formatter.number(args.count)} seleccionado`,
            other: ()=>`${formatter.number(args.count)} seleccionados`
        })}`,
    "selectedAll": `Todo seleccionado`
};


export {$5b8605d86a9af2ee$exports as default};
//# sourceMappingURL=es-ES.module.js.map
