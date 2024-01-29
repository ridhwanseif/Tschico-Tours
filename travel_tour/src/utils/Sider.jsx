import { Carousel } from 'rsuite';



export const Sider = ({ height, img1, img2, img3, img4, img5 }) => (
    <Carousel autoplay className="custom-slider" style={{ height: '24rem' }}>
        {/* <Carousel.Item>
            <img
                className="d-block w-100"
                src={img1}
                alt="First slide"
            />
            <Carousel.Caption>
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item> */}
        <img src={img1} height={height} />
        <img src={img2} height={height} />
        <img src={img3} height={height} />
        <img src={img4} height={height} />
        <img src={img5} height={height} />
    </Carousel>
);
