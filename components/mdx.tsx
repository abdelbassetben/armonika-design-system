import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { DocsPreview } from '@/components/docs-preview';
import { ToastDemo, ToastWithActionDemo } from '@/components/toast-demo';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    DocsPreview,
    ToastDemo,
    ToastWithActionDemo,
    Tabs,
    Tab,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
