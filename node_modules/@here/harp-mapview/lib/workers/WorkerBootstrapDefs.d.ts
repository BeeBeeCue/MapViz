/**
 * Message sent by web worker that requests to resolve actual
 * URLs of it's dependencies.
 *
 * Main thread is expected.
 */
export interface WorkerBootstrapRequest {
    type: "worker-bootstrap-request";
    dependencies: string[];
}
export interface WorkerBootstrapResponse {
    type: "worker-bootstrap-response";
    resolvedDependencies: string[];
}
export declare function isWorkerBootstrapRequest(message: any): message is WorkerBootstrapRequest;
export declare function isWorkerBootstrapResponse(message: any): message is WorkerBootstrapResponse;
//# sourceMappingURL=WorkerBootstrapDefs.d.ts.map