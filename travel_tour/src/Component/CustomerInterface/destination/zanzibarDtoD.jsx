import React from "react";
import { useQuery } from 'react-query';
import { fetchDestinationAreas, fetchDestinationById } from "../../../api/DestinationAPI";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import DestinationModel from "./DestinationModel";
import './destination.css'

const Destination = () => {

  const navigate = useNavigate();
  const { Meta } = Card;

  const { data: destinationAreas, isLoading, isError } = useQuery('destinationAreas', fetchDestinationAreas);
  const { data: destination, isLoadingData, isErrorData } = useQuery(['destination', 4], () => fetchDestinationById(4));

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading</div>;

  // console.log('test:', destination?.title)
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
    <div className="b" id="DtoD">
      <section className="my">
        <div className="container">
          <div className="py-2">
            <h5 className="py-1">
              {destination?.title}
            </h5>
            <p className="pe-md-4">
              {destination?.description}
            </p>
            <hr />
          </div>
          {destinationAreas.map((area, index) => {
            if (area.destination.id === 4) {
              return (
                <>
                  <div className="row" key={index} id={area.id}>

                    <div className="col-md-4 col-12 my-2" style={{ position: 'relative' }}>
                      <img
                        className="w-100 border-radius-lg h-100 shadow-lg"
                        src={area.photo}
                        alt="imageError"
                        style={{
                          transition: 'transform 0.5s ease, box-shadow 0.5s ease',
                          boxShadow: '10px 10px 18px rgba(0, 0, 0, 1)',
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = 'scale(2.05)';
                          e.target.style.boxShadow = '0 20px 16px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
                        }}
                      />
                    </div>

                    <div className="col-md-8">
                      <h4 className="py-2">{area.title}</h4>
                      <p className="pe-md-4">
                        {/* {area.shotDescription} */}
                        <ParagraphWithLimit text={area.longDescription} limit={35} />
                      </p>
                      <div className="py-1" style={{ textAlign: 'start' }}>
                        {/* <h5><span className=' m-1 p-1 text-black' style={{ backgroundColor: '#ff5722' }}>Price: {area.price}</span></h5> */}
                      </div>
                      <div className="github-buttons" style={{ textAlign: 'end' }}>
                        {/* <Button
                          type="primary"
                          size="sm"
                          style={{ marginRight: '0.5rem' }}
                          className="py-1">
                          <DestinationModel
                            destinationsId={area?.id}
                          />
                        </Button> */}
                        <Button
                          type="primary"
                          size="sm" className="py-1"
                          onClick={() => { navigate('/booking') }}
                        >
                          Booking Now
                        </Button>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <br />
                </>
              );
            } else {
              return null; // If the title is not "zanzibarNorth", return null to render nothing
            }
          })}

        </div>
      </section>
    </div>
  );
};

export default Destination;
