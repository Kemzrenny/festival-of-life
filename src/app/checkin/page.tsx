import type { Metadata } from "next";
import { CheckinForm } from "./CheckinForm";

export const metadata: Metadata = {
  title: "Daily check-in · Festival of Life 2026",
  robots: { index: false, follow: false },
};

export default function CheckinPage() {
  return <CheckinForm />;
}
