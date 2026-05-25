// =============================================================================
// CMS Abstraction Layer — Vantor Ventures
// =============================================================================
// This module provides data-fetching functions that currently return local
// static data. When WordPress CMS is connected, replace the implementations
// below with API calls.
//
// Example future implementation:
// export async function getHomepageData(): Promise<HomepageData> {
//   const res = await fetch(`${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=home`);
//   const data = await res.json();
//   return mapWordPressToHomepageData(data);
// }
// =============================================================================

import type {
  HomepageData,
  VerticalPage,
  AboutData,
  ContactData,
  CaseStudy,
} from '@/types';
import { homepageData } from '@/data/homepage';
import { verticalPages } from '@/data/verticals';
import { aboutData } from '@/data/about';
import { contactData } from '@/data/contact';
import { caseStudies } from '@/data/caseStudies';

/**
 * Fetch homepage data.
 * Later: fetch(`${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=home`)
 */
export async function getHomepageData(): Promise<HomepageData> {
  return homepageData;
}

/**
 * Fetch all vertical pages.
 * Later: fetch(`${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/verticals`)
 */
export async function getVerticalPages(): Promise<VerticalPage[]> {
  return verticalPages;
}

/**
 * Fetch a single vertical page by slug.
 * Later: fetch(`${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/verticals?slug=${slug}`)
 */
export async function getVerticalPageBySlug(
  slug: string
): Promise<VerticalPage | null> {
  return verticalPages.find((v) => v.slug === slug) || null;
}

/**
 * Fetch about page data.
 * Later: fetch(`${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=about`)
 */
export async function getAboutData(): Promise<AboutData> {
  return aboutData;
}

/**
 * Fetch contact page data.
 * Later: fetch(`${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=contact`)
 */
export async function getContactData(): Promise<ContactData> {
  return contactData;
}

/**
 * Fetch all case studies.
 * Later: fetch(`${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/case-studies`)
 */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  return caseStudies;
}

/**
 * Fetch case studies by vertical.
 * Later: fetch(`${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/case-studies?vertical=${vertical}`)
 */
export async function getCaseStudiesByVertical(
  vertical: string
): Promise<CaseStudy[]> {
  return caseStudies.filter((cs) => cs.vertical === vertical);
}
