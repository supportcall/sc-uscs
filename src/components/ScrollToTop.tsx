import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';

const ScrollToTop = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show scroll to top when scrolled down more than 300px
      setShowScrollTop(scrolled > 300);
      
      // Show scroll to bottom when not at the bottom (with 100px threshold)
      setShowScrollBottom(scrolled + windowHeight < documentHeight - 100);
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('resize', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('resize', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  if (!showScrollTop && !showScrollBottom) {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2">
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full shadow-elegant hover:shadow-glow transition-all duration-300"
          size="icon"
          aria-label="Scroll to top of page"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
      {showScrollBottom && (
        <Button
          onClick={scrollToBottom}
          className="w-12 h-12 rounded-full shadow-elegant hover:shadow-glow transition-all duration-300"
          size="icon"
          aria-label="Scroll to bottom of page"
          title="Go to bottom"
        >
          <ArrowDown className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

export default ScrollToTop;
