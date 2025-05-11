
"use client";

import { useState, useEffect } from 'react';

interface FormattedDateProps {
  isoDateString: string;
  options?: Intl.DateTimeFormatOptions;
  className?: string;
}

const defaultOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC', // Explicitly set timezone to UTC for consistency
};

export function FormattedDate({ isoDateString, options = defaultOptions, className }: FormattedDateProps) {
  const [displayText, setDisplayText] = useState<string>('Loading date...');

  useEffect(() => {
    try {
      const dateObj = new Date(isoDateString);
      // Check if date is valid
      if (isNaN(dateObj.getTime())) {
        setDisplayText("Invalid Date");
      } else {
        setDisplayText(dateObj.toLocaleDateString('en-US', options));
      }
    } catch (error) {
      console.error("Error formatting date:", isoDateString, error);
      setDisplayText("Error"); 
    }
  }, [isoDateString, options]);

  return <span className={className}>{displayText}</span>;
}
