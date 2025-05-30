# 🎬 Filmpire

**Filmpire** is a dynamic and fully responsive movie showcase web application built with **React**, powered by **The Movie Database (TMDB)** API. Users can discover and explore a wide collection of up-to-date movies categorized by popularity, genre, and release timing. It also offers a personalized experience through features like favorites, watchlists, and user profiles.

![Filmpire Preview](/public/preview.png)

## 📚 Table of Contents

- [🔋 Features](#-features)
- [⚙️ Tech Stack](#️-tech-stack)
- [🔐 Authentication](#-authentication)
- [🧠 Planned Features](#-planned-features)
- [🌐 Deployment](#-deployment)
- [📜 License](#-license)

## 🔋 Features

👉 **Category Browsing**: Discover movies by Popular, Top Rated, and Upcoming categories from TMDB.  
👉 **Genre Filtering**: Instantly filter movies by genre like Action, Comedy, Horror, etc.  
👉 **Search Functionality**: Search for any movie using the title or keywords.  
👉 **Movie Details Page**: View full movie details like Rating, Runtime, Cast, Overview, and Action Buttons:
- 🌐 Movie website
- 🔗 IMDb link
- 🎥 Trailer viewer
- ❤️ Add to Favorites
- 📂 Add to Watchlist
- 🔙 Back to browsing

👉 **Recommendations**: View similar or related movies beneath each selected movie.  
👉 **Actor Pages**: Click on any cast member to see their profile and other movies they’ve acted in.  
👉 **Watchlist & Favorites**: Logged-in users can manage their personal movie list from their profile page.  
👉 **TMDB OAuth Integration**: Secure login via TMDB for a seamless user experience.  
👉 **Theme Support**: Light and Dark mode toggle with full theme persistence.  
👉 **Pagination**: Optimized movie listings with pagination support for fast navigation.  
👉 **Responsive Design**: Looks great across desktops, tablets, and mobile devices.  
👉 **Voice Assistant (Planned)**: Future support for **Alan AI** voice commands, pending promo code access.

### ⚙️ Tech Stack
- React
- Material UI
- React Router
- Redux(For global state management)
- Redux Toolkit Query(Api data fetching and caching)
- TMDB API
- Vercel
- Alan AI (Planned Integration)

## 🔐 Authentication

Filmpire uses **TMDB’s OAuth** system to authenticate users securely. Once logged in, users can add/remove movies from their personal **favorites** and **watchlists**, which are persisted via the TMDB user session.

### 🧠 Planned Features
- **Voice AI Integration (Alan AI)**  
  Planned integration with Alan AI for voice-based movie browsing. I have already reached out to Alan AI to request a promo code for educational purposes via email.

## 🌐 Deployment

Filmpire is live and deployed on **Vercel**.  
👉 [Live Demo](https://www.filmpire.net)

## 📜 License

This project is licensed under the [MIT License](LICENSE)
