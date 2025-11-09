# 📚 Library Management System - Frontend

A modern, responsive web application for managing and borrowing books from a library. Built with React, TypeScript, and Tailwind CSS.

## 🌐 Live Links

- **Frontend**: [https://cloud-library-mas.netlify.app/](https://cloud-library-mas.netlify.app/)
- **Backend API**: [https://library-management-l2a3.vercel.app](https://library-management-l2a3.vercel.app)

## 📂 Repositories

- **Frontend**: [github.com/MasumAhmed19/L2A4](https://github.com/MasumAhmed19/L2A4)
- **Backend**: [github.com/MasumAhmed19/L2A3](https://github.com/MasumAhmed19/L2A3)

## ✨ Features

### Core Functionality
- 📖 **Browse Books**: View all available books with detailed information
- ➕ **Add Books**: Add new books to the library collection
- ✏️ **Edit Books**: Update book information
- 🗑️ **Delete Books**: Remove books from the system
- 📅 **Borrow Books**: Borrow books with due date selection
- 📋 **Borrow Summary**: Track your borrowing history

### User Interface
- ✅ Fully responsive design (mobile, tablet, desktop)
- 🎨 Modern UI with Tailwind CSS
- ⚡ Real-time data updates

### Technical Features
- 🔄 Redux Toolkit for state management
- 🔗 RTK Query for efficient data fetching
- 📝 Form validation with React Hook Form
- 🗓️ Calendar date picker
- 💬 Toast notifications with Sonner
- 🎨 Beautiful UI components (shadcn/ui)

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Redux Toolkit** - State management
- **RTK Query** - Server state management
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Hook Form** - Form management
- **Sonner** - Toast notifications
- **date-fns** - Date utilities

### Backend
- **Node.js & Express** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **CORS** - Cross-origin support

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/MasumAhmed19/L2A4.git
cd L2A4
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment variables**
Create a `.env.local` file in the root directory:
```
VITE_API_URL=https://library-management-l2a3.vercel.app/api
```

4. **Start the development server**
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 📜 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Footer/
│   ├── Header/
│   └── ui/             # shadcn/ui components
├── pages/              # Page components
│   ├── Home/           # Main dashboard
│   ├── AddBook/        # Add book page
│   ├── EditBook/       # Edit book page
│   ├── DetailBook/     # Book details
│   ├── Borrow/         # Borrow functionality
│   └── BorrowSummary/  # Borrow history
├── redux/              # Redux store and queries
│   ├── api/            # RTK Query endpoints
│   ├── hook.ts         # Custom hooks
│   └── store.ts        # Redux store
├── routes/             # Route configuration
├── lib/                # Utilities
└── App.tsx             # Main app component
```

## 🔄 API Integration

The frontend communicates with the backend API for:
- Fetching all books
- Getting book details by ID
- Creating new books
- Updating book information
- Deleting books
- Creating borrow records
- Fetching borrow history


## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔐 Best Practices

- ✅ TypeScript for type safety
- ✅ Component-based architecture
- ✅ State management with Redux
- ✅ Efficient data fetching with RTK Query
- ✅ Responsive design with Tailwind CSS
- ✅ Form validation with React Hook Form
- ✅ Error handling and user feedback

## 🐛 Troubleshooting

### CORS Issues
Ensure the backend API URL in `.env.local` is correctly configured.

### Build Errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
Vite will automatically use the next available port if 5173 is in use.

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Vite Guide](https://vitejs.dev)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Masum Ahmed**
- GitHub: [@MasumAhmed19](https://github.com/MasumAhmed19)

## 🎯 Future Enhancements

- User authentication and authorization
- Advanced search and filtering
- Book recommendations
- User ratings and reviews
- Email notifications for due dates
- Admin dashboard
- Payment integration
- Mobile app version
