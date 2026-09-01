# Copilot Instructions for SiemWesseling Portfolio Website

## Project Overview

This is a static portfolio website hosted on GitHub Pages (username.github.io repository). The site uses vanilla HTML, CSS, and JavaScript—no build tools, frameworks, or transpilers are used. All assets are static and deployed directly to GitHub Pages.

## Repository Structure

```
.
├── index.html           # Main landing page
├── style.css            # Global styles
├── assets/              # Static assets directory
│   ├── images/          # Portfolio images, screenshots, thumbnails
│   ├── fonts/           # Custom web fonts (if used)
│   └── icons/           # Icon files (favicons, SVGs, etc.)
└── .github/
    └── copilot-instructions.md  # This file
```

## Build, Test, and Deployment

**No build step is required.** Changes to HTML and CSS are live when pushed to GitHub. However, best practices for local development and validation:

### Local Testing

- **Live server (recommended for development):**
  - Use a simple HTTP server to test locally before committing
  - Example: Python `python -m http.server 8000` or VS Code Live Server extension
  - Navigate to `http://localhost:8000` and verify layout and functionality

- **Browser compatibility check:**
  - Test across Chrome, Firefox, Safari, and Edge
  - Check responsive behavior on mobile devices (use browser DevTools)
  - Verify CSS is applied correctly and no JavaScript errors appear in console

### Validation (Optional but Recommended)

- **HTML validation:** Use W3C HTML Validator or [https://validator.w3.org/](https://validator.w3.org/) to catch markup errors
- **CSS linting:** If adding a build step in the future, integrate stylelint: `npx stylelint style.css`
- **Accessibility check:** Use tools like axe DevTools or WAVE to ensure portfolio is accessible to all visitors

### Deployment

- Push to the `main` branch (or configured GitHub Pages branch)
- GitHub Pages automatically deploys changes within seconds
- The site is live at `https://siemwesseling.github.io`
- No additional deployment scripts or CI/CD pipelines are configured (keep it simple for a static site)

## Key Conventions

### HTML Structure

- **Single entry point:** `index.html` is the main landing page. Additional pages should be created as separate files if needed (e.g., `projects.html`, `blog.html`)
- **Semantic HTML:** Use semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`) to structure content meaningfully
- **Link formatting:** Use relative paths for internal navigation (e.g., `href="/projects.html"`) and absolute URLs for external links
- **Meta tags:** Ensure `<meta name="viewport">` is set for mobile responsiveness and include relevant `<meta name="description">` for SEO

### CSS Organization

- **Single stylesheet:** `style.css` contains all styles. Keep it organized with clear comments sectioning major parts:
  ```css
  /* Reset and Base Styles */
  /* Header and Navigation */
  /* Hero Section */
  /* Projects Section */
  /* Footer */
  ```
- **Mobile-first approach:** Use media queries to enhance layout for larger screens
- **Color scheme and typography:** Define CSS custom properties (variables) at the root for easy theme adjustments:
  ```css
  :root {
    --primary-color: #your-primary;
    --secondary-color: #your-secondary;
    --font-family: 'Your Font', sans-serif;
  }
  ```
- **Avoid inline styles:** Keep all styling in `style.css` for maintainability

### Asset Management

- **Image optimization:** Compress images before adding to `assets/images/` to keep file sizes small and site performance high
  - Use tools like TinyPNG, ImageOptim, or WebP conversion for web-optimized formats
  - Provide `alt` text for all images for accessibility
- **Font files:** Store custom fonts in `assets/fonts/` and link via `@font-face` in CSS
- **File naming:** Use lowercase, hyphenated names for all assets (e.g., `hero-background.jpg`, `project-thumbnail.png`)

### JavaScript (if used)

- **Keep it minimal:** For a portfolio site, prefer CSS-only solutions when possible
- **Vanilla JS only:** No jQuery or framework dependencies—this keeps the site lightweight and fast
- **Script placement:** Place `<script>` tags at the end of `<body>` or use `defer` attribute to avoid blocking page load
- **Organize code:** If JavaScript grows significantly, create a separate `assets/js/` directory with modular scripts

## Common Workflows

### Adding a New Section to the Portfolio

1. Add HTML markup to `index.html` with semantic tags and a unique `id` or `class`
2. Add corresponding styles to `style.css` in a clearly commented section
3. Test layout and responsiveness locally
4. Commit with a clear message: "Add [section name] section to portfolio"

### Updating Styles

- Edit `style.css` directly
- Use browser DevTools to debug styling issues
- Commit style changes with descriptive messages

### Adding Projects or Content

- Update `index.html` with project details (title, description, link)
- Add project images to `assets/images/` and optimize them
- Reference images with relative paths: `<img src="assets/images/project-name.jpg" alt="...">`
- Test on mobile devices to ensure responsive display

## Performance Considerations

- **Minimize HTTP requests:** Combine images into spritesheet if using many icons; use CSS for simple graphics
- **Lazy loading:** For portfolios with many images, consider adding `loading="lazy"` attribute to `<img>` tags
- **CSS efficiency:** Remove unused styles and avoid overly complex selectors
- **Favicon:** Add favicon at root or reference in `<head>`: `<link rel="icon" href="assets/icons/favicon.ico">`

## Accessibility Standards

- **WCAG 2.1 AA compliance** is the target for a professional portfolio
- Use sufficient color contrast (test with tools like WebAIM Contrast Checker)
- Provide meaningful `alt` text for all images
- Ensure keyboard navigation works (focus states, logical tab order)
- Use semantic HTML to help screen readers understand page structure

## SEO Best Practices

- Include relevant `<meta name="description">` in `<head>`
- Use semantic HTML tags (`<h1>` for main title, `<h2>` for sections)
- Keep URLs clean if adding multiple pages
- Add social media meta tags (Open Graph) if sharing is important

## GitHub Pages Configuration

This repository is configured as a GitHub Pages site:
- **Source:** The `main` branch is the deployment source (default)
- **Custom domain:** If using a custom domain, create a `CNAME` file at the repository root
- **Enforcement:** HTTPS is automatically enabled and recommended

## Security Notes

- Avoid committing sensitive information (API keys, secrets)
- Use HTTPS links for all external resources
- If adding forms, use a third-party service (Formspree, Basin, Netlify Forms) rather than server-side form handling

## Future Enhancements

When expanding this portfolio, consider:
- Adding a dark mode toggle (CSS custom properties make this easy)
- Implementing smooth scroll navigation with minimal JavaScript
- Adding contact form with a third-party service
- Creating a blog section (can remain static with individual HTML files or use a static site generator like Jekyll)
- Setting up GitHub Actions for automated optimization or validation (optional)

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [WebAIM Accessibility Resources](https://webaim.org/)
- [Web.dev Performance Guide](https://web.dev/performance/)
