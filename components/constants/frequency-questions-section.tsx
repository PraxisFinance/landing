import type { ReactNode } from "react";

export const FREQUENCY_QUESTIONS_HEADLINE = "Frequently Asked Questions" as const;

export const FREQUENCY_QUESTIONS_ANSWER_PLACEHOLDER =
  "We are finalizing this answer. Check back soon for full details.";

export type FaqEntry = {
  id: string;
  question: string;
  answer?: ReactNode;
};

export const FREQUENCY_QUESTIONS_ITEMS: FaqEntry[] = [
  {
    id: "risk-free",
    question: 'Is Praxis "risk-free"?',
    answer: (
      <div className="space-y-2">
        <p>
          No. Praxis reduces principal risk, but it is not risk-free. Your principal is protected by
          design and not used for predictions. However, smart contract, yield strategy, and oracle
          risks still apply. Do your research before depositing.
        </p>
      </div>
    ),
  },
  {
    id: "how-predictions",
    question: "How do I make predictions?",
    answer: (
      <div className="space-y-2">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Deposit funds into a Praxis vault</li>
          <li>Receive PT (principal) + YT (yield)</li>
          <li>Use YT to enter prediction markets</li>
          <li>Choose an outcome and allocate YT</li>
        </ol>
      </div>
    ),
  },
  {
    id: "what-for-predictions",
    question: "What do I use for predictions?",
    answer: (
      <p>
        You use Yield Tokens (YT). YT represents your future yield, minted upfront and used as your
        prediction bankroll. Your principal (PT) is never used for predictions.
      </p>
    ),
  },
  {
    id: "lose-prediction",
    question: "What happens if I lose a prediction?",
    answer: (
      <p>
        If your prediction is incorrect, your YT balance decreases. Losses are limited to your yield
        exposure only.
      </p>
    ),
  },
  {
    id: "win-prediction",
    question: "What happens if I win a prediction?",
    answer: (
      <p>
        If your prediction is correct, your YT balance increases. You accumulate more yield, which
        can be redeemed later.
      </p>
    ),
  },
  {
    id: "results-finalized",
    question: "How are results finalized?",
    answer: (
      <div className="space-y-2">
        <p>Market outcomes are determined using:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Onchain oracles (e.g., price feeds, sports results)</li>
          <li>Verified data sources depending on the market type</li>
        </ul>
        <p>
          Once finalized, payouts are automatically distributed to YT holders based on outcomes.
        </p>
      </div>
    ),
  },
  {
    id: "withdraw",
    question: "Can I withdraw anytime?",
    answer: (
      <div className="space-y-2">
        <p>You have multiple options:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <span className="font-semibold text-brand-black/90">At maturity:</span> redeem principal
            + full yield
          </li>
          <li>
            <span className="font-semibold text-brand-black/90">Early exit:</span> withdraw full
            position (PT + YT) before maturity
          </li>
          <li>
            <span className="font-semibold text-brand-black/90">Yield-only withdrawal:</span> redeem
            YT anytime
          </li>
        </ul>
        <p className="text-brand-black/75">
          Note: Early exit conditions may vary depending on vault rules.
        </p>
      </div>
    ),
  },
  {
    id: "chains-tokens",
    question: "What chains and tokens are supported?",
    answer: (
      <p>
        Praxis is built on Base and initially, only the USDC token is supported. Support for
        additional assets and integrations may expand over time.
      </p>
    ),
  },
  {
    id: "pt-yt",
    question: "What are PT and YT?",
    answer: (
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <span className="font-semibold text-brand-black/90">PT (Principal Token):</span> represents
          your deposited capital
        </li>
        <li>
          <span className="font-semibold text-brand-black/90">YT (Yield Token):</span> represents your
          yield and is used for predictions
        </li>
      </ul>
    ),
  },
  {
    id: "yt-vs-pt",
    question: "Why does YT matter more than PT during the vault period?",
    answer: (
      <div className="space-y-2">
        <p>YT is your active asset:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Used for predictions</li>
          <li>Changes based on outcomes</li>
          <li>Can be withdrawn anytime</li>
        </ul>
        <p>PT remains stable and redeemable at maturity or early withdraw.</p>
      </div>
    ),
  },
  {
    id: "lose-principal",
    question: "Can I lose my principal?",
    answer: (
      <div className="space-y-2">
        <p>
          Under normal operation, your principal is not at risk from predictions. However, it may
          still be affected by:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Smart contract vulnerabilities</li>
          <li>Yield strategy failures</li>
        </ul>
      </div>
    ),
  },
  {
    id: "different",
    question: "What makes Praxis different from other prediction markets?",
    answer: (
      <p>
        <span className="font-semibold text-brand-black/90">Traditional markets:</span> You risk your
        capital on every prediction.{" "}
        <span className="font-semibold text-brand-black/90">Praxis:</span> You risk only yield, while
        your principal remains intact.
      </p>
    ),
  },
  {
    id: "manage-positions",
    question: "Do I need to actively manage my positions?",
    answer: (
      <div className="space-y-2">
        <p>Not necessarily. You can:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Manually participate</li>
          <li>Or use agents (coming soon) to monitor and act on your behalf</li>
        </ul>
      </div>
    ),
  },
  {
    id: "yield-games",
    question: "What are yield games?",
    answer: (
      <div className="space-y-2">
        <p>Yield games are prediction-like experiences where:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>You use YT</li>
          <li>Outcomes redistribute yield among participants</li>
          <li>They are designed for engagement + upside without risking principal.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "beginners",
    question: "Is Praxis suitable for beginners?",
    answer: (
      <div className="space-y-2">
        <p>Yes. Praxis is designed to simplify participation:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>No need for complex hedging strategies</li>
          <li>No repeated capital risk</li>
          <li>Clear separation of risk (YT) and ownership (PT)</li>
        </ul>
      </div>
    ),
  },
];
