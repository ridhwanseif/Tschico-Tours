import React from 'react';
// import '../index.css';
import GallaryModel from './GallaryModel';
import { useQuery } from 'react-query';
import { fetchExcursions, fetchExcursionsPhotos } from '../../../../api/ExcursionAPI';


function HomeGallary() {

    const { data: excursions, isLoading, isError } = useQuery('excursions', fetchExcursions);
    const { data: excursionPhotos, isLoadingPhoto, isErrorPhoto } = useQuery('excursionPhotos', fetchExcursionsPhotos);

    // console.log(excursionPhotos)
    if (isLoading || isLoadingPhoto) return <div>Loading...</div>;

    if (isError || isErrorPhoto) return <div>Error loading tasks</div>;

    const ParagraphWithLimit = ({ text, limit }) => {
        const words = text.split(' ');
        const truncatedText = words.slice(0, limit).join(' ');
        const remainingCount = words.length - limit;

        return (
            <div>
                <p>
                    {truncatedText}
                    {remainingCount > 0 && <span> ...</span>}
                </p>
            </div>
        );
    };

    return (

        <div className="card card-body section-about shadow-xl mx-3 mx-md-4 my-5">
        <section className="gallary py-1">
          <div className="container">
            <div className="row text align-items-center">
              <h3 className="text z-index-1 position-relative" style={{ textAlign: 'start' }}>
                Tours and Excursions we offer.
              </h3>
              <p className="text opacity-8 mb-4" style={{ textAlign: 'start' }}>
                The Zanzibar taxi offers excursions and tours for your memorable holiday of our stay in Zanzibar, we have a number of Zanzibar excursions and tours to offer for the guests as follows.
              </p>
            </div>
      
            <div className="row">
              {excursions.map((item, index) => (
                <div className="col-sm-12 col-md-6 col-lg-3 mb-4" key={index}>
                  <div className="card g-card">
                    <div className="gallary-box">
                      <div className="slider">
                        <a href="tours.php#SBlue">
                          <figure>
                            {excursionPhotos?.map((photo, imgIndex) => {
                              if (photo.excursions === item.id) {
                                return (
                                  <div className="slide" key={imgIndex}>
                                    <img src={photo.image} alt={`Image ${imgIndex}`} className="img-fluid" />
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </figure>
                        </a>
                      </div>
                    </div>
                    <div>
                      <div className="card-body px-0">
                        <h5>
                          <a href="javascript:;" className="text-dark font-weight-bold">
                            {item.title}
                          </a>
                        </h5>
                        <span>
                          <ParagraphWithLimit text={item.longDescription} limit={15} />
                        </span>
                        <a href="javascript:;" className="text-info text-sm icon-move-right">
                          <GallaryModel toursId={item.id} />
                          <i className="fas fa-arrow-right text-xs ms-1"></i>
                        </a>
                        <div className="m-1">
                          <h5>
                            <span
                              className="p-1 text-black"
                              style={{
                                borderRadius: '.8rem',
                                marginTop: '1rem',
                                fontWeight: 'bold',
                              }}
                            >
                              Price Per Person: {item.price}
                            </span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      

    );
}

export default HomeGallary;