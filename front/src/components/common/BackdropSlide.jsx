import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import "swiper/swiper-bundle.css";
import {Navigation, Pagination, Scrollbar, A11y, EffectFade} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';


const BackdropSlide = ({backdrops}) => {
    return (
        <Swiper
            pagination={{clickable: true}}
            navigation={true}
            slidesPerView={2}
            slidesPerGroup={2}
            grabCursor={true}
            direction="horizontal"
            observer={true}
            resizeObserver={true}
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
        >
            {backdrops.map((backdrop, index) => (
                <SwiperSlide key={index}>
                   <Box style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${backdrop.file_path}`}
                            style={{width: "100%", height: "80%"}}
                        />
                    </Box>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default BackdropSlide;