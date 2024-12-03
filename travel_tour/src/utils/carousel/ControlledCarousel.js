import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import './carousel.css';
import { useQuery } from 'react-query';
import { fetchPosts } from '../../api/postAPI.jsx';

function ControlledCarousel() {

  
  const { data: posts, isLoading, isError } = useQuery('posts', fetchPosts);
  
  useEffect(() => {
    fetchPosts();
  }, [posts]);
  
  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading tasks</div>;



  return (
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      {posts.map((post, index) => (
        <div key={index}
          className={`carousel-item ${index === 0 ? 'active' : ''}`}
          style={{
            backgroundImage: `url('${post.photo}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
          <div className="min-vh-50 m-3 border-radius-xl">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 my-auto py-2" style={{ marginLeft: "3rem" }}>
                  {/* <h6 className="text-white mb-0 fadeIn1 fadeInBottom" style={{ fontSize: '1.3rem' }}>{post.title}</h6> */}
                  {/* <h2 className="text-white fadeIn2 fadeInBottom">{post.subtitle}</h2> */}
                  {/* <p className="lead text-white opacity-10 fadeIn3 fadeInBottom" style={{ fontSize: '1.1rem' }}>{post.description}</p> */}
                </div>
              </div>
            </div>
          </div>  
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