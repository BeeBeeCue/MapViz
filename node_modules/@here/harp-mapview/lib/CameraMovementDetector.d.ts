import { MapView } from "./MapView";
/**
 * The `CameraMovementDetector` class checks for changes in camera position and orientation, to
 * detect continuous movements without the animation mode activated in {@link MapView}. If the
 * interaction is not continuous enough, you can use a throttling timer to reduce the number of
 * callbacks.
 */
export declare class CameraMovementDetector {
    private readonly m_throttlingTimeout;
    private m_movementStartedFunc;
    private m_movementFinishedFunc;
    private m_lastAttitude?;
    private readonly m_lastCameraPos;
    private readonly m_newCameraPos;
    private m_cameraMovedLastFrame;
    private m_throttlingTimerId?;
    private m_movementDetectorDeadline;
    /**
     * Initializes the detector with timeout value and callbacks. {@link MapView} also provides
     * events for client code to be notified when these cues occur.
     *
     * @param m_throttlingTimeout - The delay, in milliseconds, between the last user interaction
     * detected and the call to `m_movementFinishedFunc`; the default is `300`.
     * @param m_movementStartedFunc - Callback function, called when the user starts interacting.
     * @param m_movementFinishedFunc - Callback function, called when the user stops interacting.
     */
    constructor(m_throttlingTimeout: number | undefined, m_movementStartedFunc: (() => void) | undefined, m_movementFinishedFunc: (() => void) | undefined);
    /**
     * Checks if the camera has moved since the last time it was checked. The
     * `m_movementStartedFunc` is called when a movement starts. If no movement
     * is detected, a timer for `m_movementFinishedFunc` starts.
     *
     * @param mapView - [[Mapview]]'s position and camera are checked for modifications.
     */
    checkCameraMoved(mapView: MapView, now: number): boolean;
    /**
     * Reset the saved camera position. Next time checkCameraMoved is called, it will return
     * `false`.
     */
    clear(mapView: MapView): void;
    /**
     * Force change of camera position. Next time checkCameraMoved is called, it will return `true`.
     */
    forceMoved(): void;
    /**
     * Returns `true` if the camera of this {@link MapView} is currently moving. In this case the
     * `m_movementFinishedFunc` is waiting to be called after the throttling timer runs out.
     */
    get cameraIsMoving(): boolean;
    /**
     * Disposes resources and kills the throttling timer.
     */
    dispose(): void;
    /**
     * Returns `true` if the camera has moved in the last frame.
     */
    get cameraMovedLastFrame(): boolean;
    private movementStarted;
    private movementFinished;
    private startMovementFinishedTimer;
    private readonly onDeadlineTimer;
    private removeMovementFinishedTimer;
}
//# sourceMappingURL=CameraMovementDetector.d.ts.map