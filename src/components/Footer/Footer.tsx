import { Link } from "react-router";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          
          {/* Left: Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Cloud Library. Built by <span className="font-medium text-gray-800 dark:text-gray-200">Masum Ahmed</span>
          </div>

          {/* Center: Navigation */}
          {/* <div className="flex gap-6 text-sm">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Home
            </Link>
            <Link to="/books" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Books
            </Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Contact
            </Link>
          </div> */}

          {/* Right: Social Icons */}
          <div className="flex gap-3">
            <a 
              href="https://github.com/MasumAhmed19" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/masum-ahmed-61b3b8294/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="mailto:masum.ahmed1328@gmail.com" 
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label="Email"
            >
              <Mail size={18} />
            
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;