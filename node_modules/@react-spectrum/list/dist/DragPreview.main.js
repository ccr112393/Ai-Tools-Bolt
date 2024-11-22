require("./styles.ad343ab0.css");
var $279507a6f189e509$exports = require("./styles_css.main.js");
var $U0AUi$reactspectrumutils = require("@react-spectrum/utils");
var $U0AUi$reactspectrumlayout = require("@react-spectrum/layout");
var $U0AUi$react = require("react");
var $U0AUi$reactspectrumtext = require("@react-spectrum/text");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "DragPreview", () => $3d665b19f7865ff9$export$905ab40ac2179daa);
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




function $3d665b19f7865ff9$export$905ab40ac2179daa(props) {
    let { item: item, itemCount: itemCount, itemHeight: itemHeight, density: density } = props;
    let isDraggingMultiple = itemCount > 1;
    return /*#__PURE__*/ (0, ($parcel$interopDefault($U0AUi$react))).createElement("div", {
        style: {
            height: itemHeight
        },
        className: (0, $U0AUi$reactspectrumutils.classNames)((0, ($parcel$interopDefault($279507a6f189e509$exports))), 'react-spectrum-ListViewItem', 'react-spectrum-ListViewItem-dragPreview', {
            'react-spectrum-ListViewItem-dragPreview--multiple': isDraggingMultiple
        }, `react-spectrum-ListViewItem-dragPreview--${density}`)
    }, /*#__PURE__*/ (0, ($parcel$interopDefault($U0AUi$react))).createElement((0, $U0AUi$reactspectrumlayout.Grid), {
        UNSAFE_className: (0, ($parcel$interopDefault($279507a6f189e509$exports)))['react-spectrum-ListViewItem-grid']
    }, /*#__PURE__*/ (0, ($parcel$interopDefault($U0AUi$react))).createElement((0, $U0AUi$reactspectrumutils.SlotProvider), {
        slots: {
            text: {
                UNSAFE_className: (0, ($parcel$interopDefault($279507a6f189e509$exports)))['react-spectrum-ListViewItem-content']
            },
            description: {
                UNSAFE_className: (0, ($parcel$interopDefault($279507a6f189e509$exports)))['react-spectrum-ListViewItem-description']
            },
            illustration: {
                UNSAFE_className: (0, ($parcel$interopDefault($279507a6f189e509$exports)))['react-spectrum-ListViewItem-thumbnail']
            },
            image: {
                UNSAFE_className: (0, ($parcel$interopDefault($279507a6f189e509$exports)))['react-spectrum-ListViewItem-thumbnail']
            },
            actionButton: {
                UNSAFE_className: (0, ($parcel$interopDefault($279507a6f189e509$exports)))['react-spectrum-ListViewItem-actions'],
                isQuiet: true
            },
            actionGroup: {
                UNSAFE_className: (0, ($parcel$interopDefault($279507a6f189e509$exports)))['react-spectrum-ListViewItem-actions'],
                isQuiet: true,
                density: 'compact'
            },
            actionMenu: {
                UNSAFE_className: (0, ($parcel$interopDefault($279507a6f189e509$exports)))['react-spectrum-ListViewItem-actionmenu'],
                isQuiet: true
            }
        }
    }, typeof item.rendered === 'string' ? /*#__PURE__*/ (0, ($parcel$interopDefault($U0AUi$react))).createElement((0, $U0AUi$reactspectrumtext.Text), null, item.rendered) : item.rendered, isDraggingMultiple && /*#__PURE__*/ (0, ($parcel$interopDefault($U0AUi$react))).createElement("div", {
        className: (0, $U0AUi$reactspectrumutils.classNames)((0, ($parcel$interopDefault($279507a6f189e509$exports))), 'react-spectrum-ListViewItem-badge')
    }, itemCount))));
}


//# sourceMappingURL=DragPreview.main.js.map
