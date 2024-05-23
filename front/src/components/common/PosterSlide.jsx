import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import "swiper/swiper-bundle.css";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import tmdbConfigs from "../../api/configs/tmdb.configs";

const PosterSlide = ({posters}) => {
    return (
        <Swiper
            pagination={{clickable: true}}
            navigation={true}
            slidesPerView={5}
            slidesPerGroup={5}
            grabCursor={true}
            direction="horizontal"
            observer={true}
            resizeObserver={true}
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
        >
            {posters.map((poster, index) => (
                <SwiperSlide key={index}>
                    <Box style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}>
                        <img
                            src={`https://image.tmdb.org/t/p/original${poster.file_path}`}
                            style={{width: "600px", height: "400px", objectFit: "cover",margin: "auto" }}
                        />
                    </Box>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default PosterSlide;
