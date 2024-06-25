// app/not-found.tsx

import React from "react";
import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <svg
        className={styles.svgImage}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill="#d9534f"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-1.68 0-3.26-.51-4.58-1.37L18.63 7.42C19.49 8.74 20 10.32 20 12c0 5.52-4.48 10-10 10zm0-16c1.68 0 3.26.51 4.58 1.37L5.37 16.58C4.51 15.26 4 13.68 4 12c0-5.52 4.48-10 10-10z"
        />
        <circle
          cx="12"
          cy="12"
          r="8"
          fill="none"
          stroke="#d9534f"
          strokeWidth="2"
        />
        <line x1="15" y1="9" x2="9" y2="15" stroke="#d9534f" strokeWidth="2" />
        <line x1="9" y1="9" x2="15" y2="15" stroke="#d9534f" strokeWidth="2" />
      </svg>
      <h1 className={styles.title}>404 - Страница не найдена</h1>
      <Link href="/" passHref>
        <div className={styles.link}>Вернуться на главную страницу</div>
      </Link>
    </div>
  );
}
