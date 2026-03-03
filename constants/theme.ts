/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

// Tailwind palette - minimalist
const ivory = "#FAFAF8";
const stone = "#E7E5E0";
const muted = "#9A9A98";
const charcoal = "#2D2D2D";

const tintColorLight = muted;
const tintColorDark = ivory;

export const Colors = {
  light: {
    text: charcoal, // dark text
    background: ivory, // ivory background
    tint: muted, // main accent
    icon: charcoal,
    tabIconDefault: charcoal,
    tabIconSelected: muted,
    highlight: stone,
  },
  dark: {
    text: ivory,
    background: charcoal, // charcoal background for dark
    tint: muted,
    icon: ivory,
    tabIconDefault: ivory,
    tabIconSelected: muted,
    highlight: stone,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
