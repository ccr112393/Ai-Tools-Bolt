import React from "react";
import { SpectrumSliderProps, SpectrumRangeSliderProps } from "@react-types/slider";
import { FocusableRefValue } from "@react-types/shared";
/**
 * Sliders allow users to quickly select a value within a range. They should be used when the upper and lower bounds to the range are invariable.
 */
export const Slider: React.ForwardRefExoticComponent<SpectrumSliderProps & React.RefAttributes<FocusableRefValue<HTMLDivElement, HTMLDivElement>>>;
/**
 * RangeSliders allow users to quickly select a subset range. They should be used when the upper and lower bounds to the range are invariable.
 */
export const RangeSlider: React.ForwardRefExoticComponent<SpectrumRangeSliderProps & React.RefAttributes<FocusableRefValue<HTMLDivElement, HTMLDivElement>>>;
export type { SpectrumRangeSliderProps, SpectrumSliderProps } from '@react-types/slider';

//# sourceMappingURL=types.d.ts.map
