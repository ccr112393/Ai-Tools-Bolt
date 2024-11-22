import React from "react";
import { SpectrumRadioProps, SpectrumRadioGroupProps } from "@react-types/radio";
import { FocusableRefValue, DOMRefValue } from "@react-types/shared";
/**
 * Radio buttons allow users to select a single option from a list of mutually exclusive options.
 * All possible options are exposed up front for users to compare.
 */
export const Radio: React.ForwardRefExoticComponent<SpectrumRadioProps & React.RefAttributes<FocusableRefValue<HTMLLabelElement, HTMLLabelElement>>>;
/**
 * Radio groups allow users to select a single option from a list of mutually exclusive options.
 * All possible options are exposed up front for users to compare.
 */
export const RadioGroup: React.ForwardRefExoticComponent<SpectrumRadioGroupProps & React.RefAttributes<DOMRefValue<HTMLElement>>>;
export type { SpectrumRadioProps } from '@react-types/radio';
export type { SpectrumRadioGroupProps } from '@react-types/radio';

//# sourceMappingURL=types.d.ts.map
