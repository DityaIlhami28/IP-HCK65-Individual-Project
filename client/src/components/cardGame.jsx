import { useEffect, useState } from "react";
import axios from "../../helper/axios";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export default function GameCard() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchGames = async () => {
    try {
      const { data } = await axios.get(`/pub/games?page=${page}`);
      setGames((prevGames) => [...prevGames, ...data]);

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <InfiniteScroll
      dataLength={games.length}
      next={fetchGames}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <div className="flex-grow">
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
          {games.map((game) => (
            <Link key={game.id} to={`/games/${game.id}`}>
              <div className="relative overflow-hidden rounded-xl shadow-xl ring-gray-900/5 group">
                <div className="w-full h-72 overflow-hidden rounded-xl border border-black dark:border-gray-700 relative group-hover:shadow-2xl transition duration-300 ease-in-out">
                  <img
                    src={game.imgUrl}
                    className="block w-full h-full object-cover object-center transition duration-300 group-hover:scale-110"
                    alt=""
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transition duration-300 ease-in-out transform translate-y-full group-hover:translate-y-0">
                  <h1 className="text-2xl font-bold">{game.name}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
}
