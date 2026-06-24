import TextInput from '@/Components/TextInput';
import { useState } from 'react';

function EyeIcon({ hidden }) {
    return hidden ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path
                d="M3 3l18 18M10.7 5.1A9.5 9.5 0 0 1 12 5c5 0 8.5 4.5 9.5 7-0.4 1-1.2 2.2-2.3 3.3M6.6 6.6C4.6 7.9 3.3 10 2.5 12c1 2.5 4.5 7 9.5 7 1.7 0 3.2-.5 4.5-1.2M9.9 9.9a3 3 0 0 0 4.2 4.2"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
            />
        </svg>
    ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path
                d="M2.5 12c1-2.5 4.5-7 9.5-7s8.5 4.5 9.5 7c-1 2.5-4.5 7-9.5 7s-8.5-4.5-9.5-7Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
            />
            <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
    );
}

export default function PasswordInput({ className = '', ...props }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative mt-2">
            <TextInput
                {...props}
                type={isVisible ? 'text' : 'password'}
                className={`block w-full pr-12 ${className}`}
            />
            <button
                type="button"
                onClick={() => setIsVisible((visible) => !visible)}
                className="absolute inset-y-0 right-4 flex items-center text-[#8f6b5f] transition hover:text-[#5f4137]"
                aria-label={isVisible ? 'Hide password' : 'Show password'}
            >
                <EyeIcon hidden={isVisible} />
            </button>
        </div>
    );
}
