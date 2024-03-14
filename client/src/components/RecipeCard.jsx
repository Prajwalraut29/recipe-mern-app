import React from 'react'
import { HiHeart } from 'react-icons/hi'
import { MdDelete } from 'react-icons/md'
import { useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { setFevourites } from '../redux/authSlice'
import { getFavourites } from '../pages/helpers'
const RecipeCard = ({ id, title, image }) => {
    const { pathname } = useLocation();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const isAuth = useSelector((state) => state.auth.isAuth)

    const addToFav = async (favourite) => {
        const res = await axios.post(
            `http://localhost:5000/api/addToFavourites/${user._id}`,
            favourite,
            { withCredentials: true }
        );
        const data = res.data;
        if (data.success) {
            toast.success(data.message);
        }
    }


    const removeTofav = async (favourite) => {
        const res = await axios.post(
            `http://localhost:5000/api/removeFromFavourites/${user._id}`,
            favourite,
            { withCredentials: true }
        );
        const data = res.data;
        if (data.success) {
            toast.success(data.message);
        }
    }

    return (
        <div className="mt-10  shadow-md flex flex-col justify-between p-3 rounded-lg bg-white">
            <div className="overflow-hidden">
                <Link to={`/recipe/${id}`}>
                    <img
                        src={image}
                        alt={title}
                        className="rounded-lg hover:scale-110 transition-all duration-500 ease-in-out"
                        width={250}
                    />
                </Link>
            </div>
            <div className="flex mt-2 justify-between items-center ">
                <span>
                    {title.slice(0, 20)} {title.length > 20 ? "..." : null}
                </span>
                {pathname === "/favourites" ? (
                    <MdDelete
                        onClick={() => {
                            removeTofav({
                                idMeal: id,
                                strMeal: title,
                                strMealThumb: image
                            })
                            getFavourites(user._id).then((res) => dispatch(setFevourites(res)))

                        }}
                        className="text-red-500 hover:scale-125 transition-all duration-500 ease-in-out cursor-pointer"

                    />
                ) : (
                    <HiHeart
                        onClick={() => isAuth ? addToFav({
                            idMeal: id,
                            strMeal: title,
                            strMealThumb: image
                        }) : toast.error("please login to add to favourites ")}
                        className="text-red-500 hover:scale-125 transition-all duration-500 ease-in-out cursor-pointer"

                    />
                )}
            </div>
        </div>
    )
}

export default RecipeCard
