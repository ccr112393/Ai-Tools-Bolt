import "./vars.04bcd764.css";
import $35Vau$link_vars_cssmodulejs from "./link_vars_css.mjs";
import {useSlotProps as $35Vau$useSlotProps, useStyleProps as $35Vau$useStyleProps, classNames as $35Vau$classNames, getWrappedElement as $35Vau$getWrappedElement} from "@react-spectrum/utils";
import {FocusRing as $35Vau$FocusRing} from "@react-aria/focus";
import {mergeProps as $35Vau$mergeProps, mergeRefs as $35Vau$mergeRefs} from "@react-aria/utils";
import $35Vau$react, {useRef as $35Vau$useRef} from "react";
import {useHover as $35Vau$useHover} from "@react-aria/interactions";
import {useLink as $35Vau$useLink} from "@react-aria/link";
import {useProviderProps as $35Vau$useProviderProps} from "@react-spectrum/provider";


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
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







let $3c5235ac12f2c9bb$var$isOldReact = parseInt((0, $35Vau$react).version, 10) <= 18;
function $3c5235ac12f2c9bb$export$a6c7ac8248d6e38a(props) {
    props = (0, $35Vau$useProviderProps)(props);
    props = (0, $35Vau$useSlotProps)(props, 'link');
    let { variant: variant = 'primary', isQuiet: isQuiet, children: children, href: // @ts-ignore
    href } = props;
    let { styleProps: styleProps } = (0, $35Vau$useStyleProps)(props);
    let { hoverProps: hoverProps, isHovered: isHovered } = (0, $35Vau$useHover)({});
    let ref = (0, $35Vau$useRef)(null);
    let { linkProps: linkProps } = (0, $35Vau$useLink)({
        ...props,
        elementType: !href && typeof children === 'string' ? 'span' : 'a'
    }, ref);
    let domProps = {
        ...styleProps,
        ...(0, $35Vau$mergeProps)(linkProps, hoverProps),
        ref: ref,
        className: (0, $35Vau$classNames)((0, ($parcel$interopDefault($35Vau$link_vars_cssmodulejs))), 'spectrum-Link', {
            'spectrum-Link--quiet': isQuiet,
            [`spectrum-Link--${variant}`]: variant,
            'is-hovered': isHovered
        }, styleProps.className)
    };
    let link;
    if (href) link = /*#__PURE__*/ (0, $35Vau$react).createElement("a", domProps, children);
    else {
        // Backward compatibility.
        let wrappedChild = (0, $35Vau$getWrappedElement)(children);
        let mergedRef = ref;
        if ($3c5235ac12f2c9bb$var$isOldReact) // @ts-ignore
        mergedRef = (0, $35Vau$mergeRefs)(ref, wrappedChild.ref);
        else // @ts-ignore
        mergedRef = (0, $35Vau$mergeRefs)(ref, wrappedChild.props.ref);
        link = /*#__PURE__*/ (0, $35Vau$react).cloneElement(wrappedChild, {
            ...(0, $35Vau$mergeProps)(wrappedChild.props, domProps),
            // @ts-ignore https://github.com/facebook/react/issues/8873
            ref: mergedRef
        });
    }
    return /*#__PURE__*/ (0, $35Vau$react).createElement((0, $35Vau$FocusRing), {
        focusRingClass: (0, $35Vau$classNames)((0, ($parcel$interopDefault($35Vau$link_vars_cssmodulejs))), 'focus-ring')
    }, link);
}


export {$3c5235ac12f2c9bb$export$a6c7ac8248d6e38a as Link};
//# sourceMappingURL=Link.module.js.map
