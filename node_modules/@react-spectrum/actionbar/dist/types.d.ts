import { DOMRef, DOMRefValue } from "@react-types/shared";
import React, { ReactElement } from "react";
import { SpectrumActionBarProps, SpectrumActionBarContainerProps } from "@react-types/actionbar";
/**
 * Action bars are used for single and bulk selection patterns when a user needs to perform actions on one or more items at the same time.
 */
export const ActionBar: <T>(props: SpectrumActionBarProps<T> & {
    ref?: DOMRef<HTMLDivElement>;
}) => ReactElement;
/**
 * ActionBarContainer wraps around an ActionBar and a component that supports selection. It handles
 * the ActionBar's position with respect to its linked component.
 */
export const ActionBarContainer: React.ForwardRefExoticComponent<SpectrumActionBarContainerProps & React.RefAttributes<DOMRefValue<HTMLDivElement>>>;
export { Item } from '@react-stately/collections';
export type { SpectrumActionBarContainerProps } from '@react-types/actionbar';
export type { SpectrumActionBarProps } from '@react-types/actionbar';

//# sourceMappingURL=types.d.ts.map
