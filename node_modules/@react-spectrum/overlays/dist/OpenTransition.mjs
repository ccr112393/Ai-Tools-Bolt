import $8XmPE$react from "react";
import {Transition as $8XmPE$Transition} from "react-transition-group";

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

const $bc765a7a041310da$var$OPEN_STATES = {
    entering: false,
    entered: true
};
function $bc765a7a041310da$export$b847a40ee92eff38(props) {
    var child;
    return /*#__PURE__*/ (0, $8XmPE$react).createElement((0, $8XmPE$Transition), {
        timeout: {
            enter: 0,
            exit: 350
        },
        ...props
    }, (state)=>(0, $8XmPE$react).Children.map(props.children, (child)=>child && /*#__PURE__*/ (0, $8XmPE$react).cloneElement(child, {
                isOpen: !!$bc765a7a041310da$var$OPEN_STATES[state]
            })));
}


export {$bc765a7a041310da$export$b847a40ee92eff38 as OpenTransition};
//# sourceMappingURL=OpenTransition.module.js.map
