import { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  useEffect(() => {
    toast(' Welcome!', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <section className="home-main">
        <div className="hm1 image">
          <img src="churchImg2.jpg" alt="church image" />
        </div>
        <div className="hm2 welcome-home">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            autem repudiandae officia labore. Et repudiandae libero incidunt
            soluta, harum fugiat repellat error consectetur, pariatur impedit
            delectus, commodi vero ab iure?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            autem repudiandae officia labore. Et repudiandae libero incidunt
            soluta, harum fugiat repellat error consectetur, pariatur impedit
            delectus, commodi vero ab iure?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            autem repudiandae officia labore. Et repudiandae libero incidunt
            soluta, harum fugiat repellat error consectetur, pariatur impedit
            delectus, commodi vero ab iure?
          </p>
          <div className="btn">
            <button>Youtube</button>
          </div>
        </div>
      </section>
      <section className="home">
        <h1>Sermons</h1>
        <div className="sermons">
          <div className=" sermon sermon1">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              quos libero quam, velit itaque sequi nulla officia consequuntur
              sint necessitatibus autem praesentium, obcaecati veritatis id,
              tempore ad. Veritatis, nostrum voluptatum.
            </p>
          </div>
          <div className="sermon sermon1">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              quos libero quam, velit itaque sequi nulla officia consequuntur
              sint necessitatibus autem praesentium, obcaecati veritatis id,
              tempore ad. Veritatis, nostrum voluptatum.
            </p>
          </div>
          <div className="sermon sermon1">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              quos libero quam, velit itaque sequi nulla officia consequuntur
              sint necessitatibus autem praesentium, obcaecati veritatis id,
              tempore ad. Veritatis, nostrum voluptatum.
            </p>
          </div>
        </div>
        <h1>Events</h1>
        <div className="events-slider">
          <Slider {...settings}>
            <div className="event">
              <p>Content for sermon 1</p>
            </div>
            <div className="event">
              <p>Content for sermon 2</p>
            </div>
            <div className="event">
              <p>Content for sermon 3</p>
            </div>
            <div className="event">
              <p>Content for sermon 4</p>
            </div>
            <div className="event">
              <p>Content for sermon 5</p>
            </div>
          </Slider>
        </div>
      </section>
      <section className="home-down">
        <h1>Our Team</h1>
        <div className="team">
          <div className="down"></div>
          <div className="down"></div>
          <div className="down"></div>
          <div className="down"></div>
        </div>
      </section>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
};

export default Home;
