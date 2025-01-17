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

export type PresentationEventMessage = OriginalPresentationEventMessage & {
  claims?: Claim[];
};
