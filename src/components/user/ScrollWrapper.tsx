interface ScrollWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  containerRef: React.RefObject<HTMLDivElement | null>;
  index: number;
  children: React.ReactNode;
}

export const ScrollWrapper: React.FC<ScrollWrapperProps> = ({
  containerRef,
  index,
  children,
  ...events
}) => {
  return (
    <div className="relative w-full h-full overflow-hidden" {...events}>
      <div
        ref={containerRef}
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {children}
      </div>
    </div>
  );
};
