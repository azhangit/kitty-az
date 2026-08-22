import { useEffect, useMemo, useRef, useState } from 'react';

function FieldError({ message }) {
    if (!message) return null;
    return <p className="mt-1 text-xs font-medium text-red-600">{message}</p>;
}

export default function ManageableOptionSelect({
    value,
    items = [],
    onChange,
    onAdd,
    onRename,
    onDelete,
    className = '',
    error = null,
    placeholder = 'Select',
    formatLabel = (item) => item,
    addPlaceholder = 'Add option',
}) {
    const [open, setOpen] = useState(false);
    const [customValue, setCustomValue] = useState('');
    const [editingValue, setEditingValue] = useState(null);
    const [editDraft, setEditDraft] = useState('');
    const rootRef = useRef(null);

    const visibleItems = useMemo(
        () => Array.from(new Set(items.filter(Boolean))).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })),
        [items],
    );

    useEffect(() => {
        const onPointerDown = (event) => {
            if (!rootRef.current?.contains(event.target)) {
                setOpen(false);
                setEditingValue(null);
            }
        };

        document.addEventListener('mousedown', onPointerDown);
        return () => document.removeEventListener('mousedown', onPointerDown);
    }, []);

    const addCustomValue = () => {
        const nextValue = customValue.trim();
        if (!nextValue) return;
        onAdd?.(nextValue);
        setCustomValue('');
    };

    const saveRename = (oldValue) => {
        const nextValue = editDraft.trim();
        if (!nextValue || nextValue === oldValue) {
            setEditingValue(null);
            return;
        }
        onRename?.(oldValue, nextValue);
        setEditingValue(null);
    };

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                className={`${className} flex w-full items-center justify-between text-left`}
            >
                <span className={value ? 'text-[#2f1d15]' : 'text-[#9a8f89]'}>
                    {value ? formatLabel(value) : placeholder}
                </span>
                <span className="text-xs text-[#7f7570]">{open ? '▲' : '▼'}</span>
            </button>
            <FieldError message={error} />

            {open ? (
                <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-[#e5d9d2] bg-white shadow-lg">
                    <div className="max-h-56 overflow-y-auto p-2">
                        {visibleItems.length === 0 ? (
                            <p className="px-2 py-3 text-xs text-[#7f7570]">No options yet.</p>
                        ) : (
                            visibleItems.map((item) => (
                                <div
                                    key={item}
                                    className={`mb-1 flex items-center gap-1 rounded-lg px-2 py-1.5 ${
                                        value === item ? 'bg-[#e8f5f2]' : 'hover:bg-[#f7f2ef]'
                                    }`}
                                >
                                    {editingValue === item ? (
                                        <input
                                            autoFocus
                                            value={editDraft}
                                            onChange={(e) => setEditDraft(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    saveRename(item);
                                                }
                                                if (e.key === 'Escape') {
                                                    setEditingValue(null);
                                                }
                                            }}
                                            className="min-w-0 flex-1 rounded-lg border border-[#e5d9d2] px-2 py-1 text-sm"
                                        />
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onChange(item);
                                                setOpen(false);
                                            }}
                                            className="min-w-0 flex-1 truncate text-left text-sm text-[#2f1d15]"
                                        >
                                            {formatLabel(item)}
                                        </button>
                                    )}

                                    {editingValue === item ? (
                                        <button
                                            type="button"
                                            onClick={() => saveRename(item)}
                                            className="rounded-md px-2 py-1 text-xs font-semibold text-[#18574a] hover:bg-[#d8efe9]"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingValue(item);
                                                setEditDraft(item);
                                            }}
                                            className="flex h-6 w-6 items-center justify-center rounded-full text-[#6f5449] hover:bg-[#f1ece8]"
                                            aria-label={`Rename ${item}`}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => onDelete?.(item)}
                                        className="flex h-6 w-6 items-center justify-center rounded-full text-xs text-[#6f5449] hover:bg-red-100 hover:text-red-600"
                                        aria-label={`Delete ${item}`}
                                    >
                                        x
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="border-t border-[#efe6e0] p-2">
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <input
                                type="text"
                                value={customValue}
                                onChange={(e) => setCustomValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addCustomValue();
                                    }
                                }}
                                placeholder={addPlaceholder}
                                className="min-w-0 flex-1 rounded-xl border border-[#e5d9d2] bg-white px-3 py-2 text-sm"
                            />
                            <button
                                type="button"
                                onClick={addCustomValue}
                                className="rounded-xl bg-[#9cd2c8] px-4 py-2 text-sm font-semibold text-[#18574a]"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
