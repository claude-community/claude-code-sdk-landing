import { siNpm, siGithub, siNodedotjs, siGo, siPython } from "simple-icons";

export type BrandIconDef = { path: string; hex: string; title: string };

export const brandIcons = {
  npm: siNpm,
  github: siGithub,
  nodejs: siNodedotjs,
  go: siGo,
  python: siPython,
} satisfies Record<string, BrandIconDef>;

export type BrandIconKey = keyof typeof brandIcons;

export const sdkIconKey: Record<string, BrandIconKey> = {
  node: "nodejs",
  go: "go",
  python: "python",
};
