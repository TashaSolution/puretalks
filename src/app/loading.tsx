export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4A6B5D] to-[#C5A869] p-[1px] animate-pulse">
          <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
            <div className="w-5 h-5 rounded bg-[#4A6B5D]/20" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
