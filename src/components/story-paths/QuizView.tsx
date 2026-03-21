import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Quiz } from '@/types/storyPaths';
import { NarrationState } from '@/hooks/useNarration';

interface QuizViewProps {
  quiz: Quiz;
  chapterNumber: number;
  heartsRemaining: number;
  onAnswer: (selectedIndex: number, isCorrect: boolean) => void;
  onContinue: () => void;
  // Narration props
  narrationState: NarrationState;
  speak: (text: string, onEnd?: () => void) => void;
  stopSpeaking: () => void;
}

export function QuizView({
  quiz,
  chapterNumber,
  heartsRemaining,
  onAnswer,
  onContinue,
  narrationState,
  speak,
  stopSpeaking,
}: QuizViewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const hasNarratedQuestion = useRef(false);
  const hasNarratedExplanation = useRef(false);

  // Narrate quiz question + context when component mounts
  useEffect(() => {
    if (narrationState.narrationEnabled && !hasNarratedQuestion.current) {
      hasNarratedQuestion.current = true;
      const quizText = `${quiz.title}. ${quiz.contextText}`;
      // Small delay to let the view render
      const timer = setTimeout(() => speak(quizText), 400);
      return () => clearTimeout(timer);
    }
  }, [narrationState.narrationEnabled, quiz, speak]);

  // Narrate explanation after answer is confirmed
  useEffect(() => {
    if (confirmed && narrationState.narrationEnabled && !hasNarratedExplanation.current) {
      hasNarratedExplanation.current = true;
      // Stop any ongoing narration first
      stopSpeaking();
      const feedbackText = isCorrect
        ? `Correct! ${quiz.explanation}`
        : `Not quite. ${quiz.explanation}`;
      const timer = setTimeout(() => speak(feedbackText), 600);
      return () => clearTimeout(timer);
    }
  }, [confirmed, isCorrect, narrationState.narrationEnabled, quiz.explanation, speak, stopSpeaking]);

  // Cleanup narration on unmount
  useEffect(() => {
    return () => stopSpeaking();
  }, [stopSpeaking]);

  const handleConfirm = () => {
    if (selectedIndex === null) return;
    const correct = selectedIndex === quiz.correctIndex;
    setIsCorrect(correct);
    setConfirmed(true);
    onAnswer(selectedIndex, correct);
  };

  return (
    <div className="fixed inset-y-0 inset-x-0 z-50 mx-auto flex w-full max-w-md flex-col bg-[#FDF6EC] sm:shadow-2xl sm:border-x border-[#E8DFD0]">
      {/* Hearts */}
      <div className="flex items-center justify-end gap-1 px-4 py-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Heart
            key={i}
            size={20}
            className={
              i < heartsRemaining
                ? 'fill-red-500 text-red-500'
                : 'fill-gray-300 text-gray-300'
            }
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center overflow-y-auto px-5 pb-28 pt-4">
        {/* Chapter label */}
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#FF4500]">
          Chapter {chapterNumber} · Quiz
        </p>

        {/* Quiz title */}
        <h1 className="mt-3 text-center text-2xl font-bold text-[#1A1A2E]">
          {quiz.title}
        </h1>

        {/* Context */}
        <p className="mt-3 text-center text-sm leading-relaxed text-[#1A1A2E]/60">
          {quiz.contextText}
        </p>

        {/* Narrating indicator */}
        {narrationState.isNarrating && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF4500]" />
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#FF4500] [animation-delay:150ms]" />
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF4500] [animation-delay:300ms]" />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#FF4500]/60">
              Narrating
            </span>
          </div>
        )}

        {/* Answer options */}
        <div className="mt-8 grid w-full max-w-sm grid-cols-1 gap-3 sm:max-w-lg sm:grid-cols-2">
          {quiz.options.map((option, i) => {
            let borderColor = 'border-[#E8DFD0]';
            let bgColor = 'bg-white';
            let textColor = 'text-[#1A1A2E]';

            if (confirmed) {
              if (i === quiz.correctIndex) {
                borderColor = 'border-green-500';
                bgColor = 'bg-green-50';
              } else if (i === selectedIndex && !isCorrect) {
                borderColor = 'border-red-500';
                bgColor = 'bg-red-50';
              }
            } else if (i === selectedIndex) {
              borderColor = 'border-[#FF4500]';
              bgColor = 'bg-orange-50';
            }

            return (
              <motion.button
                key={i}
                whileHover={!confirmed ? { scale: 1.02 } : {}}
                whileTap={!confirmed ? { scale: 0.98 } : {}}
                onClick={() => !confirmed && setSelectedIndex(i)}
                disabled={confirmed}
                className={`rounded-xl border-2 ${borderColor} ${bgColor} px-4 py-4 text-left text-sm font-medium ${textColor} transition-all`}
              >
                <span className="mr-2 text-xs font-bold text-[#1A1A2E]/40">
                  {String.fromCharCode(65 + i)}
                </span>
                {option}
              </motion.button>
            );
          })}
        </div>

        {/* Feedback banner */}
        <AnimatePresence>
          {confirmed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 w-full max-w-sm sm:max-w-lg"
            >
              <div
                className={`rounded-xl p-4 ${isCorrect
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                  }`}
              >
                <p className="text-lg font-bold">
                  {isCorrect ? '🎉 CORRECT!' : '❌ NOT QUITE!'}
                </p>
                <p className="mt-1 text-sm">{quiz.explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom button */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#FDF6EC] via-[#FDF6EC] to-transparent px-5 pb-6 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={confirmed ? onContinue : handleConfirm}
          disabled={selectedIndex === null && !confirmed}
          className={`w-full rounded-2xl py-4 text-base font-bold text-white shadow-lg transition-colors ${selectedIndex === null && !confirmed
              ? 'cursor-not-allowed bg-gray-300 shadow-none'
              : 'bg-[#FF4500] shadow-[#FF4500]/25 hover:bg-[#E63E00]'
            }`}
        >
          {confirmed ? 'CONTINUE' : 'PICK AN ANSWER'}
        </motion.button>
      </div>
    </div>
  );
}
