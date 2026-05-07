"use client";

import { useState, type FormEvent } from "react";

export function useJoinWaitlistForm() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isAddressAccepted, setIsAddressAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleJoinWaitlist = () => {
    if (!walletAddress.trim()) return;
    setIsAddressAccepted(true);
  };

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!walletAddress.trim() || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: walletAddress.trim() }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setIsAddressAccepted(true);
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    walletAddress,
    setWalletAddress,
    isAddressAccepted,
    isSubmitting,
    submitError,
    handleJoinWaitlist,
    onSubmitForm,
  };
}

export type JoinWaitlistFormBag = ReturnType<typeof useJoinWaitlistForm>;
