import { IChannel } from "@here/harp-utils";
export declare class UpdateStats {
    private readonly m_logger;
    tiles: number;
    totalGroups: number;
    newGroups: number;
    totalLabels: number;
    results: number[];
    constructor(m_logger: IChannel);
    clear(): void;
    log(): void;
}
//# sourceMappingURL=UpdateStats.d.ts.map