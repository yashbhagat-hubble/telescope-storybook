import { mount, StartClient } from "@solidjs/start/client";

export default function EntryClient() {
  return <StartClient />;
}

mount(() => <EntryClient />, document.getElementById("root")!);
