import {DialogContext as $97b119e05830ea0d$export$8b93a07348a7730c} from "./context.module.js";
import {Modal as $2W2Rs$Modal} from "@react-spectrum/overlays";
import $2W2Rs$react, {useState as $2W2Rs$useState} from "react";
import {useOverlayTriggerState as $2W2Rs$useOverlayTriggerState} from "@react-stately/overlays";

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



function $2a9f0ad39ddaa8d9$export$547754aada6e339f(props) {
    let { children: children, type: type = 'modal', onDismiss: onDismiss, isDismissable: isDismissable, isKeyboardDismissDisabled: isKeyboardDismissDisabled } = props;
    let childArray = (0, $2W2Rs$react).Children.toArray(children);
    if (childArray.length > 1) throw new Error('Only a single child can be passed to DialogContainer.');
    let [lastChild, setLastChild] = (0, $2W2Rs$useState)(null);
    // React.Children.toArray mutates the children, and we need them to be stable
    // between renders so that the lastChild comparison works.
    let child = undefined;
    if (Array.isArray(children)) child = children.find((0, $2W2Rs$react).isValidElement);
    else if (/*#__PURE__*/ (0, $2W2Rs$react).isValidElement(children)) child = children;
    if (child && child !== lastChild) setLastChild(child);
    let context = {
        type: type,
        onClose: onDismiss,
        isDismissable: isDismissable
    };
    let state = (0, $2W2Rs$useOverlayTriggerState)({
        isOpen: !!child,
        onOpenChange: (isOpen)=>{
            if (!isOpen) onDismiss();
        }
    });
    return /*#__PURE__*/ (0, $2W2Rs$react).createElement((0, $2W2Rs$Modal), {
        state: state,
        type: type,
        isDismissable: isDismissable,
        isKeyboardDismissDisabled: isKeyboardDismissDisabled
    }, /*#__PURE__*/ (0, $2W2Rs$react).createElement((0, $97b119e05830ea0d$export$8b93a07348a7730c).Provider, {
        value: context
    }, lastChild));
}


export {$2a9f0ad39ddaa8d9$export$547754aada6e339f as DialogContainer};
//# sourceMappingURL=DialogContainer.module.js.map
