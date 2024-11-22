import { DraggableCollectionOptions, DraggableItemProps, DraggableItemResult, DragPreview, DropIndicatorAria, DropIndicatorProps, DroppableCollectionOptions, DroppableCollectionResult, DroppableItemOptions, DroppableItemResult } from "@react-aria/dnd";
import { DraggableCollectionProps, DragItem, DroppableCollectionProps, Key, RefObject } from "@react-types/shared";
import { DraggableCollectionState, DraggableCollectionStateOptions, DroppableCollectionState, DroppableCollectionStateOptions } from "@react-stately/dnd";
import { JSX } from "react";
interface DraggableCollectionStateOpts extends Omit<DraggableCollectionStateOptions, 'getItems'> {
}
interface DragHooks {
    useDraggableCollectionState?: (props: DraggableCollectionStateOpts) => DraggableCollectionState;
    useDraggableCollection?: (props: DraggableCollectionOptions, state: DraggableCollectionState, ref: RefObject<HTMLElement | null>) => void;
    useDraggableItem?: (props: DraggableItemProps, state: DraggableCollectionState) => DraggableItemResult;
    DragPreview?: typeof DragPreview;
}
interface DropHooks {
    useDroppableCollectionState?: (props: DroppableCollectionStateOptions) => DroppableCollectionState;
    useDroppableCollection?: (props: DroppableCollectionOptions, state: DroppableCollectionState, ref: RefObject<HTMLElement | null>) => DroppableCollectionResult;
    useDroppableItem?: (options: DroppableItemOptions, state: DroppableCollectionState, ref: RefObject<HTMLElement | null>) => DroppableItemResult;
    useDropIndicator?: (props: DropIndicatorProps, state: DroppableCollectionState, ref: RefObject<HTMLElement | null>) => DropIndicatorAria;
}
export interface DragAndDropHooks {
    /** Drag and drop hooks for the collection element.  */
    dragAndDropHooks: DragHooks & DropHooks & {
        isVirtualDragging?: () => boolean;
        renderPreview?: (keys: Set<Key>, draggedKey: Key) => JSX.Element;
    };
}
export interface DragAndDropOptions extends Omit<DraggableCollectionProps, 'preview' | 'getItems'>, DroppableCollectionProps {
    /**
     * A function that returns the items being dragged. If not specified, we assume that the collection is not draggable.
     * @default () => []
     */
    getItems?: (keys: Set<Key>) => DragItem[];
    /** Provide a custom drag preview. `draggedKey` represents the key of the item the user actually dragged. */
    renderPreview?: (keys: Set<Key>, draggedKey: Key) => JSX.Element;
}
/**
 * Provides the hooks required to enable drag and drop behavior for a drag and drop compatible React Spectrum component.
 */
export function useDragAndDrop(options: DragAndDropOptions): DragAndDropHooks;
export { DIRECTORY_DRAG_TYPE } from '@react-aria/dnd';
export type { DirectoryDropItem, DraggableCollectionEndEvent, DraggableCollectionMoveEvent, DraggableCollectionStartEvent, DragPreviewRenderer, DragTypes, DropItem, DropOperation, DroppableCollectionDropEvent, DroppableCollectionEnterEvent, DroppableCollectionExitEvent, DroppableCollectionInsertDropEvent, DroppableCollectionMoveEvent, DroppableCollectionOnItemDropEvent, DroppableCollectionReorderEvent, DroppableCollectionRootDropEvent, DropPosition, DropTarget, FileDropItem, ItemDropTarget, RootDropTarget, TextDropItem } from '@react-types/shared';

//# sourceMappingURL=types.d.ts.map
