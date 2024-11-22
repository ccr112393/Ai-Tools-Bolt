var $4b15e180aed5c52d$exports = {};
$4b15e180aed5c52d$exports = {
    "actions": `A\xe7\xf5es`,
    "actionsAvailable": `A\xe7\xf5es dispon\xedveis.`,
    "clearSelection": `Limpar sele\xe7\xe3o`,
    "selected": (args, formatter)=>`${formatter.plural(args.count, {
            "=0": `Nenhum selecionado`,
            one: ()=>`${formatter.number(args.count)} selecionado`,
            other: ()=>`${formatter.number(args.count)} selecionados`
        })}`,
    "selectedAll": `Tudo selecionado`
};


export {$4b15e180aed5c52d$exports as default};
//# sourceMappingURL=pt-PT.module.js.map
