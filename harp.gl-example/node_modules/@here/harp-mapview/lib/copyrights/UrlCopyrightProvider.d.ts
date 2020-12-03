import { ITransferManager } from "@here/harp-transfer-manager";
import { AreaCopyrightInfo, CopyrightCoverageProvider } from "./CopyrightCoverageProvider";
interface RequestHeaders {
    [field: string]: string;
}
/**
 * Copyright provider which retrieves copyright coverage information from provided URL.
 */
export declare class UrlCopyrightProvider extends CopyrightCoverageProvider {
    private readonly m_fetchURL;
    private readonly m_baseScheme;
    private m_requestHeaders?;
    private readonly m_transferManager;
    private m_cachedCopyrightResponse;
    /**
     * Default constructor.
     *
     * @param m_fetchURL - URL to fetch copyrights data from.
     * @param m_baseScheme - Scheme to get copyrights from.
     * @param m_requestHeaders - Optional request headers for requests(e.g. Authorization)
     */
    constructor(m_fetchURL: string, m_baseScheme: string, m_requestHeaders?: RequestHeaders | undefined, m_transferManager?: ITransferManager);
    /**
     * Sets request headers.
     * @param headers -
     */
    setRequestHeaders(headers: RequestHeaders | undefined): void;
    /**
     * @inheritdoc
     * @override
     */
    getCopyrightCoverageData(abortSignal?: AbortSignal): Promise<AreaCopyrightInfo[]>;
}
export {};
//# sourceMappingURL=UrlCopyrightProvider.d.ts.map