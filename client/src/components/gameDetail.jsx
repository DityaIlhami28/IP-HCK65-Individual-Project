import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../helper/axios";
import Swal from "sweetalert2"

export default function GameDetail() {
  const navigate = useNavigate()
  let { id } = useParams();
  const [game, setGame] = useState([]);
  const fetchGameId = async () => {
    try {
      const { data } = await axios.get(`/pub/games/${id}`);
      setGame(data);
    } catch (error) {
      throw error;
    }
  };
  const handleOnBuy = async () => {
    try {
      const access_token = localStorage.getItem("access_token")
      if (!access_token) {
        Swal.fire({
          icon: 'info',
          title: 'Login Required',
          text: 'Please log in to buy the game.',
          confirmButtonText: 'Go to Login',
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to the login page
            navigate('/login');
          }
        });
        return;
      }
      const { data } = await axios.get("/payment/midtrans/initiate", {
        headers : {
          Authorization : `Bearer ${access_token}`
        },
      })
      window.snap.pay(data.token, {
        onSuccess : async function () {
          const requestBody = {
            orderId : data.orderId
          }
        }
      })
    } catch (error) {
        throw error
    }
  }
  useEffect(() => {
    fetchGameId();
  }, []);
  return (
    <>
      <section class="text-gray-400 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto min h-screen">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              class="lg:w-1/2 w-full object-cover object-center rounded"
              src={game.imgUrl}
            ></img>
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-400 tracking-widest">
                Game Detail
              </h2>
              <h1 class="text-white text-3xl title-font font-medium mb-1">
                {game.name}
              </h1>
              <div class="flex mb-4">
              </div>
              <p class="leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Praesentium error possimus cum ipsum nesciunt, natus perferendis
                inventore expedita, mollitia pariatur doloremque sed temporibus
                magnam in ex doloribus culpa enim illum!
              </p>
              <p class="leading-relaxed">Rating : {game.rating}</p>
              <p class="leading-relaxed">Released : {game.released}</p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div class="flex ml-6 items-center">
                  <div class="relative">
                    <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-500 pointer-events-none flex items-center justify-center"></span>
                  </div>
                </div>
              </div>
              <div class="flex">
                <span class="title-font font-medium text-2xl text-gray-300">
                  {" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(game.price)}
                </span>
                <button class="flex ml-auto text-white bg-slate-500 border-0 py-2 px-6 focus:outline-none hover:bg-slate-800 rounded"
                onClick={handleOnBuy}>
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
