export type RequestState = {
  loading: boolean;
  error: string | null;
  data: Record<string, string> | null;
};

export type Response = {
  message?: Record<string, string>;
  ok: boolean;
  error?: string;
};

export type OriginalClaim = {
  name: string;
  value: string;
};

export type Claim = {
  key: string;
  value: string;
  type: "image" | "string";
};

export type OriginalPresentationEventMessage = {
  ref: string;
  claims?: OriginalClaim[];
  status: "refused" | "ok";
  proofExchangeId: string;
};

export type PresentationEventMessage = Omit<OriginalPresentationEventMessage, 'claims'> & {
  claims?: Claim[];
};
