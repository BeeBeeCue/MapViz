import { IChannel } from "@here/harp-utils";
export declare class PlacementStats {
    private readonly m_logger;
    totalGroups: number;
    resortedGroups: number;
    total: number;
    uninitialized: number;
    tooFar: number;
    numNotVisible: number;
    numPathTooSmall: number;
    numCannotAdd: number;
    numRenderedPoiIcons: number;
    numRenderedPoiTexts: number;
    numPoiTextsInvisible: number;
    numRenderedTextElements: number;
    constructor(m_logger: IChannel);
    clear(): void;
    log(): void;
}
//# sourceMappingURL=PlacementStats.d.ts.map