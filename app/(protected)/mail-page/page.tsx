import { cookies } from "next/headers";
import Image from "next/image";

import { Mail } from "./_components/mail";
import { accounts, mails } from "./data";

export default function MailPage() {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");
  let defaultCollapsed = null;
  if (collapsed?.value === undefined) {
    defaultCollapsed = false;
  } else {
    defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  }
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <>
      <div className="h-screen w-full flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
