import { useEffect, useState } from "react";

export default function InstallAppButton() {
  const [promptEvent, setPromptEvent] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    setIsInstalled(standalone);

    const handler = (event) => {
      event.preventDefault();
      setPromptEvent(event);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  async function install() {
    if (!promptEvent) {
      alert(
        "Installation is not available yet. Open this website in Chrome on your phone and use Chrome → Add to Home screen.",
      );
      return;
    }

    await promptEvent.prompt();

    const result = await promptEvent.userChoice;

    if (result.outcome === "accepted") {
      setIsInstalled(true);
    }

    setPromptEvent(null);
  }

  if (isInstalled) {
    return null;
  }

  return (
    <button className="install-btn" type="button" onClick={install}>
      Install on Phone
    </button>
  );
}
