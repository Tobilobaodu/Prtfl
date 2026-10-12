/**
 * The photography grid. Every photo shows as a square of at most 400px,
 * cropped from the centre to fill it whatever its shape — see .photo-image in
 * app/photography/page.js.
 */
export default function PhotoGrid({ photos }) {
  return (
    <div className="images-grid">
      {photos.map((p, index) => (
        <div key={index} className="image-pod">
          <img src={p.image.asset.url} alt={p.name || "Photo"} className="photo-image" />
          <div className="photo-info">
            <h3 className="photo-title">{p.name}</h3>
            <div className="photo-location">
              <img src="/Location.svg" alt="Location" className="location-icon" />
              <span>{p.location}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
