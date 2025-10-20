# Posts Blocks

This folder contains all post-related blocks for the Widad website.

## PostsCarousel

A full-width carousel block that displays posts filtered by category.

### Features
- Full-width responsive carousel
- One slide at a time
- Filters posts by selected category
- Displays post date, title, and description
- Background image with gradient overlay
- Same navigation arrows as product carousel
- Fully responsive (mobile, tablet, desktop)

### Usage
1. Add the "Posts Carousel Block" to any page in the CMS
2. Select a category (e.g., "News") to filter posts
3. Set the maximum number of posts to display (1-10)
4. The block will automatically fetch and display published posts from that category

### Responsive Breakpoints
- Mobile: 400px height, smaller text and padding
- Tablet (md): 500px height, medium text and padding
- Desktop (lg): 600px height, large text and padding

---

## TodaysHighlights

An interactive block that displays featured posts filtered by tags with click-to-preview functionality.

### Features
- **Left side**: Large preview of selected post with image, date, title, and description
- **Right side**: List of 3 posts in a column layout
- Click on any post to preview it on the left
- Selected post has primary red background
- Posts have white background with black/50 border
- Image on left, content on right for list items
- Fully responsive design
- Equal height for left and right sections

### Layout
- **Desktop**: Two-column grid (preview left, list right) with equal heights
- **Mobile**: Stacked layout (preview top, list bottom)

### Usage
1. Add the "Today's Highlights Block" to any page in the CMS
2. Select a tag to filter posts:
   - **Today**: Posts tagged as today's highlights
   - **Featured**: Featured posts
   - **Breaking News**: Breaking news posts
   - **Trending**: Trending posts
3. Set the number of posts (recommended: 3, max: 5)
4. The block will automatically fetch and display published posts with the selected tag

### Tags
Posts must have the corresponding tag assigned in the CMS to appear in this block. Tags can be added in the post editor sidebar.

### Styling
- List items: White background, black/50 border, 2px padding
- Selected: Primary red background with white text
- Smooth transitions on state changes
- Rounded corners (20px for preview, 10px for list items)

---

## AllNews

A paginated news block with client-side category filtering, displaying posts in a grid layout.

### Features
- **Category filtering**: Filter posts by category with "All" option
- **Pagination**: Client-side pagination with page numbers and navigation
- **Grid layout**: 3-column responsive grid (1 column mobile, 2 tablet, 3 desktop)
- **Category badges**: Display category on each post card
- **Hover effects**: Smooth transitions on hover
- **Fully responsive**: Adapts to all screen sizes

### Layout
- **Title**: "All News" heading at the top
- **Category filters**: Horizontal row of filter buttons
- **Posts grid**: 3-column grid with post cards
- **Pagination**: Centered pagination controls at the bottom

### Usage
1. Add the "All News Block" to any page in the CMS
2. Select categories to display as filters (e.g., Club, Matches, Transfers, Community, Press)
3. Set the maximum number of posts to fetch (default: 50)
4. Set posts per page (default: 6, range: 3-12)
5. The block will fetch all published posts from the selected categories

### Post Card Design
- **Image**: 4:3 aspect ratio with category badge overlay
- **Date**: Formatted as "Month Day, Year"
- **Title**: 2-line clamp with hover color change
- **Description**: 2-line clamp from meta description
- **Border**: Subtle border with shadow on hover
- **Rounded corners**: 20px border radius

### Pagination
- Previous/Next buttons with chevron icons
- Page numbers with ellipsis for large page counts
- Active page highlighted in primary red
- Disabled state for first/last pages
- Resets to page 1 when category changes

### Styling
- Active category: Primary red background with white text
- Inactive category: Border with transparent background
- Hover effects: Border darkens, shadow appears
- Rounded corners: 10px for buttons, 20px for cards
- Smooth transitions on all interactive elements

---

## MomentsOfGlory

A masonry-style grid block displaying posts filtered by tag, with a hero layout showcasing memorable moments.

### Features
- **Tag filtering**: Fetch posts by specific tag (e.g., "Moments of Glory")
- **Masonry layout**: Asymmetric grid with large and small post cards
- **Configurable title & description**: Customizable header content
- **Image overlays**: Dark gradient overlays with white text
- **Hover effects**: Image zoom on hover
- **Gray background**: Matches AllNews block styling

### Layout
- **Header**: Title on left, description on right (responsive)
- **Grid structure**:
  - Left column: 1 large post (spans 2 rows)
  - Right column top: 2 small posts side-by-side
  - Right column middle: 1 large post
  - Right column bottom: 2 small posts side-by-side
- **Mobile**: Single column stacked layout

### Usage
1. Add the "Moments of Glory Block" to any page in the CMS
2. Set a custom title (default: "Moments Of Glory")
3. Add an optional description
4. Select a tag to filter posts (e.g., "Moments of Glory")
5. Set the number of posts (4-6, recommended: 6)
6. Tag posts in the CMS with the selected tag

### Post Card Design
- **Large cards**: 2-3 line title, date, dark gradient overlay
- **Small cards**: 2 line title, date, dark gradient overlay
- **Images**: Cover the entire card with zoom effect on hover
- **Text**: White text over dark gradient for readability
- **Rounded corners**: 20px border radius

### Responsive Behavior
- **Desktop**: 2-column masonry grid
- **Tablet**: 2-column grid with adjusted aspect ratios
- **Mobile**: Single column, all cards same size

### Styling
- Background: #F5F5F5 (light gray)
- Card overlays: Gradient from black/80 to transparent
- Hover: Scale image to 105% with smooth transition
- Typography: Semibold titles, regular dates
- Spacing: 16px (4) gap between cards
