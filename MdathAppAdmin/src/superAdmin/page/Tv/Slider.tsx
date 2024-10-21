// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// import required modules
import { EffectFade, Pagination,Autoplay } from 'swiper/modules';

export default function Slider() {

    const commityInfoArray =[
        {
          "title": "Our Community Helping Over 30,000 People",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, est officiis quaerat eum quam sapiente maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam illo neque dolorum, error illum incidunt. Modi nisi quis, illum adipisci quae laborum alias impedit tempore, eaque harum eius quo corrupti! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem reprehenderit tempore est. Porro modi animi architecto, explicabo nihil nam quibusdam blanditiis alias optio cum hic provident voluptas, necessitatibus veniam voluptatum."
        },
        {
          "title": "Innovative Projects Empowering Change",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in ex et velit malesuada fringilla. Phasellus et tellus at orci congue varius. Ut non elit at velit faucibus aliquet ac sit amet magna. Curabitur ac arcu nec mauris blandit viverra. Donec vehicula, mi eget accumsan facilisis, felis turpis consectetur justo, et auctor ex velit et lectus."
        },
        {
          "title": "Building Strong Networks Globally",
          "description": "Duis fermentum velit quis libero laoreet, non pretium nulla dictum. Nam commodo dapibus urna, eget tempor metus venenatis sit amet. Ut lobortis tellus non dolor suscipit feugiat. Nam at elit ut ligula ultrices pretium. Nulla mollis, nunc vel posuere gravida, ex ligula fringilla nulla, vitae fermentum sem libero in leo."
        },
        {
          "title": "Supporting Educational Growth",
          "description": "Fusce hendrerit ex ac nisi vehicula, et malesuada libero laoreet. Integer finibus justo eu eros fringilla, ut efficitur augue luctus. Etiam bibendum suscipit neque, at vestibulum risus luctus sit amet. Nunc ultricies nisi a leo feugiat, non ultricies ligula fermentum. Nullam non urna justo. Mauris nec convallis libero."
        },
        {
          "title": "Promoting Sustainability Initiatives",
          "description": "Proin malesuada erat et lacus varius, vitae auctor risus laoreet. Nam a mauris sem. Pellentesque ullamcorper enim vel malesuada consectetur. Maecenas porttitor, lectus vitae tempor hendrerit, felis nulla cursus dui, vel feugiat lorem erat vitae risus. Nam dapibus justo in erat vehicula sodales."
        },
        {
          "title": "Fostering Innovation and Creativity",
          "description": "Nullam vulputate est sed eros dictum, ac laoreet mauris porttitor. Phasellus molestie, arcu vel ultricies aliquet, risus metus varius lorem, non volutpat ex ipsum sit amet libero. Ut gravida, mauris et tempus posuere, lacus felis interdum justo, sit amet congue metus felis nec lacus."
        }
      ]
      


  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        // navigation={true}
        // pagination={{
        //   clickable: true,
        // }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        modules={[EffectFade, Pagination,Autoplay]}

        className="mySwiper"
        
      >
        {
            commityInfoArray.map((el)=>{
                 
                return       <SwiperSlide>
                         <div className="w-96 h-full p-4 bg-white rounded-lg text-gray-800">
    <h2 className="text-2xl font-bold mb-4">{el.title}</h2>
    <p >
      {el.description}
    </p>
   
  </div>
                        </SwiperSlide>
              
            })
        }
      </Swiper>
    </>
  );
}
