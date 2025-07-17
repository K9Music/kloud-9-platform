'use client';
import { useState } from 'react';

export default function BioSection({ bio }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      <div
        className={
          expanded
            ? 'bg-gray-800 rounded-lg p-3 text-cyan-100 whitespace-pre-line transition-all duration-300'
            : 'bg-gray-800 rounded-lg p-3 text-cyan-100 whitespace-pre-line line-clamp-4 transition-all duration-300'
        }
        style={{ position: 'relative' }}
      >
        {bio}
        {!expanded && (
          <>
            <div
              className="absolute left-0 right-0 bottom-0 h-10 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none rounded-b-lg"
              aria-hidden="true"
            />
            <div className="absolute right-3 bottom-2 z-10 flex justify-end">
              <button
                type="button"
                className="text-sm text-cyan-300 hover:text-cyan-100 font-semibold focus:outline-none bg-gray-900/80 px-2 py-1 rounded"
                onClick={() => setExpanded(true)}
                aria-expanded={expanded}
              >
                Read more
              </button>
            </div>
          </>
        )}
        {expanded && (
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="text-sm text-cyan-300 hover:text-cyan-100 font-semibold focus:outline-none bg-gray-900/80 px-2 py-1 rounded"
              onClick={() => setExpanded(false)}
              aria-expanded={expanded}
            >
              Show less
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 