# 🎬 Watchlist Application  

## 📌 Features  

### 📝 New Watchlist Creation  
- Users can create personalized watchlists by providing a name and description.  

### 📌 Dynamic Watchlist Display  
- The application dynamically displays all existing watchlists, automatically updating as users add or modify them.  

### 🎥 Add/Remove Movies  
- Users can add or remove movies from their watchlists with intuitive controls, ensuring smooth task management.  

### ✅ Mark Movies as Watched  
- Movies can be marked as "watched," with a visual cue indicating completed films for easy tracking of progress.  

### ✏️ Edit and Delete Watchlists  
- Watchlists can be edited or deleted, allowing users to modify details or remove them entirely from the interface.  

### 📊 Progress Bar  
- As users watch movies in a watchlist, their progress is tracked and displayed via a progress bar, which fills up as they complete watching all the movies in the list.  

### 🔍 Search and Add Movies  
- The search feature allows users to find movies by title and instantly add them to the currently displayed watchlist, enhancing movie discovery.  

### 🌙 Theme Switching  
- The app provides an option to switch between light and dark themes, offering both minimalist simplicity and a visually rich, engaging design.  

### 📱 Responsive Navigation  
- The app features a fully responsive sidebar and navigation bar, ensuring easy and intuitive navigation across pages, even on mobile devices.  

### 🎉 Gamification Features  
- Playful gamification elements, such as floating balloons and celebratory animations, are integrated to make the user experience more fun and engaging.  

---

## 🎨 Design Implementation  

### **Minimalist Design (Set of Requirements 1)**  

#### 1️⃣ Simple UI Layout  
- Uses a sidebar for intuitive navigation with minimal text and icons (`fa-home`, `fa-history`).  
- Clean forms with only essential inputs (e.g., watchlist name and description).  

#### 2️⃣ Light Theme  
- Implements a toggle button (`btn_toggle_theme`) to switch to a light color scheme.  
- Light theme prioritizes simplicity by minimizing animations and focusing on usability.  

#### 3️⃣ Mobile Responsiveness  
- Utilizes a responsive top navigation bar that collapses into a hamburger menu on smaller screens (`fa-bars`).  
- Adapts layouts for optimal viewing on various devices using the `meta viewport` tag.  

### **Engaging Design (Set of Requirements 2)**  

#### 🌑 Dark Theme  
- Dark theme (`class="dark-theme"`) with vibrant and rich colors for visual appeal.  

#### 🎬 Interactive Animations  
- Dynamic progress bar (`watch_progress_bar`) for visual feedback and engagement.  
- Sidebar highlights current active links with hover effects.  

#### 🏆 Gamification Elements  
- Interactive buttons (`btn__create__wishlist`) enhance user experience with icons (e.g., `fa-plus`).  
- Balloons appear as part of the gamification feature to celebrate when users watch all the movies in their watchlists.  

---

## 🔄 Dynamic Reconciliation of Requirements  

### 🎭 Theme Toggle (Dynamic UI)  
- The application allows users to switch between light and dark themes dynamically.  
- Satisfies both users who prefer minimalism and those who enjoy a visually vibrant interface.  

### 🔁 Consistent Layout Across Themes  
- The core layout remains simple and consistent regardless of the theme.  
- Ensures usability while adding interactivity through animations and visual effects.  

### 📲 Mobile-First Approach with Visual Appeal  
- The collapsible sidebar and responsive navigation bar make the app mobile-friendly.  
- The dark theme and animations maintain visual appeal for an engaging experience.  

---

## 🏗️ Rationale for Design Choices  

### ⚖️ Balancing Simplicity and Engagement  
- The inclusion of both a **light theme (minimalism)** and a **dark theme (engagement)** ensures the application meets different aesthetic preferences.  

### 🎯 Improving User Experience  
- Features like theme switching, responsive navigation, and progress bars enhance usability and engagement.  

### 🔧 Future Scalability  
- The code is modular and extensible.  
- Additional features like **custom animations, gamification elements, or new watchlist functionalities** can be easily integrated.  

