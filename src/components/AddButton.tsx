interface AddButtonProps {
  onClick: () => void;
}

export function AddButton({ onClick }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300 border-2 border-dashed border-gray-300 hover:border-blue-400 min-h-[140px]"
    >
      <svg
        className="w-10 h-10 text-gray-400 hover:text-blue-500 transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
      <span className="text-gray-500 hover:text-blue-500 font-medium">新增模板</span>
    </button>
  );
}
