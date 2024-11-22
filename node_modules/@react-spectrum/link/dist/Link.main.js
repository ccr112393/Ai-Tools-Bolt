require("./vars.04bcd764.css");
var $094ce2289235a9fa$exports = require("./link_vars_css.main.js");
var $jQffG$reactspectrumutils = require("@react-spectrum/utils");
var $jQffG$reactariafocus = require("@react-aria/focus");
var $jQffG$reactariautils = require("@react-aria/utils");
var $jQffG$react = require("react");
var $jQffG$reactariainteractions = require("@react-aria/interactions");
var $jQffG$reactarialink = require("@react-aria/link");
var $jQffG$reactspectrumprovider = require("@react-spectrum/provider");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "Link", () => $1148fb7fc40f1ce2$export$a6c7ac8248d6e38a);
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







let $1148fb7fc40f1ce2$var$isOldReact = parseInt((0, ($parcel$interopDefault($jQffG$react))).version, 10) <= 18;
function $1148fb7fc40f1ce2$export$a6c7ac8248d6e38a(props) {
    props = (0, $jQffG$reactspectrumprovider.useProviderProps)(props);
    props = (0, $jQffG$reactspectrumutils.useSlotProps)(props, 'link');
    let { variant: variant = 'primary', isQuiet: isQuiet, children: children, href: // @ts-ignore
    href } = props;
    let { styleProps: styleProps } = (0, $jQffG$reactspectrumutils.useStyleProps)(props);
    let { hoverProps: hoverProps, isHovered: isHovered } = (0, $jQffG$reactariainteractions.useHover)({});
    let ref = (0, $jQffG$react.useRef)(null);
    let { linkProps: linkProps } = (0, $jQffG$reactarialink.useLink)({
        ...props,
        elementType: !href && typeof children === 'string' ? 'span' : 'a'
    }, ref);
    let domProps = {
        ...styleProps,
        ...(0, $jQffG$reactariautils.mergeProps)(linkProps, hoverProps),
        ref: ref,
        className: (0, $jQffG$reactspectrumutils.classNames)((0, ($parcel$interopDefault($094ce2289235a9fa$exports))), 'spectrum-Link', {
            'spectrum-Link--quiet': isQuiet,
            [`spectrum-Link--${variant}`]: variant,
            'is-hovered': isHovered
        }, styleProps.className)
    };
    let link;
    if (href) link = /*#__PURE__*/ (0, ($parcel$interopDefault($jQffG$react))).createElement("a", domProps, children);
    else {
        // Backward compatibility.
        let wrappedChild = (0, $jQffG$reactspectrumutils.getWrappedElement)(children);
        let mergedRef = ref;
        if ($1148fb7fc40f1ce2$var$isOldReact) // @ts-ignore
        mergedRef = (0, $jQffG$reactariautils.mergeRefs)(ref, wrappedChild.ref);
        else // @ts-ignore
        mergedRef = (0, $jQffG$reactariautils.mergeRefs)(ref, wrappedChild.props.ref);
        link = /*#__PURE__*/ (0, ($parcel$interopDefault($jQffG$react))).cloneElement(wrappedChild, {
            ...(0, $jQffG$reactariautils.mergeProps)(wrappedChild.props, domProps),
            // @ts-ignore https://github.com/facebook/react/issues/8873
            ref: mergedRef
        });
    }
    return /*#__PURE__*/ (0, ($parcel$interopDefault($jQffG$react))).createElement((0, $jQffG$reactariafocus.FocusRing), {
        focusRingClass: (0, $jQffG$reactspectrumutils.classNames)((0, ($parcel$interopDefault($094ce2289235a9fa$exports))), 'focus-ring')
    }, link);
}


//# sourceMappingURL=Link.main.js.map
