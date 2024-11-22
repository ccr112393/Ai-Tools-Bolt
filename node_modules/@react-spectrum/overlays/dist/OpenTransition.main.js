var $3kGU5$react = require("react");
var $3kGU5$reacttransitiongroup = require("react-transition-group");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "OpenTransition", () => $13f51cdc44d228b9$export$b847a40ee92eff38);
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 

const $13f51cdc44d228b9$var$OPEN_STATES = {
    entering: false,
    entered: true
};
function $13f51cdc44d228b9$export$b847a40ee92eff38(props) {
    var child;
    return /*#__PURE__*/ (0, ($parcel$interopDefault($3kGU5$react))).createElement((0, $3kGU5$reacttransitiongroup.Transition), {
        timeout: {
            enter: 0,
            exit: 350
        },
        ...props
    }, (state)=>(0, ($parcel$interopDefault($3kGU5$react))).Children.map(props.children, (child)=>child && /*#__PURE__*/ (0, ($parcel$interopDefault($3kGU5$react))).cloneElement(child, {
                isOpen: !!$13f51cdc44d228b9$var$OPEN_STATES[state]
            })));
}


//# sourceMappingURL=OpenTransition.main.js.map
