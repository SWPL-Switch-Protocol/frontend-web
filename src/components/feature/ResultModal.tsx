interface ResultModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly data: unknown;
}

export default function ResultModal({
  isOpen,
  onClose,
  title,
  data,
}: ResultModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        style={{ backgroundColor: "#1F1F1F" }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onClose();
          }
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3
            id="modal-title"
            className="text-xl font-semibold"
            style={{ color: "#F5F3F0" }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all hover:brightness-110"
            style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        <div
          className="rounded-xl p-4 mb-4"
          style={{ backgroundColor: "#262626" }}
        >
          <pre className="text-sm overflow-x-auto" style={{ color: "#B3ADA7" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
            style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
