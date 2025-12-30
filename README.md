# MindThaw ❄️🌷
> *From Winter Isolation to Spring Renewal.*

![MindThaw Dashboard](https://github.com/user-attachments/assets/PLACEHOLDER_FOR_YOUR_SCREENSHOT_URL)

## 💡 The Inspiration
Journaling is a powerful tool for mental health, but text on a screen often feels flat and clinical. We struggle to visualize our emotional progress. 

**MindThaw** was born from the idea that our emotions are organic—they grow, change, and bloom. We wanted to transform the act of journaling from a "task" into a "gardening experience," where users can see their emotional history evolve from a cold, dark winter into a vibrant, blooming spring.

## 🚀 What it Does
MindThaw is an AI-powered 3D journaling experience. 
1.  **AI Analysis:** The user enters their thoughts. Google Gemini 2.5 Flash analyzes the sentiment, extracting a "Mood Score" and assigning a symbolic color.
2.  **Procedural Generation:** Using Three.js, the app procedurally generates a unique 3D flower. 
    * *Sad/Anxious:* The flower is jagged, slow-moving, and cool-toned. The environment turns to night.
    * *Happy/Energetic:* The flower is round, bouncy, and warm-toned. The environment shifts to a warm sunset.
3.  **The Garden (Persistence):** Every entry is saved to a Supabase database. Over time, the user builds a "Garden of Emotions," visualizing their mental journey.
4.  **Immersive Atmosphere:** The app features dynamic lighting, post-processing (bloom/glow), and adaptive audio that shifts between winter winds and spring birds based on the user's average mood.

## 🎥 Demo Video
[![Watch the MindThaw Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE)
*(Click the image above to watch the walkthrough)*

## 🌐 Live Link
[Try MindThaw Live](https://mind-thaw.vercel.app/)

## 🛠️ Tech Stack
* **Frontend:** React, Vite, Tailwind CSS
* **3D Engine:** React Three Fiber (Three.js), React Spring (Physics), Drei
* **AI Brain:** Google Gemini API (`gemini-2.5-flash`)
* **Database:** Supabase (PostgreSQL)
* **State Management:** Zustand
* **Post-Processing:** `@react-three/postprocessing` (Bloom, Vignette)

## ⚙️ How to Run Locally

1.  **Clone the repo**
    ```bash
    git clone [https://github.com/yourusername/mind-thaw.git](https://github.com/yourusername/mind-thaw.git)
    cd mind-thaw
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root and add your keys:
    ```env
    VITE_GEMINI_API_KEY=your_gemini_key
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the App**
    ```bash
    npm run dev
    ```

## 🏆 Hackathon Challenges Overcome
* **Procedural Art:** Instead of using static assets, we wrote custom shaders and math to warp torus geometries in real-time based on AI sentiment scores.
* **Adaptive Audio:** We implemented an audio mixing engine that crossfades between two distinct tracks (Winter vs. Spring) based on the calculated average mood of the user's history.
* **Mobile Responsiveness:** We built a custom "Cinematic Dashboard" layout that adapts from a sidebar interface on desktop to a scrollable vertical stack on mobile.
