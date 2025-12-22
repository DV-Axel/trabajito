// javascript
// File: `src/components/RatingModel.jsx`
import React, { useEffect, useRef, useState } from 'react';
import { AiFillStar, AiOutlineStar, AiOutlineClose } from 'react-icons/ai';

export default function RatingModal({ open, onClose, onSubmit, loading = false }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const firstButtonRef = useRef(null);
    const textareaRef = useRef(null);
    const MAX_CHARS = 300;

    useEffect(() => {
        if (open) {
            setRating(0);
            setHover(0);
            setComment('');
            setTimeout(() => firstButtonRef.current?.focus(), 0);
        }
    }, [open]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (open) window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open) return null;

    const handleSubmit = () => {
        if (rating === 0) return;
        onSubmit({ rating, comment: comment.trim() });
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                className="relative w-full max-w-xl transform rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(2,40,58,0.35)] bg-white transition-all duration-300"
                style={{ zIndex: 60 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-[#02283A] to-[#03506f]">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/10 p-3 rounded-full flex items-center justify-center">
                            <AiFillStar className="h-6 w-6 text-yellow-400" />
                        </div>
                        <h3 className="text-white text-2xl font-bold leading-tight">Calificar servicio</h3>
                    </div>

                    <button
                        onClick={onClose}
                        aria-label="Cerrar"
                        className="text-white p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                        <AiOutlineClose className="h-6 w-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-8 py-6">
                    <p className="text-base text-gray-700 mb-5">Selecciona una puntuación y deja un comentario (opcional).</p>

                    <div className="mb-6">
                        <div className="flex items-center gap-4">
                            {[1, 2, 3, 4, 5].map((i) => {
                                const active = i <= (hover || rating);
                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        ref={i === 1 ? firstButtonRef : null}
                                        onMouseEnter={() => setHover(i)}
                                        onMouseLeave={() => setHover(0)}
                                        onFocus={() => setHover(i)}
                                        onBlur={() => setHover(0)}
                                        onClick={() => setRating(i)}
                                        aria-pressed={rating === i}
                                        aria-label={`Poner ${i} estrella${i > 1 ? 's' : ''}`}
                                        className={`p-2 rounded-md transition-transform transform focus:outline-none ${
                                            active ? 'scale-110 shadow-lg' : 'scale-100'
                                        }`}
                                    >
                                        {active ? (
                                            <AiFillStar className="h-10 w-10 text-yellow-400 drop-shadow-md" />
                                        ) : (
                                            <AiOutlineStar className="h-10 w-10 text-gray-300" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        <p
                            className="mt-3 text-sm font-medium text-[#02283A]"
                            aria-live="polite"
                        >
                            {rating > 0 ? `${rating} / 5 — Gracias por tu valoración` : 'Selecciona una puntuación'}
                        </p>
                    </div>

                    <div>
                        <label className="block text-md font-semibold mb-2 text-gray-800">Comentario (opcional)</label>
                        <textarea
                            ref={textareaRef}
                            value={comment}
                            onChange={(e) => setComment(e.target.value.slice(0, MAX_CHARS))}
                            rows={5}
                            placeholder="Escribe un comentario breve que ayude a mejorar el servicio..."
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-[#03506f] transition-shadow"
                        />
                        <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="text-gray-600">{comment.length === 0 ? 'Sé específico para ayudar a otros usuarios.' : ''}</span>
                            <span className={`font-mono ${comment.length > MAX_CHARS - 30 ? 'text-amber-600' : 'text-gray-500'}`}>{comment.length}/{MAX_CHARS}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-4 px-8 py-5 border-t border-gray-100 bg-white">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full px-5 py-2 bg-gray-100 text-sm font-medium hover:bg-gray-200 focus:outline-none"
                        disabled={loading}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={rating === 0 || loading}
                        className={`rounded-full px-6 py-2 text-sm font-semibold focus:outline-none transition-all shadow-md ${
                            rating === 0 || loading
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-[#03506f] to-[#02809a] text-white hover:brightness-105'
                        }`}
                    >
                        {loading ? 'Enviando...' : 'Enviar valoración'}
                    </button>
                </div>
            </div>
        </div>
    );
}