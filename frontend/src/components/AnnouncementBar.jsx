const message = "Now Taking Bulk & Custom Orders — Share Your Design, We'll Stitch It For You"

function AnnouncementBar() {
  const items = Array(6).fill(message)

  return (
    <div className="bg-[#F7E9EB] border-b border-[#7A1F2B]/10 overflow-hidden py-2">
      <div className="flex marquee-left whitespace-nowrap">
        {items.map((text, idx) => (
          <span key={idx} className="flex items-center text-xs md:text-sm font-medium px-8 text-[#7A1F2B]">
            <svg className="w-3.5 h-3.5 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            {text}
            <span className="mx-8 text-[#7A1F2B]/30">•</span>
          </span>
        ))}-
      </div>
    </div>
  )
}

export default AnnouncementBar