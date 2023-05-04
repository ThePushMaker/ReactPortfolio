import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/img/header-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {

    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, SetIsDeleting] = useState(false);
    const toRotate = [ "Web Developer", "Web Designer", "UI/UX Designer" ];
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const period = 1700;
    
    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta)

        return () => { clearInterval(ticker) };
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if(isDeleting){
            setDelta(prevDelta => prevDelta /2)
        }

        if (!isDeleting && updatedText === fullText){
            SetIsDeleting(true);
            setDelta(period);
        }else if(isDeleting && updatedText === ''){
            SetIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    }
    
    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <TrackVisibility once>
                        {({ isVisible}) =>  
                            <div className={isVisible ? "animate__animated animate__fadeInUp " : ""}>
                                <span className="tagline">Welcome to my portafolio</span>
                                <h1>{"Hi, I'm Martin Calderon! "}<span className="wrap">{text}</span></h1>
                                <p>Exercitation esse reprehenderit consectetur sit ullamco elit ullamco commodo. Anim culpa reprehenderit esse deserunt sint voluptate qui pariatur ad nisi non est dolor. Dolor officia eiusmod excepteur qui incididunt.</p>
                                </div>}
                        </TrackVisibility>
                        <TrackVisibility once>
                            {({ isVisible}) =>  
                            <div className={isVisible ? "animate__animated animate__bounceInLeft animate__slow" : ""}>
                                <button onClick={() => console.log('connect')}>Let's connect <ArrowRightCircle size={25} /></button>
                        </div>}
                        </TrackVisibility>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <TrackVisibility once>
                            {({ isVisible }) =>
                            <div className={isVisible ? "animate__animated animate__zoomIn animate__slower" : ""}>
                                <img src={headerImg} alt="Header Img"/>
                            </div>}
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}