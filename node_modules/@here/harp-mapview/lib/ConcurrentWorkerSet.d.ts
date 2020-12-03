import { RequestController, WorkerServiceProtocol } from "@here/harp-datasource-protocol";
import { IWorkerChannelMessage } from "@here/harp-utils";
export declare function isLoggingMessage(message: IWorkerChannelMessage): message is IWorkerChannelMessage;
export interface ConcurrentWorkerSetOptions {
    /**
     * The URL of the script for each worker to start.
     */
    scriptUrl: string;
    /**
     * The number of Web Workers for processing data.
     *
     * Defaults to CLAMP(`navigator.hardwareConcurrency` - 1, 1, 4) or [[DEFAULT_WORKER_COUNT]].
     */
    workerCount?: number;
    /**
     * Timeout in milliseconds, in which each worker should set initial message.
     *
     * @default 10 seconds, see [[DEFAULT_WORKER_INITIALIZATION_TIMEOUT]]
     */
    workerConnectionTimeout?: number;
}
/**
 * The default timeout for first message from worker.
 *
 * @see {@link WorkerLoader.startWorker}
 */
export declare const DEFAULT_WORKER_INITIALIZATION_TIMEOUT = 10000;
/**
 * A set of concurrent Web Workers. Acts as a Communication Peer for [[WorkerService]] instances
 * running in Web Workers.
 *
 * Starts and manages a certain number of web workers and provides a means to communicate
 * with them using various communication schemes, such as:
 *  - [[addEventListener]] : receive a unidirectional messages
 *  - [[broadcastMessage]] : send unidirectional broadcast message
 *  - [[invokeRequest]] : send a request that waits for a response, with load balancing
 *  - [[postMessage]] : send a unidirectional message, with load balancing
 *
 * The request queue holds all requests before they are stuffed into the event queue, allows for
 * easy (and early) cancelling of requests. The workers now only get a single new RequestMessage
 * when they return their previous result, or if they are idle. When they are idle, they are stored
 * in m_availableWorkers.
 */
export declare class ConcurrentWorkerSet {
    private m_options;
    private readonly m_workerChannelLogger;
    private readonly m_eventListeners;
    private m_workers;
    private m_availableWorkers;
    private m_workerPromises;
    private m_workerCount;
    private readonly m_readyPromises;
    private readonly m_requests;
    private m_workerRequestQueue;
    private m_nextMessageId;
    private m_stopped;
    private m_referenceCount;
    /**
     * Creates a new `ConcurrentWorkerSet`.
     *
     * Creates as many Web Workers as specified in `options.workerCount`, from the script provided
     * in `options.scriptUrl`. If `options.workerCount` is not specified, the value specified in
     * `navigator.hardwareConcurrency` is used instead.
     *
     * The worker set is implicitly started when constructed.
     */
    constructor(m_options: ConcurrentWorkerSetOptions);
    /**
     * Adds an external reference and increments the internal reference counter by one.
     *
     * To implement a reference-count based automatic resource cleanup, use this function with
     * [[removeReference]].
     */
    addReference(): void;
    /**
     * Decrements the internal reference counter by 1.
     *
     * When the internal reference counter reaches 0, this function calls [[dispose]] to clear the
     * resources.
     *
     * Use with [[addReference]] to implement reference-count based automatic resource cleanup.
     */
    removeReference(): void;
    /**
     * Starts workers.
     *
     * Use to start workers already stopped by [[stop]] or [[destroy]] calls.
     *
     * Note: The worker set is implicitly started on construction - no need to call [[start]] on
     * fresh instance.
     *
     * @param options - optional, new worker set options
     */
    start(options?: ConcurrentWorkerSetOptions): void;
    /**
     * The number of workers started for this worker set. The value is `undefined` until the workers
     * have been created.
     */
    get workerCount(): number | undefined;
    /**
     * Stops workers.
     *
     * Waits for all pending requests to be finished and stops all workers.
     *
     * Use [[start]] to start this worker again.
     *
     * @returns `Promise` that resolves when all workers are destroyed.
     */
    stop(): Promise<void>;
    /**
     * Destroys all workers immediately.
     *
     * Resolves all pending request promises with a `worker destroyed` error.
     *
     * Use [[start]] to start this worker again.
     */
    destroy(): void;
    /**
     * Is `true` if the workers have been terminated.
     */
    get terminated(): boolean;
    /**
     * Waits for `service` to be initialized in all workers.
     *
     * Each service that starts in a worker sends an [[isInitializedMessage]] to confirm that
     * it has started successfully. This method resolves when all workers in a set have
     * `service` initialized.
     *
     * Promise is rejected if any of worker fails to start.
     *
     * @param serviceId - The service identifier.
     */
    connect(serviceId: string): Promise<void>;
    /**
     * Registers an event listener for events that originated in a web worker, for a given
     * `serviceId`. You can only set one event listener per `serviceId`.
     *
     * @param serviceId - The service to listen to.
     * @param callback - The callback to invoke for matching events.
     */
    addEventListener(serviceId: string, callback: (message: any) => void): void;
    /**
     * Removes a previously set event listener for the given `serviceId`.
     *
     * @param serviceId - The service from which to remove the event listeners.
     */
    removeEventListener(serviceId: string): void;
    /**
     * Invokes a request that expects a response from a random worker.
     *
     * Sends [[RequestMessage]] and resolves when a matching [[ResponseMessage]] is received from
     * workers. Use this function when interfacing with "RPC-like" calls to services.
     *
     * @param serviceId - The name of service, as registered with the [[WorkerClient]] instance.
     * @param request - The request to process.
     * @param transferList - An optional array of `ArrayBuffer`s to transfer to the worker context.
     * @param requestController - An optional [[RequestController]] to store state of cancelling.
     *
     * @returns A `Promise` that resolves with a response from the service.
     */
    invokeRequest<Res>(serviceId: string, request: WorkerServiceProtocol.ServiceRequest, transferList?: ArrayBuffer[], requestController?: RequestController): Promise<Res>;
    /**
     * Invokes a request that expects responses from all workers.
     *
     * Send [[RequestMessage]]  to all workers and resolves when all workers have sent a matching
     * [[ResponseMessage]]. Use this function to wait on request that need to happen on all workers
     * before proceeding (like synchronous worker service creation).
     *
     * @param serviceId - The name of service, as registered with the [[WorkerClient]] instance.
     * @param request - The request to process.
     * @param transferList - An optional array of `ArrayBuffer`s to transfer to the worker context.
     *
     * @returns Array of `Promise`s that resolves with a response from each worker (unspecified
     * order).
     */
    broadcastRequest<Res>(serviceId: string, request: WorkerServiceProtocol.WorkerServiceManagerRequest | WorkerServiceProtocol.ServiceRequest, transferList?: ArrayBuffer[]): Promise<Res[]>;
    /**
     * Posts a message to all workers.
     *
     * @param message - The message to send.
     * @param buffers - Optional buffers to transfer to the workers.
     */
    broadcastMessage(message: any, buffers?: ArrayBuffer[] | undefined): void;
    /**
     * The size of the request queue for debugging and profiling.
     */
    get requestQueueSize(): number;
    /**
     * The number of workers for debugging and profiling.
     */
    get numWorkers(): number;
    /**
     * The number of workers for debugging and profiling.
     */
    get numIdleWorkers(): number;
    /**
     * Subclasses must call this function when a worker emits an event.
     *
     * @param event - The event to dispatch.
     */
    protected eventHandler(event: any): void;
    /**
     * Handles messages received from workers. This method is protected so that the message
     * reception can be simulated through an extended class, to avoid relying on real workers.
     *
     * @param workerId - The workerId of the web worker.
     * @param event - The event to dispatch.
     */
    private readonly onWorkerMessage;
    /**
     * Posts a [[WorkerServiceProtocol.RequestMessage]] to an available worker. If no worker is
     * available, the request is put into a queue.
     *
     * @param message - The message to send.
     * @param buffers - Optional buffers to transfer to the worker.
     * @param requestController - An optional [[RequestController]] to store state of cancelling.
     */
    private postRequestMessage;
    private ensureStarted;
    private waitForAllResponses;
    private dispatchEvent;
    private terminateWorkers;
    private getReadyPromise;
    /**
     * Check the worker request queue, if there are any queued up decoding jobs and idle workers,
     * they will be executed with postRequestMessage. The requests in the queue are sorted before
     * the request with the highest priority is selected for processing.
     */
    private checkWorkerRequestQueue;
}
//# sourceMappingURL=ConcurrentWorkerSet.d.ts.map