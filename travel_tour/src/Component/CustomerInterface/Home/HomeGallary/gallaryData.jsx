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
          {/* <div className="min-vh-50 m-3 border-radius-xl">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 my-auto">
                  <h6 className="text-white mb-0 fadeIn1 fadeInBottom" style={{ fontSize: '1.3rem' }}>{post.title}</h6>
                  <h2 className="text-white fadeIn2 fadeInBottom">{post.subtitle}</h2>
                  <p className="lead text-white opacity-10 fadeIn3 fadeInBottom">{post.description}</p>
                </div>
              </div>
            </div>
          </div> */}
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


{/* <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-item" style={{ backgroundImage: `url('${Img2}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div class="min-vh-50 m-3 border-radius-xl">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 my-auto">
          <h6 class="text-white mb-0 fadeIn1 fadeInBottom" style={{ fontSize: '1.3rem' }}>Pricing Plans</h6>
          <h2 class="text-white fadeIn2 fadeInBottom">Work with the rockets</h2>
          <p class="lead text-white opacity-10 fadeIn3 fadeInBottom">Wealth creation is an evolutionarily recent positive-sum game. Status is an old zero-sum game. Those attacking wealth creation are often just seeking status.</p>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="carousel-item" style={{ backgroundImage: `url('${Img1}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div class="min-vh-50 m-3 border-radius-xl" >
    <div class="container">
      <div class="row">
      <div class="col-lg-6 my-auto">
          <h6 class="text-white mb-0 fadeIn1 fadeInBottom" style={{ fontSize: '1.3rem' }}>Pricing Plans</h6>
          <h2 class="text-white fadeIn2 fadeInBottom">Work with the rockets</h2>
          <p class="lead text-white opacity-10 fadeIn3 fadeInBottom">Wealth creation is an evolutionarily recent positive-sum game. Status is an old zero-sum game. Those attacking wealth creation are often just seeking status.</p>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="carousel-item active" style={{ backgroundImage: `url('${Img3}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div class="min-vh-50 m-3 border-radius-xl">
    <div class="container">
      <div class="row">
      <div class="col-lg-6 my-auto">
          <h6 class="text-white mb-0 fadeIn1 fadeInBottom" style={{ fontSize: '1.3rem' }}>Pricing Plans</h6>
          <h2 class="text-white fadeIn2 fadeInBottom">Work with the rockets</h2>
          <p class="lead text-white opacity-10 fadeIn3 fadeInBottom">Wealth creation is an evolutionarily recent positive-sum game. Status is an old zero-sum game. Those attacking wealth creation are often just seeking status.</p>
        </div>
      </div>
    </div>
  </div>
</div>
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
</div> */}