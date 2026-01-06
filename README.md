# Dicta

A modern, elegant speech-to-text note-taking web application with beautiful glasmorphism and neumorphism design. Capture your thoughts effortlessly by speaking, with real-time transcription and intelligent note management.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34C26?logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)

## ✨ Features

- **🎯 Speech-to-Text Recording** - Capture your thoughts by speaking with high accuracy
- **⚡ Live Transcription** - See words appear in real-time as you speak with interim and final results
- **📝 Smart Note Management** - Save, edit, and delete notes with ease
- **🏷️ Auto Tag Extraction** - Automatically detects and extracts hashtags from your notes
- **🌓 Dark/Light Mode** - Beautiful toggle between dark (neon accents) and light (pastel) themes
- **📱 Fully Responsive** - Seamless experience on mobile, tablet, and desktop devices
- **✨ Smooth Animations** - Elegant micro-interactions and transitions throughout the app
- **💾 Local Storage** - All your notes are securely saved in your browser's local storage
- **🔊 Audio Feedback** - Optional sound effects for recording start, stop, and save events
- **🎨 Modern Design** - Glassmorphism and neumorphism design patterns for a premium look

## 🚀 Quick Start

### Option 1: Direct Browser Access
1. Simply open `index.html` in your web browser
2. Allow microphone access when prompted
3. Click the microphone button to start recording
4. Speak clearly, and your words will appear in real-time
5. Stop recording and your note is automatically saved

### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/nikhilesh9ix/Dicta.git

# Navigate to the project directory
cd Dicta

# Open in your preferred browser
# No build process or dependencies required!
```

## 📋 Usage Guide

### Recording Notes
1. **Start Recording**: Click the circular microphone button to begin
2. **Speak Clearly**: Speak at a natural pace and volume
3. **View Live Text**: See both interim (grayed) and final transcription
4. **Stop Recording**: Click the red stop button to end recording
5. **Save Automatically**: Your note is saved to local storage

### Managing Notes
- **View All Notes**: Scroll down to see all your saved notes with timestamps
- **Edit Notes**: Click the edit icon on any note to modify it
- **Delete Notes**: Click the trash icon to remove a note (confirmation required)
- **View Tags**: Hashtags in your notes are automatically extracted and displayed
- **Filter by Tags**: (Coming in future updates)

### Customization
- **Change Language**: Modify `recognition.lang` in `app.js` (currently set to 'en-US')
- **Add Sound Effects**: Place audio files in the `sounds/` directory:
  - `start.mp3` - When recording begins
  - `stop.mp3` - When recording ends
  - `save.mp3` - When a note is saved

## 🎨 Design Highlights

### Glassmorphism
- Transparent, frosted-glass effect on note cards and containers
- Creates depth and visual hierarchy while maintaining elegance

### Neumorphism
- Soft shadow effects on the primary microphone button
- Creates a tactile, three-dimensional appearance

### Color Schemes
- **Dark Mode**: Deep background with vibrant neon accent colors for contrast
- **Light Mode**: Clean white background with soft pastel tones

### Micro-interactions
- Button state transitions and animations
- Wave effects during recording
- Smooth fade-in/out for notifications
- Scroll animations for UI elements

## 🌐 Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Recommended for best performance |
| Edge | ✅ Full | Excellent speech recognition support |
| Firefox | ⚠️ Partial | Speech recognition may require flags |
| Safari | ⚠️ Partial | Limited Web Speech API support |
| Opera | ✅ Full | Based on Chromium engine |

> **Note**: WhispNote requires the Web Speech API, which is available in modern browsers. For the best experience, use Chrome or Edge.

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic structure and accessibility |
| **CSS3** | Modern styling with custom properties, grid, flexbox, animations |
| **Vanilla JavaScript** | No frameworks - pure, performant code |
| **Web Speech API** | Advanced speech recognition capabilities |
| **Font Awesome 6** | Beautiful icons |
| **Google Fonts (Inter)** | Modern typography |

## 📁 Project Structure

```
Dicta/
├── index.html           # Main HTML file with app structure
├── README.md           # This file
├── css/
│   └── styles.css      # Complete styling with glassmorphism & neumorphism
├── js/
│   └── app.js          # All JavaScript logic (414 lines of code)
└── sounds/
    └── README.md       # Audio files guidance
```

## 🎯 Core Features Explained

### Real-time Speech Recognition
- Uses browser's native Web Speech API
- Processes both interim and final transcription results
- Handles multiple speech segments seamlessly

### Persistent Storage
- All notes stored in browser's `localStorage`
- Data persists across sessions
- No server required

### Smart Tag Extraction
- Regex-based hashtag detection
- Automatically formats and stores tags
- Quick visual identification of topics

### Responsive Design
- Mobile-first approach
- Bottom navigation for touch devices
- Adaptive layouts for all screen sizes

## 🔐 Privacy & Security

- **100% Client-side**: No data sent to external servers
- **Local Storage Only**: All notes remain on your device
- **No Tracking**: No analytics or user tracking
- **Microphone Access**: Only used during active recording sessions

## 🚀 Future Enhancements

- [ ] Cloud synchronization (optional)
- [ ] Note search and advanced filtering
- [ ] Tag-based note filtering and organization
- [ ] Export notes to PDF/TXT
- [ ] Voice commands for app control
- [ ] Multi-language support UI
- [ ] Dark mode improvements
- [ ] Note sharing capabilities
- [ ] Offline mode enhancement

##  License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Nikhilesh Rao** - [GitHub Profile](https://github.com/nikhilesh9ix)

Created as a Project-Based Learning (PBL) assignment for Web Technologies.

## 🙏 Credits & Resources

### Free Sound Effects Sources
- [Freesound.org](https://freesound.org/)
- [Mixkit Sound Effects](https://mixkit.co/free-sound-effects/)
- [Zapsplat](https://www.zapsplat.com/)

### Design Inspiration
- Glassmorphism design trend
- Neumorphism UI patterns
- Modern web app best practices

### Icons & Fonts
- [Font Awesome 6](https://fontawesome.com/)
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)

## 💡 Tips for Best Experience

1. **Use Chrome or Edge** for the most reliable speech recognition
2. **Speak clearly and at a normal pace** for accurate transcription
3. **Allow microphone permissions** in your browser settings
4. **Use in a quiet environment** to minimize background noise
5. **Add sound effects** to the sounds folder for audio feedback
6. **Toggle dark mode** based on your lighting conditions

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Microphone not working | Check browser permissions, try Chrome/Edge |
| Speech not being recognized | Ensure you're in a quiet environment, speak clearly |
| No sound effects | Add audio files to the sounds/ directory |
| Notes not saving | Check if browser allows localStorage, clear cache |
| Poor performance | Close other tabs, restart browser, check connection |

## 📞 Support & Feedback

For issues, suggestions, or questions, please open an issue on GitHub or contact the author directly.

---

**Made with ❤️ using HTML5, CSS3, and Vanilla JavaScript**
