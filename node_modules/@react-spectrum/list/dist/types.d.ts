import { AriaGridListProps } from "@react-aria/gridlist";
import { AsyncLoadable, DOMRef, Key, LoadingState, SpectrumSelectionProps, StyleProps } from "@react-types/shared";
import { DragAndDropHooks } from "@react-spectrum/dnd";
import { JSX, ReactElement } from "react";
export interface SpectrumListViewProps<T> extends Omit<AriaGridListProps<T>, 'keyboardNavigationBehavior'>, StyleProps, SpectrumSelectionProps, Omit<AsyncLoadable, 'isLoading'> {
    /**
     * Sets the amount of vertical padding within each cell.
     * @default 'regular'
     */
    density?: 'compact' | 'regular' | 'spacious';
    /** Whether the ListView should be displayed with a quiet style. */
    isQuiet?: boolean;
    /** The current loading state of the ListView. Determines whether or not the progress circle should be shown. */
    loadingState?: LoadingState;
    /**
     * Sets the text behavior for the row contents.
     * @default 'truncate'
     */
    overflowMode?: 'truncate' | 'wrap';
    /** Sets what the ListView should render when there is no content to display. */
    renderEmptyState?: () => JSX.Element;
    /**
     * Handler that is called when a user performs an action on an item. The exact user event depends on
     * the collection's `selectionStyle` prop and the interaction modality.
     */
    onAction?: (key: Key) => void;
    /**
     * The drag and drop hooks returned by `useDragAndDrop` used to enable drag and drop behavior for the ListView.
     */
    dragAndDropHooks?: DragAndDropHooks['dragAndDropHooks'];
}
/**
 * A ListView displays a list of interactive items, and allows a user to navigate, select, or perform an action.
 */
export const ListView: <T>(props: SpectrumListViewProps<T> & {
    ref?: DOMRef<HTMLDivElement>;
}) => ReactElement;
export { Item } from '@react-stately/collections';

//# sourceMappingURL=types.d.ts.map
