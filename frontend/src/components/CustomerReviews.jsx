// Edit this array to add, remove, or update reviews shown on the homepage.
const reviews = [
  {
    name: 'Priya Sharma',
    initials: 'PS',
    rating: 5,
    text: 'Beautiful costumes and super quick delivery. My daughter looked amazing at her Bharatanatyam recital!',
  },
  {
    name: 'Anjali Deshmukh',
    initials: 'AD',
    rating: 5,
    text: 'Rented 6 costumes for a school event, all matching and great quality. Highly recommend Sadguru Costume.',
  },
  {
    name: 'Rahul Mehta',
    initials: 'RM',
    rating: 4,
    text: 'Good collection and fair pricing. WhatsApp support was quick to respond to all my questions.',
  },
  {
    name: 'Sneha Patil',
    initials: 'SP',
    rating: 5,
    text: 'The traditional frocks were even better than the photos. Kids loved wearing them for the function.',
  },
  {
    name: 'Vikram Joshi',
    initials: 'VJ',
    rating: 5,
    text: 'Excellent service from booking to return. Will definitely rent again for the next event.',
  },
  {
    name: 'Kavita Rao',
    initials: 'KR',
    rating: 4,
    text: 'Nice variety of designs for group dance performances. Costumes were clean and well maintained.',
  },
]

function StarRow({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`w-4 h-4 ${i < rating ? 'text-[#B8863B]' : 'text-gray-200'}`}
          fill="currentColor"
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.79L10 14.9l-5.21 2.61 1-5.79-4.21-4.1 5.82-.85z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div className="w-72 sm:w-80 shrink-0 mx-3 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow p-6 flex flex-col">
      
      <p className="text-gray-700 text-sm leading-relaxed flex-1">{review.text}</p>

      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
        <div className="w-10 h-10 rounded-full bg-[#7A1F2B]/10 text-[#7A1F2B] font-semibold flex items-center justify-center text-sm shrink-0">
          {review.initials}
        </div>
        <div className="min-w-0">
          <p className="text-gray-900 font-medium text-sm truncate">{review.name}</p>
          <StarRow rating={review.rating} />
        </div>
      </div>
    </div>
  )
}

function CustomerReviews() {
  // Duplicate the list so the marquee loop is seamless (translateX(-50%) matches this doubling).
  const row = [...reviews, ...reviews]

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl text-gray-900 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Real reviews from families who trusted us for their special occasions
          </p>
        </div>

        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          }}
        >
          <div className="flex marquee-left">
            {row.map((review, idx) => (
              <ReviewCard key={idx} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerReviews