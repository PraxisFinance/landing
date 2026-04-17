import { EmailAcceptedIcon } from "@/components/assets/email-accepted-icon";
import { JOIN_WAITLIST_EMAIL_ACCEPTED_TEXT } from "@/components/constants/join-waitlist-section";
import { cn } from "@/lib/utils";

export function JoinWaitlistAcceptedState() {
  return (
    <div className={cn("flex h-11 items-center gap-2 px-3")}>
      <EmailAcceptedIcon />
      <span className="ui-text-7 text-brand-dark-green">{JOIN_WAITLIST_EMAIL_ACCEPTED_TEXT}</span>
    </div>
  );
}
