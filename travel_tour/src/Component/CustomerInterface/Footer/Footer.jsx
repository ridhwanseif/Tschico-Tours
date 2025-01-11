    import React from 'react'
    import Img1 from '../../../theZanzibarTaxi.png';
    import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
    import WhatsAppIcon from '@mui/icons-material/WhatsApp';
    import EmailIcon from '@mui/icons-material/Email';
    import HomeIcon from '@mui/icons-material/Home';
    import InstagramIcon from '@mui/icons-material/Instagram';
    import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
    import './footer.css';


    const Footer = () => {
        return (
            <section className="bg-gradient-white">
          <div className="container">

                <div className="row footers" style={{ textAlign: 'start', marginLeft: '6rem' }}>

                    <div className="col-md-3">
                        <div className="section-link">
                            <img
                                src={Img1}
                                alt="My Image"
                                style={{
                                    width: '9rem',
                                    height: '9rem',
                                    marginLeft: '.5rem',
                                    marginRight: '.5rem',
                                    marginBottom: '.5rem',
                                }}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="section-follow">
                            <div className="soial-link">
                                <h5>Quick contact</h5>
                                <ul>
                                    <li><a href='mailto:waririzi65@gmail.com' target="_blank"> <EmailIcon className='footerIcon' />warirzi65@gmail.com </a></li>
                                    <li><HomeIcon className='footerIcon' /> Zanzibar Stone Town</li>
                                    <li><PhoneInTalkIcon className='footerIcon' /> +255778489968</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="section-follow">
                            <h5>Destination</h5>
                            <div className="soial-link">
                                <ul>
                                    <li><a href="https://m.me/" target="_blank"> Zanzibar Central/Urban</a></li>
                                    <li><a href="https://m.me/" target="_blank"> DestinationToDestination</a></li>
                                    <li><a href="https://m.me/" target="_blank"> Zanzibar North</a></li>
                                    <li><a href="https://m.me/" target="_blank"> Zanzibar South</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="section-follow">
                            <h5>Follow Us On</h5>
                            <div className="soial-link">
                                <ul>
                                    <li><a href="https://m.me/" target="_blank"><FacebookRoundedIcon className='footerIcon' /> FaceBook</a></li>
                                    <li><a href="https://api.whatsapp.com/send?phone+255778489968" target="_blank"><WhatsAppIcon className='footerIcon' /> WhatsApp</a></li>
                                    <li><a href="#"><InstagramIcon className='footerIcon' /> Instagram</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="foot-copy mb-3">
                    <h6>&copy;TschicoTours.com | designed by Mr_Password:waririzi65@gmail.com</h6>
                </div>

            </div>
            </section>
        )
    }

    export default Footer;
