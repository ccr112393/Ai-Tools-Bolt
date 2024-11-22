var $0eb909ad2388d989$exports = require("./context.main.js");
var $9DI8Y$react = require("react");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "useDialogContainer", () => $1f05ce3abe26c4cc$export$a2f2d8fa6720dab1);
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

function $1f05ce3abe26c4cc$export$a2f2d8fa6720dab1() {
    let context = (0, $9DI8Y$react.useContext)((0, $0eb909ad2388d989$exports.DialogContext));
    if (!context) throw new Error('Cannot call useDialogContext outside a <DialogTrigger> or <DialogContainer>.');
    return {
        type: context.type,
        dismiss () {
            context === null || context === void 0 ? void 0 : context.onClose();
        }
    };
}


//# sourceMappingURL=useDialogContainer.main.js.map
