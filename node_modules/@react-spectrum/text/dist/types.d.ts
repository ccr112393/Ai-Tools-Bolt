import React from "react";
import { TextProps, HeadingProps, KeyboardProps } from "@react-types/text";
import { DOMRefValue } from "@react-types/shared";
/**
 * Text represents text with no specific semantic meaning.
 */
export const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<DOMRefValue<HTMLElement>>>;
/**
 * Heading is used to create various levels of typographic hierarchies.
 */
export const Heading: React.ForwardRefExoticComponent<HeadingProps & React.RefAttributes<DOMRefValue<HTMLHeadingElement>>>;
/**
 * Keyboard represents text that specifies a keyboard command.
 */
export const Keyboard: React.ForwardRefExoticComponent<KeyboardProps & React.RefAttributes<DOMRefValue<HTMLElement>>>;
export type { HeadingProps, KeyboardProps, TextProps } from '@react-types/text';

//# sourceMappingURL=types.d.ts.map
