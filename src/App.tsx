import { useState } from "react";
import { LangProvider } from "@/lib/i18n";
import type { SdkKey } from "@/lib/sdk-data";
import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { TestedSection } from "@/components/sections/tested-section";
import { ComparisonSection } from "@/components/sections/comparison-section";
import { LlmsSection } from "@/components/sections/llms-section";
import { SiteFooter } from "@/components/sections/site-footer";

function Landing() {
  const [activeSdk, setActiveSdk] = useState<SdkKey>("node");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero activeSdk={activeSdk} onSelectSdk={setActiveSdk} />
        <TestedSection activeSdk={activeSdk} />
        <ComparisonSection />
        <LlmsSection activeSdk={activeSdk} onSelectSdk={setActiveSdk} />
      </main>
      <SiteFooter />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Landing />
    </LangProvider>
  );
}
