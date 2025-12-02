# Dream AI: Your AI-Powered Website Generator 🤖

Dream is a cutting-edge web application that leverages the power of Google's Gemini AI to generate website code from simple user prompts. ✨ Simply describe the website you envision, and Dream AI will generate the HTML, CSS, and JavaScript, allowing you to preview and refine your creation in real-time. It solves the problem of quickly prototyping and generating website code, making web development more accessible and efficient.

## 🚀 Key Features

- **AI-Powered Code Generation:** Generate website code (HTML, CSS, JavaScript) from natural language prompts using Google's Gemini AI. 🧠
- **Real-time Preview:** See your website come to life with a live preview that updates as you refine your prompts. 👁️
- **Iterative Updates:** Refine your website by providing subsequent prompts to update the generated code. 🔄
- **Chat Interface:** Interact with the AI through a user-friendly chat-like interface. 💬
- **Code View:** Inspect and copy the generated HTML and CSS code. 💻
- **Responsive Preview:** Preview your website on different screen sizes (desktop, tablet, mobile). 📱
- **Full-Screen Mode:** Maximize the preview area for a better viewing experience. 🖥️
- **Easy Navigation:** Seamlessly navigate between the landing page and the website builder. 🧭

## 🛠️ Tech Stack

*   **Frontend:**
    *   React
    *   React Router DOM
    *   Lucide React (icons)
*   **AI:**
    *   Google Gemini AI (@google/genai)
*   **Build Tool:**
    *   Vite
*   **Language:**
    *   TypeScript
*   **Other:**
    *   Node.js
    *   npm

## 📦 Getting Started / Setup Instructions

### Prerequisites

*   Node.js (>=18)
*   npm or yarn
*   A Google Gemini API key. Get one [here](https://ai.google.dev/).

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    cd Dream-AI
    ```

2.  Install dependencies:

    ```bash
    npm install # or yarn install
    ```

3.  Create a `.env` file in the root directory and add your Gemini API key:

    ```
    VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```

### Running Locally

1.  Start the development server:

    ```bash
    npm run dev # or yarn dev
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

## 💻 Usage

1.  Navigate to the `/builder` route to access the website builder.
2.  Enter a prompt describing the website you want to generate in the chat interface.
3.  Click the "Send" button or press Enter to send the prompt to the AI.
4.  The AI will generate the website code, and a preview will be displayed.
5.  Use subsequent prompts to refine the generated website.
6.  Switch between preview and code view using the toggle buttons.
7.  Adjust the preview size to simulate different devices.

## 📂 Project Structure

```
dream-ai/
├── src/
│   ├── components/
│   │   ├── BuilderPage.tsx       # Main website builder component
│   │   ├── CodeViewer.tsx        # Component to display generated code
│   │   ├── LandingPage.tsx       # Landing page component
│   │   ├── PreviewFrame.tsx      # Component to render website preview in an iframe
│   │   └── ...
│   ├── services/
│   │   └── geminiService.ts    # Service for interacting with the Gemini AI API
│   ├── App.tsx                 # Main application component with routing
│   ├── index.tsx               # Entry point for the React application
│   ├── types.ts                # Type definitions
│   └── ...
├── vite.config.ts            # Vite configuration file
├── package.json              # Project metadata and dependencies
├── README.md                 # This file
├── .env                      # Environment variables (API keys)
└── ...
```

## 📸 Screenshots

(Add screenshots of the landing page, builder page, and code view here)

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## 📬 Contact

**Ashutosh Maurya**  
Email: [ashutoshmaurya585@gmail.com](mailto:ashutoshmaurya585@gmail.com)  
Website: [aashutosh.me](https://aashutosh.me) 


## 💖 Thanks

Thank you for checking out Dream AI! We hope you find it useful.

