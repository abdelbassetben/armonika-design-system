import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { DocsPreview } from '@/components/docs-preview';
import { ToastDemo, ToastWithActionDemo } from '@/components/toast-demo';
import {
  ActionBarDemo,
  ActionBarVerticalDemo,
  ActionBarPlacementDemo,
  ActionBarVariantsDemo,
} from '@/components/action-bar-demo';
import {
  PaginationDemo,
  PaginationWithEllipsisDemo,
  PaginationNearFirstDemo,
  PaginationNearEndDemo,
  PaginationMiddleDemo,
  PaginationFullDemo,
} from '@/components/pagination-demo';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    DocsPreview,
    ToastDemo,
    ToastWithActionDemo,
    PaginationDemo,
    PaginationWithEllipsisDemo,
    PaginationNearFirstDemo,
    PaginationNearEndDemo,
    PaginationMiddleDemo,
    PaginationFullDemo,
    ActionBarDemo,
    ActionBarVerticalDemo,
    ActionBarPlacementDemo,
    ActionBarVariantsDemo,
    Tabs,
    Tab,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
