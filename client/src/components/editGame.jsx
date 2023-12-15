import { useState, useEffect } from "react";
import axios from "../../helper/axios";

export default function EditGameForm({
    editedGame,
    setEditedGame,
    fetchGames,
    closeModal,
}) {
    const [form, setForm] = useState({
        name : "",
        released : "",
        imgUrl : "",
        rating : 0,
        price : 0
    })
    useEffect(() => {
        if(editedGame) {
            setForm({
                name : editedGame.name,
                released : editedGame.released,
                imgUrl : editedGame.imgUrl,
                rating : editedGame.rating,
                price : editedGame.price
            })
        }
    }, [editedGame])
    const handleInputChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };
      const handleOnEdit = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`/games/${editedGame.id}`, form, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
          fetchGames();
          setEditedGame(null);
          closeModal(); // Close the modal after editing
        } catch (error) {
          console.error(error);
        }
    }
    return (
        <>
        <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="flex justify-between items-center">
              <h1 className="block text-2xl font-bold text-gray-800 text-gray-800">
                Edit Game
              </h1>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-5">
              <form onSubmit={handleOnEdit}>
                <div className="grid gap-y-4 text-gray-800">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold ml-1 mb-2 text-gray-800"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                      />
                    </div>
                  </div>
                  {/* Repeat similar structure for other form fields */}
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-bold ml-1 mb-2 text-gray-800"
                    >
                      Released Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="released"
                        name="released"
                        value={form.released}
                        onChange={handleInputChange}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-bold ml-1 mb-2 text-gray-800"
                    >
                      Price
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={form.price}
                        onChange={handleInputChange}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="facility"
                      className="block text-sm font-bold ml-1 mb-2 text-gray-800"
                    >
                      Rating
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={form.rating}
                        onChange={handleInputChange}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="roomCapacity"
                      className="block text-sm font-bold ml-1 mb-2 text-gray-800"
                    >
                      Image
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="imgUrl"
                        name="imgUrl"
                        value={form.imgUrl}
                        onChange={handleInputChange}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}