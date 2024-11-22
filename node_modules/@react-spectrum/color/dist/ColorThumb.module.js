import "./vars.7be40844.css";
import $1UQoL$colorhandle_vars_cssmodulejs from "./colorhandle_vars_css.module.js";
import "./vars.a2a1e25f.css";
import $1UQoL$colorloupe_vars_cssmodulejs from "./colorloupe_vars_css.module.js";
import {classNames as $1UQoL$classNames} from "@react-spectrum/utils";
import {Overlay as $1UQoL$Overlay} from "@react-spectrum/overlays";
import $1UQoL$react, {useRef as $1UQoL$useRef, useState as $1UQoL$useState} from "react";
import {useId as $1UQoL$useId, useLayoutEffect as $1UQoL$useLayoutEffect} from "@react-aria/utils";
import {useProvider as $1UQoL$useProvider} from "@react-spectrum/provider";


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






function $3a90e89d07d7bbd5$export$a3cc47cee1c1ccc(props) {
    let { value: value, isDisabled: isDisabled, isDragging: isDragging, isFocused: isFocused, children: children, className: className = '', style: style, containerRef: containerRef, ...otherProps } = props;
    let valueCSS = value.toString('css');
    let loupeRef = (0, $1UQoL$useRef)(null);
    let provider = (0, $1UQoL$useProvider)();
    return /*#__PURE__*/ (0, $1UQoL$react).createElement("div", {
        className: (0, $1UQoL$classNames)((0, ($parcel$interopDefault($1UQoL$colorhandle_vars_cssmodulejs))), 'spectrum-ColorHandle', {
            'is-focused': isFocused,
            'is-disabled': isDisabled
        }) + ' ' + className,
        style: style,
        ...otherProps
    }, /*#__PURE__*/ (0, $1UQoL$react).createElement("div", {
        className: (0, $1UQoL$classNames)((0, ($parcel$interopDefault($1UQoL$colorhandle_vars_cssmodulejs))), 'spectrum-ColorHandle-color'),
        style: {
            backgroundColor: valueCSS
        }
    }), /*#__PURE__*/ (0, $1UQoL$react).createElement((0, $1UQoL$Overlay), {
        isOpen: isDragging && provider != null,
        nodeRef: loupeRef
    }, /*#__PURE__*/ (0, $1UQoL$react).createElement($3a90e89d07d7bbd5$var$ColorLoupe, {
        valueCSS: valueCSS,
        containerRef: containerRef,
        loupeRef: loupeRef,
        style: style
    })), children);
}
// ColorLoupe is rendered in a portal so that it breaks out of clipped/scrolling containers (e.g. popovers).
function $3a90e89d07d7bbd5$var$ColorLoupe({ isOpen: isOpen, valueCSS: valueCSS, containerRef: containerRef, loupeRef: loupeRef, style: style }) {
    let patternId = (0, $1UQoL$useId)();
    // Get the bounding rectangle of the container (e.g. ColorArea/ColorSlider).
    let [containerRect, setContainerRect] = (0, $1UQoL$useState)({
        top: 0,
        left: 0,
        width: 0,
        height: 0
    });
    (0, $1UQoL$useLayoutEffect)(()=>{
        var _containerRef_current;
        let rect = (_containerRef_current = containerRef.current) === null || _containerRef_current === void 0 ? void 0 : _containerRef_current.getBoundingClientRect();
        setContainerRect({
            top: (rect === null || rect === void 0 ? void 0 : rect.top) || 0,
            left: (rect === null || rect === void 0 ? void 0 : rect.left) || 0,
            width: (rect === null || rect === void 0 ? void 0 : rect.width) || 0,
            height: (rect === null || rect === void 0 ? void 0 : rect.height) || 0
        });
    }, [
        containerRef
    ]);
    // Compute the pixel position of the thumb.
    let thumbTop = style.top || '50%';
    if (typeof thumbTop === 'string' && thumbTop.endsWith('%')) thumbTop = parseFloat(style.top || '50%') / 100 * containerRect.height;
    let thumbLeft = style.left || '50%';
    if (typeof thumbLeft === 'string' && thumbLeft.endsWith('%')) thumbLeft = parseFloat(thumbLeft || '50%') / 100 * containerRect.width;
    return /*#__PURE__*/ (0, $1UQoL$react).createElement("svg", {
        className: (0, $1UQoL$classNames)((0, ($parcel$interopDefault($1UQoL$colorloupe_vars_cssmodulejs))), 'spectrum-ColorLoupe', {
            'is-open': isOpen
        }),
        style: {
            // Position relative to the viewport.
            position: 'fixed',
            top: containerRect.top + thumbTop,
            left: containerRect.left + thumbLeft
        },
        ref: loupeRef,
        "aria-hidden": "true"
    }, /*#__PURE__*/ (0, $1UQoL$react).createElement("pattern", {
        id: patternId,
        x: "0",
        y: "0",
        width: "16",
        height: "16",
        patternUnits: "userSpaceOnUse"
    }, /*#__PURE__*/ (0, $1UQoL$react).createElement("rect", {
        className: (0, $1UQoL$classNames)((0, ($parcel$interopDefault($1UQoL$colorloupe_vars_cssmodulejs))), 'spectrum-ColorLoupe-inner-background'),
        x: "0",
        y: "0",
        width: "16",
        height: "16"
    }), /*#__PURE__*/ (0, $1UQoL$react).createElement("rect", {
        className: (0, $1UQoL$classNames)((0, ($parcel$interopDefault($1UQoL$colorloupe_vars_cssmodulejs))), 'spectrum-ColorLoupe-inner-checker'),
        x: "0",
        y: "0",
        width: "8",
        height: "8"
    }), /*#__PURE__*/ (0, $1UQoL$react).createElement("rect", {
        className: (0, $1UQoL$classNames)((0, ($parcel$interopDefault($1UQoL$colorloupe_vars_cssmodulejs))), 'spectrum-ColorLoupe-inner-checker'),
        x: "8",
        y: "8",
        width: "8",
        height: "8"
    })), /*#__PURE__*/ (0, $1UQoL$react).createElement("path", {
        className: (0, $1UQoL$classNames)((0, ($parcel$interopDefault($1UQoL$colorloupe_vars_cssmodulejs))), 'spectrum-ColorLoupe-inner'),
        d: "M25 1a24 24 0 0124 24c0 16.255-24 40-24 40S1 41.255 1 25A24 24 0 0125 1z",
        fill: `url(#${patternId})`
    }), /*#__PURE__*/ (0, $1UQoL$react).createElement("path", {
        className: (0, $1UQoL$classNames)((0, ($parcel$interopDefault($1UQoL$colorloupe_vars_cssmodulejs))), 'spectrum-ColorLoupe-inner'),
        d: "M25 1a24 24 0 0124 24c0 16.255-24 40-24 40S1 41.255 1 25A24 24 0 0125 1z",
        fill: valueCSS
    }), /*#__PURE__*/ (0, $1UQoL$react).createElement("path", {
        className: (0, $1UQoL$classNames)((0, ($parcel$interopDefault($1UQoL$colorloupe_vars_cssmodulejs))), 'spectrum-ColorLoupe-outer'),
        d: "M25 3A21.98 21.98 0 003 25c0 6.2 4 14.794 11.568 24.853A144.233 144.233 0 0025 62.132a144.085 144.085 0 0010.4-12.239C42.99 39.816 47 31.209 47 25A21.98 21.98 0 0025 3m0-2a24 24 0 0124 24c0 16.255-24 40-24 40S1 41.255 1 25A24 24 0 0125 1z"
    }));
}


export {$3a90e89d07d7bbd5$export$a3cc47cee1c1ccc as ColorThumb};
//# sourceMappingURL=ColorThumb.module.js.map
