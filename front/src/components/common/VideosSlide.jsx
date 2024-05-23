import {Box} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import Container from "./Container.jsx";
import "swiper/swiper-bundle.css";
import {Navigation, Pagination, Scrollbar, A11y, EffectFade} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';


const VideoItem = ({video}) => {
    return (
        <Box>
            <iframe
                width="100%"
                height="550vw"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                allowFullScreen
            ></iframe>
        </Box>
    );
}

const VideosSlide = ({videos}) => {

    return (
        <Container style={{maxWidth: "100%", maxHeight: "100%"}}>
            <Swiper
                pagination={{clickable: true}}
                navigation={true}
                slidesPerView={1}
                slidesPerGroup={1}
                grabCursor={true}
                direction="horizontal"
                observer={true}
                resizeObserver={true}
                modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
            >

                {videos.map((video) => (
                    <SwiperSlide key={video.id}>
                        <VideoItem video={video} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    );
}

export default VideosSlide;
