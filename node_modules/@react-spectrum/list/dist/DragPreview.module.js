import "./styles.ad343ab0.css";
import $vFUHn$styles_cssmodulejs from "./styles_css.module.js";
import {classNames as $vFUHn$classNames, SlotProvider as $vFUHn$SlotProvider} from "@react-spectrum/utils";
import {Grid as $vFUHn$Grid} from "@react-spectrum/layout";
import $vFUHn$react from "react";
import {Text as $vFUHn$Text} from "@react-spectrum/text";


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 




function $cd61e55c47e3c0f5$export$905ab40ac2179daa(props) {
    let { item: item, itemCount: itemCount, itemHeight: itemHeight, density: density } = props;
    let isDraggingMultiple = itemCount > 1;
    return /*#__PURE__*/ (0, $vFUHn$react).createElement("div", {
        style: {
            height: itemHeight
        },
        className: (0, $vFUHn$classNames)((0, ($parcel$interopDefault($vFUHn$styles_cssmodulejs))), 'react-spectrum-ListViewItem', 'react-spectrum-ListViewItem-dragPreview', {
            'react-spectrum-ListViewItem-dragPreview--multiple': isDraggingMultiple
        }, `react-spectrum-ListViewItem-dragPreview--${density}`)
    }, /*#__PURE__*/ (0, $vFUHn$react).createElement((0, $vFUHn$Grid), {
        UNSAFE_className: (0, ($parcel$interopDefault($vFUHn$styles_cssmodulejs)))['react-spectrum-ListViewItem-grid']
    }, /*#__PURE__*/ (0, $vFUHn$react).createElement((0, $vFUHn$SlotProvider), {
        slots: {
            text: {
                UNSAFE_className: (0, ($parcel$interopDefault($vFUHn$styles_cssmodulejs)))['react-spectrum-ListViewItem-content']
            },
            description: {
                UNSAFE_className: (0, ($parcel$interopDefault($vFUHn$styles_cssmodulejs)))['react-spectrum-ListViewItem-description']
            },
            illustration: {
                UNSAFE_className: (0, ($parcel$interopDefault($vFUHn$styles_cssmodulejs)))['react-spectrum-ListViewItem-thumbnail']
            },
            image: {
                UNSAFE_className: (0, ($parcel$interopDefault($vFUHn$styles_cssmodulejs)))['react-spectrum-ListViewItem-thumbnail']
            },
            actionButton: {
                UNSAFE_className: (0, ($parcel$interopDefault($vFUHn$styles_cssmodulejs)))['react-spectrum-ListViewItem-actions'],
                isQuiet: true
            },
            actionGroup: {
                UNSAFE_className: (0, ($parcel$interopDefault($vFUHn$styles_cssmodulejs)))['react-spectrum-ListViewItem-actions'],
                isQuiet: true,
                density: 'compact'
            },
            actionMenu: {
                UNSAFE_className: (0, ($parcel$interopDefault($vFUHn$styles_cssmodulejs)))['react-spectrum-ListViewItem-actionmenu'],
                isQuiet: true
            }
        }
    }, typeof item.rendered === 'string' ? /*#__PURE__*/ (0, $vFUHn$react).createElement((0, $vFUHn$Text), null, item.rendered) : item.rendered, isDraggingMultiple && /*#__PURE__*/ (0, $vFUHn$react).createElement("div", {
        className: (0, $vFUHn$classNames)((0, ($parcel$interopDefault($vFUHn$styles_cssmodulejs))), 'react-spectrum-ListViewItem-badge')
    }, itemCount))));
}


export {$cd61e55c47e3c0f5$export$905ab40ac2179daa as DragPreview};
//# sourceMappingURL=DragPreview.module.js.map
