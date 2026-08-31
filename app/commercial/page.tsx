import { redirect } from "next/navigation";

export default function CommercialPage() {
  redirect("/services?tab=commercial");
}
