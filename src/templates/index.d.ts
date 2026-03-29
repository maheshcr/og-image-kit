import type { VNode } from '../index.js';

// SanskritKatha templates
export function darkGradientContainer(children: (string | VNode)[], overrides?: Record<string, any>): VNode;
export function goldStat(value: string | number, label: string): VNode;
export function divider(width?: number): VNode;

// Blog post
export interface BlogPostCardData {
  title: string;
  author?: string;
  date?: string;
  readTime?: string;
  siteName?: string;
  logo?: string;
  accentColor?: string;
}
export function blogPostCard(data: BlogPostCardData): VNode;

// Product launch
export interface ProductLaunchCardData {
  name: string;
  tagline?: string;
  logo?: string;
  features?: string[];
  background?: string;
  accentColor?: string;
}
export function productLaunchCard(data: ProductLaunchCardData): VNode;

// Event
export interface EventCardData {
  title: string;
  date?: string;
  time?: string;
  location?: string;
  organizer?: string;
  accentColor?: string;
  background?: string;
}
export function eventCard(data: EventCardData): VNode;

// Profile
export interface ProfileCardData {
  name: string;
  title?: string;
  avatar?: string;
  bio?: string;
  stats?: { label: string; value: string | number }[];
  background?: string;
}
export function profileCard(data: ProfileCardData): VNode;
