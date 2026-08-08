
function History({setHistory,history}) {
  return (
    <div>
          <div className="w-full max-w-sm backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-5 shadow-xl flex flex-col justify-between h-auto lg:h-[432px]">
          <div>
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
              <h3 className="text-white font-semibold text-base">سجل العمليات 📜</h3>
              {history.length > 0 && (
                <button 
                  onClick={() => setHistory([])} 
                  className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
                >
                  مسح السجل
                </button>
              )}
            </div>
            
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[320px]">
              {history.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-16">لا توجد عمليات سابقة</p>
              ) : (
                history.map((item, index) => (
                  <div key={index} className="bg-black/30 p-3 rounded-xl text-right text-gray-200 text-sm tracking-wide border border-white/5">
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        </div>
  )
}

export default History