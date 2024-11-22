require("./vars.18db025d.css");
var $42908e91b4c5f428$exports = require("./underlay_vars_css.main.js");
var $hjXq7$reactspectrumutils = require("@react-spectrum/utils");
var $hjXq7$react = require("react");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "Underlay", () => $b900e75089bdd9cd$export$f360afc887607b02);
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


function $b900e75089bdd9cd$export$f360afc887607b02({ isOpen: isOpen, isTransparent: isTransparent, ...otherProps }) {
    return /*#__PURE__*/ (0, ($parcel$interopDefault($hjXq7$react))).createElement("div", {
        "data-testid": "underlay",
        ...otherProps,
        className: (0, $hjXq7$reactspectrumutils.classNames)((0, ($parcel$interopDefault($42908e91b4c5f428$exports))), 'spectrum-Underlay', {
            'is-open': isOpen,
            'spectrum-Underlay--transparent': isTransparent
        })
    });
}


//# sourceMappingURL=Underlay.main.js.map
