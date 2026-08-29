function VisitUs() {
  const address = "Woodsville St, near Nikhil Borade office, Borade Vasti, Moshi, Pimpri-Chinchwad, Maharashtra 411070"
  const phone = "918552887919"
  const displayPhone = "+91 85528 87919"
  const instagramUrl = "https://www.instagram.com/sadguru_costumes/"
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=18.6648633,73.8331854"

  const infoRows = [
    {
      title: "Address",
      value: address,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Working Hours",
      value: "10:00 AM – 8:00 PM, all days",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Phone",
      value: displayPhone,
      link: `tel:+${phone}`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="bg-gradient-to-b from-pink-50 via-white to-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-14">
        <h1 className="font-brand text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
          Find Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: info list */}
          <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100">
            {infoRows.map((row) => (
              <div key={row.title} className="flex items-start gap-3.5 p-4">
                <div className="w-9 h-9 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                  {row.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-400 mb-0.5">{row.title}</p>
                  {row.link ? (
                    <a href={row.link} className="text-sm font-medium text-gray-800 hover:text-pink-600 leading-snug">
                      {row.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-gray-800 leading-snug">{row.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right: directions + social */}
          <div className="flex flex-col gap-6">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-pink-300 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-13l6 3m0 0l4.553-2.276A1 1 0 0121 5.618v10.764a1 1 0 01-.553.894L15 20m0-13v13" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-800">Open in Google Maps</p>
              <p className="text-xs text-gray-400 mt-1">Get directions to our store</p>
            </a>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-center gap-4">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 hover:border-pink-300 flex items-center justify-center text-gray-600 hover:text-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth={1.8} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11.37a4 4 0 11-7.914 1.174A4 4 0 0116 11.37z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.5 6.5h.01" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 hover:border-green-300 flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.99.582 3.842 1.582 5.4L2 22l4.75-1.567A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.524 2 12.001 2zm0 18.2c-1.75 0-3.377-.51-4.75-1.386l-.34-.213-3.263 1.077 1.09-3.18-.222-.354A8.176 8.176 0 013.8 12c0-4.532 3.669-8.2 8.201-8.2 4.531 0 8.2 3.668 8.2 8.2 0 4.532-3.669 8.2-8.2 8.2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisitUs