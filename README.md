# Decart AI Real-time Video Editor

A React TypeScript application that demonstrates real-time video editing using the Decart AI SDK. Apply dynamic AI-powered edits to live video streams and update edit instructions on-the-fly.

## Features

- ✨ Real-time video editing with Decart AI
- 🎥 Live camera stream processing
- 📝 Dynamic prompt updates
- 🎨 Modern, responsive UI
- ⚡ Built with Vite for fast development
- 📱 Mobile-friendly interface

## Prerequisites

- Node.js 16+ and npm
- A Decart AI API key (get one at https://www.decart.ai/)
- A webcam/camera device

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/westpoint0101/wealth.git
   cd wealth
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your API key:
   ```bash
   cp .env.example .env.local
   ```

4. Edit `.env.local` and add your Decart AI API key:
   ```
   REACT_APP_DECART_API_KEY=your_actual_api_key_here
   ```

## Development

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Building for Production

Build the optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment to GitHub Pages

Deploy to GitHub Pages with:

```bash
npm run deploy
```

Your app will be live at: **https://westpoint0101.github.io/wealth**

## Usage

1. **Grant Camera Access**: Allow the browser to access your camera when prompted
2. **View Live Stream**: The edited video stream will appear in the video player
3. **Update Prompts**: Enter a new editing instruction in the textarea and click "Update Prompt"
4. **Monitor Status**: Check the connection status at the bottom of the page

### Example Prompts

- "Change the person's shirt to red"
- "Add sunglasses to the person"
- "Put a crown on the person's head"
- "Change the background to a beach"
- "Make the person glow"

## Project Structure

```
.
├── src/
│   ├── App.tsx           # Main application component
│   ├── App.css           # Application styles
│   ├── main.tsx          # React entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html            # HTML entry point
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md             # This file
```

## API Reference

### Decart Client Methods

- `createDecartClient(config)` - Initialize the Decart AI client
- `client.realtime.connect(stream, options)` - Connect to realtime video processing
- `realtimeClient.setPrompt(prompt)` - Update the editing prompt
- `realtimeClient.disconnect()` - Disconnect from realtime service

### Model Configuration

The app uses the `lucy-2.5` model. Key properties:
- `fps` - Frames per second
- `width` - Video width
- `height` - Video height

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

Requires HTTPS in production for camera access.

## Troubleshooting

### Camera Access Denied
- Check browser permissions for camera access
- Try a different browser if permissions are stuck
- Ensure you're using HTTPS in production

### API Key Error
- Verify your API key is correct in `.env.local`
- Check that the key is not expired or revoked
- Ensure the environment variable is loaded (restart dev server if just added)

### Video Not Appearing
- Check browser console for errors
- Verify camera is connected and not in use by another app
- Try reloading the page

### Slow Performance
- Check internet connection
- Try reducing browser tab count
- Ensure GPU is available for processing

## License

MIT

## Support

For issues with the Decart AI SDK, visit: https://www.decart.ai/
