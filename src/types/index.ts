export type FactCheckResult = {
  claim: string;
  verdict: string;
  confidenceLevel: string;
  reason: string;
  supportingEvidence: string[];
  counterEvidence: string[];
  references: string[];
};
/** */