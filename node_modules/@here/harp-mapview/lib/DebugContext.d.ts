import * as THREE from "three";
/**
 * Maintains a map of [[DebugOption]]s. You can add listeners to debug options by passing their
 * names.
 */
export declare class DebugContext {
    private readonly m_optionsMap;
    /**
     * Builds a `DebugContext`.
     */
    constructor();
    /**
     * Sets the value of an option. Calls change listeners of that option, even if the value has
     * not been changed. The change listeners provided here are not called during this set
     * operation.
     *
     * @param name - Name of the option.
     * @param value - Value of the option.
     */
    setValue(name: string, value: any): void;
    /**
     * Gets the option value.
     *
     * @param name - Name of option.
     */
    getValue(name: string): any;
    /**
     * Determines if the option is registered.
     *
     * @param name - Name of option.
     */
    hasOption(name: string): boolean;
    /**
     * Adds a listener to a debug option.
     *
     * @param name - Name of the option that requires a listener.
     * @param listener - The listener function to add.
     */
    addEventListener(name: string, listener: (event: THREE.Event) => void): void;
    /**
     * Checks for a listener in a debug option.
     *
     * @param name - Name of the option to check for.
     * @param listener - The listener function to check for.
     */
    hasEventListener(name: string, listener: (event: THREE.Event) => void): boolean;
    /**
     * Removes a listener from a debug option.
     *
     * @param name - Name of the option from which to remove a listener.
     * @param listener - The listener function to remove.
     */
    removeEventListener(name: string, listener: (event: THREE.Event) => void): void;
    /**
     * Provides access to the options map. This method is useful for creating an automatic
     * browser GUI.
     */
    get options(): Map<string, any>;
    /**
     * Clears away all debug options. Currently, `THREE.EventDispatcher` does not provide an API
     * to remove all event listeners.
     */
    clear(): void;
}
export declare const debugContext: DebugContext;
//# sourceMappingURL=DebugContext.d.ts.map