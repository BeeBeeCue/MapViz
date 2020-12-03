import * as THREE from "three";
/**
 * JavaScript events for custom objects. Stores all listeners to allow removing all listeners for
 * housekeeping.
 *
 * Will be replaced by `THREE.EventDispatcher` once https://github.com/mrdoob/three.js/pull/19844
 * is released.
 */
export declare class EventDispatcher {
    private readonly m_listeners;
    /**
     * Destroy this `EventDispatcher` instance.
     *
     * Unregister all event handlers used. This is method should be called when you stop
     * using `EventDispatcher`.
     */
    dispose(): void;
    /**
     * Checks if listener is added to an event type.
     *
     * @param type - The type of event to listen to.
     * @param listener - The function that gets called when the event is fired.
     */
    hasEventListener(type: string, listener?: (event: THREE.Event) => void): boolean;
    /**
     * Add a new event listener to the event type.
     *
     * @param type - The type of event to listen to.
     * @param listener - The function that gets called when the event is fired.
     */
    addEventListener(type: string, listener: (event: THREE.Event) => void): void;
    /**
     * Remove the listener from the event type.
     *
     * @param type - The type of event to listen to.
     * @param listener - The function that gets called when the event is fired. If the value is
     * `undefined`, all listeners will be removed.
     */
    removeEventListener(type: string, listener?: any): void;
    /**
     * Remove all event listeners for housekeeping.
     */
    removeAllEventListeners(): void;
    /**
     * Retrieve the registered event types.
     *
     * @returns Array of event types.
     */
    get eventTypes(): string[];
    /**
     * Retrieve the registered listeners to the specified event.
     *
     * @param type - The type of event to listen to.
     * @returns Array of event listeners.
     */
    listeners(type: string): Array<(event: THREE.Event) => void> | undefined;
    /**
     * Dispatch the event to the registered listeners.
     *
     * @param event - The event to dispatch.
     */
    dispatchEvent(event: THREE.Event): void;
}
//# sourceMappingURL=EventDispatcher.d.ts.map