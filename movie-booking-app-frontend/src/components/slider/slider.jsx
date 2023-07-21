import { CCarousel,CCarouselItem, CImage } from "@coreui/react";

function Slider(){
    const image1 = 'https://coreui.io/react/docs/static/react-83088efde08a5dedde9f67a954cb4b5b.jpg';
    const image2 = '../../../public/assets/2.jpg';
    const image3 = '../../../public/assets/3.jpg';
    return(
        <div className="shadow-lg">
            <CCarousel controls>
            <CCarouselItem>
                <CImage className="d-block w-100" src={image1} alt="slide 1" />
            </CCarouselItem>
            <CCarouselItem>
                <CImage className="d-block w-100" src={image2} alt="slide 2" />
            </CCarouselItem>
            <CCarouselItem>
                <CImage className="d-block w-100" src={image3} alt="slide 3" />
            </CCarouselItem>
        </CCarousel>
        </div>
    );
}

export default Slider;