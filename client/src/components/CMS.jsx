import { useEffect, useState } from "react";
import axios from "../../helper/axios";
import Swal from "sweetalert2";
import EditGameForm from "./editGame";
import AddGame from "./addGame";
export default function CMSTableGame() {
  const [games, setGames] = useState([]);
  const [editedGame, setEditedGame] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddGameModalOpen, setIsAddGameModalOpen] = useState(false);
  const fetchGames = async () => {
    try {
      const { data } = await axios.get("/games", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setGames(data);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    fetchGames();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/games/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      fetchGames();
      Swal.fire({
        icon: "success",
        title: "Game Deleted",
        text: "Game has been Deleted",
      });
    } catch (error) {
      console.log(error);
      console.log(error.messages);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You are not Authorized",
      });
    }
  };
  const handleEdit = (games) => {
    setEditedGame(games);
    setIsModalOpen(true);
  };
  const openAddGameModal = () => {
    setIsAddGameModalOpen(true)
  }
  const closeAddGameModal = () => {
    setIsAddGameModalOpen(false)
  }
  const handleAddSuccess = () => {
    fetchGames()
  }
  return (
    <>
      <div className="mt-10 flex justify-center items-center mb-4">
        <button
          className="py-2 px-4  text-white font-semibold rounded-md hover:bg-slate-600"
          onClick={openAddGameModal}
        >
          Add Game
        </button>
        </div>
        <div class="overflow-x-auto">
          <div class="min-w-screen min-h-screen flex items-center justify-center font-sans overflow-hidden rounded-lg">
            <div class="w-full lg:w-5/6">
              <div class="bg-white shadow-md rounded my-6">
                <table class="min-w-max w-full table-auto rounded-lg">
                  <thead>
                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th class="py-3 px-6 text-left">Name</th>
                      <th class="py-3 px-6 text-center">Price</th>
                      <th class="py-3 px-6 text-center">Rating</th>
                      <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-600 text-sm font-light">
                    {games.map((game) => {
                      return (
                        <tr
                          class="border-b border-gray-200 hover:bg-gray-100"
                          key={game.id}
                        >
                          <td class="py-3 px-6 text-left whitespace-nowrap">
                            <div class="flex items-center">
                              <div class="mr-2"></div>
                              <span class="font-medium">{game.name}</span>
                            </div>
                          </td>
                          <td class="py-3 px-6 text-center">
                            <div class="flex items-center justify-center">
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(game.price)}
                            </div>
                          </td>
                          <td class="py-3 px-6 text-center">
                            <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                              {game.rating}
                            </span>
                          </td>
                          <td class="py-3 px-6 text-center">
                            <div class="flex item-center justify-center">
                              <button
                                class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                onClick={() => handleEdit(game)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </button>
                              <button
                                className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                onClick={() => handleDelete(game.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {isAddGameModalOpen && (
            <AddGame closeModal={closeAddGameModal} onAddSuccess={handleAddSuccess} />
        )}
      {isModalOpen && (
        <EditGameForm
          editedGame={editedGame}
          setEditedGame={setEditedGame}
          fetchGames={fetchGames}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
