import { ColorVersion, DOMRef, DOMRefValue } from "@react-types/shared";
import React, { ReactElement } from "react";
import { ViewProps, ContentProps, FooterProps, HeaderProps } from "@react-types/view";
/**
 * View is a general purpose container with no specific semantics that can be used for custom styling purposes.
 * It supports Spectrum style props to ensure consistency with other Spectrum components.
 */
export const View: <C extends ColorVersion = 5>(props: ViewProps<C> & {
    ref?: DOMRef;
}) => ReactElement;
/**
 * Content represents the primary content within a Spectrum container.
 */
export const Content: React.ForwardRefExoticComponent<ContentProps & React.RefAttributes<DOMRefValue<HTMLElement>>>;
/**
 * Footer represents a footer within a Spectrum container.
 */
export const Footer: React.ForwardRefExoticComponent<FooterProps & React.RefAttributes<DOMRefValue<HTMLElement>>>;
/**
 * Header represents a header within a Spectrum container.
 */
export const Header: React.ForwardRefExoticComponent<HeaderProps & React.RefAttributes<DOMRefValue<HTMLElement>>>;
export type { ContentProps, FooterProps, HeaderProps, ViewProps } from '@react-types/view';

//# sourceMappingURL=types.d.ts.map
