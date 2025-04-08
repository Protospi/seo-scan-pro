import { load } from "cheerio";
import { SEOAnalysis } from "@shared/schema";

export async function analyzeSEO(url: string, html: string): Promise<SEOAnalysis> {
  const $ = load(html);
  
  // Extract title
  const titleTag = $('title').text();
  const titleLength = titleTag.length;
  let titleStatus: "good" | "needs_improvement" | "missing" = "good";
  let titleMessage = "Good length";
  
  if (titleLength === 0) {
    titleStatus = "missing";
    titleMessage = "Missing title tag";
  } else if (titleLength < 30) {
    titleStatus = "needs_improvement";
    titleMessage = "Too short";
  } else if (titleLength > 60) {
    titleStatus = "needs_improvement";
    titleMessage = "Too long";
  }

  // Extract description
  const descriptionTag = $('meta[name="description"]').attr('content') || '';
  const descriptionLength = descriptionTag.length;
  let descriptionStatus: "good" | "needs_improvement" | "missing" = "good";
  let descriptionMessage = "Good length";
  
  if (descriptionLength === 0) {
    descriptionStatus = "missing";
    descriptionMessage = "Missing description tag";
  } else if (descriptionLength < 120) {
    descriptionStatus = "needs_improvement";
    descriptionMessage = "Too short";
  } else if (descriptionLength > 155) {
    descriptionStatus = "needs_improvement";
    descriptionMessage = "Too long";
  }

  // Extract canonical
  const canonicalTag = $('link[rel="canonical"]').attr('href') || '';
  let canonicalStatus: "good" | "needs_improvement" | "missing" = "good";
  let canonicalMessage = "Properly implemented canonical URL";
  
  if (!canonicalTag) {
    canonicalStatus = "missing";
    canonicalMessage = "Missing canonical tag";
  } else if (!canonicalTag.includes(new URL(url).hostname)) {
    canonicalStatus = "needs_improvement";
    canonicalMessage = "Canonical URL points to different domain";
  }

  // Extract viewport
  const viewportTag = $('meta[name="viewport"]').attr('content') || '';
  let viewportStatus: "good" | "needs_improvement" | "missing" = "good";
  
  if (!viewportTag) {
    viewportStatus = "missing";
  } else if (!viewportTag.includes('width=device-width')) {
    viewportStatus = "needs_improvement";
  }

  // Extract favicon
  const faviconTag = $('link[rel="icon"], link[rel="shortcut icon"]').attr('href') || '';
  let faviconStatus: "good" | "needs_improvement" | "missing" = "good";
  
  if (!faviconTag) {
    faviconStatus = "missing";
  }

  // Extract Open Graph tags
  const ogTitle = $('meta[property="og:title"]').attr('content') || '';
  const ogDescription = $('meta[property="og:description"]').attr('content') || '';
  const ogImage = $('meta[property="og:image"]').attr('content') || '';
  const ogUrl = $('meta[property="og:url"]').attr('content') || '';
  const ogType = $('meta[property="og:type"]').attr('content') || '';
  
  let ogStatus: "good" | "needs_improvement" | "missing" = "good";
  
  if (!ogTitle || !ogDescription || !ogImage || !ogUrl || !ogType) {
    ogStatus = "needs_improvement";
  }
  
  if (!ogTitle && !ogDescription && !ogImage && !ogUrl && !ogType) {
    ogStatus = "missing";
  }

  // Extract Twitter Card tags
  const twitterCard = $('meta[name="twitter:card"]').attr('content') || '';
  const twitterTitle = $('meta[name="twitter:title"]').attr('content') || '';
  const twitterDescription = $('meta[name="twitter:description"]').attr('content') || '';
  const twitterImage = $('meta[name="twitter:image"]').attr('content') || '';
  
  let twitterStatus: "good" | "needs_improvement" | "missing" = "good";
  
  if (!twitterCard) {
    twitterStatus = "missing";
  } else if (!twitterTitle || !twitterDescription || !twitterImage) {
    twitterStatus = "needs_improvement";
  }

  // Extract Structured Data
  const structuredDataTags = $('script[type="application/ld+json"]');
  let structuredDataContent = '';
  let structuredDataStatus: "good" | "needs_improvement" | "missing" = "missing";
  let structuredDataMessage = "Missing structured data";
  
  if (structuredDataTags.length > 0) {
    structuredDataContent = structuredDataTags.first().html() || '';
    structuredDataStatus = "good";
    structuredDataMessage = "Structured data present";
    
    // Check if structured data is valid JSON
    try {
      JSON.parse(structuredDataContent);
    } catch (e) {
      structuredDataStatus = "needs_improvement";
      structuredDataMessage = "Invalid JSON-LD structured data";
    }
  }

  // Collect all meta tags
  const metaTags: SEOAnalysis["metaTags"] = [];
  
  // Basic tags
  if (titleTag) {
    metaTags.push({
      name: "Title",
      content: titleTag,
      status: titleStatus,
      message: `${titleLength} characters - ${titleMessage}`,
      category: "basic"
    });
  }
  
  $('meta[name="description"]').each((i, el) => {
    metaTags.push({
      name: "Meta Description",
      content: $(el).attr('content') || '',
      status: descriptionStatus,
      message: `${descriptionLength} characters - ${descriptionMessage}`,
      category: "basic"
    });
  });
  
  $('link[rel="canonical"]').each((i, el) => {
    metaTags.push({
      name: "Canonical URL",
      content: $(el).attr('href') || '',
      status: canonicalStatus,
      message: canonicalMessage,
      category: "basic"
    });
  });
  
  // Social tags - OpenGraph
  $('meta[property^="og:"]').each((i, el) => {
    const property = $(el).attr('property') || '';
    const content = $(el).attr('content') || '';
    metaTags.push({
      name: property,
      property: property,
      content,
      status: content ? "good" : "missing",
      category: "social"
    });
  });
  
  // Social tags - Twitter
  $('meta[name^="twitter:"]').each((i, el) => {
    const name = $(el).attr('name') || '';
    const content = $(el).attr('content') || '';
    metaTags.push({
      name,
      content,
      status: content ? "good" : "missing",
      category: "social"
    });
  });
  
  // Technical tags
  $('meta[name="viewport"]').each((i, el) => {
    metaTags.push({
      name: "Viewport",
      content: $(el).attr('content') || '',
      status: viewportStatus,
      category: "technical"
    });
  });
  
  $('meta[name="robots"]').each((i, el) => {
    metaTags.push({
      name: "Robots",
      content: $(el).attr('content') || '',
      status: "good",
      category: "technical"
    });
  });
  
  if (structuredDataContent) {
    metaTags.push({
      name: "Structured Data (JSON-LD)",
      content: structuredDataContent,
      status: structuredDataStatus,
      message: structuredDataMessage,
      category: "technical"
    });
  } else {
    metaTags.push({
      name: "Structured Data (JSON-LD)",
      content: "{ \"@context\": \"https://schema.org\", \"@type\": \"WebPage\", \"name\": \"Page Title\" }",
      status: "missing",
      message: "Add structured data to enhance search result appearance",
      category: "technical"
    });
  }
  
  // Count implemented tags, needs improvement tags, and missing tags
  const implemented = metaTags.filter(tag => tag.status === "good").length;
  const needsImprovement = metaTags.filter(tag => tag.status === "needs_improvement").length;
  const missing = metaTags.filter(tag => tag.status === "missing").length;
  
  // Calculate score based on implemented tags
  const total = implemented + needsImprovement + missing;
  const score = Math.round((implemented + (needsImprovement * 0.5)) / total * 100);
  
  // Generate recommendations
  const recommendations: SEOAnalysis["recommendations"] = [];
  
  if (titleStatus !== "good") {
    recommendations.push({
      message: `Optimize your title tag ${titleStatus === "missing" ? "by adding one" : titleMessage === "Too short" ? "by making it longer" : "by making it shorter"}`,
      status: titleStatus
    });
  }
  
  if (descriptionStatus !== "good") {
    recommendations.push({
      message: `Optimize your meta description ${descriptionStatus === "missing" ? "by adding one" : descriptionMessage === "Too short" ? "by making it longer" : "by making it shorter"}`,
      status: descriptionStatus
    });
  }
  
  if (canonicalStatus !== "good") {
    recommendations.push({
      message: `Add a proper canonical URL tag to indicate the preferred version of this page`,
      status: canonicalStatus
    });
  }
  
  if (ogStatus !== "good") {
    recommendations.push({
      message: `Add Open Graph meta tags to improve how your site appears when shared on social media`,
      status: ogStatus
    });
  }
  
  if (twitterStatus !== "good") {
    recommendations.push({
      message: `Add Twitter Card meta tags to control how your content appears when shared on Twitter`,
      status: twitterStatus
    });
  }
  
  if (structuredDataStatus !== "good") {
    recommendations.push({
      message: `Add structured data (JSON-LD) to enhance search result appearance`,
      status: structuredDataStatus
    });
  }
  
  // Create the final analysis object
  const analysis: SEOAnalysis = {
    url,
    title: {
      content: titleTag,
      length: titleLength,
      status: titleStatus,
      message: titleMessage,
    },
    description: {
      content: descriptionTag,
      length: descriptionLength,
      status: descriptionStatus,
      message: descriptionMessage,
    },
    canonical: {
      content: canonicalTag,
      status: canonicalStatus,
      message: canonicalMessage,
    },
    viewport: {
      content: viewportTag,
      status: viewportStatus,
    },
    favicon: {
      content: faviconTag,
      status: faviconStatus,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
      url: ogUrl,
      type: ogType,
      status: ogStatus,
    },
    twitter: {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      image: twitterImage,
      status: twitterStatus,
    },
    structuredData: {
      content: structuredDataContent,
      status: structuredDataStatus,
      message: structuredDataMessage,
    },
    metaTags,
    score: {
      value: score,
      status: score >= 80 ? "good" : score >= 50 ? "needs_improvement" : "poor",
      implemented,
      needsImprovement,
      missing,
    },
    recommendations,
  };
  
  return analysis;
}
