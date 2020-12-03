import * as THREE from "three";
/**
 * A simple ring buffer to store the last `n` values of the timer. The buffer works on
 * a First-In-First-Out (FIFO) basis.
 */
export declare class RingBuffer<T> {
    readonly capacity: number;
    buffer: T[];
    size: number;
    head: number;
    tail: number;
    /**
     * Sets up the ring buffer.
     *
     * @param capacity - The buffer's capacity.
     */
    constructor(capacity: number);
    /**
     * Clears the contents, removes all elements.
     */
    clear(): void;
    /**
     * Adds a single element to the ring buffer.
     *
     * @param data - Data element.
     */
    enqOne(data: T): void;
    /**
     * Adds one or more elements.
     *
     * @param data - The elements to add.
     */
    enq(...data: T[]): void;
    /**
     * Obtains the oldest element (FIFO). May throw an exception if a buffer underrun occurs.
     * Before calling this method, make sure that `size > 0`.
     */
    deq(): T;
    /**
     * Obtains the oldest element (FIFO) without removing it. Throws an exception if a buffer is
     * empty. Before calling this method, make sure that `size > 0`.
     */
    get top(): T;
    /**
     * Obtains the latest element (LIFO) without removing it. Throws an exception if a buffer is
     * empty. Before calling this method, make sure that `size > 0`.
     */
    get bottom(): T;
    /**
     * Creates an iterator for the buffer.
     */
    iterator(): RingBuffer.Iterator<T>;
    /**
     * Returns a copy of the buffer, where the elements are properly sorted from oldest to newest.
     */
    asArray(): T[];
}
export declare namespace RingBuffer {
    /**
     * A local class for RingBuffer<T>
     */
    class Iterator<T> {
        private readonly m_buffer;
        private m_index;
        /**
         * Creates an iterator for the ring buffer.
         *
         * @param m_buffer - `Ringbuffer` to iterate over.
         * @param m_index - Start index.
         */
        constructor(m_buffer: RingBuffer<T>, m_index?: number);
        /**
         * Gets the iterator's current value. This function does not fail even if an overrun occurs.
         * To detect an overrun, watch the result for [[next]].
         */
        get value(): T;
        /**
         * Advances the iterator to the next element.
         *
         * @returns `true` if the iterator is still valid; `false` if an overrun occurs.
         */
        next(): boolean;
    }
}
/**
 * An interface for a Timer class, that abstracts the basic functions of a Timer.
 *
 * @remarks
 * Implemented by SimpleTimer, SampledTimer, and MultiStageTimer.
 *
 * @internal
 */
export interface Timer {
    readonly name: string;
    readonly value?: number;
    /**
     * Resets value to be able to start again.
     */
    reset(): void;
    /**
     * Starts the timer. Returns the current time, based on `Performance.now()`.
     */
    start(): number;
    /**
     * Stops the timer. Requires that the timer has started.
     */
    stop(): number;
    /**
     * Samples the timer. Requires that the timer has started. This function does not modify
     * the timer's internal state.
     *
     * @returns Current timer value. `-1` if statistics are disabled.
     */
    now(): number;
    /**
     * Sets the measurement value for the amount of time that has elapsed from start() to stop().
     * Use this function to override the timer's duration.
     *
     * @param val - The timer's duration.
     */
    setValue(val: number | undefined): void;
}
/**
 * A simple timer that stores only the latest measurement.
 *
 * @internal
 */
export declare class SimpleTimer implements Timer {
    statistics: Statistics;
    readonly name: string;
    /** `true` if timer has been started. */
    running: boolean;
    private m_currentValue?;
    constructor(statistics: Statistics, name: string);
    /**
     * Gets the latest measurement. This function may return `undefined` if no measurement
     * was done.
     */
    get value(): number | undefined;
    /**
     * Sets the measurement value for the amount of time that has elapsed from start() to stop().
     * Use this function to override the timer's duration.
     *
     * @param val - The timer's duration.
     */
    setValue(val: number | undefined): void;
    /**
     * Resets the value to be able to start again.
     */
    reset(): void;
    /**
     * Starts the timer. Returns the current time, based on `Performance.now()`.
     */
    start(): number;
    /**
     * Stops the timer. Requires that the timer has started.
     */
    stop(): number;
    /**
     * Samples the timer. Requires that the timer has started.
     *
     * @returns the current timer value; `-1` if statistics are disabled.
     */
    now(): number;
}
/**
 * Simple statistics about the values in an array.
 *
 * @internal
 */
export interface Stats {
    /**
     * The lowest value in the array.
     */
    min: number;
    /**
     * The highest value in the array.
     */
    max: number;
    /**
     * The average duration of all values in the array.
     */
    avg: number;
    /**
     * The median duration of all values in the array.
     */
    median: number;
    /**
     * The 75th percentile median of all values in the array.
     */
    median75: number;
    /**
     * The 90th percentile median of all values in the array.
     */
    median90: number;
    /**
     * The 95th percentile median of all values in the array.
     */
    median95: number;
    /**
     * The 97th percentile median of all values in the array.
     */
    median97: number;
    /**
     * The 99th percentile median of all values in the array.
     */
    median99: number;
    /**
     * The 99.9th percentile median of all values in the array.
     */
    median999: number;
    /**
     * The number of values in the array.
     */
    numSamples: number;
}
/**
 * A timer that stores the last `n` samples in a ring buffer.
 *
 * @internal
 */
export declare class SampledTimer extends SimpleTimer {
    statistics: Statistics;
    readonly name: string;
    /**
     * The number of times the timer has reset.
     */
    numResets: number;
    /**
     * Maximum samples until the statistics are reset and updated, which may destroy a median
     * computation.
     */
    maxNumSamples: number;
    /**
     * The array of sampled values, its length cannot exceed `maxNumSamples`.
     */
    samples: RingBuffer<number>;
    /**
     * Creates a `SampledTimer` instance. Must still be added to statistics if it should be logged!
     *
     * @param statistics - Statistics to use for management.
     * @param name - Name of the timer. Use colons to build a hierarchy.
     */
    constructor(statistics: Statistics, name: string);
    /**
     * Resets the timer and clears all of its historical values.
     * @override
     */
    reset(): void;
    /**
     * Add a single measurement to the sample.
     *
     * @param val - A measurement to add.
     * @override
     */
    setValue(val: number | undefined): void;
    /**
     * Updates the `min`, `max`, `avg`, and `median` values. Currently, this function is expensive,
     * as it requires a copy of the sampled values.
     */
    getStats(): Stats | undefined;
}
/**
 * Only exported for testing
 * @ignore
 *
 * @remarks
 * Compute the [[ArrayStats]] for the passed in array of numbers.
 *
 * @param {number[]} samples Array containing sampled values. Will be modified (!) by sorting the
 *      entries.
 * @returns {(Stats | undefined)}
 *
 * @internal
 */
export declare function computeArrayStats(samples: number[]): Stats | undefined;
/**
 * Only exported for testing
 * @ignore
 *
 * @remarks
 * Compute the averages for the passed in array of numbers.
 *
 * @param {number[]} samples Array containing sampled values.
 * @returns {(Stats | undefined)}
 *
 * @internal
 */
export declare function computeArrayAverage(samples: number[]): number | undefined;
/**
 * Measures a sequence of connected events, such as multiple processing stages in a function.
 *
 * @remarks
 * Each stage is identified with a timer name, that must be a valid timer in the statistics
 * object. Additionally, all timers within a `MultiStageTimer` must be unique.
 *
 * Internally, the `MultiStageTimer` manages a list of timers where at the end of each stage,
 * one timer stops and the next timer starts.
 *
 * @internal
 */
export declare class MultiStageTimer {
    private readonly statistics;
    readonly name: string;
    stages: string[];
    private currentStage;
    /**
     * Defines the `MultiStageTimer` with a list of timer names that represent its stages.
     *
     * @param statistics - The statistics object that manages the timers.
     * @param name - Name of this `MultiStageTimer`.
     * @param stages - List of timer names.
     */
    constructor(statistics: Statistics, name: string, stages: string[]);
    /**
     * Gets the timer value for the last stage. If the `MultiStageTimer` did not finish its
     * last stage, the value is `undefined`.
     */
    get value(): number | undefined;
    /**
     * Resets the timers across all stages.
     */
    reset(): void;
    /**
     * Starts the `MultiStageTimer` at its first stage.
     */
    start(): number;
    /**
     * Stops the `MultiStageTimer`. Returns the measurement of the last stage, which may be
     * `undefined` if not all stages started.
     */
    stop(): number;
    /**
     * Gets the current stage.
     */
    get stage(): string | undefined;
    /**
     * Sets the current stage. If a new stage is provided, the current timer (if available) is
     * stopped, and the next timer is started. If the timer in the next stage is `undefined`,
     * this is equivalent to calling `stop` on the `MultiStageTimer`.
     *
     * @param stage - The next stage to start.
     */
    set stage(stage: string | undefined);
}
/**
 * Manages a set of timers.
 *
 * @remarks
 * The main objective of `Statistics` is to log these timers. You can
 * disable statistics to minimize their impact on performance.
 *
 * @internal
 */
export declare class Statistics {
    name?: string | undefined;
    enabled: boolean;
    private readonly timers;
    private readonly nullTimer;
    /**
     * Sets up a group of timers.
     *
     * @param name - The statistics name, for logging purposes.
     * @param enabled - If `false`, the timers do not measure the performance.
     */
    constructor(name?: string | undefined, enabled?: boolean);
    /**
     * Adds a timer, based on the name specified.
     *
     * @param name - The timer's name; must be unique.
     */
    createTimer(name: string, keepSamples?: boolean): Timer;
    /**
     * Adds the timer specified.
     *
     * @param timer - The timer's name, which must be unique within this statistics object.
     */
    addTimer(timer: Timer): Timer;
    /**
     * Gets a timer by name.
     *
     * @param name - The timer's name.
     */
    getTimer(name: string): Timer;
    /**
     * Checks if a timer with the specified name already exists.
     *
     * @param name - The timer's name.
     * @returns `true` if a timer with `name` already exists; `false` otherwise.
     */
    hasTimer(name: string): boolean;
    /**
     * Resets all timers.
     */
    reset(): void;
    /**
     * Prints all values to the console.
     *
     * @param header - Optional header line.
     * @param footer - Optional footer line.
     */
    log(header?: string, footer?: string): void;
}
/**
 * Class containing all counters, timers and events of the current frame.
 *
 * @internal
 */
export declare class FrameStats {
    readonly entries: Map<string, number>;
    messages?: string[];
    /**
     * Retrieve the value of the performance number.
     *
     * @param name - Name of the performance number.
     * @returns The value of the performance number or `undefined` if it has not been declared by
     *      `setValue` before.
     */
    getValue(name: string): number | undefined;
    /**
     * Set the value of the performance number.
     *
     * @param name - Name of the performance number.
     * @param name - New value of the performance number.
     */
    setValue(name: string, value: number): void;
    /**
     * Add a value to the current value of the performance number. If the performance is not known,
     * it will be initialized with `value`.
     *
     * @param name - Name of the performance number.
     * @param name - Value to be added to the performance number.
     */
    addValue(name: string, value: number): void;
    /**
     * Add a text message to the frame, like "Font XYZ has been loaded"
     *
     * @param message - The message to add.
     */
    addMessage(message: string): void;
    /**
     * Reset all known performance values to `0` and the messages to `undefined`.
     */
    reset(): void;
}
/**
 * @ignore
 * Only exported for testing.
 *
 * @remarks
 * Instead of passing around an array of objects, we store the frame statistics as an object of
 * arrays. This allows convenient computations from {@link RingBuffer},
 */
export declare class FrameStatsArray {
    readonly capacity: number;
    readonly frameEntries: Map<string, RingBuffer<number>>;
    readonly messages: RingBuffer<string[] | undefined>;
    constructor(capacity?: number);
    get length(): number;
    reset(): void;
    addFrame(frameStats: FrameStats): void;
    /**
     * Prints all values to the console.
     */
    log(): void;
}
/**
 * @internal
 */
export interface SimpleFrameStatistics {
    configs: Map<string, string>;
    appResults: Map<string, number>;
    frames: Map<string, number | number[]>;
    messages: Array<string[] | undefined>;
    frameStats?: Map<string, Stats | undefined>;
    zoomLevelLabels?: string[];
    zoomLevelData?: Map<string, number | number[]>;
}
/**
 * Performance measurement central.
 *
 * @remarks
 * Maintains the current. Implemented as an instance for easy access.
 *
 * {@link FrameStats}, which holds all individual performance numbers.
 *
 * @internal
 */
export declare class PerformanceStatistics {
    enabled: boolean;
    maxNumFrames: number;
    /**
     * Returns `true` when the maximum number of storable frames is reached.
     *
     * @readonly
     * @type {boolean}
     * @memberof PerformanceStatistics
     */
    get isFull(): boolean;
    /**
     * Global instance to the instance. The current instance can be overridden by creating a new
     * `PerformanceStatistics`.
     */
    static get instance(): PerformanceStatistics;
    private static m_instance?;
    /**
     * Current frame statistics. Contains all values for the current frame. Will be cleared when
     * [[PerformanceStatistics#storeFrameInfo]] is called.
     *
     * @type {FrameStats}
     * @memberof PerformanceStatistics
     */
    readonly currentFrame: FrameStats;
    /**
     * @ignore
     * Only exported for testing.
     *
     * Return the array of frame events.
     */
    get frameEvents(): FrameStatsArray;
    /**
     * Additional results stored for the current application run, not per frame. Only the last value
     * is stored.
     *
     * @type {(Map<string, number>)}
     */
    readonly appResults: Map<string, number>;
    /**
     * Additional configuration values stored for the current application run, not per frame. Only
     * the last value is stored.
     *
     * @type {(Map<string, string>)}
     * @memberof PerformanceStatistics
     */
    readonly configs: Map<string, string>;
    private readonly m_frameEvents;
    /**
     * Creates an instance of PerformanceStatistics. Overrides the current `instance`.
     *
     * @param {boolean} [enabled=true] If `false` the performance values will not be stored.
     * @param {number} [maxNumFrames=1000] The maximum number of frames that are to be stored.
     * @memberof PerformanceStatistics
     */
    constructor(enabled?: boolean, maxNumFrames?: number);
    /**
     * Clears all settings, all stored frame events as well as the current frame values.
     *
     * @memberof PerformanceStatistics
     */
    clear(): void;
    /**
     * Clears only all stored frame events as well as the current frame values.
     *
     * @memberof PerformanceStatistics
     */
    clearFrames(): void;
    /**
     * Add the render state information from [[THREE.WebGLInfo]] to the current frame.
     * @param {THREE.WebGLInfo} webGlInfo
     */
    addWebGLInfo(webGlInfo: THREE.WebGLInfo): void;
    /**
     * Add memory statistics to the current frame if available.
     * @note Currently only supported on Chrome
     */
    addMemoryInfo(): void;
    /**
     * Stores the current frame events into the array of events and clears all values.
     *
     * @returns {boolean} Returns `false` if the maximum number of storable frames has been reached.
     * @memberof PerformanceStatistics
     */
    storeAndClearFrameInfo(): boolean;
    /**
     * Logs all values to the logger.
     *
     * @param header - Optional header line.
     * @param footer - Optional footer line.
     */
    log(header?: string, footer?: string): void;
    /**
     * Convert to a plain object that can be serialized. Required to copy the test results over to
     * nightwatch.
     */
    getAsPlainObject(onlyLastFrame?: boolean): any;
    /**
     * Convert the last frame values to a plain object that can be serialized. Required to copy the
     * test results over to nightwatch.
     */
    getLastFrameStatistics(): any;
    /**
     * Convert to a plain object that can be serialized. Required to copy the test results over to
     * nightwatch.
     */
    getAsSimpleFrameStatistics(onlyLastFrame?: boolean): SimpleFrameStatistics;
}
//# sourceMappingURL=Statistics.d.ts.map