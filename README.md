
## wolf_alpha

## Wolf Alpha - Full-Stack Website

A complete, production-ready full-stack website for Wolf Alpha, a premium software development company.

## 🚀 Tech Stack

**Frontend:**
- React.js 18
- CSS3 (Responsive Design)
- Modern JavaScript (ES6+)

**Backend:**
- Node.js
- Express.js
- CORS enabled
- Environment variables support

## 📁 Project Structure

```
wolf_alpha/
├── client/                  # Frontend React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Hero.js
│   │   │   ├── About.js
│   │   │   ├── Services.js
│   │   │   ├── WhyChooseUs.js
│   │   │   ├── Process.js
│   │   │   ├── Contact.js
│   │   │   ├── Footer.js
│   │   │   └── [corresponding CSS files]
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .env
│   └── package.json
│
└── server/                  # Backend Node.js API
    ├── routes/
    │   └── contactRoutes.js
    ├── controllers/
    │   └── contactController.js
    ├── services/
    │   └── contactService.js
    ├── middleware/
    │   └── validation.js
    ├── server.js
    ├── .env
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (optional - defaults are set):
```bash
# .env file already configured with defaults
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

4. Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (optional - defaults are set):
```bash
# .env file already configured
REACT_APP_API_URL=http://localhost:5000
```

4. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🌐 Running the Complete Application

1. **Start Backend** (Terminal 1):
```bash
cd server
npm install
npm start
```

2. **Start Frontend** (Terminal 2):
```bash
cd client
npm install
npm start
```

3. Open your browser and visit: `http://localhost:3000`

## 📋 Features

✅ Fully responsive design (mobile, tablet, desktop)
✅ Modern, professional UI/UX
✅ Smooth scrolling navigation
✅ Mobile-friendly hamburger menu
✅ Contact form with validation
✅ Client-side and server-side validation
✅ REST API architecture
✅ Error handling
✅ Success/error feedback
✅ SEO-optimized HTML structure
✅ Production-ready code

## 📄 API Endpoints

### Health Check
- **GET** `/api/health`
- Returns API status

### Contact Form
- **POST** `/api/contact`
- Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Example Inc",
  "message": "Your message here"
}
```

## 🚢 Deployment

### Frontend Deployment (Netlify/Vercel/GitHub Pages)

1. Build the production version:
```bash
cd client
npm run build
```

2. Deploy the `build/` folder to your hosting service

3. Set environment variable on hosting platform:
```
REACT_APP_API_URL=https://your-backend-url.com
```

### Backend Deployment (Render/Railway/VPS)

1. Push the `server/` directory to your hosting service

2. Set environment variables:
```
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.com
```

3. Install dependencies and start:
```bash
npm install
npm start
```

## 📧 Email Integration (Production)

The contact form currently logs submissions to the console. For production, integrate an email service:

1. Install email package (e.g., nodemailer, SendGrid, Mailgun)
2. Update `server/services/contactService.js`
3. Add email credentials to `.env`

Example with Nodemailer:
```javascript
// In contactService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: 'hello@wolfalpha.com',
  subject: `New Contact: ${formData.name}`,
  html: `...`
});
```

## 🎨 Customization

### Colors
Edit CSS variables in `client/src/index.css`:
```css
:root {
  --primary-color: #1a1a1a;
  --accent-color: #ff6b35;
  --secondary-color: #f5f5f5;
}
```

### Content
Update content in respective component files in `client/src/components/`

## 📝 License

MIT License - feel free to use this project for your needs.

## 🤝 Support

For issues or questions, contact: kashichaudhary.2002icloud.com

---

**Built with ❤️ by Wolf Alpha**

# wolf_alpha
# live link
 https://mr-strangerx11.github.io/business/
