import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  paperTexture?: boolean;
  tornEdge?: boolean;
  botanicalFrame?: boolean;
  pressedFlower?: boolean;
  handwrittenNote?: boolean;
  vintageStamp?: boolean;
  compact?: boolean;
  spacious?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  paperTexture = false,
  tornEdge = false,
  botanicalFrame = false,
  pressedFlower = false,
  handwrittenNote = false,
  vintageStamp = false,
  compact = false,
  spacious = false,
  interactive = false,
  onClick,
}) => {
  const cardClasses = [
    styles.card,
    paperTexture && styles.paperTexture,
    tornEdge && styles.tornEdge,
    botanicalFrame && styles.botanicalFrame,
    pressedFlower && styles.pressedFlower,
    handwrittenNote && styles.handwrittenNote,
    vintageStamp && styles.vintageStamp,
    compact && styles.compact,
    spacious && styles.spacious,
    interactive && styles.interactive,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ title: string; subtitle?: string; className?: string }> = ({
  title,
  subtitle,
  className = '',
}) => (
  <div className={`${styles.header} ${className}`}>
    <h3 className={styles.title}>{title}</h3>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
  </div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`${styles.content} ${className}`}>{children}</div>;

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`${styles.footer} ${className}`}>{children}</div>;
