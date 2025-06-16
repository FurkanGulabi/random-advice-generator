# **Random Advice Generator**

## Important

- **This app only works with a live server because the `file://` protocol does not support API calls**

### 📁 Project Structure

```
├── index.html # Main HTML File
├── style.css # Stylesheet File
└── script.js # JavaScript File
```

### 🌐 **Resources**

- Advice Slip API: `https://api.adviceslip.com/advice`
- Button Styling Referance: `https://uiverse.io/buttons`
- Icons: `https://fontawesome.com/`
- Color Palette: `https://coolors.co/`

### ⚙️ **How It Works**

1. The user clicks the "Random Advice" button.
2. `getAdviceFromAPI` function will get the data from api.
3. The returned data will be displayed in the `advice-text` element with Typewriter effect.
4. While the data is being fetched and displayed, the button will be disabled.
5. Once the data is displayed, the button will be enabled again.

### **GitHub Link**

- [Random Advice Generator](https://github.com/FurkanGulabi/random-advice-generator)
