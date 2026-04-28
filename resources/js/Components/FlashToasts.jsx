import { usePage } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';

const AUTO_CLOSE_MS = 4000;

export default function FlashToasts() {
    const { flash = {}, errors = {} } = usePage().props;
    const [toasts, setToasts] = useState([]);
    const lastValidationErrorRef = useRef(null);

    const firstValidationError = useMemo(() => {
        const values = Object.values(errors || {});
        for (const value of values) {
            if (typeof value === 'string' && value.trim()) return value;
            if (Array.isArray(value) && typeof value[0] === 'string') return value[0];
        }
        return null;
    }, [errors]);

    const incoming = useMemo(
        () =>
            [
                flash.success ? { type: 'success', message: flash.success } : null,
                flash.error ? { type: 'error', message: flash.error } : null,
            ].filter(Boolean),
        [flash.success, flash.error],
    );

    useEffect(() => {
        if (incoming.length === 0) return;

        const created = incoming.map((item) => ({
            id: `${Date.now()}-${Math.random()}`,
            ...item,
        }));

        setToasts((prev) => [...prev, ...created]);

        const timers = created.map((item) =>
            setTimeout(() => {
                setToasts((prev) => prev.filter((toast) => toast.id !== item.id));
            }, AUTO_CLOSE_MS),
        );

        return () => {
            timers.forEach((timer) => clearTimeout(timer));
        };
    }, [incoming]);

    useEffect(() => {
        if (!firstValidationError) return;
        if (lastValidationErrorRef.current === firstValidationError) return;
        lastValidationErrorRef.current = firstValidationError;

        const id = `${Date.now()}-${Math.random()}`;
        setToasts((prev) => [...prev, { id, type: 'error', message: firstValidationError }]);

        const timer = setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, AUTO_CLOSE_MS);

        return () => clearTimeout(timer);
    }, [firstValidationError]);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    if (toasts.length === 0) return null;

    return (
        <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[min(92vw,360px)] flex-col gap-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`pointer-events-auto rounded-xl border px-4 py-3 shadow-lg ${
                        toast.type === 'success'
                            ? 'border-[#9ed4ca] bg-[#ecfaf6] text-[#1f5e50]'
                            : 'border-[#f1b6b6] bg-[#fff1f1] text-[#8a2e2e]'
                    }`}
                >
                    <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium leading-snug">{toast.message}</p>
                        <button
                            type="button"
                            onClick={() => removeToast(toast.id)}
                            className="text-xs font-semibold opacity-70 transition hover:opacity-100"
                        >
                            x
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
