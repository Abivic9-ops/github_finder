# GitHub Finder

A sleek, modern, and professional web application built with Next.js that allows users to search and explore GitHub profiles and repositories with an intuitive, responsive interface.

![GitHub Finder Preview](https://via.placeholder.com/800x400/1e293b/60a5fa?text=GitHub+Finder+Preview)

##  Features

- **User Search**: Search for any GitHub user by username
- **Profile Display**: View comprehensive user profiles with avatars, bios, and statistics
- **Repository Exploration**: Browse user's repositories sorted by star count
- **Dark/Light Mode**: Toggle between beautiful dark and light themes
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Modern UI**: Sleek design with smooth animations and hover effects
- **Loading States**: Enhanced loading indicators with skeleton screens
- **Error Handling**: Graceful error messages for invalid searches
- **Performance Optimized**: Fast loading with efficient API calls

##  Live Demo

[View Live Demo](https://github-finder-demo.vercel.app) *(Replace with actual deployment URL)*

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **API**: GitHub REST API
- **Deployment**: Vercel

##  Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- GitHub account (optional, for API rate limits)

##  Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/github-finder.git
   cd github-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

##  Usage

1. Enter a GitHub username in the search bar
2. Press Enter or click the Search button
3. View the user's profile information and repositories
4. Toggle between dark and light modes using the theme button
5. Click on repository links to visit GitHub
6. Explore user statistics and location information

##  Design Features

- **Gradient Backgrounds**: Beautiful gradient overlays for visual appeal
- **Glass Morphism**: Backdrop blur effects for modern aesthetics
- **Smooth Animations**: Fade-in, slide-up, and hover animations
- **Interactive Elements**: Hover effects and scaling transitions
- **Typography**: Clean, readable fonts with proper hierarchy
- **Color Schemes**: Carefully chosen color palettes for both themes

##  API Usage

The application uses the GitHub REST API v3:

- `GET /users/{username}` - Fetch user profile data
- `GET /users/{username}/repos` - Fetch user repositories

**Rate Limits**: 60 requests per hour for unauthenticated requests, 5000 for authenticated.

##  Project Structure

```
github-finder/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.js            # Root layout component
│   └── page.js              # Main page component
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
└── README.md               # Project documentation
```

##  Development Challenges & Solutions

### Problems Faced

1. **API Rate Limiting**: GitHub API has strict rate limits for unauthenticated requests
   - **Solution**: Implemented proper error handling and user feedback for rate limit errors

2. **Responsive Design**: Ensuring consistent experience across all device sizes
   - **Solution**: Used Tailwind's responsive utilities and tested on multiple breakpoints

3. **Theme Persistence**: Maintaining theme choice across browser sessions
   - **Solution**: Implemented localStorage-based theme persistence with useEffect

4. **Loading States**: Providing meaningful feedback during API calls
   - **Solution**: Added animated loading spinners and disabled states during requests

5. **Animation Performance**: Ensuring smooth animations without impacting performance
   - **Solution**: Used CSS transforms and opacity changes instead of layout-triggering properties

### Achievements

 **Modern UI/UX**: Created a professional, sleek interface that rivals commercial applications
 **Full Responsiveness**: Seamless experience from mobile phones to desktop monitors
 **Theme System**: Complete dark/light mode implementation with smooth transitions **Performance**: Optimized API calls and efficient state management
**Accessibility**: Proper semantic HTML and keyboard navigation support
 **Error Handling**: Comprehensive error states with user-friendly messages
 **Code Quality**: Clean, maintainable code with proper component structure

### Lessons Learned

- **Tailwind CSS Mastery**: Deep understanding of utility-first CSS and responsive design
- **React State Management**: Effective use of hooks for complex state scenarios
- **API Integration**: Proper handling of REST APIs with error states and loading indicators
- **Animation Techniques**: CSS animations and transitions for enhanced user experience
- **Theme Implementation**: Building theme systems with CSS variables and JavaScript
- **Performance Optimization**: Minimizing re-renders and optimizing bundle size
- **User Experience**: Importance of loading states, error handling, and responsive design

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- Render
- Self-hosted with Docker

##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing comprehensive developer data
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS framework
- [Lucide](https://lucide.dev/) for beautiful icons
- [Vercel](https://vercel.com/) for seamless deployment

##  Contact

- **Project Link**: [https://github.com/yourusername/github-finder](https://github.com/yourusername/github-finder)
- **Email**: your.email@example.com
- **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

**Made with by [Abivic-Ops]**

*Star this repo if you found it helpful!* 
