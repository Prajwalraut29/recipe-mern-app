import React, { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import { PuffLoader } from 'react-spinners'
import axios from 'axios'
const Home = () => {

    const [recipe, setrecipe] = useState([])
    const [loading, setloading] = useState(false)


    const SearchData = async (text) => {
        setloading(true)
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`)
        const data = await res.data;
        if (data.meals === null || data.meals === undefined) {
            console.log("error");
        }
        else {
            setloading(false)
            setrecipe(data.meals)
        }

    }

    const InitailData = async () => {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i`)
        const data = await res.data;
        setrecipe(data.meals)
    }


    useEffect(() => {
        InitailData()
    }, [])

    return (
        <div className='flex items-center justify-center flex-col'>

            <div>
                <input type="text" onChange={(e) => { SearchData(e.target.value) }} placeholder='add your ingridient' className='w-[60vw] p-3 rounded-md bg-slate-200 outline-none shadow-md ' />
            </div>

            <div >
                {
                    loading ? (
                        <PuffLoader color="#f56565" size={150} />
                    ) : recipe === null ? (
                        <h1>no recipes to show </h1>
                    ) : (
                        <div className="lg:w-[70vw] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-3">
                            {recipe.map((recipe) => (
                                <RecipeCard
                                    key={recipe.idMeal}
                                    id={recipe.idMeal}
                                    title={recipe.strMeal}
                                    image={recipe.strMealThumb}
                                />
                            ))}
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Home
