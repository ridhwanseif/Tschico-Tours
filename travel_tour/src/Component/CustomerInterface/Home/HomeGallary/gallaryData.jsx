import React from "react";
import { Carousel } from "react-bootstrap";
// import './carousel.css';
import { useQuery } from 'react-query';
import { fetchExcursionsPhotos } from '../../../../api/ExcursionAPI';

function ControlledCarousel() {
  // const [posts, setPosts] = useState([]);

  const { data: excursionPhotos, isLoadingPhoto, isErrorPhoto } = useQuery('excursionPhotos', fetchExcursionsPhotos);

  if (isLoadingPhoto) return <div>Loading...</div>;

  if (isErrorPhoto) return <div>Error loading tasks</div>;

  return (
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      {excursionPhotos.map((excursionPhoto, index) => ( 
        <div key={index}
          className={`carousel-item ${index === 0 ? 'active' : ''}`}
          style={{
            backgroundImage: `url('${excursionPhoto.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
          
        </div>
      ))}
      <div class="min-vh-50 position-absolute w-100 top-0">
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
          <span class="carousel-control-prev-icon position-absolute bottom-50" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
          <span class="carousel-control-next-icon position-absolute bottom-50" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </a>
      </div>
    </div>

  );
}

export default ControlledCarousel;
